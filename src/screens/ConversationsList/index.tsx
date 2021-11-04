import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import LoadingComponent from '../../components/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { getConversations } from './thunks';

const MenuIcon = wrapIcon({ IconClass: MatIcon, name: 'menu', flip: false });
const User = wrapIcon({ IconClass: MatIcon, name: 'account-box', flip: false });

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
    filterBox: (active: boolean) => ({
      width: '50%',
      backgroundColor: active ? 'blue' : 'red',
      alignItems: 'center',
    }),
    filterText: {
      color: 'white'
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 10
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingVertical: 10
    },
    conversationCont: {
      backgroundColor: 'white',
      marginTop: 10,
      marginHorizontal: 16,
      borderRadius: 8,
      flexDirection: 'row',
      padding: 10
    }

  });


const ConversationsList: React.FC = ({ navigation }): JSX.Element => {
  const defaultStyles = styles();
  const { conversations, loading } = useSelector((state: RootState) => state.conversationsReducer)
  const { contacts } = useSelector((state: RootState) => state.contactsListReducer)
  const [filterState, setFilterState] = useState({ mail: true, sms: true })
  const dispatch = useDispatch()
  const composeConversationData = useMemo(() => {
    let convData: any[] = []
    let mailConversations = conversations.filter(c => c.conversationType === 'MAIL')
    let smsConversations = conversations.filter(c => c.conversationType === 'SMS')
    contacts.forEach(c => {
      let conversationMail = mailConversations.find(con => con.contactId === c.id)
      let conversationSms = smsConversations.find(con => con.contactId === c.id)
      if (conversationMail) {
        convData.push({ ...conversationMail, name: (c?.first_name ?? '') + ' ' + (c?.last_name ?? '') })
      }
      if (conversationSms) {
        convData.push({ ...conversationSms, name: (c?.first_name ?? '') + ' ' + (c?.last_name ?? '') })
      }
    }
    )
    return convData
  }, [conversations])

  const filterOption = useMemo(() => {
    if (filterState.sms && !filterState.mail) {
      return 'SMS'
    }
    else if (!filterState.sms && filterState.mail) {
      return 'MAIL'
    }
    else {
      return ''
    }
  }, [filterState])

  useEffect(() => {
    dispatch(getConversations(filterOption))
  }, [filterOption])

  return (
    <>
      <Header
        title={'Conversations'}
        icon={MenuIcon}
        onIconPress={navigation.openDrawer}
      />

      <SafeAreaView style={defaultStyles.content}>
        <Text style={defaultStyles.filterTitle}>Enabled filters</Text>
        <View style={defaultStyles.filterContainer}>
          <TouchableOpacity
            style={defaultStyles.filterBox(filterState.mail)}
            onPress={() => setFilterState(prev => ({ ...prev, mail: !prev.mail }))} >
            <Text style={defaultStyles.filterText}>MAIL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={defaultStyles.filterBox(filterState.sms)}
            onPress={() => setFilterState(prev => ({ ...prev, sms: !prev.sms }))} >
            <Text style={defaultStyles.filterText} >SMS</Text>
          </TouchableOpacity>
        </View>
        {loading && <LoadingComponent />}
        {!loading && <FlatList
          data={composeConversationData}
          renderItem={({ item }) =>
            <TouchableOpacity style={defaultStyles.conversationCont}
              onPress={() => navigation.navigate('ConversationDetails', { id: item.id, name: item.name })}
            >
              <View style={{ paddingRight: 10 }}>
                <User size={50} />
              </View>
              <View>
                <Text>
                  Name: {item?.name ?? ''}
                </Text>
                <Text>
                  ConversationType: {item?.conversationType ?? ''}
                </Text>
              </View>
            </TouchableOpacity>
          }
        />}
      </SafeAreaView>
    </>
  );
};

export default ConversationsList;
