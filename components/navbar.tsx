'use client';
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarLogo,
	NavbarButton,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from '@/components/ui/nav';
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
import {useState, type ReactNode} from 'react';
import {Button} from './ui/button';
import Link from 'next/link';
import {useMe} from '@/hooks/use-user';
import {IconBookmark, IconLogout, IconShield, IconStar, IconUser} from '@tabler/icons-react';
import {fetcher} from '@/lib/fetcher';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

export function SiteNav() {
	const navItems = [
		{
			name: 'Collection',
			link: '/ftc',
		},
		// {
		// 	name: 'Leaderboards',
		// 	link: '/leaderboard',
		// },
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const {data: user, mutate} = useMe();
	const router = useRouter();

	return (
		<Navbar>
			<NavBody>
				<NavbarLogo />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					{user != null ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									{user.profile_picture != null ? (
										<AvatarImage src={user.profile_picture}></AvatarImage>
									) : (
										<></>
									)}
									<AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Hi there, {user.name}!</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<Link href="/profile">
										<DropdownMenuItem>
											<IconUser className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</DropdownMenuItem>
									</Link>
									<Link href="/favorites">
										<DropdownMenuItem>
											<IconStar className="mr-2 h-4 w-4" />
											<span>Favorites</span>
										</DropdownMenuItem>
									</Link>
									<Link href="/dashboard">
										<DropdownMenuItem>
											<IconBookmark className="mr-2 h-4 w-4" />
											<span>Your Documents</span>
										</DropdownMenuItem>
									</Link>
									{user.site_admin ? (
										<Link href="/me/admin">
											<DropdownMenuItem>
												<IconShield className="mr-2 h-4 w-4" />
												<span>Admin Area</span>
											</DropdownMenuItem>
										</Link>
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
									<IconLogout className="mr-2 h-4 w-4" />
									<span>Logout</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<NavbarButton
							onClick={() => setIsMobileMenuOpen(false)}
							variant="primary"
							className="w-full rounded-full"
							href="/auth"
						>
							Login
						</NavbarButton>
					)}
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<MobileNavToggle
						isOpen={isMobileMenuOpen}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					/>
				</MobileNavHeader>

				<MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
					{navItems.map((item, idx) => (
						<a
							key={`mobile-link-${idx}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-neutral-600 dark:text-neutral-300"
						>
							<span className="block">{item.name}</span>
						</a>
					))}
					<div className="flex w-full flex-col gap-4">
						{user != null ? (
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										{user.profile_picture != null ? (
											<AvatarImage src={user.profile_picture}></AvatarImage>
										) : (
											<></>
										)}
										<AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>Hi there, {user.name}!</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<Link href="/profile">
											<DropdownMenuItem>
												<IconUser className="mr-2 h-4 w-4" />
												<span>Profile</span>
											</DropdownMenuItem>
										</Link>
										<Link href="/favorites">
											<DropdownMenuItem>
												<IconStar className="mr-2 h-4 w-4" />
												<span>Favorites</span>
											</DropdownMenuItem>
										</Link>
										<Link href="/dashboard">
											<DropdownMenuItem>
												<IconBookmark className="mr-2 h-4 w-4" />
												<span>Your Documents</span>
											</DropdownMenuItem>
										</Link>
										{user.site_admin ? (
											<Link href="/me/admin">
												<DropdownMenuItem>
													<IconShield className="mr-2 h-4 w-4" />
													<span>Admin Area</span>
												</DropdownMenuItem>
											</Link>
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
										<IconLogout className="mr-2 h-4 w-4" />
										<span>Logout</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<NavbarButton
								onClick={() => setIsMobileMenuOpen(false)}
								variant="primary"
								className="w-full rounded-full"
								href="/auth"
							>
								Login
							</NavbarButton>
						)}
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
}
