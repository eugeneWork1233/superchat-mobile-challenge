import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { getContacts, setContact } from './thunks';
import { Contact } from '../../interfaces';
import { contactMapHelper } from './helper';
import LoadingComponent from '../../components/LoadingComponent';

const MenuIcon = wrapIcon({ IconClass: MatIcon, name: 'menu', flip: false });
const User = wrapIcon({ IconClass: MatIcon, name: 'account-box', flip: false });
const Refresh = wrapIcon({ IconClass: MatIcon, name: 'refresh', flip: false });


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
    contactCont: {
      marginVertical: 10,
      flexDirection: 'row',
      backgroundColor: 'white',
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 8
    },
    userCont: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10
    }
  });






const ContactsList: React.FC = ({ navigation }): JSX.Element => {
  const defaultStyles = styles();
  const { contacts, loading } = useSelector((state: RootState) => state.contactsListReducer)
  const dispatch = useDispatch()
  const ContactItem = (contact: Contact): JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        dispatch(setContact(contact))
        navigation.navigate('ContactDetails', { contact })
      }}
      style={defaultStyles.contactCont}>
      <View style={defaultStyles.userCont}>
        <User size={50} />
      </View>
      <View>
        {Object.values(contactMapHelper(contact)).map(
          value => <Text>{value as String}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
  useEffect(() => {
    dispatch(getContacts())
  }, [])

  return (
    <>
      <Header
        title={'Contacts'}
        onIconPress={navigation.openDrawer}
        actionItems={[{ icon: Refresh, onPress: () => dispatch(getContacts()) }]}
        icon={MenuIcon}
      />
      <SafeAreaView style={defaultStyles.content}>
        {loading && <LoadingComponent />}
        {!loading && <FlatList
          data={contacts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => ContactItem(item)}
        />}
      </SafeAreaView>
    </>
  );
};

export default ContactsList;
