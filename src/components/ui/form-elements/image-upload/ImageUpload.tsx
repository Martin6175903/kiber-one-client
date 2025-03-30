import { useUpload } from '@/src/components/ui/form-elements/image-upload/useUpload'
import Image from 'next/image'
import { Button } from '@/src/components/ui/Button'
import { cn } from '@/src/lib/utils'
import { ImagePlus } from 'lucide-react'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
}

const ImageUpload = ({ isDisabled, onChange, value }: ImageUploadProps) => {
	const { isUploading, handleFileChange, handleButtonClick, fileInputRef } = useUpload(onChange)

	return (
		<div>
			<div className={'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-5'}>
				{value.map(url => (
					<div key={url} className={'relative w-[200px] h-[200px] rounded-md overflow-hidden'}>
						<Image loader={() => `/${url}`} src={`/${url}`} className={'object-cover'} alt={'Kiber-shop Image'} fill />
					</div>
				))}
			</div>
			<Button type={'button'} disabled={isDisabled || isUploading} variant={'secondary'} onClick={handleButtonClick} className={cn('', {
				'mt-4': value.length
			})}>
				<ImagePlus className={'size-4 mr-2'}/>
				Загрузить изображения
			</Button>
			<input type="file" multiple className={'hidden'} ref={fileInputRef} onChange={handleFileChange} disabled={isDisabled}/>
		</div>
	)
}

export default ImageUpload
