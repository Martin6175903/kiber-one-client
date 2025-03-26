import Header from '@/src/components/layouts/main-layout/header/Header'
import Review from '@/src/components/layouts/main-layout/review/Review'
import ProductsInfo from '@/src/components/layouts/main-layout/products/products-info/ProductsInfo'
import Delivery from '@/src/components/layouts/main-layout/delivery/Delivery'
import Footer from '@/src/components/layouts/main-layout/footer/Footer'

export default function Home() {
  return (
    <div className={'wrapper bg-[#181818]'}>
      <Header/>
      <Review/>
      <ProductsInfo/>
      <Delivery/>
      <Footer/>
    </div>
  );
}
