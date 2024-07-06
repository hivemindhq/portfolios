import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {NextkitException} from 'nextkit';
import {z} from 'zod';

const schema = z.object({
	content: z.string(),
});

export default api({
	async POST({req, res, context}) {
		if (!context.userId) {
			throw new NextkitException(401, 'You must be logged in to access this endpoint');
		}

		const body = schema.parse(req.body);

		// const report = await prisma.report.create({})
	},
});
