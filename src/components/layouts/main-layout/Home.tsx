import Review from '@/src/components/layouts/main-layout/review/Review'
import ProductsInfo from '@/src/components/layouts/main-layout/products/products-info/ProductsInfo'
import Products from '@/src/components/layouts/main-layout/products/Products'
import Delivery from '@/src/components/layouts/main-layout/delivery/Delivery'

const Home = () => {

  return (
    <div className={'bg-[#181818]'}>
      <Review/>
      <ProductsInfo/>
      <Products/>
      <Delivery/>
    </div>
  )
}

export default Home