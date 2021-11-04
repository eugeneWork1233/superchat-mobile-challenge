import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { Contact, StateCommon } from '../../interfaces'
import { clearContactDetails, getContacts, setContact, updateContactDetails } from './thunks'

const initialState: StateCommon & { contacts: Contact[], contact: Contact } = {
  loading: false,
  error: null,
  contacts: [],
  contact: {
    id: 1,
    email: '',
    first_name: '',
    last_name: '',
    phone: ''
  }
}



export const contactsListReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getContacts.pending, (state, { meta }) => {
      state.loading = true
      state.error = null
    })
    .addCase(
      getContacts.fulfilled,
      (state, { payload, meta }) => {
        if (meta.arg) {
          state.contact = payload[0]
        }
        else {
          state.contacts = payload
        }
        state.loading = false
      },
    )
    .addCase(getContacts.rejected, (state, { error }) => {
      state.loading = false
      state.error = error.message
    })
    .addCase(updateContactDetails, (state, { payload }) => {
      state.contacts = state.contacts.map(c => c.id === payload.id ? ({ ...c, ...payload }) : c)
      state.contact = { ...state.contact, ...payload }
    })
    .addCase(clearContactDetails, (state) => {
      state.contact = { ...initialState.contact }
    })
    .addCase(setContact, (state, { payload }) => {
      state.contact = payload
    })
)
