'use client';

import {getFTCDocuments} from '@/hooks/use-portfolio';
import {useMe} from '@/hooks/use-user';
import Link from 'next/link';
import Image from 'next/image';
import {Card} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {AnimatePresence, Variants, motion} from 'framer-motion';
import {Loader2, Smile} from 'lucide-react';
import {useTimer} from 'react-timer-hook';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import PortfolioCard from '@/components/portfolio-card';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {SelectValue} from '@radix-ui/react-select';

const cardContainer: Variants = {
	hidden: {
		opacity: 0,
		maxHeight: '100vh',
		overflowY: 'visible',
		pointerEvents: 'none',
	},
	visible: {
		opacity: 1,
		pointerEvents: 'unset',
		transition: {
			ease: 'easeOut',
			duration: 1,
			delay: 1,
			delayChildren: 0.5,
			staggerChildren: 0.1,
		},
	},
};

const fadeFromSide: Variants = {
	hidden: {x: -25, opacity: 0},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 0.5,
		},
	},
};

export default function FTCPage() {
	const {data: portfolios} = getFTCDocuments();
	const {data: user, mutate} = useMe();
	const [loading, setIsLoading] = useState(true);
	const [random, setRandom] = useState(0);
	const [division, setDivision] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		if (!portfolios) {
			return;
		}

		if (loading == false) {
			return;
		}

		setIsLoading(false);
		setRandom(Math.floor(Math.random() * portfolios.length));
	}, [portfolios]);

	const [load, setLoad] = useState(false);

	const time = new Date();
	time.setSeconds(time.getSeconds() + 1.5);

	const timer = useTimer({
		expiryTimestamp: time,
		onExpire: () => {
			setLoad(true);
		},
	});

	return (
		<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="container mx-auto grow max-w-8xl">
				<Card className="h-[20rem] flex grow overflow-hidden">
					<div className="flex grow my-auto">
						<AnimatePresence>
							{loading && (
								<motion.div
									className="grow h-[20rem] flex bg-background relative"
									initial={{opacity: 1}}
									animate={{opacity: 1}}
									exit={{opacity: 0, scale: 0.8}}
									transition={{
										ease: 'easeInOut',
									}}
								>
									<div className="m-auto space-y-4 text-center">
										<div className="flex">
											<Loader2 className="w-8 h-8 animate-spin mx-auto" />
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						{loading ? (
							<></>
						) : (
							<>
								<AnimatePresence>
									{!loading && load && portfolios != null && (
										<motion.div
											className="grow h-[20rem] flex"
											initial={{opacity: 0, y: 100}}
											animate={{opacity: 1, y: 0}}
											exit={{opacity: 0, scale: 0.8}}
											transition={{
												duration: 1.5,
												ease: 'easeInOut',
											}}
										>
											<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 grow">
												<div className="flex">
													<motion.div
														initial="hidden"
														animate="visible"
														variants={cardContainer}
														className="my-auto ps-[6rem] md:ps-[12rem] space-y-2"
													>
														<motion.h1
															initial="hidden"
															animate="visible"
															variants={fadeFromSide}
															className="font-bold text-2xl"
														>
															{portfolios[random].team_name}
														</motion.h1>
														<motion.p
															initial="hidden"
															animate="visible"
															variants={fadeFromSide}
															className="text-lg"
														>
															{portfolios[random].season} {portfolios[random].type}
														</motion.p>
														<motion.p
															initial="hidden"
															animate="visible"
															variants={fadeFromSide}
															className="opacity-70"
														>
															Won {portfolios[random].award} {portfolios[random].award_ranking} at{' '}
															{portfolios[random].division}
														</motion.p>
														<motion.a
															initial="hidden"
															animate="visible"
															variants={fadeFromSide}
															// @ts-ignore
															href={portfolios[random].s3_url ? portfolios[random].s3_url : ''}
														>
															<Button className="my-4">View</Button>
														</motion.a>
													</motion.div>
												</div>
												<div className="hidden md:flex">
													<div className="m-auto flex grow">
														<img
															// @ts-ignore
															src={
																portfolios[random].s3_url_thumb
																	? portfolios[random].s3_url_thumb
																	: ''
															}
															alt="Random Portfolio"
															className="h-[20rem] relative m-auto bottom-[-2.5rem] rotate-[5deg] rounded-md shadow-lg"
														/>
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</>
						)}
					</div>
				</Card>
				{loading ? (
					<Skeleton className="grow flex h-[25rem] w-full my-4"></Skeleton>
				) : (
					<div>
						<div className="grid-cols-1 md:grid-cols-2 hidden md:grid my-4">
							<ToggleGroup type="single" className="me-auto" onValueChange={e => setFilter(e)}>
								<ToggleGroupItem value="inspire">Inspire</ToggleGroupItem>
								<ToggleGroupItem value="think">Think</ToggleGroupItem>
								<ToggleGroupItem value="connect">Connect</ToggleGroupItem>
								<ToggleGroupItem value="innovate">Innovate</ToggleGroupItem>
								<ToggleGroupItem value="control">Control</ToggleGroupItem>
								<ToggleGroupItem value="motivate">Motivate</ToggleGroupItem>
								<ToggleGroupItem value="design">Design</ToggleGroupItem>
							</ToggleGroup>
							<Select onValueChange={e => setDivision(e)}>
								<SelectTrigger className="w-[180px] ms-auto">
									<SelectValue placeholder="Division" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="worlds">Worlds</SelectItem>
									<SelectItem value="regionals">Regionals</SelectItem>
									<SelectItem value="qualifier">Qualifier</SelectItem>
									<SelectItem value="all">All</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="my-4 grid grow grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{division == '' && filter == '' ? (
								portfolios?.map(portfolio => (
									<div key={portfolio.id} className="flex">
										<PortfolioCard portfolio={portfolio} />
									</div>
								))
							) : (
								<>
									{division == '' || !division ? (
										portfolios?.map(portfolio => {
											if (portfolio.award.toLowerCase() == filter) {
												return (
													<div key={portfolio.id} className="flex">
														<PortfolioCard portfolio={portfolio} />
													</div>
												);
											} else {
												return <></>;
											}
										})
									) : (
										<>
											{filter == '' && !filter
												? portfolios?.map(portfolio => {
														if (portfolio.division.toLowerCase() == division || division == 'all') {
															return (
																<div key={portfolio.id} className="flex">
																	<PortfolioCard portfolio={portfolio} />
																</div>
															);
														} else {
															return <></>;
														}
													})
												: portfolios?.map(portfolio => {
														if (
															(portfolio.division.toLowerCase() == division || division == 'all') &&
															portfolio.award.toLowerCase() == filter
														) {
															return (
																<div key={portfolio.id} className="flex">
																	<PortfolioCard portfolio={portfolio} />
																</div>
															);
														} else {
															return <></>;
														}
													})}
										</>
									)}
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
