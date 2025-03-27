import { IProduct } from '@/src/shared/types/product.types'

interface ProductProps {
  initialProduct: IProduct
  id?: string
}

const Product = ({ initialProduct, id = '' } :ProductProps ) => {
 return (
  <div>
   
  </div>
 );
};

export default Product;