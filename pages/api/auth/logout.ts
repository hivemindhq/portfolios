import {api} from '@/server/api';
import {TokenPrefix, cookieName} from '@/server/sessions';
import {serialize} from 'cookie';
import {redis} from '@/server/redis';

export default api({
	async GET({req, res}) {
		const cookie = req.cookies[cookieName];

		await redis.del(`${TokenPrefix.USER}:${cookie}`);

		res.setHeader(
			'Set-Cookie',
			serialize(cookieName, '', {
				expires: new Date(),
				secure: process.env.NODE_ENV !== 'development',
				httpOnly: true,
				path: '/',
			}),
		);
	},
});
