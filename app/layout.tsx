import type {Metadata} from 'next';
import './globals.scss';
import {GeistSans} from 'geist/font/sans';
import {cn} from '@/lib/utils';
import {PHProvider} from '@/server/posthog';
import PlausibleProvider from 'next-plausible';
import {Toaster} from 'react-hot-toast';
import {ThemeProvider} from '@/components/theme-provider';
import {Footer} from '@/components/footer';

import localFont from 'next/font/local';
import {Manrope} from 'next/font/google';
import {SiteNav} from '@/components/navbar';

export const metadata: Metadata = {
	title: 'Portfolios',
	description: 'A large collection of award-winning FRC and FTC documentation',
};

const fontSans = Manrope({
	subsets: ['latin'],
});

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<PlausibleProvider
					domain="portfolios.hivemindrobotics.net"
					scriptProps={{
						src: 'https://lab.itzpolar.me/js/script.js',
					}}
					selfHosted
				/>
			</head>
			<body className={cn('min-h-screen bg-background antialiased', fontSans.className)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<SiteNav />
					{children}
					<Toaster />
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
