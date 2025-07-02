'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo-large.svg';
import {
	IconBrandFacebook,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandTwitter,
	IconBrandYoutube,
} from '@tabler/icons-react';
import {Heart} from 'lucide-react';

export function Footer() {
	return (
		<footer>
			<div className="mx-auto w-full max-w-screen-xl xl:pb-2">
				<div className="gap-4 p-4 px-8 py-16 sm:pb-16 md:flex md:justify-between">
					<div className="mb-12 flex flex-col gap-4">
						<Link href="https://hivemindrobotics.net" target="_blank">
							<Image src={Logo} alt="hivemind logo" height={128} width={128} className="my-auto" />
						</Link>

						<p className="flex items-center gap-2 space-x-4 font-light opacity-70 hover:opacity-100">
							Made with <Heart className="h-4 w-4 fill-red-500 stroke-red-500" /> by Hivemind
							Robotics in Spring Hill, TN.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
						<div>
							<h2 className="mb-4 text-lg font-semibold">Resources</h2>
							<ul className="grid gap-2">
								<li>
									<Link
										href="https://hivemindrobotics.net/resources"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										All Resources
									</Link>
								</li>
								<li>
									<Link
										href="https://a.mcr.club"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										Worlds Advancement Site
									</Link>
								</li>
								<li>
									<Link
										href="https://portfolios.hivemindrobotics.net"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										Portfolios
									</Link>
								</li>
								<li>
									<Link
										href="https://go.hivemindrobotics.net/cad"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										Center Stage Robot CAD
									</Link>
								</li>
								<li>
									<Link
										href="https://hivemindrobotics.net/fabworks-discount"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										Fabworks Discount Code
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-4 text-lg font-semibold">Community</h2>
							<ul className="grid gap-2">
								<li>
									<Link
										href="https://discord.gg/ftc"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										FTC Discord
									</Link>
								</li>
								<li>
									<Link
										href="https://github.com/hivemindhq"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										GitHub
									</Link>
								</li>
								<li>
									<Link
										href="https://hivemindrobotics.net/#contact"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										Contact Form
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
							<ul className="grid gap-2">
								<li>
									<Link
										href="https://hivemindrobotics.net/branding"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										Branding Guidelines
									</Link>
								</li>
								<li>
									<Link
										href="https://ftcscout.org/teams/23396"
										target="_blank"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										FTCScout Profile
									</Link>
								</li>
								<li>
									<Link
										href="https://hivemindrobotics.net/blog"
										className="cursor-pointer text-sm font-[450] font-light text-zinc-400 duration-200 hover:text-zinc-200"
									>
										Blog
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2 rounded-md border-neutral-700/20 px-8 py-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
					<div className="flex space-x-5 opacity-70 sm:mt-0 sm:justify-center">
						<Link href="https://www.facebook.com/hivemindrobotics" target="_blank">
							<IconBrandFacebook />
						</Link>
						<Link href="https://x.com/hivemindftc" target="_blank">
							<IconBrandTwitter />
						</Link>
						<Link href="https://github.com/hivemindhq" target="_blank">
							<IconBrandGithub />
						</Link>
						<Link href="https://www.instagram.com/ftc23396/" target="_blank">
							<IconBrandInstagram />
						</Link>
						<Link href="https://www.youtube.com/@ftc23396" target="_blank">
							<IconBrandYoutube />
						</Link>
						<Link href="https://www.linkedin.com/company/hivemindrobotics" target="_blank">
							<IconBrandLinkedin />
						</Link>
					</div>
					<span className="text-sm text-zinc-500 sm:text-center">
						&copy; {new Date().getFullYear()} Hivemind Robotics &bull; All rights reserved.
					</span>
				</div>
			</div>
		</footer>
	);
}
