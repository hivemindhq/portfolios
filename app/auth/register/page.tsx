'use client';

import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import {SiDiscord} from'@icons-pack/react-simple-icons'

export default function AuthPage() {
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
						<form className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="hey@hivemindrobotics.net" required />
							</div>
                            <div className="grid gap-2">
								<Label htmlFor="email">Preffered Name</Label>
								<Input id="email" type="text" placeholder="Polar" required />
							</div>
                            <div className="grid gap-2">
								<Label htmlFor="email">Team Number</Label>
								<Input id="email" type="text" placeholder="23396" required />
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input id="password" placeholder="********" type="password" required />
							</div>
							<Button type="submit" className="w-full">
								Sign up
							</Button>
                            <div>
                                <p className='text-xs text-center opacity-70'>By signing up you agree to our <Link href="/terms" className='underline'>Terms of Service</Link> and <Link href="/privacy" className='underline'>Privacy Policy</Link>.</p>
                            </div>
							<Separator/>
							<Button variant="default" className="w-full space-x-3 bg-indigo-500 hover:bg-indigo-400 text-white">
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
				<div className="hidden bg-red-500 lg:block">
				</div>
			</div>
		</>
	);
}
