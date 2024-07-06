'use client';

import {useMe} from '@/hooks/use-user';
import {cn} from '@/lib/utils';
import {GalleryVerticalEnd} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function Navbar() {
	const pathname = usePathname();

	return (
		<div className="mr-4 hidden md:flex">
			<Link className="mr-6 flex items-center space-x-2" href="/">
				<GalleryVerticalEnd className="w-6 h-6" />
				<span className="hidden font-bold sm:inline-block">Portfolios</span>
			</Link>
			<nav className="flex items-center gap-6 text-sm">
				<Link
					href="/ftc"
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname === '/ftc' ? 'text-foreground' : 'text-foreground/60',
					)}
				>
					FTC
				</Link>
				<span className={cn('text-foreground/30 cursor-not-allowed')}>FRC</span>
			</nav>
		</div>
	);
}
