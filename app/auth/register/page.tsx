'use client';

import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import {SiDiscord} from'@icons-pack/react-simple-icons'
import { fetcher } from '@/lib/fetcher';
import type AccountRegister from '@/pages/api/auth/register'
import { InferAPIResponse } from 'nextkit';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useMe } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const router = useRouter();
	const { data: user, mutate } = useMe();

	useEffect(() => {
		if (user != null) {
			router.push('/profile')
		}
	}, [user])

	return (
		<>
			<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
				<div className="flex items-center justify-center py-12">
					<div className="mx-auto grid w-[350px] gap-6">
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">Register</h1>
							<p className="text-balance text-muted-foreground">
								Get ready to get access to lots of resources.
							</p>
						</div>
						<form 
							className="grid gap-4"
							onSubmit={async (e) => {
								e.preventDefault();

								const values = Object.fromEntries(
									new FormData(e.target as HTMLFormElement).entries()
								);

								const promise = fetcher<
									InferAPIResponse<typeof AccountRegister, "POST">
								>("/api/auth/register", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify(values),
								})

								const res = await toast
									.promise(promise, {
									success: "Success!",
									loading: "Creating your account...",
									error: (error: Error) =>
										error?.message ?? "Something went wrong!",
									})
									.catch(() => null);

								if (!res) return;

								mutate(res.user);
								setSubmitted(true);
								router.push('/');
							}}	
						>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input name="email" id="email" type="email" placeholder="hey@hivemindrobotics.net" required />
							</div>
                            <div className="grid gap-2">
								<Label htmlFor="email">Perferred Name</Label>
								<Input name="name" id="name" type="text" placeholder="Polar" required />
							</div>
                            <div className="grid gap-2">
								<Label htmlFor="email">Team Number</Label>
								<Input id="team" name="team" type="text" placeholder="23396" required />
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input id="password" name="password" placeholder="********" type="password" required />
							</div>
							<Button type="submit" disabled={loading} className="w-full">
								{ loading ? (
									<span><Loader2 className="h-4 w-4 animate-spin" /></span>
								) : (
									<span>Sign up</span>
								)}
							</Button>
                            <div>
                                <p className='text-xs text-center opacity-70'>By signing up you agree to our <Link href="/terms" className='underline'>Terms of Service</Link> and <Link href="/privacy" className='underline'>Privacy Policy</Link>.</p>
                            </div>
							<Separator/>
							<Button disabled variant="default" className="w-full space-x-3 bg-indigo-500 hover:bg-indigo-400 text-white">
								<SiDiscord/><p>Login with Discord</p>
							</Button>
						</form>
						<div className="mt-4 text-center text-sm">
							Already have an account?{' '}
							<Link href="/auth" className="underline">
								Login
							</Link>
						</div>
					</div>
				</div>
				<div className="hidden bg-zinc-900 lg:flex">
					<img src="https://cdn.hivemindrobotics.net/intothedeep.gif" className='h-[15rem] m-auto'></img>
				</div>
			</div>
		</>
	);
}
