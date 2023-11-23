'use client';

import {Button} from '@/components/ui/button';
import {Portfolio} from '@/hooks/types/portfolios';
import {pb, sudo} from '@/lib/db/pocketbase';
import Link from 'next/link';
import Image from 'next/image';
import {ChevronLeft, Loader2} from 'lucide-react';
import {cache, useEffect, useState} from 'react';
import {ThemeProvider} from '@/components/ThemeProvider';

export default function Page({params: {slug}}: {params: {slug: string}}) {
	const [portfolio, setPortfolio] = useState<Portfolio>();

	useEffect(() => {
		pb.collection('portfolios')
			.getOne(slug)
			.then(data => {
				setPortfolio(data as unknown as Portfolio);
			});
	}, []);

	if (!portfolio) {
		return (
			<ThemeProvider>
				<div className="flex w-[100vw] h-[100vh]">
					<div className="m-auto">
						<Loader2 className="mr-2 h-[30px] w-[30px] animate-spin" />
					</div>
				</div>
			</ThemeProvider>
		);
	}

	return (
		<ThemeProvider>
			<div className="relative min-h-screen">
				<div className="grid pb-48">
					<header className="py-4">
						<div className="max-w-lg mx-auto w-full px-4 flex justify-between">
							<span className="opacity-40 my-auto flex">
								<Link href="/" className="mx-4 my-auto">
									<ChevronLeft className="h-4 w-4" />
								</Link>
								{portfolio.team_number}
							</span>
							<Link
								href={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolio.id}/${portfolio.file}`}
								target="_blank"
							>
								<Button variant={'outline'}>Open</Button>
							</Link>
						</div>
					</header>
					<div className="max-w-screen-xl mx-auto w-full px-4 px-0 md:px-4">
						<div className="relative block">
							<Image
								src={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolio.id}/${portfolio.thumbnail}`}
								className="relative w-full rounded-2xl"
								alt={`${portfolio.team_number} ${portfolio.team_name}'s Portfolio`}
								width={1280}
								height={720}
							/>
							<div className="ease pointer-events-none  rounded-2xl absolute inset-0 border border-black/10 transition duration-150 group-hover:bg-black/20"></div>
						</div>
					</div>

					<header className="py-8">
						<div className="max-w-lg mx-auto w-full px-4 grid justify-items-start gap-3">
							<div>
								<span className="opacity-40">{portfolio.region}</span>
								<span className="opacity-40"> — </span>
								<span className="opacity-40">
									{portfolio.award} {portfolio.award_ranking} at {portfolio.field}
								</span>
							</div>
							<h1 className="overflow-auto bg-gradient-to-r from-neutral-500 to-white  bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent">
								{portfolio.team_name}
							</h1>
							<p className="max-w-xs">{portfolio.description}</p>
						</div>
					</header>
					<div className="max-w-lg mx-auto w-full px-4">
						<div className="grid gap-1">
							<div className="grid grid-cols-2 gap-4">
								<h4 className="font-medium opacity-40">Information</h4>
								<ul className="grid list-none gap-1">
									<li>{portfolio.region}</li>
									<li>{portfolio.field}</li>
								</ul>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<h4 className="font-medium opacity-40">Type</h4>
								<ul className="grid list-none gap-1">
									<li>{portfolio.award}</li>
									<li>Ranked {portfolio.award_ranking}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}
