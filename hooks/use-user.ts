import useSWR from 'swr';

import type UserAtMe from '@/pages/api/users/@me';
import type Users from '@/pages/api/users/count';
import type MyPortfolios from '@/pages/api/dashboard/all';

import {InferAPIResponse} from 'nextkit';
import {NextkitClientException} from 'nextkit/client';
import {fetcher} from '@/lib/fetcher';

export function useMe() {
	const swr = useSWR<InferAPIResponse<typeof UserAtMe, 'GET'> | null, NextkitClientException>(
		'/api/users/@me',
		fetcher,
	);

	return swr;
}

export function useMyPortfolios() {
	return useSWR<InferAPIResponse<typeof MyPortfolios, 'GET'>>('/api/dashboard/all', fetcher);
}

export function useCount() {
	const swr = useSWR<InferAPIResponse<typeof Users, 'GET'> | null, NextkitClientException>(
		'/api/users/count',
		fetcher,
	);

	return swr;
}
