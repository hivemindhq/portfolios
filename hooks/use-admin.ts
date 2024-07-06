import useSWR from 'swr';

import type UnapprovedPortfoliosResponse from '@/pages/api/admin/portfolios/index';
import type UnverifiedUsers from '@/pages/api/admin/users/index';
import type Reports from '@/pages/api/admin/reports';

import {InferAPIResponse} from 'nextkit';
import {NextkitClientException} from 'nextkit/client';
import {fetcher} from '@/lib/fetcher';

export function getUnapprovedPortfolios() {
	const swr = useSWR<
		InferAPIResponse<typeof UnapprovedPortfoliosResponse, 'GET'> | null,
		NextkitClientException
	>('/api/admin/portfolios', fetcher);

	return swr;
}

export function getUnverifiedUsers() {
	const swr = useSWR<
		InferAPIResponse<typeof UnverifiedUsers, 'GET'> | null,
		NextkitClientException
	>('/api/admin/users', fetcher);

	return swr;
}

export function getReports() {
	const swr = useSWR<InferAPIResponse<typeof Reports, 'GET'> | null, NextkitClientException>(
		'/api/admin/reports',
		fetcher,
	);

	return swr;
}
