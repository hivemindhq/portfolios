import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {NextkitException} from 'nextkit';

export default api({
	async GET({req, res, context}) {
		if (!context.userId) {
			throw new NextkitException(401, 'You must be logged in to access this endpoint');
		}

		const id = Number(req.query.id);

		const portfolio = await prisma.portfolio.findFirst({
			where: {
				id: id,
				ownerId: context.userId,
			},
		});

		if (!portfolio) {
			throw new NextkitException(400, 'You must own the document to access this endpoint');
		}

		return {
			success: true,
			portfolio: portfolio,
		};
	},
});
