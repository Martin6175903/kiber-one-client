import { IProduct } from '@/src/shared/types/product.types'

interface ProductsItemProps {
  product: IProduct
}

const ProductsItem = ({product} :ProductsItemProps ) => {
	const {title, price, images, size } = product
 return (
  <div>

  </div>
 );
};

export default ProductsItem;