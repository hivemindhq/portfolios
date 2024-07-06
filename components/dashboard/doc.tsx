import {Loader2, PlusIcon} from 'lucide-react';
import {Card} from '../ui/card';
import Link from 'next/link';

export default function DashboardDocument(props: {
	id: string;
	title: string;
	season: string;
	s3_thumb: string | null;
	approved: boolean;
}) {
	return (
		<Card className="lg:w-[18rem] bg-secondary lg:h-[24rem] w-[9rem] overflow-hidden h-[12rem] flex hover:opacity-60 transition-all hover:scale-[0.95]">
			<div className="flex grow items-center justify-center">
				{props.s3_thumb != null ? (
					<img
						alt="Portfolio Thumbnail"
						src={props.s3_thumb}
						className="rotate-[-5deg] rounded-2xl shadow"
					/>
				) : (
					<div className="grow text-center">
						<Loader2 className="animate-spin mx-auto"></Loader2>
						<p className="mx-auto my-4 opacity-70">
							<em>No thumbnail yet...</em>
						</p>
						<div className="mt-8">
							{props.approved ? (
								<></>
							) : (
								<p className="text-xs p-4">{props.title} has not yet been approved.</p>
							)}
						</div>
					</div>
				)}
			</div>
		</Card>
	);
}
