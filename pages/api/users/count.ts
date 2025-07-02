import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {Portfolio, User} from '@prisma/client';
import {NextkitException} from 'nextkit';

export default api({
	async GET({req, res, context}) {
		const user = await prisma.user.count();

		return {
			users: Math.round(user / 5) * 5,
		};
	},
});
