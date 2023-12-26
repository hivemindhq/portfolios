import Link from 'next/link';
import Navbar from './navbar';
import {Button} from './ui/button';

export default function SiteNav() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<Navbar />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<Link href="/auth">
						<Button asChild variant={'outline'}>
							<span>Login</span>
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}
