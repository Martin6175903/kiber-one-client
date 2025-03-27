import { IAddToPayload, ICardInitialState } from '@/src/store/card/card.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ICardInitialState = {
  items: []
}

export const cardSlide = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addToCard: (state, action: PayloadAction<IAddToPayload>) => {
      const isExist = state.items.some(
        item => item.product.id === action.payload.id
      )

      if (!isExist) state.items.filter(item => item.id !== action.payload.id)
    }
  }
})