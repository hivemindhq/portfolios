'use client';

import Image from 'next/image';
import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import type AccountRegister from '@/pages/api/auth/register';
import {useMe} from '@/hooks/use-user';

import {SiDiscord} from '@icons-pack/react-simple-icons';
import {useState} from 'react';
import {fetcher} from '@/lib/fetcher';
import {InferAPIResponse} from 'nextkit';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

export default function AuthPage() {
	const {mutate} = useMe();
	const router = useRouter();

	return (
		<>
			<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
				<div className="flex items-center justify-center py-12">
					<div className="mx-auto grid w-[350px] gap-6">
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">Login</h1>
							<p className="text-balance text-muted-foreground">
								Login to manage your robotics portfolios.
							</p>
						</div>
						<form
							className="grid gap-4"
							onSubmit={async e => {
								e.preventDefault();

								const values = Object.fromEntries(
									new FormData(e.target as HTMLFormElement).entries(),
								);

								const promise = fetcher<InferAPIResponse<typeof AccountRegister, 'POST'>>(
									'/api/auth',
									{
										method: 'POST',
										headers: {'Content-Type': 'application/json'},
										body: JSON.stringify(values),
									},
								);

								const res = await toast
									.promise(promise, {
										success: 'Success!',
										loading: 'Logging you in...',
										error: (error: Error) => error?.message ?? 'Something went wrong!',
									})
									.catch(() => null);

								if (!res) {
									return;
								}

								await mutate(res.user);

								router.push('/');
							}}
						>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="hey@hivemindrobotics.net"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
										Forgot your password?
									</Link>
								</div>
								<Input
									id="password"
									name="password"
									placeholder="********"
									type="password"
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
							<Separator />
							<Button
								variant="default"
								className="w-full space-x-3 bg-indigo-500 hover:bg-indigo-400 text-white"
							>
								<SiDiscord />
								<p>Login with Discord</p>
							</Button>
						</form>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link href="/auth/register" className="underline">
								Sign up
							</Link>
						</div>
					</div>
				</div>
				<div className="hidden bg-red-500 lg:block"></div>
			</div>
		</>
	);
}
