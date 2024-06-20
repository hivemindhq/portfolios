'use client';

import Announcement from '@/components/announcement';
import HomepageCarousel from '@/components/homepage-carousel';
import {Button} from '@/components/ui/button';
import {ChevronRight, GithubIcon, StarIcon} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {TypeAnimation} from 'react-type-animation';

export default function Home() {
	return (
		<main className="flex-1">
			<div className="container relative">
				<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
					<Announcement />
					<h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
						Build your{' '}
						<TypeAnimation
							sequence={[
								'next portfolio.',
								1000,
								'next big win.',
								1000,
								'sponsorship packet.',
								1000,
								'outreach logs.',
								1000,
								'technical binder.',
								1000,
								'impact submission.',
								1000,
								'control award.',
								1000,
							]}
							wrapper="span"
							speed={30}
							repeat={Infinity}
						/>
					</h1>
					<p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
						Award winning, beautifully designed portfolios and documentation for FTC and{' '}
						<em className="opacity-70">
							FRC<span className="text-destructive">*</span>
						</em>
						.
					</p>
					<div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
						<Link href="/dashboard">
							<Button>Submit Yours</Button>
						</Link>
						<Link href="https://github.com/hivemindhq/portfolios" target="_blank">
							<Button variant={'outline'} className="flex space-x-2">
								<StarIcon className="h-4 w-4" /> <p>Star the repository</p>
							</Button>
						</Link>
					</div>
				</section>
				<div className="">
					<HomepageCarousel />
					<div className="flex">
						<a href="/ftc" className="mx-auto group opacity-70 hover:opacity-100">
							<div className="flex my-8">
								View all...{' '}
								<ChevronRight className="h-4 w-4 relative left-[2px] group-hover:left-[5px] my-auto transition-all" />
							</div>
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
