import createAPI from 'nextkit';
import {getSessionFromRequest} from './sessions';

export const api = createAPI({
	async onError(req, res, err) {
		return {
			status: 500,
			message: err.message,
		};
	},

	async getContext(req) {
		return {
			userId: await getSessionFromRequest(req).catch(() => null),
		};
	},
});
