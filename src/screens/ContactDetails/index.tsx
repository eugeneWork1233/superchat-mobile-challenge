import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Linking,
  TextStyle,
  ViewStyle,
  View,
  Animated,
  Easing,
  Text,
  Alert,
} from 'react-native';
import { Button, Divider, TextInput, useTheme } from 'react-native-paper';
import { Body1, H4, Header, wrapIcon } from '@pxblue/react-native-components';
import { Theme } from 'react-native-paper/lib/typescript/types';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation';
import { INPUT_NAMES } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { clearContactDetails, getContacts, updateContactDetails } from '../ContactsList/thunks';
import LoadingComponent from '../../components/LoadingComponent';
import { editUserContact } from '../../api';
import { contactMapHelper } from '../ContactsList/helper';

const Arrow = wrapIcon({ IconClass: MatIcon, name: 'arrow-back', flip: false });
const Refresh = wrapIcon({ IconClass: MatIcon, name: 'refresh', flip: false });
const styles = (
  theme: Theme
): StyleSheet.NamedStyles<{
  content: ViewStyle;
  pxbLogoWrapper: ViewStyle;
  pxbLogo: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  bold: TextStyle;
  divider: ViewStyle;
  openURLButtonText: TextStyle;
}> =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    pxbLogoWrapper: {
      justifyContent: 'center',
      marginTop: 16,
    },
    pxbLogo: {
      alignSelf: 'center',
      height: 100,
      width: 100,
    },
    title: {
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitle: {
      textAlign: 'center',
    },
    bold: {
      fontWeight: 'bold',
    },
    divider: {
      marginVertical: 24,
    },
    openURLButtonText: {
      color: theme.colors.text,
      padding: 8,
    },
  });

const OpenURLButton = (props: any): JSX.Element => {
  const { url, title } = props;
  const theme = useTheme();
  const defaultStyles = styles(theme);

  const handlePress = useCallback(async () => {
    await Linking.openURL(url);
  }, [url]);

  return (
    <Button
      onPress={(): Promise<void> => handlePress()}
      labelStyle={defaultStyles.openURLButtonText}
      uppercase={false}
    >
      {title}
    </Button>
  );
};



const ContactDetails: React.FC = ({ navigation, route }): JSX.Element => {
  const theme = useTheme();
  const defaultStyles = styles(theme);
  const { contact, loading } = useSelector((state: RootState) => state.contactsListReducer)
  const dispatch = useDispatch()
  const [isSaving, setIsSaving] = useState(false)
  const [editContact, setEditContact] = useState<any>({ ...contact, id: 'any' })
  const handleEditContact = (text: string, key: string) => setEditContact(prev => ({ ...prev, [key]: text }))
  const handleSaveContact = async (): Promise<void> => {
    setIsSaving(true)
    editUserContact({ data: editContact, id: route?.params?.id }).then(
      _ => {
        dispatch(updateContactDetails({ ...contact, ...editContact, id: route?.params?.contact?.id }))
        setIsSaving(false)
      }
    )
      .finally(() => setIsSaving(false))
  }
  const displaySettings =
    () => <>{
      INPUT_NAMES.map(([key, label]) => <View style={{ marginHorizontal: 16, borderRadius: 16 }} key={key}>
        <Text>{label}</Text>
        <TextInput value={editContact[key] ?? ''} onChangeText={text => handleEditContact(text, key)} />
      </View>)
    }</>

  const goToConversation = () => {
    navigation.navigate('ConversationDetails', { id: (contactMapHelper(contact).name), name: (contactMapHelper(contact).name) })
  }
  useEffect(
    () => {
      setEditContact({ ...contact, id: 'any' })
      return () => setEditContact({})
    }, [contact, route.params]
  )
  return (
    <>
      <Header
        title={'Contact Details'}
        icon={Arrow}
        onIconPress={navigation.goBack}
        actionItems={[{ icon: Refresh, onPress: () => dispatch(getContacts(route?.params?.contact?.id)) }]}
      />
      <SafeAreaView style={defaultStyles.content}>
        {(loading || isSaving) && <LoadingComponent />}
        {(!loading && !isSaving) && <>
          {displaySettings()}
          <View style={{ marginTop: 30 }}>
            <Button onPress={handleSaveContact}>
              Save
            </Button>
          </View>
          <View style={{ marginTop: 30 }}>
            <Button onPress={goToConversation}>
              Start Messaging
            </Button>
          </View>
        </>
        }

      </SafeAreaView>
    </>
  );
};

export default ContactDetails;
