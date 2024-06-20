'use client';

import {useMe} from '@/hooks/use-user';
import {UploadThingDropzone} from '@/lib/uploadthing';
import toast from 'react-hot-toast';
import {useTimer} from 'react-timer-hook';
import {AnimatePresence, motion} from 'framer-motion';
import {useState} from 'react';
import {Loader2} from 'lucide-react';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

import type NameRequest from '@/pages/api/users/name'
import { InferAPIResponse } from 'nextkit';
import { fetcher } from '@/lib/fetcher';
import AuthPreloader from '@/components/preloader';

export default function UserSettingsPage() {
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
			<AuthPreloader/>
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<h1 className="text-3xl font-semibold">Settings</h1>
				</div>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
						<Link href="/profile" className="font-semibold text-primary">
							General
						</Link>
						<Link href="/profile/privacy">Privacy</Link>
					</nav>
					<div className="grid gap-6">
						{user?.verified ? (
							<></>
						) : (
							<Alert variant={'destructive'}>
								<AlertTitle>Notice!</AlertTitle>
								<AlertDescription>
									Your account is not yet verified, some settings have been restricted.
								</AlertDescription>
							</Alert>
						)}
						<Card>
							<CardHeader>
								<CardTitle>Profile Picture</CardTitle>
								<CardDescription>Select your profile picture.</CardDescription>
							</CardHeader>
							<CardContent>
								<UploadThingDropzone
									endpoint="imageUploader"
									className="ut-button:bg-primary ut-button:text-secondary ut-label:text-primary"
									onClientUploadComplete={res => {
										toast.success('Upload complete!');
									}}
									onUploadError={(error: Error) => {
										toast.error(error.message);
									}}
								/>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Perferred Name</CardTitle>
								<CardDescription>Select your preffered name.</CardDescription>
							</CardHeader>
							<form
								onSubmit={async (e) => {
									e.preventDefault();

									const values = Object.fromEntries(
										new FormData(e.target as HTMLFormElement).entries(),
									);

									const promise = fetcher<InferAPIResponse<typeof NameRequest, 'POST'>>(
										'/api/users/name',
										{
											method: 'POST',
											headers: {'Content-Type': 'application/json'},
											body: JSON.stringify(values),
										},
									);

									const res = await toast
									.promise(promise, {
										success: 'Success!',
										loading: 'Changing your name...',
										error: (error: Error) => error?.message ?? 'Something went wrong!',
									})
									.catch(() => null);
									
									if (!res) {
										return;
									}

									await mutate(res.user);
								}}
							>
								<CardContent>
									<Input type="text" required id="name" name="name" placeholder={user?.name} />
								</CardContent>
								<CardFooter>
									<Button type="submit">Save</Button>
								</CardFooter>
							</form>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
