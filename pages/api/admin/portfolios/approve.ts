import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {Portfolio} from '@prisma/client';
import {NextkitException} from 'nextkit';
import {z} from 'zod';

const schema = z.object({
	id: z.string(),
	s3_url: z.string().url(),
	s3_thumbnail: z.string().url(),
});

export default api({
	async POST({req, res, context}) {
		if (!context.userId) {
			throw new NextkitException(401, 'You must be logged in to access this endpoint');
		}

		const user = await prisma.user.findFirst({
			where: {
				id: Number(context.userId),
			},
		});

		if (!user) {
			throw new NextkitException(401, 'You must be logged in to access this endpoint');
		}

		if (!user.site_admin) {
			throw new NextkitException(403, "You don't have permission to access this endpoint");
		}

		const body = schema.parse(req.body);

		const id = Number(body.id);

		if (isNaN(id)) {
			throw new NextkitException(400, 'Invalid ID');
		}

		await prisma.portfolio.update({
			where: {
				id: id,
			},
			data: {
				approved: true,
				s3_url: body.s3_url,
				s3_url_thumb: body.s3_thumbnail,
				download_url: '',
			},
		});

		return {
			success: true,
		};
	},
});
