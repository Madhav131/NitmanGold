import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import MainTabScreen from './MaintabScreen';
import Drewerscreen from '../components/drewercompo';
import Subcatgrios from './Subcatgrios';
import ProductScreen from './ProductScreen';
import Viewproduct from './ViewProduct';
import FillterScreen from './FillterScreen';
import Updatecart from './Updatecart';
import Wishlist from './Wishlist';
import Form from './registration';
import Instructions from './instructions';

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
      <Stack.Screen name="Drewerscreen" component={Drewerscreen} />
      <Stack.Screen name="Subcatgrios" component={Subcatgrios} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="Viewproduct" component={Viewproduct} />
      <Stack.Screen name="FillterScreen" component={FillterScreen} />
      <Stack.Screen name="Updatecart" component={Updatecart} />
      <Stack.Screen name="WishList" component={Wishlist} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Instructions" component={Instructions} />
    </Stack.Navigator>
  );
};

export default Route;
