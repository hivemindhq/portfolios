'use client';

import Link from 'next/link';
import Navbar from './navbar';
import {Button} from './ui/button';
import {ModeToggle} from './mode-toggle';
import {useMe} from '@/hooks/use-user';
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
} from './ui/dropdown-menu';
import {Bookmark, LogOutIcon, ShieldIcon, Star, User} from 'lucide-react';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import {fetcher} from '@/lib/fetcher';

export default function SiteNav() {
	const {data: user, mutate} = useMe();
	const router = useRouter();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<Navbar />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="">
						<ModeToggle />
					</div>
					{user != null ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									{user.profile_picture != null ? <AvatarImage src={user.profile_picture}></AvatarImage> : <></>}
									<AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Hi there, {user.name}!</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<Link href="/profile">
										<DropdownMenuItem>
											<User className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</DropdownMenuItem>
									</Link>
									<DropdownMenuItem>
										<Star className="mr-2 h-4 w-4" />
										<span>Favorites</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bookmark className="mr-2 h-4 w-4" />
										<span>Your Portfolios</span>
									</DropdownMenuItem>
									{user.site_admin ? (
										<DropdownMenuItem>
											<ShieldIcon className="mr-2 h-4 w-4" />
											<span>Admin Area</span>
										</DropdownMenuItem>
									) : (
										<></>
									)}
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={async () => {
										const promise = fetcher('/api/auth/logout');

										await toast.promise(promise, {
											loading: 'Logging out...',
											success: 'Logged out.',
											error: 'Error logging you out.',
										});

										await mutate(null);
										await router.push('/');
									}}
								>
									<LogOutIcon className="mr-2 h-4 w-4" />
									<span>Logout</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href="/auth">
							<Button asChild variant={'outline'}>
								<span>Login</span>
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
