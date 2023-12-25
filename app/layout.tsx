import type {Metadata} from 'next';
import './globals.scss';
import {GeistSans} from 'geist/font/sans';
import {cn} from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Portfolios',
	description: 'A large collection of award-winning FRC and FTC documentation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background antialiased', GeistSans.className)}>
				{children}
			</body>
		</html>
	);
}
