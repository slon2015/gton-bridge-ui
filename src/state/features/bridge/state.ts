import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from '@src/state/features/bridge/reducers'
import { BridgeState } from './types'

const initialState: BridgeState = {
  data: {
    status: 'initialisation',
  },
}

const slice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {},
  extraReducers(builder) {
    extraReducers.forEach((extraReducer) => extraReducer(builder))
  },
})

export default slice.reducer

export const actions = slice.actions
