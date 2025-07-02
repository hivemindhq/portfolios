import Image from 'next/image';
import DocumentCarousel from '@/components/home/document-carousel';
import HeroText from '@/components/home/hero-text';

export default async function Home() {
	return (
		<main className="relative flex flex-col-reverse items-center justify-center gap-8 px-6 py-24 md:flex-row md:items-center md:justify-between md:px-12 md:py-12 lg:h-screen">
			{/* Hero Text */}
			<div className="z-20 w-full max-w-xl text-center md:text-left">
				<HeroText />
			</div>

			<div className="relative z-10 hidden w-full max-w-[200px] md:absolute md:top-1/2 md:right-10 md:block md:-translate-y-1/2">
				<DocumentCarousel />
			</div>

			{/* Background */}
			<div className="absolute top-0 left-0 z-0 h-full w-full">
				<Image
					src="/home_background.png"
					className="aspect-video object-cover opacity-5 select-none"
					alt="Background Image"
					unoptimized
					draggable="false"
					fill
				/>
			</div>
		</main>
	);
}
