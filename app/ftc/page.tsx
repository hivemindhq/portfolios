'use client';

import {getFTCDocuments} from '@/hooks/use-portfolio';
import {useMe} from '@/hooks/use-user';
import Link from 'next/link';
import Image from 'next/image';
import {Card} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {AnimatePresence, Variants, motion} from 'framer-motion';
import {Loader2, Sparkles, Filter, X, Star} from 'lucide-react';
import {useTimer} from 'react-timer-hook';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import PortfolioCard from '@/components/portfolio-card';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {SelectValue} from '@radix-ui/react-select';

const heroContainer: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
			delayChildren: 0.3,
			staggerChildren: 0.08,
		},
	},
};

const fadeUp: Variants = {
	hidden: {y: 24, opacity: 0},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const scaleIn: Variants = {
	hidden: {scale: 0.95, opacity: 0},
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
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
		<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col p-4 md:p-10">
			<div className="container mx-auto grow max-w-7xl space-y-10">
				<Card className="relative border-border/50 bg-card overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent pointer-events-none" />

					{!portfolios || loading ? (
						<div className="relative flex items-center justify-center py-20">
							<div className="space-y-3 text-center">
								<Loader2 className="w-8 h-8 animate-spin mx-auto opacity-50" />
								<p className="text-sm text-muted-foreground">Loading portfolios...</p>
							</div>
						</div>
					) : (
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: load ? 1 : 0}}
							transition={{
								duration: 0.5,
								ease: 'easeInOut',
							}}
							className="relative"
						>
							<motion.div
								initial="hidden"
								animate={load ? 'visible' : 'hidden'}
								variants={heroContainer}
								className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 p-6 md:p-8"
							>
								<div className="flex flex-col">
									<div className="space-y-4 flex-1">
										<motion.div variants={fadeUp}>
											<span className="text-sm text-muted-foreground font-mono">
												#{portfolios[random].team_number}
											</span>
										</motion.div>

										<motion.h2
											variants={fadeUp}
											className="font-bold text-2xl md:text-3xl tracking-tight"
										>
											{portfolios[random].team_name}
										</motion.h2>

										<motion.div
											variants={fadeUp}
											className="flex flex-wrap items-center gap-2 text-sm"
										>
											<span className="px-2 py-1 bg-secondary/50 border border-border/40">
												{portfolios[random].season}
											</span>
											<span className="px-2 py-1 bg-secondary/50 border border-border/40">
												{portfolios[random].type}
											</span>
											<span className="px-2 py-1 bg-secondary/50 border border-border/40">
												{portfolios[random].division}
											</span>
										</motion.div>
									</div>

									<motion.div
										variants={fadeUp}
										className="flex items-center justify-between gap-4 pt-4 border-t border-border/30 mt-4"
									>
										<a
											// @ts-ignore
											href={portfolios[random].s3_url ? portfolios[random].s3_url : ''}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button size="sm">View Portfolio</Button>
										</a>
										<div className="flex items-center gap-2">
											<Star className="w-4 h-4 text-amber-500 fill-amber-500" />
											<span className="font-medium text-sm">
												{portfolios[random].award} {portfolios[random].award_ranking}
											</span>
										</div>
									</motion.div>
								</div>

								<motion.div variants={scaleIn} className="hidden md:flex items-start">
									<div className="w-full aspect-[3/4] border border-border/50 bg-secondary/20 overflow-hidden">
										<img
											// @ts-ignore
											src={portfolios[random].s3_url_thumb ? portfolios[random].s3_url_thumb : ''}
											alt={`${portfolios[random].team_name} Portfolio`}
											className="w-full h-full object-cover"
										/>
									</div>
								</motion.div>
							</motion.div>
						</motion.div>
					)}
				</Card>
				{loading ? (
					<div className="space-y-6">
						<Skeleton className="h-16 w-full" />
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[...Array(6)].map((_, i) => (
								<Skeleton key={i} className="h-[30rem]" />
							))}
						</div>
					</div>
				) : (
					<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.5, delay: 0.2}}
					>
						<div className="mb-10">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-semibold tracking-tight">Browse Portfolios</h2>
								{(filter || division) && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => {
											setFilter('');
											setDivision('');
										}}
										className="text-muted-foreground hover:text-foreground"
									>
										<X className="w-4 h-4 mr-2" />
										Clear Filters
									</Button>
								)}
							</div>

							<div className="hidden md:flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border/40">
								<div className="flex items-center gap-2 flex-1">
									<Filter className="w-4 h-4 text-muted-foreground" />
									<span className="text-sm font-medium text-muted-foreground">Award:</span>
									<ToggleGroup
										type="single"
										className="flex-wrap justify-start"
										onValueChange={e => setFilter(e)}
										value={filter}
									>
										<ToggleGroupItem value="inspire" className="text-xs">
											Inspire
										</ToggleGroupItem>
										<ToggleGroupItem value="think" className="text-xs">
											Think
										</ToggleGroupItem>
										<ToggleGroupItem value="innovate" className="text-xs">
											Innovate
										</ToggleGroupItem>
										<ToggleGroupItem value="control" className="text-xs">
											Control
										</ToggleGroupItem>
										<ToggleGroupItem value="design" className="text-xs">
											Design
										</ToggleGroupItem>
										<ToggleGroupItem value="connect" className="text-xs">
											Connect
										</ToggleGroupItem>
										<ToggleGroupItem value="motivate" className="text-xs">
											Motivate
										</ToggleGroupItem>
										<ToggleGroupItem value="reach" className="text-xs">
											Reach
										</ToggleGroupItem>
										<ToggleGroupItem value="sustain" className="text-xs">
											Sustain
										</ToggleGroupItem>
									</ToggleGroup>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium text-muted-foreground">Division:</span>
									<Select onValueChange={e => setDivision(e)} value={division}>
										<SelectTrigger className="w-[140px]">
											<SelectValue placeholder="All" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Divisions</SelectItem>
											<SelectItem value="worlds">Worlds</SelectItem>
											<SelectItem value="regionals">Regionals</SelectItem>
											<SelectItem value="qualifier">Qualifier</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex md:hidden flex-col gap-3">
								<Select onValueChange={e => setFilter(e)} value={filter}>
									<SelectTrigger>
										<SelectValue placeholder="Filter by Award" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value=" ">All Awards</SelectItem>
										<SelectItem value="inspire">Inspire</SelectItem>
										<SelectItem value="think">Think</SelectItem>
										<SelectItem value="innovate">Innovate</SelectItem>
										<SelectItem value="control">Control</SelectItem>
										<SelectItem value="design">Design</SelectItem>
										<SelectItem value="connect">Connect</SelectItem>
										<SelectItem value="motivate">Motivate</SelectItem>
										<SelectItem value="reach">Reach</SelectItem>
										<SelectItem value="sustain">Sustain</SelectItem>
									</SelectContent>
								</Select>
								<Select onValueChange={e => setDivision(e)} value={division}>
									<SelectTrigger>
										<SelectValue placeholder="Filter by Division" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value=" ">All Divisions</SelectItem>
										<SelectItem value="worlds">Worlds</SelectItem>
										<SelectItem value="regionals">Regionals</SelectItem>
										<SelectItem value="qualifier">Qualifier</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
							initial="hidden"
							animate="visible"
							variants={{
								visible: {
									transition: {
										staggerChildren: 0.05,
									},
								},
							}}
						>
							{portfolios
								?.filter(portfolio => {
									const matchesAward =
										!filter || filter === ' ' || portfolio.award.toLowerCase() === filter;
									const matchesDivision =
										!division ||
										division === ' ' ||
										division === 'all' ||
										portfolio.division.toLowerCase() === division;
									return matchesAward && matchesDivision;
								})
								.map((portfolio, index) => (
									<motion.div key={portfolio.id} variants={fadeUp} className="flex">
										<PortfolioCard portfolio={portfolio} />
									</motion.div>
								))}
						</motion.div>

						{portfolios?.filter(portfolio => {
							const matchesAward =
								!filter || filter === ' ' || portfolio.award.toLowerCase() === filter;
							const matchesDivision =
								!division ||
								division === ' ' ||
								division === 'all' ||
								portfolio.division.toLowerCase() === division;
							return matchesAward && matchesDivision;
						}).length === 0 && (
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								className="text-center py-16"
							>
								<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 mb-4">
									<Filter className="w-8 h-8 text-muted-foreground" />
								</div>
								<h3 className="text-lg font-semibold mb-2">No portfolios found</h3>
								<p className="text-muted-foreground mb-4">
									Try adjusting your filters to see more results
								</p>
								<Button
									variant="outline"
									onClick={() => {
										setFilter('');
										setDivision('');
									}}
								>
									Clear All Filters
								</Button>
							</motion.div>
						)}
					</motion.div>
				)}
			</div>
		</div>
	);
}
