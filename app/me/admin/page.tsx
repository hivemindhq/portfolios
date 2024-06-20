'use client';

import AuthPreloader from '@/components/preloader';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {getUnapprovedPortfolios, getUnverifiedUsers} from '@/hooks/use-admin';
import {useMe} from '@/hooks/use-user';
import {fetcher} from '@/lib/fetcher';

import type VerifyUser from '@/pages/api/admin/users/approve/[id]';

import type VerifyDocument from '@/pages/api/admin/portfolios/approve';
import type DeleteDocument from '@/pages/api/admin/portfolios/approve';

import {Download, DownloadCloud, X} from 'lucide-react';
import Link from 'next/link';
import {InferAPIResponse} from 'nextkit';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
	const {data: user, mutate} = useMe();
	const {data: unapprovedPortfolios} = getUnapprovedPortfolios();
	const {data: unverifiedUsers} = getUnverifiedUsers();

	return (
		<>
			<AuthPreloader />
			{user?.site_admin ? (
				<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
					<h1 className="text-2xl font-semibold">Unverified Users</h1>
					<div className="grid grid-cols-4 gap-4">
						{unverifiedUsers?.map(u => (
							<Card key={u.id}>
								<CardHeader>
									<Avatar>
										{u.profile_picture != null ? (
											<AvatarImage src={u.profile_picture}></AvatarImage>
										) : (
											<></>
										)}
										<AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
									</Avatar>
								</CardHeader>
								<CardContent>
									<ul>
										<li>Name: {u.name}</li>
										<li>Email: {u.email}</li>
										<li>Team: {u.team}</li>
										<li>ID: {u.id}</li>
									</ul>
								</CardContent>
								<CardFooter>
									<Button
										onClick={async e => {
											e.preventDefault();

											const promise = fetcher<InferAPIResponse<typeof VerifyUser, 'GET'>>(
												`/api/admin/users/approve/${u.id}`,
												{
													method: 'GET',
													headers: {'Content-Type': 'application/json'},
												},
											);

											const res = await toast
												.promise(promise, {
													success: `${u.name} has been verified.`,
													loading: 'Verifying...',
													error: (error: Error) => error?.message ?? 'Something went wrong!',
												})
												.catch(() => null);
											if (!res) {
												return;
											}
										}}
									>
										Approve
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
					<h1 className="text-2xl font-semibold">Unapproved Portfolios</h1>
					<div className="grid grid-cols-3 gap-4">
						{unapprovedPortfolios?.map(portfolio => (
							<Card key={portfolio.id}>
								<CardHeader>
									<CardTitle>
										{portfolio.team_name} {portfolio.team_number}
									</CardTitle>
									<CardDescription>
										{portfolio.season} {portfolio.type}
									</CardDescription>
								</CardHeader>
								<CardFooter className="space-x-2">
									<Dialog>
										<DialogTrigger>
											<Button>Approve</Button>
										</DialogTrigger>
										<DialogContent>
											<form
												onSubmit={async e => {
													e.preventDefault();

													const values = Object.fromEntries(
														new FormData(e.target as HTMLFormElement).entries(),
													);

													const promise = fetcher<InferAPIResponse<typeof VerifyDocument, 'POST'>>(
														'/api/admin/portfolios/approve',
														{
															method: 'POST',
															headers: {'Content-Type': 'application/json'},
															body: JSON.stringify(values),
														},
													);

													const res = await toast
														.promise(promise, {
															success: 'Verified!',
															loading: 'Verifying document...',
															error: (error: Error) => error?.message ?? 'Something went wrong!',
														})
														.catch(() => null);

													if (!res) return;
												}}
											>
												<DialogHeader>
													<DialogTitle>You need to provide some information first.</DialogTitle>
													<DialogDescription>
														Please provide CDN URLs for this document.
													</DialogDescription>
												</DialogHeader>
												<div className="my-4">
													<Label htmlFor="id">Document ID</Label>
													<Input name="id" id="id" value={portfolio.id} />

													<Label htmlFor="s3_url">S3 Document URL</Label>
													<Input
														name="s3_url"
														id="s3_url"
														placeholder="https://cdn.hivemindrobotics.net/portfolios/..."
													/>

													<Label htmlFor="s3_thumbnail">S3 Thumbnail URL</Label>
													<Input
														name="s3_thumbnail"
														id="s3_thumbnail"
														placeholder="https://cdn.hivemindrobotics.net/thumbnails/..."
													/>
												</div>
												<DialogFooter>
													<Button type="submit">Okay</Button>
												</DialogFooter>
											</form>
										</DialogContent>
									</Dialog>
									<Link href={portfolio.download_url ? portfolio.download_url : '#'}>
										<Button variant={'outline'}>
											<Download className="w-4 h-4 mr-4" /> Download
										</Button>
									</Link>
									<Button
										onClick={async e => {
											e.preventDefault();

											const promise = fetcher<InferAPIResponse<typeof DeleteDocument, 'POST'>>(
												`/api/admin/portfolios/delete/${portfolio.id}`,
												{
													method: 'GET',
													headers: {'Content-Type': 'application/json'},
												},
											);

											const res = await toast
												.promise(promise, {
													success: 'Deleted!',
													loading: 'Deleting document...',
													error: (error: Error) => error?.message ?? 'Something went wrong!',
												})
												.catch(() => null);

											if (!res) return;
										}}
										variant={'destructive'}
									>
										<X className="w-4 h-4 mr-4" /> Reject
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			) : (
				<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
					<div className="m-auto text-center space-y-4 ">
						<h1 className="text-2xl font-semibold">403</h1>
						<p>
							<b>Forbidden</b>, did you really think it would be that easy?
						</p>
					</div>
				</div>
			)}
		</>
	);
}
