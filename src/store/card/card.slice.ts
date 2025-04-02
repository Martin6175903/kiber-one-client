import { IAddToPayload, ICardInitialState, IChangeQuantityPayload } from '@/src/store/card/card.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ICardInitialState = {
  items: []
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addToCard: (state, action: PayloadAction<IAddToPayload>) => {
      // @ts-ignore
      const isExist = state.items.some(item => item.product?.id === action.payload.product?.id)

      if (!isExist) state.items.push({...action.payload, id: state.items.length})
    },
    removeFromCard: (state, action: PayloadAction<{id: number}>) => {
      state.items = state.items.filter(
        item => item.id !== action.payload.id
      )
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const { id, type } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) type === 'plus' ? item.quantity++ : item.quantity--
    },
    reset: state => {
      state.items = []
    }
  }
})