'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Frown, Loader2} from 'lucide-react';
import Link from 'next/link';
import {useMe, useMyPortfolios} from '@/hooks/use-user';
import {useTimer} from 'react-timer-hook';
import {useState} from 'react';
import NewDocument from '@/components/new-doc';
import AuthPreloader from '@/components/preloader';
import DashboardDocument from '@/components/dashboard/doc';
import {Skeleton} from '@/components/ui/skeleton';
import {Portfolio} from '@prisma/client';
import {getFavorites} from '@/hooks/use-portfolio';
import PortfolioCard from '@/components/portfolio-card';

export default function Page() {
	const {data: user, mutate} = useMe();
	const {data: portfolios} = getFavorites();

	return (
		<>
			<AuthPreloader />
			<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<h1 className="text-2xl font-semibold">Your favorites.</h1>
					<p className="opacity-70">You can see all the portfolios you've favorited here.</p>
					<div className="my-4  grid grid-cols-2 lg:grid-cols-3 gap-12">
						{!portfolios ? (
							<>
								<Skeleton />
								<Skeleton />
								<Skeleton />
							</>
						) : (
							<>
								{portfolios.length === 0 ? (
									<div className="col-span-3 flex">
										<div className="m-auto justify-center items-center text-center space-y-3">
											<Frown className="opacity-30 w-14 h-14 mx-auto my-5" />
											<p className="italic opacity-50">You haven't favorited any portfolios yet.</p>
										</div>
									</div>
								) : (
									portfolios.map(portfolio => <PortfolioCard portfolio={portfolio} />)
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
