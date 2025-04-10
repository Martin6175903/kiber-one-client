import { PropsWithChildren, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog'
import { Button } from './Button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/ui/AlertDialog'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'

interface ConfirmModalProps {
  handleClick: () => void
  title: string
  confirmBtnText: string
}

const ConfirmModal = ({ handleClick, title, confirmBtnText }: ConfirmModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={'bg-black text-white py-2 px-4 rounded-full duration-300 hover:bg-black/80 cursor-pointer hover:scale-105'}>{title}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>Это действие нельзя будет отменить.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={'cursor-pointer'}>Отмена</AlertDialogCancel>
          <AlertDialogAction className={'cursor-pointer'} onClick={handleClick}>{confirmBtnText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal