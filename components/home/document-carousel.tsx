'use client';

import {motion} from 'framer-motion';
import {getHomepage} from '@/hooks/use-portfolio';
import Link from 'next/link';

export default function DocumentCarousel() {
	const {data: portfolios} = getHomepage();

	// Flatten the data twice for infinite scroll effect
	const repeatedPortfolios = [...(portfolios ?? []), ...(portfolios ?? [])];

	return (
		<div className="relative h-[93vh] w-[200px] overflow-hidden">
			<div
				aria-hidden="true"
				className="from-background via-background/0 pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-gradient-to-b to-transparent"
			/>
			<div
				aria-hidden="true"
				className="from-background via-background/0 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t to-transparent"
			/>

			<motion.div
				className="flex flex-col gap-6"
				initial={{y: 0}}
				animate={{y: '-50%'}}
				transition={{
					repeat: Infinity,
					duration: 20,
					ease: 'linear',
				}}
			>
				{repeatedPortfolios.map((portfolio, i) => (
					<div
						key={i}
						className="flex h-[250px] w-full shrink-0 flex-col items-center justify-center text-center text-white shadow-md px-2 py-4"
					>
						<Link href={portfolio.s3_url ?? ''} target="_blank">
							<img
								className="rounded-xl"
								src={`${portfolio.s3_url_thumb ?? ''}`}
								alt={`${portfolio.team_name}'s Portfolio`}
							/>
						</Link>
					</div>
				))}
			</motion.div>
		</div>
	);
}
