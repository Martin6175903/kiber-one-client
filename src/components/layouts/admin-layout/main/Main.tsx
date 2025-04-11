import { PropsWithChildren } from 'react'

const Main = ({children}: PropsWithChildren) => {
  return (
    <main className={'w-full bg-white min-h-screen pt-7 pl-5'}>
      {children}
    </main>
  )
}

export default Main