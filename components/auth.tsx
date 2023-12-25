'use client';

import {cn} from '@/lib/utils';
import {useMediaQuery} from '@/hooks/use-media-query';
import {Button} from './ui/button';
import {useState} from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from './ui/dialog';
import {DialogTitle} from '@radix-ui/react-dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from './ui/drawer';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {fetcher} from '@/lib/fetcher';
import {InferAPIResponse} from 'nextkit';
import type AccountRegister from '@/pages/api/auth/register';
import {useMe} from '@/hooks/use-user';
import {useRouter} from 'next/navigation';

export function AuthDialog() {
	const [open, setOpen] = useState(false);
	const [login, setLogin] = useState(true);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	const router = useRouter();
	const {mutate} = useMe();

	const toggleMode = () => {
		setLogin(old => !old);
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Open :3</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{login ? 'Login' : 'Register'}</DialogTitle>
						<DialogDescription>
							{login ? 'Login' : 'Register'} to favorite and submit portfolios!
						</DialogDescription>
					</DialogHeader>
					{login ? <LoginForm /> : <RegisterForm />}
					<p className="text-xs text-center opacity-70">
						You&apos;re currently {login ? 'logging in' : 'making a new account'}, if you would like
						to {login ? 'register' : 'login'},{' '}
						<a onClick={toggleMode} className="cursor-pointer underline font-semibold">
							click here
						</a>
						!
					</p>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Open :3</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{login ? 'Login' : 'Register'}</DrawerTitle>
					<DrawerDescription>
						{login ? 'Login' : 'Register'} to favorite and submit portfolios!
					</DrawerDescription>
				</DrawerHeader>
				{login ? <LoginForm className="px-4" /> : <RegisterForm className="px-4" />}
				<p className="text-xs text-center opacity-70 my-4">
					You&apos;re currently {login ? 'logging in' : 'making a new account'}, if you would like
					to {login ? 'register' : 'login'},{' '}
					<a onClick={toggleMode} className="cursor-pointer underline font-semibold">
						click here
					</a>
					!
				</p>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function LoginForm({className}: React.ComponentProps<'form'>) {
	return (
		<form className={cn('grid items-start gap-4')} onSubmit={async event => {}}>
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" placeholder="io@itspolar.dev" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" placeholder="Password" />
			</div>
			<Button type="submit">Login</Button>
		</form>
	);
}

function RegisterForm({className}: React.ComponentProps<'form'>) {
	return (
		<form className={cn('grid items-start gap-4', className)}>
			<div className="grid grid-cols-2 gap-4">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input type="email" id="email" placeholder="io@itspolar.dev" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="name">Name</Label>
					<Input type="text" id="name" placeholder="Hivemind" />
				</div>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" placeholder="Password" />
			</div>
			<Button type="submit">Register</Button>
		</form>
	);
}
