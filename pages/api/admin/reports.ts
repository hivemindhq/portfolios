import {prisma} from '@/lib/util/db';
import {api} from '@/server/api';
import {Portfolio, User} from '@prisma/client';
import {NextkitException} from 'nextkit';

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

		const reports = await prisma.report.findMany({
			where: {
				confirmed: false,
			},
		});

		return reports;
	},
});
