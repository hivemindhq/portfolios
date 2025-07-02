'use client';

import {Button} from '@/components/ui/button';
import {useCount} from '@/hooks/use-user';
import Link from 'next/link';

export default function HeroText() {
	const {data} = useCount();

	return (
		<div className="flex max-w-2xl flex-col space-y-6 text-center md:text-left">
			<div className="space-y-4">
				<h1 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl md:text-4xl">
					Award-Winning Creativity, One <span className="text-blue-500">Click</span> Away
				</h1>
				<p className="text-sm font-light text-[#A1A1A1] sm:text-base">
					Explore beautifully crafted portfolios and documentation tailored for FTC and FRC teams
					alike. Built to impress judges. Designed to <span className="text-blue-500">inspire</span>
					.
				</p>
			</div>

			{/* <span className="mx-auto h-px w-24 bg-[#A1A1A1] md:mx-0" aria-hidden></span>

			<p className="text-sm font-light text-[#A1A1A1] sm:text-base">
				We track every click your portfolio receives and give you clean, exportable metrics —
				perfect for showcasing impact in future seasons.
			</p> */}

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-4">
				<Link href="/dashboard">
					<Button className="w-full sm:w-auto">Submit Yours</Button>
				</Link>
				<Link href="/ftc">
					<Button className="w-full sm:w-auto" variant={'secondary'}>
						View Collection
					</Button>
				</Link>
			</div>

			<div className="flex items-center justify-center space-x-2 md:justify-start">
				<span className="h-2 w-2 animate-pulse rounded-full bg-lime-500"></span>
				<p className="text-sm font-light text-[#A1A1A1]">
					{data?.users ?? 0}+ teams already joined
				</p>
			</div>
		</div>
	);
}
