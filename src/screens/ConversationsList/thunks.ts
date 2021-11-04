import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchConversations } from '../../api'
import { Conversation } from '../../interfaces'


export const getConversations = createAsyncThunk<Conversation[], string>(
  'getConversations',
  (id) => fetchConversations(id),
)
