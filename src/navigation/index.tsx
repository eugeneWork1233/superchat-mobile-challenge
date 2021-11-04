import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { NavDrawerProps, NavigationDrawer } from './navigation-drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import PageOne from '../screens/pageOne';
import PageTwo from '../screens/pageTwo';
import ContactsList from '../screens/ContactsList';
import ContactDetails from '../screens/ContactDetails';
import ConversationDetails from '../screens/ConversationDetails';
import ConversationsList from '../screens/ConversationsList';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
    ContactsList: undefined;
    ContactDetails: undefined;
    ConversationsList: undefined;
    ConversationDetails: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);

export const MainRouter = (): any => (
    <NavigationContainer>
        <Drawer.Navigator
            initialRouteName="ContactsList"
            drawerStyle={{ backgroundColor: 'transparent', width: 300, maxWidth: '80%' }}
            drawerContent={(props: NavDrawerProps): ReactNode => <CustomDrawerContent {...props} />}
        >
            <RootStack.Screen name="ContactsList" component={ContactsList} />
            <RootStack.Screen name="ContactDetails" component={ContactDetails} />
            <RootStack.Screen name="ConversationsList" component={ConversationsList} />
            <RootStack.Screen name="ConversationDetails" component={ConversationDetails} />
        </Drawer.Navigator>
    </NavigationContainer>
);
