import { Contact, ContactParams, Conversation, EditContactParams, Message, MessagePayload } from "../interfaces"
import { axios } from "../utils/axios"

export const fetchContacts = (id = ''): Promise<Contact[]> => axios.get(`/contacts`, id ? { params: { id } } : undefined)
export const editUserContact = ({ data, id }: EditContactParams) => axios.post('/contacts', data, { params: { id } })
export const fetchConversations = (conversationType: string): Promise<Conversation[]> =>
  axios.get('/conversations', conversationType ? { params: { conversationType } } : undefined)
export const createConversation = (data: ContactParams) => axios.post('/conversations', data)
export const fetchMessages = (conversationId: string): Promise<Message[]> => axios.get('messages', { params: { conversationId } })
export const sendMessage = (data: MessagePayload) => axios.post('messages', data)