'use client';

import AuthPreloader from '@/components/preloader';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Textarea} from '@/components/ui/textarea';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {getMyPortfolioById} from '@/hooks/use-portfolio';
import {useMe} from '@/hooks/use-user';
import {prisma} from '@/lib/util/db';
import {Portfolio} from '@prisma/client';
import {ChevronLeft, PlusCircle, Upload} from 'lucide-react';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog';
import Link from 'next/link';
import {fetcher} from '@/lib/fetcher';
import {InferAPIResponse} from 'nextkit';
import type Report from '@/pages/api/report';
import toast from 'react-hot-toast';

export default function Page({params: {slug}}: {params: {slug: number}}) {
	const {data: user} = useMe();
	const {data: portfolio} = getMyPortfolioById(slug);

	return (
		<>
			<AuthPreloader />
			{user ? (
				<>
					{portfolio ? (
						<>
							<main className="my-4 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
								<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
									<div className="flex items-center gap-4">
										<Link href="/dashboard">
											<Button variant="outline" size="icon" className="h-7 w-7">
												<ChevronLeft className="h-4 w-4" />
												<span className="sr-only">Back</span>
											</Button>
										</Link>
										<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
											{portfolio.portfolio.team_name} {portfolio.portfolio.season}{' '}
											{portfolio.portfolio.type}
										</h1>
										{portfolio.portfolio.approved ? (
											<Badge className="hidden md:block" variant="default">
												Approved
											</Badge>
										) : (
											<Badge className="hidden md:block" variant={'destructive'}>
												Awaiting Approval
											</Badge>
										)}
									</div>
									<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
										<div className="grid my-4 auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
											<Card x-chunk="dashboard-07-chunk-0">
												<CardHeader>
													<CardTitle>Request Details</CardTitle>
													<CardDescription>
														<div className="space-y-2 my-3">
															<p>
																Request details for this portfolio so that you can use it your
																outreach for future seasons,{' '}
																<b>this feature is currently in development</b>!
															</p>
															<p>
																We'll reach out to you with the email address you have attached to
																your account.
															</p>
														</div>
													</CardDescription>
												</CardHeader>
												<CardContent>
													<Button
														disabled
														// onClick={async e => {
														// 	e.preventDefault();

														// 	const data = {
														// 		content: `Dashboard Analytics/Data Request: ${portfolio.portfolio.team_name} ${portfolio.portfolio.team_number} ${portfolio.portfolio.season} ${portfolio.portfolio.type}`,
														// 	};

														// 	const promise = fetcher<InferAPIResponse<typeof Report, 'POST'>>(
														// 		'/api/report',
														// 		{
														// 			method: 'POST',
														// 			headers: {'Content-Type': 'application/json'},
														// 			body: JSON.stringify(data),
														// 		},
														// 	);

														// 	const res = await toast
														// 		.promise(promise, {
														// 			success: 'Success!',
														// 			loading: 'Creating a data request...',
														// 			error: (error: Error) =>
														// 				error?.message ?? 'Something went wrong!',
														// 		})
														// 		.catch(() => null);
														// }}
													>
														Request Data
													</Button>
												</CardContent>
											</Card>
										</div>
										<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
											<Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
												<CardContent>
													<div className="grid mt-5">
														<img
															alt="Product image"
															className="w-full rounded-md object-cover"
															height="300"
															src={
																portfolio.portfolio.s3_url_thumb
																	? portfolio.portfolio.s3_url_thumb
																	: ''
															}
														/>
													</div>
												</CardContent>
											</Card>
											<Card x-chunk="dashboard-07-chunk-5">
												<CardHeader>
													<CardTitle>Delete Document</CardTitle>
													<CardDescription>
														<p className="my-3">
															Clicking this button will request deletion of this document and all
															associated data.
														</p>
													</CardDescription>
												</CardHeader>
												<CardContent>
													<div></div>
													<Dialog>
														<DialogTrigger>
															<Button size="sm" variant="destructive">
																Delete Document
															</Button>
														</DialogTrigger>
														<DialogContent>
															<form
																className="my-4 space-y-4"
																onSubmit={async e => {
																	e.preventDefault();

																	const data = {
																		content: `Dashboard Deletion Request: ${portfolio.portfolio.team_name} ${portfolio.portfolio.team_number} ${portfolio.portfolio.season} ${portfolio.portfolio.type}`,
																	};

																	const promise = fetcher<InferAPIResponse<typeof Report, 'POST'>>(
																		'/api/report',
																		{
																			method: 'POST',
																			headers: {'Content-Type': 'application/json'},
																			body: JSON.stringify(data),
																		},
																	);

																	const res = await toast
																		.promise(promise, {
																			success: 'Success!',
																			loading: 'Creating a deletion request...',
																			error: (error: Error) =>
																				error?.message ?? 'Something went wrong!',
																		})
																		.catch(() => null);
																}}
															>
																<DialogHeader>
																	<DialogTitle>Are you sure?</DialogTitle>
																	<DialogDescription>
																		This action is irreversible.
																	</DialogDescription>
																</DialogHeader>
																<DialogFooter>
																	<DialogClose>
																		<Button type="submit" className="ms-auto">
																			Okay!
																		</Button>
																	</DialogClose>
																</DialogFooter>
															</form>
														</DialogContent>
													</Dialog>
												</CardContent>
											</Card>
										</div>
									</div>
								</div>
							</main>
						</>
					) : (
						<>
							<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
								<div className="m-auto text-center space-y-4 ">
									<h1 className="text-2xl font-semibold">400</h1>
									<p>
										<b>Bad Request</b>, did you really think it would be that easy?
									</p>
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<>
					<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
						<div className="m-auto text-center space-y-4 ">
							<h1 className="text-2xl font-semibold">400</h1>
							<p>
								<b>Bad Request</b>, did you really think it would be that easy?
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
}
