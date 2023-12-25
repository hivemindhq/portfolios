import useSWR from 'swr';

import type UserAtMe from '@/pages/api/users/@me';
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
