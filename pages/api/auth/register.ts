import {z} from 'zod';
import argon from 'argon2';
import {api} from '@/server/api';
import {prisma} from '@/lib/util/db';
import {NextkitException} from 'nextkit';
import {cookieName, createSession} from '@/server/sessions';
import {serialize} from 'cookie';

const schema = z.object({
	email: z.string().email(),
	name: z.string(),
	team: z.string().min(1),
	password: z.string().min(12),
});

export default api({
	async POST({req, res}) {
		const body = schema.parse(req.body);

		const existing = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (existing) {
			throw new NextkitException(403, 'User already exists!');
		}

		const user = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				password: await argon.hash(body.password),
				team: body.team,
				site_admin: false,
			},
		});

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
