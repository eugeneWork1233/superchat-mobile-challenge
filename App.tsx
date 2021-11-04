/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import React from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as PXBThemes from '@pxblue/react-native-themes';
import { MainRouter } from './src/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/store';

export const App = (): JSX.Element => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={PXBThemes.blue}>
                <SafeAreaProvider>
                    <MainRouter />
                </SafeAreaProvider>
            </ThemeProvider>
        </PersistGate>
    </Provider>

);

export default App;
