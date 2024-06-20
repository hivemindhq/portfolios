'use client'

import { useMe } from '@/hooks/use-user';
import {AnimatePresence, motion} from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook';

export default function AuthPreloader() {
	const {data: user, mutate} = useMe();
	const [load, setLoad] = useState(false);

	const time = new Date();
	time.setSeconds(time.getSeconds() + 5);

	const timer = useTimer({
		expiryTimestamp: time,
		onExpire: () => {
			setLoad(true);
		},
	});

	return (
		<AnimatePresence>
			{!user && (
				<motion.div
					className="w-[100vw] h-[100vh] absolute flex bg-secondary top-0 z-50"
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0, scale: 0.8}}
					transition={{
						ease: 'easeInOut',
					}}
				>
					<div className="m-auto space-y-4 text-center">
						<div className="flex">
							<Loader2 className="w-8 h-8 animate-spin mx-auto" />
						</div>

						<AnimatePresence>
							{load && (
								<motion.p
									initial={{
										y: -10,
										opacity: 0,
									}}
									animate={{
										y: 0,
										opacity: 1,
									}}
								>
									You&apos;ve been waiting a while, did you make sure you{' '}
									<Link
										href={'/auth'}
										className="cursor-pointer underline hover:opacity-70 transition-all"
									>
										Logged in
									</Link>
									?
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
