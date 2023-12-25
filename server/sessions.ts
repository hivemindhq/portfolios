import crypto from 'crypto';
import dayjs from 'dayjs';
import {NextApiRequest} from 'next';
import {NextkitException} from 'nextkit';
import {kv} from '@vercel/kv';

export const cookieName = 'token';

export const enum TokenPrefix {
	USER = 'token',
}

async function generateUniqueSessionToken(prefix: TokenPrefix): Promise<string> {
	const token = crypto.randomBytes(64).toString('hex');
	const existing = await kv.get(`${prefix}:${token}`);

	if (typeof existing === 'string') {
		return generateUniqueSessionToken(prefix);
	}

	return token;
}

export async function getSessionFromRequest(req: NextApiRequest) {
	const session = await kv.get(`${TokenPrefix.USER}:${req.cookies[cookieName]}`);

	if (!session) {
		throw new NextkitException(401, 'You are not logged in!');
	}

	return session;
}

export async function createSession(userId: string): Promise<[token: string, expires: Date]> {
	const token = await generateUniqueSessionToken(TokenPrefix.USER);
	const expiration = dayjs().add(3, 'days');

	await kv.set(`${TokenPrefix.USER}:${token}`, userId, {
		ex: expiration.diff() * 1000,
	});

	return [token, expiration.toDate()];
}
