'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Loader2} from 'lucide-react';
import Link from 'next/link';
import {useMe} from '@/hooks/use-user';
import {useTimer} from 'react-timer-hook';
import {useState} from 'react';
import NewDocument from '@/components/new-doc';
import AuthPreloader from '@/components/preloader';

export default function Page() {
	const {data: user, mutate} = useMe();

	return (
		<>
			<AuthPreloader/>
			<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<h1 className="text-2xl font-semibold">Welcome back, {user?.name}.</h1>
					<p className="opacity-70">You can manage your published documents here.</p>
					<div className="my-4 grid grid-cols-4 gap-4">
						<NewDocument/>
					</div>
				</div>
			</div>
		</>
	);
}
