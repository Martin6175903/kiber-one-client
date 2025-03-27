import { IProduct } from '@/src/shared/types/product.types'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/src/lib/utils'

interface ProductGalleryProps {
  product: IProduct
}

const ProductGallery = ({product} :ProductGalleryProps ) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
  <div>
    <Image src={product.images[currentIndex]} alt={product.title} width={500} height={500}/>
    <div>
      {product.images.map((image, index) =>(
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={cn(index === currentIndex ? 'border-black' : 'border-transparent')}
        >
          <Image src={image} alt={product.title} width={100} height={100}/>
        </button>
      ))}
    </div>
  </div>
 );
};

export default ProductGallery;