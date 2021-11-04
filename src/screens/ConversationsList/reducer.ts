import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { Conversation, StateCommon } from '../../interfaces'
import { getConversations } from './thunks'

const initialState: StateCommon & { conversations: Conversation[] } = {
  loading: false,
  error: null,
  conversations: [],
}



export const conversationsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getConversations.pending, (state, { meta }) => {
      state.loading = true
      state.error = null
    })
    .addCase(
      getConversations.fulfilled,
      (state, { payload }) => {
        state.conversations = payload
        state.loading = false

      },
    )
    .addCase(getConversations.rejected, (state, { error }) => {
      state.loading = false
      state.error = error.message
    })
)