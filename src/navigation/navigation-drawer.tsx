import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, NavItem, wrapIcon } from '@pxblue/react-native-components';
import React, { useState, useCallback } from 'react';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@pxblue/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';

const Home = wrapIcon({ IconClass: MatIcon, name: 'phone', flip: false });
const LooksOne = wrapIcon({ IconClass: MatIcon, name: 'message', flip: false });

export const navGroupItems: NavItem[] = [
    {
        title: 'Contacts',
        itemID: 'ContactsList',
        icon: Home,
    },
    {
        title: 'Conversations',
        itemID: 'ConversationsList',
        icon: LooksOne,
    },
];

export type NavDrawerProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NavigationDrawer'>;
};

export const NavigationDrawer: React.FC<NavDrawerProps> = ({ navigation }) => {
    const [selected, setSelected] = useState('ContactsList');
    const selectItem = useCallback(
        (id) => {
            navigation.navigate(id);
            setSelected(id);
        },
        [navigation]
    );

    return (
        <Drawer activeItem={selected} onItemSelect={(id: string): void => selectItem(id)}>
            <DrawerHeader
                title={'Super Chat'}
                subtitle={'React Native Project'}
                fontColor={Colors.white[50]}
            />
            <DrawerBody>
                <DrawerNavGroup items={navGroupItems} hidePadding={false} />
            </DrawerBody>
        </Drawer>
    );
};
