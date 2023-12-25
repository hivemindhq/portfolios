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

export function AuthDialog() {
	const [open, setOpen] = useState(false);
	const [login, setLogin] = useState(true);
	const isDesktop = useMediaQuery('(min-width: 768px)');

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
						<DialogDescription>Login to favorite and submit portfolios!</DialogDescription>
					</DialogHeader>
					<RegisterForm />
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
					<DrawerTitle>Login</DrawerTitle>
					<DrawerDescription>Login to favorite and submit portfolios!</DrawerDescription>
				</DrawerHeader>
				<LoginForm className="px-4" />
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
		<form className={cn('grid items-start gap-4', className)}>
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
			<Button type="submit">Login</Button>
		</form>
	);
}
