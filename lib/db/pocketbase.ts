import Pocketbase, {ClientResponseError} from 'pocketbase';

export const url = 'https://portfolioutility.pockethost.io/';

export const pb = new Pocketbase(url);

export async function sudo() {
	if (process.env.POCKETBASE_USERNAME && process.env.POCKETBASE_PASSWORD) {
		await pb.admins.authWithPassword(
			process.env.POCKETBASE_USERNAME,
			process.env.POCKETBASE_PASSWORD,
		);

		pb.beforeSend = function (url, options) {
			options.headers = Object.assign({}, options.headers, {
				meta: process.env.META_URI,
			});

			return {url, options};
		};
	}
}

export function parseError(e: ClientResponseError) {
	const data = e.data;
	if (!data) {
		return e.message;
	}

	const list = Object.keys(data);

	if (list.length === 0) {
		return e.message;
	}

	return list
		.map(key => {
			return `${key} > ${data[key].message}`;
		})
		.join('\n');
}
