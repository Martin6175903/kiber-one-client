import { PropsWithChildren } from 'react'

const Main = ({children}: PropsWithChildren) => {
  return (
    <main className={'w-auto bg-white min-h-screen'}>
      {children}
    </main>
  )
}

export default Main