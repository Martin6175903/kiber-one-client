import type { ICardItem } from '@/src/shared/types/card.types'

export interface ICardInitialState {
	items: ICardItem[]
}

export interface IAddToPayload extends Omit<ICardItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<ICardItem, 'id'> {
	type: 'minus' | 'plus'
}
