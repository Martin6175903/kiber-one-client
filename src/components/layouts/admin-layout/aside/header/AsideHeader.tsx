import Image from 'next/image'
import Logo from '@/src/components/layouts/main-layout/header/logo/Logo'
import { PUBLIC_URL } from '@/src/config/url.config'

const AsideHeader = () => {
  return (
    <div>
      <div className={'flex gap-3 items-center text-sm justify-center'}>
        <Logo link={PUBLIC_URL.home()} className={'w-[100px]'}/>
        <div>
          <p className={'font-bold text-base'}>г. Мозырь</p>
        </div>
      </div>
      <div className={'my-3 h-1.5 bg-[#131313]'}/>
    </div>
  )
}

export default AsideHeader