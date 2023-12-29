'use client';

import {Card, CardContent} from './ui/card';
import {Carousel, CarouselContent, CarouselItem} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HomepageCarousel() {
	return (
		<>
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
				<CarouselContent className="-ml-1">
					{Array.from({length: 15}).map((_, index) => (
						<CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
							<div className="p-1">
								<Card>
									<CardContent className="flex aspect-square items-center justify-center p-6">
										<span className="text-4xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</>
	);
}
