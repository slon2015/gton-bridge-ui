import { createSlice } from '@reduxjs/toolkit'
import type { MintState } from '@src/state/features/gcd/types'
import { extraReducersList } from '@src/state/features/gcd/reducers'

const initialState: MintState = {
  data: { status: 'initialisation' },
}

const slice = createSlice({
  name: 'mint',
  initialState,
  reducers: {},
  extraReducers(builder) {
    extraReducersList.forEach((extraReducer) => extraReducer(builder))
  },
})

export default slice.reducer
