import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';

export default api({
	async GET({req, res, context}) {
		if (!context.userId) {
			throw new Error('You must be logged in to access this endpoint');
		}

		const id = Number(req.query.id);

		if (isNaN(id)) {
			throw new Error('Invalid ID');
		}

		const user = await prisma.user.findFirst({
			where: {
				id: Number(context.userId),
			},
		});

		if (!user) {
			throw new Error('You must be logged in to access this endpoint');
		}

		const favorited = user.favorited_portfolios.includes(id);

		return {
			isFavorite: favorited,
		};
	},
});
