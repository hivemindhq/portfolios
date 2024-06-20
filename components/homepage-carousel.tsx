'use client';

import {getFTCDocuments} from '@/hooks/use-portfolio';
import {Card, CardContent} from './ui/card';
import {Carousel, CarouselContent, CarouselItem} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import {Skeleton} from './ui/skeleton';

export default function HomepageCarousel() {
	const {data: portfolios} = getFTCDocuments();

	return (
		<div>
			{!portfolios ? (
				<Skeleton className="w-full h-[440px]" />
			) : (
				<Carousel
					className="w-full"
					plugins={[
						Autoplay({
							delay: 1500,
						}),
					]}
					opts={{
						align: 'start',
					}}
				>
					<CarouselContent className="-ml-1 opacity-70">
						{portfolios.map(portfolio => (
							<>
								<CarouselItem key={portfolio.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
									<div className="p-1">
										<div className='overflow-hidden hover:scale-[0.95] ease-out duration-300 transition-all hover:opacity-70'>
											<div className="flex aspect-square items-center justify-center group">
												<span className="text-4xl font-semibold">
													<img className="rounded-2xl rotate-[-5deg] max-w-[20rem] ease-out duration-300 transition-all group-hover:rotate-[5deg] shadow-lg max-h-[20rem]"src={portfolio.s3_url_thumb ? portfolio.s3_url_thumb : ''}></img>
												</span>
											</div>
										</div>
									</div>
								</CarouselItem>
							</>
						))}
					</CarouselContent>
				</Carousel>
			)}
		</div>
	);
}
