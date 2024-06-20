import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {NextkitException} from 'nextkit';

export default api({
	async GET({context}) {
		if (!context.userId) {
			throw new NextkitException(401, 'Unauthorized');
		}

		const user = await prisma.user.findFirst({
			where: {
				id: context.userId,
			},
		});

		if (!user) {
			throw new NextkitException(404, 'User not found');
		}

		return user;
	},
});
