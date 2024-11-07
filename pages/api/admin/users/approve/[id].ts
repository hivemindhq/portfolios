import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {NextkitException} from 'nextkit';
import {z} from 'zod';

export default api({
	async GET({req, res, context}) {
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

		const id = Number(req.query.id);

		if (isNaN(id)) {
			throw new NextkitException(400, 'Invalid ID');
		}

		await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				verified: true,
			},
		});

		return {
			success: true,
		};
	},
});
