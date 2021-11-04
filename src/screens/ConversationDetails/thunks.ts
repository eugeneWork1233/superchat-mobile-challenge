import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMessages } from '../../api'
import { Message } from '../../interfaces'


export const getConversationDetails = createAsyncThunk<Message[], string>(
  'getMessages',
  conversationId => fetchMessages(conversationId),
)


export const sendMessageText = createAction<Message>('sendMessage')