import { ICardItem } from '@/src/shared/types/card.types'
import { useActions } from '@/src/hooks/useActions'
import { useCard } from '@/src/hooks/useCard'
import { Button } from '@/src/components/ui/Button'
import { Minus, Plus } from 'lucide-react'

interface CardActionsProps {
  item: ICardItem
}

const CardActions = ({ item }: CardActionsProps) => {
  const { changeQuantity } = useActions()

  const { items } = useCard()
  const quantity = items.find(cardItem => cardItem.id === item.id)?.quantity

  return (
    <div className={'flex items-center mt-1'}>
      <Button
        onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
        variant={'ghost'}
        size={'icon'}
        disabled={quantity === 1}
        className={'size-7'}
      >
        <Minus className={'size-4'}/>
      </Button>

      <input className={'w-10 text-center text-sm'} type="text" disabled readOnly value={quantity} />

      <Button
        onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
        variant={'ghost'}
        size={'icon'}
        className={'size-7'}
      >
        <Plus className={'size-4'}/>
      </Button>
    </div>
  )
}

export default CardActions