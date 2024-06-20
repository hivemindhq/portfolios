import type {Metadata} from 'next';
import './globals.scss';
import {GeistSans} from 'geist/font/sans';
import {cn} from '@/lib/utils';
<<<<<<< HEAD
import {PHProvider} from '@/server/posthog';
import Navbar from '@/components/navbar';
import SiteNav from '@/components/site-nav';
import {Toaster} from 'react-hot-toast'
import {ThemeProvider} from '@/components/theme-provider';
import Footer from '@/components/footer';

import localFont from 'next/font/local';
import { Outfit } from 'next/font/google'
=======
import {Toaster} from 'sonner';
import {GithubIcon} from 'lucide-react';
import {ThemeProvider} from '@/components/ThemeProvider';
import {ModeToggle} from '@/components/ModeSelector';
import Link from 'next/link';
import Script from 'next/script';
import PlausibleProvider from 'next-plausible';
>>>>>>> main

export const metadata: Metadata = {
	title: 'Portfolios',
	description: 'A large collection of award-winning FRC and FTC documentation',
};

const fontSans = Outfit({
	subsets: ["latin"],
})


export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
<<<<<<< HEAD
			<body className={cn('min-h-screen bg-background antialiased', fontSans.className)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<PHProvider>
						<SiteNav />
						{children}
						<Toaster />
						<Footer />
					</PHProvider>
				</ThemeProvider>
			</body>
=======
			<head>
				<PlausibleProvider
					domain="portfolios.hivemindrobotics.net"
					scriptProps={{
						src: 'https://lab.itzpolar.me/js/script.js',
					}}
					selfHosted
				/>
			</head>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<body className={cn('min-h-screen bg-background antialiased', GeistSans.className)}>
					<Toaster richColors />
					{children}
					<div className="max-w-screen-xl mx-auto w-full px-4 my-5">
						<div className="flex items-center justify-between">
							<Link href="https://hivemindrobotics.net/" target="_blank">
								<div className="opacity-40 underline hover:opacity-60 transition">
									&copy; 2023, hivemind
								</div>
							</Link>

							<div className="flex">
								<div className="ms-auto flex">
									<Link
										className="opacity-40 transition hover:opacity-60"
										href="https://github.com/hivemindhq/portfolios"
										target="_blank"
										aria-label="Github"
									>
										<GithubIcon className="w-5 h-5" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</body>
			</ThemeProvider>
>>>>>>> main
		</html>
	);
}
