import { createSlice } from '@reduxjs/toolkit'
import type { MintState } from '@src/state/features/gcd/types'
import { thunksApply } from '@src/state/features/gcd/thunks'

const initialState: MintState = {
  data: { status: 'initialisation' },
}

const slice = createSlice({
  name: 'mint',
  initialState,
  reducers: {},
  extraReducers(builder) {
    thunksApply.forEach((thunkApply) => thunkApply(builder))
  },
})

export default slice.reducer
