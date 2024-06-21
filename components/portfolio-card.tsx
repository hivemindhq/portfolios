import Link from 'next/link';
import {Button} from './ui/button';
import Image from 'next/image';
import {ChevronLeft, FlagIcon} from 'lucide-react';
import {Portfolio} from '@prisma/client';
export default function PortfolioCard(props: {portfolio: Portfolio}) {
	const portfolio = props.portfolio;
	return (
		<>
			<article className="grid w-full gap-2 h-[30rem]">
				<div className="flex items-center justify-between">
					<span className="opacity-40 my-auto">
						{portfolio.team_number} &bull; {portfolio.award} {portfolio.award_ranking}
					</span>
					<div className="flex space-x-4">
						<Link href={portfolio.s3_url ? portfolio.s3_url : '#'} target="_blank">
							<Button variant={'outline'}>View</Button>
						</Link>
					</div>
				</div>
				<Link
                    href={portfolio.s3_url ? portfolio.s3_url : '#'}
                    target="_blank"
					className="group relative flex bg-secondary grow rounded-2xl"
					aria-label={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Portfolio`}
				>
					<img
						src={portfolio.s3_url_thumb ? portfolio.s3_url_thumb : ''}
						className="rounded-xl relative rounded-2xl h-[20rem] m-auto"
						alt={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Thumbnail`}
						aria-hidden
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
