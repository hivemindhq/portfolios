import useSWR from 'swr';

import type PortfolioResponse from '@/pages/api/portfolios/ftc';
import type GetMyPortfolioById from '@/pages/api/dashboard/get/[id]';
import type GetFavorites from '@/pages/api/favorites';

import {InferAPIResponse} from 'nextkit';
import {NextkitClientException} from 'nextkit/client';
import {fetcher} from '@/lib/fetcher';

export function getFTCDocuments() {
	const swr = useSWR<
		InferAPIResponse<typeof PortfolioResponse, 'GET'> | null,
		NextkitClientException
	>('/api/portfolios/ftc', fetcher);

	return swr;
}

export function getMyPortfolioById(id: number) {
	const swr = useSWR<
		InferAPIResponse<typeof GetMyPortfolioById, 'GET'> | null,
		NextkitClientException
	>(`/api/dashboard/get/${id}`, fetcher);

	return swr;
}

export function getFavorites() {
	const swr = useSWR<InferAPIResponse<typeof GetFavorites, 'GET'> | null, NextkitClientException>(
		`/api/favorites`,
		fetcher,
	);

	return swr;
}

// export function getFRCDocuments() {
// 	const swr = useSWR<InferAPIResponse<typeof PortfolioResponse, 'GET'> | null, NextkitClientException>(
// 		'/api/portfolios/frc',
// 		fetcher,
// 	);

// 	return swr;
// }
