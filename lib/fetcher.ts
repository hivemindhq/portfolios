'use client';

import {APIResponse} from 'nextkit';
import {NextkitClientException} from 'nextkit/client';

export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
	const request = await fetch(url, init);
	const body = (await request.json()) as APIResponse<T>;

	if (!body.success) {
		throw new NextkitClientException(request.status, body.message);
	}

	return body.data;
}
