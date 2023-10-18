import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/Screen/Route';
import {CartProvider} from './src/context/cart_context';

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Route />
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
