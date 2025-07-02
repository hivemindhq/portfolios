'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Loader2} from 'lucide-react';
import Link from 'next/link';
import {useMe, useMyPortfolios} from '@/hooks/use-user';
import {useTimer} from 'react-timer-hook';
import {useState} from 'react';
import NewDocument from '@/components/new-doc';
import AuthPreloader from '@/components/preloader';
import DashboardDocument from '@/components/dashboard/doc';
import {Skeleton} from '@/components/ui/skeleton';
import {Portfolio} from '@prisma/client';

export default function Page() {
	const {data: user, mutate} = useMe();
	const {data: portfolios} = useMyPortfolios();

	return (
		<>
			<AuthPreloader />
			<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<h1 className="text-2xl font-semibold">Welcome back, {user?.name}.</h1>
					<p className="opacity-70">You can manage your published documents here.</p>
					<div className="my-4 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
						<NewDocument />
						{!portfolios ? (
							<>
								<Skeleton />
								<Skeleton />
								<Skeleton />
							</>
						) : (
							<>
								{portfolios.length === 0 ? (
									<></>
								) : (
									portfolios.map(portfolio => (
										<Link href={`/dashboard/document/${portfolio.id}`} key={portfolio.id}>
											<DashboardDocument
												key={portfolio.id}
												id={`${portfolio.id}`}
												title={`${portfolio.team_name} ${portfolio.season} ${portfolio.type}`}
												season={portfolio.season}
												s3_thumb={portfolio.s3_url_thumb ? portfolio.s3_url_thumb : null}
												approved={portfolio.approved}
											/>
										</Link>
									))
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
