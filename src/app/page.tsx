import Header from '@/src/components/layouts/main-layout/header/Header'
import Review from '@/src/components/layouts/main-layout/review/Review'

export default function Home() {
  return (
    <div className={'wrapper'}>
      <Header/>
      <Review/>
    </div>
  );
}
