'use client'

import {
	Carousel, type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/src/components/ui/Carousel'
import React, { useEffect, useState } from 'react'
import { useDotButton } from '@/src/components/layouts/main-layout/review/slider/useDotButton'
import { DotButton } from '@/src/components/layouts/main-layout/review/slider/DotButton'
import Autoplay from "embla-carousel-autoplay"


const Review = () => {
	const [api, setApi] = React.useState<CarouselApi>()
	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(api)

	return (
		<div className={'md:h-[900px] min-[500px]:h-[450px] h-[320px]'}>
			<Carousel setApi={setApi} plugins={[Autoplay({ delay: 3500 })]}>
				<CarouselContent>
					<CarouselItem>
						<div className={'w-full md:h-[900px] min-[500px]:h-[450px] h-[320px] bg-[url(/images/main/slider/slider-img-1.jpg)] bg-cover bg-center'}></div>
					</CarouselItem>
					<CarouselItem>
						<div className={'w-full md:h-[900px] min-[500px]:h-[450px] h-[320px] bg-[url(/images/main/slider/slider-img-2.jpg)] bg-cover bg-center'}></div>
					</CarouselItem>
					<CarouselItem>
						<div className={'w-full md:h-[900px] min-[500px]:h-[450px] h-[320px] bg-[url(/images/main/slider/slider-img-3.jpg)] bg-cover bg-center'}></div>
					</CarouselItem>
					<CarouselItem>
						<div className={'w-full md:h-[900px] min-[500px]:h-[450px] h-[320px] bg-[url(/images/main/slider/slider-img-4.jpg)] bg-cover bg-center'}></div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className={'md:left-12 left-6 cursor-pointer'}></CarouselPrevious>
				<CarouselNext className={'md:right-12 right-6 cursor-pointer'}></CarouselNext>
				<div className={'absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3'}>
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={'embla__dot duration-300 cursor-pointer size-5 border-3 border-solid border-white rounded-full'.concat(
								index === selectedIndex ? ' bg-white' : ''
							)}
						/>
					))}
				</div>
			</Carousel>
		</div>
	)
}

export default Review
