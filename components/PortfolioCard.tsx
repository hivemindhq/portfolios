import {Portfolio} from '@/hooks/types/portfolios';
import Link from 'next/link';
import {Button} from './ui/button';
import Image from 'next/image';
import {ChevronLeft, FlagIcon} from 'lucide-react';
export default function PortfolioCard(props: {portfolio: Portfolio}) {
	const portfolio = props.portfolio;
	return (
		<>
			<article className="grid w-full gap-2">
				<div className="flex items-center justify-between">
					<span className="opacity-40 my-auto">
						{portfolio.team_number} &bull; {portfolio.award} {portfolio.award_ranking}
					</span>
					<Link
						href={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolio.id}/${portfolio.file}`}
						target="_blank"
					>
						<Button variant={'outline'}>Open</Button>
					</Link>
				</div>
				<Link
					className="group relative block"
					href={`/portfolios/${portfolio.id}`}
					aria-label={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Portfolio`}
				>
					<Image
						src={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolio.id}/${portfolio.thumbnail}`}
						className="rounded-2xl relative w-full"
						alt={`FTC ${portfolio.team_number} ${portfolio.team_name}'s Thumbnail`}
						width={1280}
						height={720}
						aria-hidden
					/>
					<div className="relative top-[-200px] right-[-356px] opacity-0 group-hover:opacity-100">
						<Link href="https://github.com/hivemindhq/portfolios/issues/new/choose">
							<FlagIcon className="w-5 h-5 text-red-500 opacity-40 hover:opacity-100" />
						</Link>
					</div>
					<div className="ease rounded-2xl pointer-events-none absolute inset-0 border border-black/5 transition duration-150 group-hover:bg-black/20"></div>
				</Link>
				<h1 className="truncate font-medium">
					{portfolio.team_name} &bull; {portfolio.field}
				</h1>
			</article>
		</>
	);
}
