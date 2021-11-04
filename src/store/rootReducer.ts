import { combineReducers } from "redux";
import { contactsListReducer } from "../screens/ContactsList/reducer";
import { conversationsDetailsReducer } from "../screens/ConversationDetails/reducer";
import { conversationsReducer } from "../screens/ConversationsList/reducer";

const rootReducer = combineReducers({ contactsListReducer, conversationsDetailsReducer, conversationsReducer })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer