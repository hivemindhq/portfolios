import PortfolioCard from '@/components/PortfolioCard';
import {Button} from '@/components/ui/button';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {Portfolio} from '@/hooks/types/portfolios';
import {pb, sudo} from '@/lib/db/pocketbase';
import {Select, SelectItem, Tab, Tabs} from '@nextui-org/react';
import {Star} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {cache} from 'react';

export const getData = async () => {
	const portfolios = await pb.collection('portfolios').getFullList({
		sort: '@random',
		fields: 'id, team_name, region, team_number, award_ranking, award, field, file, thumbnail',
	});

	return portfolios as unknown as Portfolio[];
};

export default async function Home() {
	const portfolios: Portfolio[] = await getData();

	return (
		<>
			<main className="justify-items-center overflow-x-hidden border-b light:border-black/5 dark:border-white/5 pb-8 md:py-8">
				<header className="max-w-screen-xl mx-auto w-full px-4 grid items-end justify-items-center gap-4 md:grid-cols-2 md:justify-items-start">
					<div className="grid max-w-lg content-start justify-items-center gap-3.5 py-16 md:max-w-md md:justify-items-start md:py-0">
						<h1 className="overflow-auto bg-gradient-to-r from-neutral-500 to-white bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent">
							Portfolios
						</h1>
						<p className="text-2xl font-medium tracking-tight md:text-left text-center">
							Award-winning FIRST Tech Challenge Portfolios
						</p>
						<div className="flex space-x-4">
							<a href="https://github.com/hivemindhq/portfolios" target="_blank">
								<Button>
									<Star className="w-4 h-4 me-2" />
									Star the repository
								</Button>
							</a>
							<a
								href="https://github.com/hivemindhq/portfolios/issues/new?assignees=&labels=addition&projects=&template=add_portfolio.yml&title=Portfolios+%C2%BB+"
								target="_blank"
								className="hidden md:flex lg:flex"
							>
								<Button variant={'outline'}>Add yours in 5 minutes.</Button>
							</a>
						</div>
					</div>
					<div className="grid w-full gap-2">
						<div className="flex items-center justify-between">
							<p className="text-sm opacity-40">{portfolios[0].team_number}</p>
							<Link
								href={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolios[0].id}/${portfolios[0].file}`}
								target="_blank"
							>
								<Button variant={'outline'}>Open</Button>
							</Link>
						</div>
						<a className="group relative block" href={`/portfolios/${portfolios[0].id}`}>
							<Image
								src={`https://portfolioutility.pockethost.io/api/files/c11hpwzuzyy3nbm/${portfolios[0].id}/${portfolios[0].thumbnail}`}
								className="rounded-2xl relative w-full"
								alt={''}
								width={1280}
								height={720}
							/>
							<div className="ease  rounded-2xl pointer-events-none absolute inset-0 border border-black/5 transition duration-150 group-hover:bg-black/20"></div>
						</a>
						<h1 className="truncate font-medium">{portfolios[0].team_name}</h1>
					</div>
				</header>
			</main>
			<div className="overflow-x-hidden transition-all duration-300 ease-smooth">
				<div className="max-w-screen-xl mx-auto w-full px-4 my-5">
					<div className="w-full my-4 hidden md:flex lg:flex">
						<ToggleGroup type="single" disabled variant={'outline'}>
							<ToggleGroupItem value="inspire">Inspire</ToggleGroupItem>
							<ToggleGroupItem value="control">Control</ToggleGroupItem>
							<ToggleGroupItem value="motivate">Motivate</ToggleGroupItem>
							<ToggleGroupItem value="innovate">Innovate</ToggleGroupItem>
							<ToggleGroupItem value="design">Design</ToggleGroupItem>
							<ToggleGroupItem value="think">Think</ToggleGroupItem>
							<ToggleGroupItem value="worlds">Worlds</ToggleGroupItem>
							<ToggleGroupItem value="regional">Regional</ToggleGroupItem>
							<ToggleGroupItem value="qualifier">Qualifier</ToggleGroupItem>
						</ToggleGroup>
					</div>
					<div className="grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
						{/* @ts-ignore */}
						{portfolios.map((portfolio: Portfolio, key: number) => {
							if (portfolio.award != null) {
								// eslint-disable-next-line react/jsx-key
								return <PortfolioCard portfolio={portfolio} key={key} />;
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
}
