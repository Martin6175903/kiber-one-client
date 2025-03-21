'use client'

import { useState } from 'react'
import { useAuthForm } from '@/src/app/auth/useAuthForm'
import Image from 'next/image'

const Auth = () => {
	const [isReg, setIsReg] = useState(false)

	const {onSubmit, form, isPending} = useAuthForm(isReg)

	return (
		<div>
			<div>
				<Image src={'/images/Logo.svg'} alt={'Kiber-one Auth'} width={182} height={88}/>
			</div>
			<div>

			</div>
		</div>
	)
}

export default Auth