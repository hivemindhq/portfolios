import {api} from '@/server/api';
import {TokenPrefix, cookieName} from '@/server/sessions';
import {kv} from '@vercel/kv';
import {serialize} from 'cookie';

export default api({
	async GET({req, res}) {
		const cookie = req.cookies[cookieName];

		await kv.del(`${TokenPrefix.USER}:${cookie}`);

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
