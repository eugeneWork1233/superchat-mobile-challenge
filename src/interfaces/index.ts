export interface ContactParams {
  contactId: number
  conversationType: string
}

interface ContactInfo {
  first_name?: string,
  last_name?: string,
  email?: string,
  phone?: string
}

export interface Conversation {
  id: number,
  contactId: number,
  conversationType: string
}

export interface Message {
  id: number,
  conversationId: number,
  timestamp: string,
  source: string,
  payload: string
}

export interface Contact extends ContactInfo {
  id: number
}
export interface EditContactParams {
  id: number,
  data: ContactInfo
}

export interface MessagePayload {
  conversationId: number,
  payload: string
}


export interface StateCommon {
  loading: boolean
  error: any
}