import Link from 'next/link';
import {Separator} from './ui/separator';

export default function Announcement() {
	return (
		<Link
			href=""
			className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
		>
			🎉 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
			<span className="sm:hidden">Completely rewritten, welcome to V2.</span>
			<span className="hidden sm:inline">New UI, new features, new everything. Welcome to V2.</span>
		</Link>
	);
}
