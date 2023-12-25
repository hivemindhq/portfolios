'use client';

import {cn} from '@/lib/utils';
import {useMediaQuery} from '@/hooks/use-media-query';
import {Button} from './ui/button';
import {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger} from './ui/dialog';
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

export function AuthDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Open :3</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Login</DialogTitle>
						<DialogDescription>Login to favorite and submit portfolios!</DialogDescription>
					</DialogHeader>
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
				<DrawerHeader>
					<DrawerTitle>Login</DrawerTitle>
					<DrawerDescription>Login to favorite and submit portfolios!</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
