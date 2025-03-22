import { PropsWithChildren } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from './AlertDialog'

interface ConfirmModalProps {
	handleClick: () => void
}

const ConfirmModal = ({children, handleClick}: PropsWithChildren<ConfirmModalProps>) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
					<AlertDialogDescription>
						Это действие нельзя будет отменить.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Закрыть</AlertDialogCancel>
					<AlertDialogAction className={'bg-blue-500 hover:bg-blue-500/90'} onClick={() => handleClick()}>Подтвердить</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ConfirmModal