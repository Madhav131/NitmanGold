import React, {useContext, useReducer, useEffect} from 'react';
import Reducer from '../reducer/cart_reducer';
import {
  ADD_TO_CART,
  DECREASE_CART_QTY,
  INCREASE_CART_QTY,
  REMOVE_CART_ITEM,
  RESTORE_CART,
  RESTORE_TOTAL,
  ORDER_BEGIN,
  ORDER_SUCCESS,
  ORDER_ERROR,
  RESTORE_QTY,
  TOTAL_QTY,
  CLEAR_ALL,
  RESTORE_TOTAL1,
  QTY,
} from '../Utils/action';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {BASE_URL, ACCEPT_HEADER} from '../Utils/const';
import Toast from 'react-native-simple-toast';
const initialState = {
  cart: [],
  total: 0,
  total_qty: 0,
  qty: 0,
  total1: 0,
  isloading: false,
};

const CartContext = React.createContext();

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addToCart = item => {
    // console.log('----item===== : ', state.cart);
    dispatch({type: ADD_TO_CART, payload: item});
  };

  const increase_qty = item => {
    dispatch({type: INCREASE_CART_QTY, payload: item});
  };

  const decrease_qty = item => {
    dispatch({type: DECREASE_CART_QTY, payload: item});
  };

  const removeFromCart = index => {
    // console.log('----remove : ', index);
    dispatch({type: REMOVE_CART_ITEM, payload: index});
  };

  const PlaceOrder = async (param, props) => {
    var token = await AsyncStorage.getItem('token');
    // console.log(param);

    dispatch({type: ORDER_BEGIN});
    axios
      .post(BASE_URL + 'place-order', param, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(res => {
        // console.log(res.data);
        if (res.data.success === 1) {
          dispatch({type: ORDER_SUCCESS});

          props.navigation.navigate('Homes');
          Toast.show(res.data.message);
        } else {
          Toast.show('Login First...!!!');
          // props.navigation.navigate('AuncountDetils');
        }
      })
      .catch(err => {
        // console.log(JSON.stringify(err, 2, null));
        dispatch({type: ORDER_ERROR});
      });
  };

  const clear_all = () => {
    dispatch({type: CLEAR_ALL});
  };

  useEffect(() => {
    AsyncStorage.getItem('cart').then(value => {
      if (value) {
        // console.log('madhav-->', value);
        dispatch({type: RESTORE_CART, payload: JSON.parse(value)});
      }
    });

    AsyncStorage.getItem('total').then(value => {
      if (value) {
        dispatch({type: RESTORE_TOTAL, payload: JSON.parse(value)});
      }
    });

    AsyncStorage.getItem('total1').then(value => {
      if (value) {
        dispatch({type: RESTORE_TOTAL1, payload: JSON.parse(value)});
      }
    });
    AsyncStorage.getItem('qty').then(value => {
      if (value) {
        dispatch({type: QTY, payload: JSON.parse(value)});
      }
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        increase_qty,
        decrease_qty,
        PlaceOrder,
        removeFromCart,
        clear_all,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
