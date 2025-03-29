import { Metadata } from 'next'
import Basket from '@/src/app/(root)/basket/Basket'
import { DataTable } from '@/src/components/ui/data-loading/DataTable'

export const metadata: Metadata = {
  title: 'Ваша корзина КИБЕРТОВАРОВ!'
}

const Page = async () => {
  return (
    <div className={'h-full bg-[#131312] text-white flex items-center'}>
      <div className={'container'}>
        <DataTable columns={[]} data={[]}/>
      </div>
    </div>
  )
}

export default Page