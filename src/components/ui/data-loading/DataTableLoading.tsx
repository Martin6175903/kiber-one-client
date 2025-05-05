import { Skeleton } from '../Skeleton'
import { Card, CardContent } from '@/src/components/ui/Card'
import Loader from '../Loader'

const DataTableLoading = () => {
	return (
		<div className={'max-w-screen-2xl mx-auto w-full'}>
			<Skeleton className={'h-8 w-48'} />
			<Skeleton className={'flex items-center py-4'} />
			<Card className={'rounded-md border mt-6'}>
				<CardContent>
					<div className={'h-[520px] w-full flex items-center justify-center'}>
						<Loader />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default DataTableLoading
