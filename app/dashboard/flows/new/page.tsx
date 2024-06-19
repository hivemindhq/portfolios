'use client';

import AuthPreloader from '@/components/preloader';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Progress} from '@/components/ui/progress';
import {fetcher} from '@/lib/fetcher';
import {InferAPIResponse} from 'nextkit';
import {useState} from 'react';

import type AddDocument from '@/pages/api/dashboard/add';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import {useMe} from '@/hooks/use-user';

export default function NewDocFlow() {
	const {data: user} = useMe();
	const [percent, setPercent] = useState(1);
	const [slide, setSlide] = useState(1);
	const [formData, setFormData] = useState({
		teamName: '',
		teamNumber: '',
		teamProgram: '',
		type: '',
		season: '',
		downloadLink: '',
		award: '',
		awardRanking: '',
		division: '',
		state: '',
	});
	const router = useRouter();

	const handleNext = () => {
		setSlide(slide + 1);
		setPercent(percent + 100 / 3);
	};

	// @ts-ignore
	const handleChange = e => {
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// @ts-ignore
	const handleSubmit = async e => {
		e.preventDefault();

		const promise = fetcher<InferAPIResponse<typeof AddDocument, 'POST'>>('/api/dashboard/add', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(formData),
		});

		const res = await toast
			.promise(promise, {
				success: 'Success!',
				loading: 'Submitting...',
				error: (error: Error) => error?.message ?? 'Something went wrong!',
			})
			.catch(() => null);

		if (!res) {
			return;
		}

		router.push('/dashboard');
	};

	return (
		<>
			<AuthPreloader />
			<div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				{user?.verified ? (
					<>
						<div className="mx-auto grid w-full max-w-6xl gap-2">
							<div className="mx-[8rem]">
								<Progress value={percent} max={100} />
								{slide === 1 && (
									<div className="py-[1.5rem] text-center">
										<h1 className="text-2xl font-semibold">Program</h1>
										<p className="opacity-70 py-4">
											We need to know some more information about the team you're submitting
											documents for.
										</p>
										<div className="flex flex-col gap-4">
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">Team Name</label>
												<Input
													type="text"
													name="teamName"
													value={formData.teamName}
													onChange={handleChange}
													placeholder="Hivemind"
													required
													className="w-full"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">Team Number</label>
												<Input
													type="text"
													name="teamNumber"
													value={formData.teamNumber}
													onChange={handleChange}
													placeholder="23396"
													required
													className="w-full"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">Team Program</label>
												<Input
													type="text"
													name="teamProgram"
													value={formData.teamProgram}
													onChange={handleChange}
													placeholder="FTC"
													required
													className="w-full"
												/>
											</div>
											<Button onClick={handleNext}>Next</Button>
										</div>
									</div>
								)}
								{slide === 2 && (
									<div className="py-[1.5rem] text-center">
										<h1 className="text-2xl font-semibold">Document Details</h1>
										<p className="opacity-70 py-4">Please provide the details of the document.</p>
										<div className="flex flex-col gap-4">
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">What is this document?</label>
												<Input
													type="text"
													name="type"
													value={formData.type}
													onChange={handleChange}
													placeholder="Engineering Portfolio"
													required
													className="w-full"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">
													What season was this used for?
												</label>
												<Input
													type="text"
													name="season"
													value={formData.season}
													onChange={handleChange}
													placeholder="Centerstage"
													required
													className="w-full"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">
													Give a download link to the document
												</label>
												<Input
													type="text"
													name="downloadLink"
													value={formData.downloadLink}
													onChange={handleChange}
													placeholder="https://cdn.hivemindrobotics.net/..."
													required
													className="w-full"
												/>
											</div>
											<Button onClick={handleNext}>Next</Button>
										</div>
									</div>
								)}
								{slide === 3 && (
									<div className="py-[1.5rem] text-center">
										<h1 className="text-2xl font-semibold">Award Information</h1>
										<p className="opacity-70 py-4">
											Please provide the details of the awards this document may have recieved, if
											this is not an award based document, you can submit now.
										</p>
										<div className="flex flex-col gap-4">
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">
													What Award did the content of this document get your team?
												</label>
												<Input
													type="text"
													name="award"
													value={formData.award}
													onChange={handleChange}
													placeholder="Inspire"
													required
													className="w-full"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">What ranking was the award?</label>
												<Input
													type="text"
													name="awardRanking"
													value={formData.awardRanking}
													onChange={handleChange}
													placeholder="3"
													required
													className="w-full"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">Where did you win this award?</label>
												<Input
													type="text"
													name="division"
													value={formData.division}
													onChange={handleChange}
													placeholder="Regionals"
													required
													className="w-full"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium">What state is your team from?</label>
												<Input
													type="text"
													name="state"
													value={formData.state}
													onChange={handleChange}
													placeholder="Tennessee"
													required
													className="w-full"
												/>
											</div>
											<Button onClick={handleSubmit}>Submit</Button>
										</div>
									</div>
								)}
							</div>
						</div>
					</>
				) : (
					<>
						<div className="m-auto text-center space-y-4 ">
							<h1 className="text-2xl font-semibold">403</h1>
							<p>
								Your account is not verified, you can still favorite documents but you cannot yet submit new ones.
							</p>
						</div>
					</>
				)}
			</div>
		</>
	);
}
