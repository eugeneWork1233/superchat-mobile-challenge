import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchContacts } from '../../api'
import { Contact } from '../../interfaces'


export const getContacts = createAsyncThunk<Contact[], string | undefined>(
  'fetchContacts',
  (id) => fetchContacts(id),
)

export const updateContactDetails = createAction<Contact>('updateContact')
export const clearContactDetails = createAction('clearContact')
export const setContact = createAction<Contact>('setContact')