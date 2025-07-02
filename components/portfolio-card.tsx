import Link from 'next/link';
import {Button} from './ui/button';
import Image from 'next/image';
import {ChevronLeft, FlagIcon, Star} from 'lucide-react';
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
		<>
			<article className="grid w-full gap-2 h-[30rem]">
				<div className="flex items-center justify-between">
					<span className="opacity-40 my-auto">
						{portfolio.team_number} &bull; {portfolio.award} {portfolio.award_ranking}
					</span>
					<div className="flex space-x-2">
						{user ? (
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
								variant={'secondary'}
							>
								<Star
									className={cn(
										'w-4 h-4',
										user.favorited_portfolios.includes(portfolio.id)
											? 'text-amber-500 fill-amber-500'
											: 'text-primary',
									)}
								/>
							</Button>
						) : (
							<></>
						)}
						<Link href={portfolio.s3_url ? portfolio.s3_url : '#'} target="_blank">
							<Button variant={'outline'}>View</Button>
						</Link>
					</div>
				</div>
				<Link
					href={portfolio.s3_url ? portfolio.s3_url : '#'}
					target="_blank"
					className="group relative flex bg-zinc-900/20 grow rounded-2xl h-[20rem]"
					aria-label={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Portfolio`}
				>
					<Image
						src={portfolio.s3_url_thumb ? portfolio.s3_url_thumb : ''}
						className="rounded-xl relative rounded-2xl h-[120rem] m-auto"
						alt={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Thumbnail`}
						aria-hidden
						layout="fill"
						objectFit="contain"
						loading="eager"
					/>
					<div className="ease rounded-2xl pointer-events-none absolute inset-0 transition duration-150 group-hover:bg-black/20"></div>
				</Link>
				<h1 className="truncate font-medium">
					{portfolio.team_name} &bull; {portfolio.division}
				</h1>
			</article>
		</>
	);
}
