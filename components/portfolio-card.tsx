import Link from 'next/link';
import {Button} from './ui/button';
import Image from 'next/image';
import {ChevronLeft, FlagIcon, Star, ExternalLink} from 'lucide-react';
import {Portfolio} from '@prisma/client';

import type AddPortfolioToFavorites from '@/pages/api/portfolios/favorite/[id]';

import {useMe} from '@/hooks/use-user';
import {cn} from '@/lib/utils';
import toast from 'react-hot-toast';
import {InferAPIResponse} from 'nextkit';
import {fetcher} from '@/lib/fetcher';
export default function PortfolioCard(props: {portfolio: Portfolio}) {
	const portfolio = props.portfolio;
	const {data: user} = useMe();
	return (
		<article className="group/card flex flex-col w-full h-[32rem] border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-border">
			<Link
				href={portfolio.s3_url ? portfolio.s3_url : '#'}
				target="_blank"
				className="relative flex-1 bg-secondary/20 overflow-hidden"
				aria-label={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Portfolio`}
			>
				<Image
					src={portfolio.s3_url_thumb ? portfolio.s3_url_thumb : ''}
					className="object-contain w-full h-full transition-transform duration-500 group-hover/card:scale-105"
					alt={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Thumbnail`}
					aria-hidden
					unoptimized
					layout="fill"
					objectFit="contain"
					loading="eager"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

				<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
					<div className="flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm border border-border/50">
						<ExternalLink className="w-4 h-4" />
						<span className="text-sm font-medium">View Portfolio</span>
					</div>
				</div>
			</Link>

			<div className="p-4 space-y-3">
				<div>
					<h3 className="font-semibold text-base leading-tight truncate group-hover/card:text-primary transition-colors">
						{portfolio.team_name}
					</h3>
					<div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
						<span className="font-mono text-xs">{portfolio.team_number}</span>
						<span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
						<span className="text-xs">{portfolio.division}</span>
					</div>
				</div>

				<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10">
					<Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
					<span className="text-xs font-medium">
						{portfolio.award} {portfolio.award_ranking}
					</span>
				</div>

				<div className="flex items-center gap-2 pt-1">
					{user && (
						<Button
							onClick={async e => {
								e.preventDefault();

								let promise: Promise<unknown>;

								if (user.favorited_portfolios.includes(portfolio.id)) {
									promise = fetcher<InferAPIResponse<typeof AddPortfolioToFavorites, 'GET'>>(
										`/api/portfolios/favorite/revoke/${portfolio.id}`,
										{
											method: 'GET',
											headers: {'Content-Type': 'application/json'},
										},
									);
								} else {
									promise = fetcher<InferAPIResponse<typeof AddPortfolioToFavorites, 'GET'>>(
										`/api/portfolios/favorite/${portfolio.id}`,
										{
											method: 'GET',
											headers: {'Content-Type': 'application/json'},
										},
									);
								}

								const res = await toast
									.promise(promise, {
										success: 'Updated!',
										loading: 'Editing...',
										error: (error: Error) => error?.message ?? 'Something went wrong!',
									})
									.catch(() => null);

								if (!res) return;
							}}
							variant={'ghost'}
							size="sm"
							className="hover:bg-amber-500/10"
						>
							<Star
								className={cn(
									'w-4 h-4 transition-colors',
									user.favorited_portfolios.includes(portfolio.id)
										? 'text-amber-500 fill-amber-500'
										: 'text-muted-foreground',
								)}
							/>
						</Button>
					)}
					<Link href={portfolio.s3_url ? portfolio.s3_url : '#'} target="_blank" className="flex-1">
						<Button variant={'outline'} size="sm" className="w-full">
							<span>View</span>
							<ExternalLink className="w-3.5 h-3.5 ml-1.5" />
						</Button>
					</Link>
				</div>
			</div>
		</article>
	);
}
