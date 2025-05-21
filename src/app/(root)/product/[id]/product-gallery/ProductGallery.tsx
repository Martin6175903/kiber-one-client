'use client'
import { IProduct } from '@/src/shared/types/product.types'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/src/lib/utils'

interface ProductGalleryProps {
  product: IProduct
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      <Image className={'rounded-lg h-[500px] cursor-pointer'} src={`/${product.images[currentIndex]}`} alt={product.title} width={500} height={500} />
      <div className={'flex mt-6 gap-6'}>
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'duration-300 border rounded-lg overflow-hidden',
              index === currentIndex ? 'border-black' : 'border-transparent',
            )}
          >
            <Image className={'cursor-pointer'} src={`/${image}`} alt={product.title} width={100} height={100} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery