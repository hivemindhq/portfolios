'use client';

import Image from 'next/image';
import {Button} from './ui/button';
import Link from 'next/link';
import {useState} from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from './ui/sheet';
import {AlignCenter, AlignCenterIcon, GalleryVerticalEnd, ListIcon} from 'lucide-react';
import {usePathname} from 'next/navigation';
import toast from 'react-hot-toast';

export default function MobileNavbar() {
	const linkClass = 'text-white/50 hover:text-white transition-all';
	const pathname = usePathname();

	const [open, setOpen] = useState(false);

	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Button className="w-10 h-10 px-0 rounded-full">
						<ListIcon className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-[400px] sm:w-[540px] p-0">
					<SheetHeader>
						<div className="p-10 flex justify-center">
							<Link href="/" className="flex space-x-3" onClick={() => setOpen(false)}>
								<GalleryVerticalEnd className="w-6 h-6" />
								<span className="font-bold inline-block">Portfolios</span>
							</Link>
						</div>
					</SheetHeader>
					<div className="container mx-auto space-y-4">
						<div onClick={() => setOpen(false)}>
							<NavMobileItem name="FTC" href="/ftc" selected={pathname === '/ftc'} />
						</div>
						<div
							onClick={() => {
								setOpen(false);
								toast.error('Sorry, this page is not available yet.');
							}}
						>
							<NavMobileItem name="FRC" href="" selected={pathname === '/frc'} />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}

type NavItemProps = {
	name: string;
	href: string;
	selected: boolean;
};
function NavMobileItem({name, href, selected}: NavItemProps) {
	return (
		<Link href={href}>
			<div
				className={`px-4 py-1 rounded-full font-medium ${
					selected ? 'font-bold bg-zinc-800 text-white' : ''
				}`}
			>
				{name}
			</div>
		</Link>
	);
}
