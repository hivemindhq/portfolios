import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {z} from 'zod';
import argon from 'argon2';
import {NextkitException} from 'nextkit';
import {cookieName, createSession} from '@/server/sessions';
import {serialize} from 'cookie';

const schema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default api({
	async POST({req, res, context}) {
		const body = schema.parse(req.body);

		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (!user) {
			throw new NextkitException(401, 'Unauthorized');
		}

		/*
            user.password is the hashed password inside the database,
            whilst body.password is the password sent from the client to the server :3
        */

		const valid = await argon.verify(user.password, body.password);

		if (!valid) {
			throw new NextkitException(401, 'Unauthorized');
		}

		const [token, expires] = await createSession(`${user.id}`);

		res.setHeader(
			'Set-Cookie',
			serialize(cookieName, token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				path: '/',
				expires,
			}),
		);

		return {
			user: user,
		};
	},
});
