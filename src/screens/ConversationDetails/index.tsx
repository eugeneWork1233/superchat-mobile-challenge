import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View, ViewStyle, Text, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { EmptyState, Header, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import LoadingComponent from '../../components/LoadingComponent';
import { getConversationDetails, sendMessageText } from './thunks'
import { TextInput } from 'react-native-paper';
import moment from 'moment';
import { sendMessage } from '../../api';
const Event = wrapIcon({ IconClass: MatIcon, name: 'event', flip: false });
const Arrow = wrapIcon({ IconClass: MatIcon, name: 'arrow-back', flip: false });


const styles = () =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    scrollViewContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageCont: (right: boolean) => ({
      padding: 10,
      alignSelf: right ? 'flex-end' : 'flex-start',
      backgroundColor: right ? 'blue' : 'gray',
      borderRadius: 8,
      margin: 10,
    }),
    messageText: {
      color: 'white'
    },
    dateText: {
      color: 'white',
      fontSize: 9,
    },
    buttonCont: (message) => ({
      backgroundColor: 'blue',
      alignItems: 'center',
      opacity: !message || !message.trim() ? 0.5 : 1
    }),
    buttonText: {
      color: 'white',
      fontSize: 16,
      padding: 10
    }

  });



const ConversationDetails: React.FC = ({ navigation, route }): JSX.Element => {
  const defaultStyles = styles();
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const { messages, loading } = useSelector((state: RootState) => state.conversationsDetailsReducer)
  const dispatch = useDispatch()
  const handleSendMessage = async (): Promise<void> => {
    setIsSending(true)
    setMessage('')
    let newMessage = {
      payload: message,
      source: 'USER',
      timestamp: moment().toISOString(),
      id: messages.length + 100,
      conversationId: route.params.id,
    }
    await sendMessage(newMessage)
      .then(
        () => {
          dispatch(sendMessageText(newMessage))
          setIsSending(false)
        }
      )
      .catch(
        (e) => {
          alert('Error sending')
          setIsSending(false)
        }
      )


  }
  useEffect(
    () => {
      dispatch(getConversationDetails(route.params.id))
    }, [route.params.id]
  )
  return (
    <>
      <Header
        title={`Messages ${route.params.name}`}
        icon={Arrow}
        onIconPress={navigation.goBack}
      />
      <SafeAreaView style={defaultStyles.content}>
        {loading && <LoadingComponent />}
        {!loading && <FlatList
          data={messages}
          keyExtractor={item => item.timestamp}
          inverted
          renderItem={({ item }) => <View style={defaultStyles.messageCont(item.source !== 'USER')}>
            <Text style={defaultStyles.messageText}><Text style={{ fontWeight: 'bold' }}>{item.source}:</Text> {item.payload}</Text>
            <Text style={defaultStyles.dateText}>{moment(item.timestamp).format('hh:mm DD/mm/yyyy')}</Text>
          </View>}
        />}
        <View>
          <TextInput placeholder="Enter your message..." value={message} onChangeText={setMessage} />
          <TouchableOpacity style={defaultStyles.buttonCont(message)} onPress={handleSendMessage} disabled={!message || !message.trim()}
          >
            {!isSending && <Text style={defaultStyles.buttonText}>Send Message</Text>}
            {isSending && <ActivityIndicator color='white' size="small" />}
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </>
  );
};

export default ConversationDetails;
