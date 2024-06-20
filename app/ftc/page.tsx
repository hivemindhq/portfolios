'use client';

import {getFTCDocuments} from '@/hooks/use-portfolio';
import {useMe} from '@/hooks/use-user';

export default function FTCPage() {
	const {data: portfolios} = getFTCDocuments();
	const {data: user, mutate} = useMe();

	return <p>hi</p>;
}
