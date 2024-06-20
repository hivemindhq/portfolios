import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {NextkitException} from 'nextkit';

export default api({
	async GET({req, res, context}) {
		if (!context.userId) {
			throw new NextkitException(401, 'You must be logged in to access this endpoint');
		}

		const user = await prisma.user.findFirst({
			where: {
				id: context.userId,
			},
		});

        if (!user) {
            throw new NextkitException(
              401,
              "You must be logged in to access this endpoint"
            );
        }

        const id = Number(req.query.id);

		if (isNaN(id)) {
			throw new NextkitException(400, 'Invalid ID');
		}

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                favorited_portfolios: {
                    // i need to figure out how to do this
                }
            }
        })

        return {
            success: true
        }
	},
});
