/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type {Metadata} from 'next';
import {GeistSans} from 'geist/font/sans';
import './globals.css';
import {cn} from '@/lib/utils';
import {Toaster} from 'sonner';

export const metadata: Metadata = {
	title: 'Portfolios',
	description: 'Award-winning FIRST Tech Challenge Portfolios',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	const date = new Date().getFullYear();
	return (
		<html lang="en">
			<body className={cn('min-h-screen bg-background antialiased', GeistSans.className)}>
				<Toaster richColors />
				{children}
				<div className="max-w-screen-xl mx-auto w-full px-4 my-5">
					<div className="flex items-center justify-between">
						<a href="https://hivemindrobotics.net/">
							<div className="opacity-40 underline hover:opacity-60 transition">
								&copy; {date}, hivemind
							</div>
						</a>

						<img
							className="opacity-40"
							src="https://hits-app.vercel.app/hits?url=https://portfolios.hivemindrobotics.net"
						/>
					</div>
				</div>
			</body>
		</html>
	);
}
