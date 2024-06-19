'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Loader2, PlusIcon} from 'lucide-react';
import Link from 'next/link';
import {useMe} from '@/hooks/use-user';
import {useTimer} from 'react-timer-hook';
import {useState} from 'react';
import {Card} from '@/components/ui/card';
import {Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Page() {
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
		<>
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
			<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<h1 className="text-2xl font-semibold">Welcome back, {user?.name}.</h1>
					<p className="opacity-70">You can manage your published documents here.</p>
					<div className="my-4 grid grid-cols-4 gap-4">
						<Dialog>
							<DialogTrigger>
								<Card className="w-[18rem] h-[24rem] flex hover:opacity-60 transition-all hover:scale-[0.95]">
									<PlusIcon className="w-[2rem] h-[2rem] text-primary m-auto" />
								</Card>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>New document</DialogTitle>
									<DialogDescription>
										Creating a new document is easy, just fill out the form below and click submit, then wait for approval.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Team Name
										</Label>
										<Input id="name" placeholder="Hivemind" className="col-span-3" />
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Team Number
										</Label>
										<Input id="name" placeholder='23396' className="col-span-3" />
									</div>
                                    <div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Team Name
										</Label>
										<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
									</div>
                                    <div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Team Name
										</Label>
										<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
									</div>
                                    <div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Team Name
										</Label>
										<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
									</div>
								</div>
								<DialogFooter>
									<Button type="submit">Save changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</>
	);
}
