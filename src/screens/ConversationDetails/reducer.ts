import { createReducer } from '@reduxjs/toolkit'
import { Message, StateCommon } from '../../interfaces'
import { getConversationDetails, sendMessageText } from './thunks'

const initialState: StateCommon & { messages: Message[] } = {
  loading: false,
  error: null,
  messages: [],
}



export const conversationsDetailsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getConversationDetails.pending, (state, { meta }) => {
      state.loading = true
      state.error = null
    })
    .addCase(
      getConversationDetails.fulfilled,
      (state, { payload }) => {
        state.messages = payload.reverse()
        state.loading = false

      },
    )
    .addCase(getConversationDetails.rejected, (state, { error }) => {
      state.loading = false
      state.error = error.message
    })
    .addCase(sendMessageText, (state, { payload }) => {
      state.messages = [payload, ...state.messages]
    })
)