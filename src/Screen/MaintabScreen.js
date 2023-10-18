import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from '../Utils/colors';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Oderlist from './Oderlist';
import CartScreen from './CartScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Octicons from 'react-native-vector-icons/Octicons';
import Wishlist from './Wishlist';
import Profileicon from '../assets/icon2/account2.svg';
import Shopingicon from '../assets/icon2/shopping-bag.svg';
import Cart from '../assets/icon2/shopping-cart2.svg';
import Home from '../assets/icon2/home-icon-silhouette2.svg';

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const OderStack = createNativeStackNavigator();
const WishlistStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import Drewerscreen from '../components/drewercompo';
import Subcatgrios from './Subcatgrios';
import ProductScreen from './ProductScreen';
// const Drawercomponet = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{headerShown: false}}
//       options={{unmountOnBlur: true}}
//       drawerContent={props => <Drewerscreen {...props} />}>
//       <Drawer.Screen name="Home" component={MainTabScreen} />
//     </Drawer.Navigator>
//   );
// };
const Drawercomponet = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      options={{unmountOnBlur: true}}
      drawerContent={props => <Drewerscreen {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeStackScreen} />
      <Drawer.Screen name="Subcatgrios" component={Subcatgrios} />
      <Drawer.Screen name="ProductScreen" component={ProductScreen} />
    </Drawer.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.themecolor,
        inactiveTintColor: Colors.gray,
        showLabel: false,
      }}
      screenOptions={{
        tabBarStyle: {height: Platform.OS === 'ios' ? 75: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={Drawercomponet}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            // <Icon name="ios-home" color={color} size={26} />
            <Home width={30} height={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            // <Icon name="ios-cart-sharp" color={color} size={26} />
            // <Image
            //   source={require('../assets/icon/cart.png')}
            //   resizeMode="contain"
            // />
            <Cart width={30} height={30} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="WishList"
        component={WishlistStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="ios-heart-half" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="OrderList"
        component={oederlistStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            // <Octicons name="checklist" color={color} size={26} />
            // <Image
            //   source={require('../assets/icon/shopingbag.png')}
            //   resizeMode="contain"
            // />
            <Shopingicon width={30} height={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            // <Icon name="ios-person" color={color} size={26} />
            // <Image
            //   source={require('../assets/icon2/account2.svg')}
            //   resizeMode="contain"
            // />
            <Profileicon width={30} height={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Screen
      name="Homes"
      component={HomeScreen}
      options={{
        headerLeft: () => null,
      }}
    />
    <HomeStack.Screen
      name="Subcatgrios"
      component={Subcatgrios}
      options={{
        headerLeft: () => null,
      }}
    />
    <HomeStack.Screen
      name="ProductScreen"
      component={ProductScreen}
      options={{
        headerLeft: () => null,
      }}
    />
  </HomeStack.Navigator>
);

const CartStackScreen = ({navigation}) => (
  <CartStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <CartStack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerLeft: () => null,
      }}
    />
  </CartStack.Navigator>
);

const WishlistStackScreen = ({navigation}) => (
  <WishlistStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <WishlistStack.Screen
      name="WishList"
      component={Wishlist}
      options={{
        headerLeft: () => null,
      }}
    />
  </WishlistStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <ProfileStack.Screen
      name="profiles"
      component={ProfileScreen}
      options={{
        headerLeft: () => null,
      }}
    />
  </ProfileStack.Navigator>
);
const oederlistStackScreen = ({navigation}) => (
  <OderStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <OderStack.Screen
      name="OrderList"
      component={Oderlist}
      options={{
        headerLeft: () => null,
      }}
    />
  </OderStack.Navigator>
);
