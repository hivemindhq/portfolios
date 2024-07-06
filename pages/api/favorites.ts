import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {Portfolio} from '@prisma/client';

export default api({
	async GET({req, res, context}) {
		if (!context.userId) {
			throw new Error('You must be logged in to access this endpoint');
		}

		const user = await prisma.user.findFirst({
			where: {
				id: context.userId,
			},
		});

		if (!user) {
			throw new Error('You must be logged in to access this endpoint');
		}

		let portfolios: Portfolio[] = [];

		await Promise.all(
			user.favorited_portfolios.map(async i => {
				const port = await prisma.portfolio.findFirst({
					where: {
						id: i,
					},
				});

				portfolios.push(port as unknown as Portfolio);
			}),
		);

		return portfolios;
	},
});
