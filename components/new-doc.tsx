import {PlusIcon} from 'lucide-react';
import {Card} from './ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import {Button} from './ui/button';
import Link from 'next/link';

export default function NewDocument() {
	return (
		<Dialog>
			<DialogTrigger>
				<Card className="lg:w-[18rem] lg:h-[24rem] md:w-[9rem] md:h-[12rem] w-[9rem] h-[12rem] flex hover:opacity-60 transition-all hover:scale-[0.95]">
					<PlusIcon className="w-[2rem] h-[2rem] text-primary m-auto" />
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>You&apos;re about to be redirected.</DialogTitle>
					<DialogDescription>
						Creating a new document will redirect you to a seperate flow.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose>
						<Link href="/dashboard/flows/new">
							<Button type="submit">Okay</Button>
						</Link>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
