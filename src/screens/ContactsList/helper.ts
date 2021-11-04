import { Contact } from "../../interfaces";

export const contactMapHelper = (contact: Contact) => {
  let newContact: any = {}
  let copiedContact: any = { ...contact }
  delete copiedContact.first_name
  delete copiedContact.last_name
  delete copiedContact.id

  newContact.name = (contact?.first_name ?? '') + ' ' + (contact?.last_name ?? '')

  newContact = { ...newContact, ...copiedContact }
  return newContact

}