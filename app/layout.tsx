import type {Metadata} from 'next';
import './globals.scss';
import {GeistSans} from 'geist/font/sans';
import {cn} from '@/lib/utils';
import {PHProvider} from '@/server/posthog';
import {Toaster} from '@/components/ui/sonner';
import Navbar from '@/components/navbar';
import SiteNav from '@/components/site-nav';
import {ThemeProvider} from '@/components/theme-provider';
import Footer from '@/components/footer';

export const metadata: Metadata = {
	title: 'Portfolios',
	description: 'A large collection of award-winning FRC and FTC documentation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background antialiased', GeistSans.className)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<PHProvider>
						<SiteNav />
						{children}
						<Toaster />
						<Footer />
					</PHProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
