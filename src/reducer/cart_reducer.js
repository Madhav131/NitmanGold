import {AsyncStorage} from 'react-native';
import {
  ADD_TO_CART,
  DECREASE_CART_QTY,
  INCREASE_CART_QTY,
  REMOVE_CART_ITEM,
  RESTORE_CART,
  RESTORE_TOTAL,
  RESTORE_QTY,
  ORDER_BEGIN,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLEAR_ALL,
  RESTORE_TOTAL1,
  QTY,
} from '../Utils/action';
import Toast from 'react-native-simple-toast';

const cart_reducer = (state, action) => {
  var tempCart = state.cart;
  var removedItemFromCart = state.cart.filter((x, i) => i !== action.payload);
  switch (action.type) {
    case ADD_TO_CART:
      if (state.cart.every(item => item.id !== action.payload.id)) {
        tempCart.push(action.payload);
        var amount = Number(state.total) + Number(action.payload.gross_weight);
        var nwt = Number(state.total1) + Number(action.payload.net_weight);
        AsyncStorage.setItem('cart', JSON.stringify(tempCart));
        AsyncStorage.setItem('total', JSON.stringify(amount));
        AsyncStorage.setItem('total1', JSON.stringify(nwt));
        AsyncStorage.setItem('qty', JSON.stringify(state.total_qty + 1));
        return {
          ...state,
          cart: tempCart,
          total_qty: state.total_qty + 1,
          total: amount,
          total1: nwt,
        };
      } else {
        if (state.cart.find(item => item.id === action.payload.id)) {
          const temp = state.cart.find(item => item.id === action.payload.id);
          // console.log('Product already exist in cart', temp);
          var index = state.cart.findIndex(
            item => item.id === action.payload.id,
          );
          state.cart[index].user_qty = state.cart[index].user_qty + 1;

          AsyncStorage.setItem('cart', JSON.stringify(state.cart));
          AsyncStorage.setItem('total', JSON.stringify(amount));
          AsyncStorage.setItem('total1', JSON.stringify(nwt));
          AsyncStorage.setItem('qty', JSON.stringify(state.total_qty + 1));
          return {...state, total_qty: state.total_qty + 1};
        } else {
          Toast.show(
            "you can't add items from another store, empty your cart first",
          );
        }
      }
    case INCREASE_CART_QTY:
      const isExist = state.cart.find(item => item.id === action.payload.id);
      // console.log('----exist : ', isExist);
      if (isExist) {
        var index = state.cart.findIndex(item => item.id === action.payload.id);
        state.cart[index].user_qty = state.cart[index].user_qty + 1;
        var amount = Number(state.total) + Number(action.payload.gross_weight);
        var nwt = Number(state.total1) + Number(action.payload.net_weight);
        // console.log('---', index);
        AsyncStorage.setItem('cart', JSON.stringify(state.cart));
        AsyncStorage.setItem('total', JSON.stringify(amount));
        AsyncStorage.setItem('total1', JSON.stringify(nwt));
        AsyncStorage.setItem('qty', JSON.stringify(state.total_qty + 1));
        return {
          ...state,
          total_qty: state.total_qty + 1,
          total: amount,
          total1: nwt,
        };
      } else return {...state};

    case DECREASE_CART_QTY:
      const isExist_dec = state.cart.find(
        item => item.id === action.payload.id,
      );
      state.cart.find(item => console.log(item.id, action.payload.id));
      // console.log('----exist : ', isExist_dec, action.payload.id);
      if (isExist_dec && isExist_dec.user_qty > 1) {
        var index = state.cart.findIndex(item => item.id === action.payload.id);
        state.cart[index].user_qty = state.cart[index].user_qty - 1;
        var amount = Number(state.total) - Number(action.payload.gross_weight);
        var nwt1 = Number(state.total1) - Number(action.payload.net_weight);
        AsyncStorage.setItem('cart', JSON.stringify(state.cart));
        AsyncStorage.setItem('total', JSON.stringify(amount));
        AsyncStorage.setItem('total1', JSON.stringify(nwt));
        AsyncStorage.setItem('qty', JSON.stringify(state.total_qty - 1));
        return {
          ...state,
          total_qty: state.total_qty - 1,
          total: amount,
          total1: nwt1,
        };
      } else if (isExist_dec.user_qty === 1) {
        const remove = state.cart.filter((x, i) => x.id !== action.payload.id);
        var index = state.cart.findIndex(item => item.id === action.payload.id);
        state.cart[index].user_qty = state.cart[index].user_qty - 1;
        var amount = Number(state.total) - Number(action.payload.gross_weight);
        var nwt = Number(state.total1) - Number(action.payload.net_weight);
        AsyncStorage.setItem('cart', JSON.stringify(removedItemFromCart));
        AsyncStorage.setItem('total', JSON.stringify(amount));
        AsyncStorage.setItem('total1', JSON.stringify(nwt));
        AsyncStorage.setItem('qty', JSON.stringify(state.total_qty - 1));
        return {
          ...state,
          cart: remove,
          total_qty: state.total_qty - 1,
          total: amount,
          total1: nwt,
        };
      }

    case ORDER_BEGIN:
      return {...state, isloading: true};

    case ORDER_SUCCESS:
      return {
        ...state,
        isloading: false,
        cart: [],
        total: 0,
        total1: 0,
        total_qty: 0,
      };

    case ORDER_ERROR:
      return {...state, isloading: false};

    case CLEAR_ALL:
      return {
        ...state,
        isloading: false,
        cart: [],
        total: 0,
        total1: 0,
        total_qty: 0,
      };

    case RESTORE_CART:
      return {...state, cart: action.payload};

    case RESTORE_TOTAL:
      return {...state, total: action.payload};

    case RESTORE_TOTAL1:
      return {...state, total1: action.payload};
    case QTY:
      return {...state, total_qty: action.payload};
    default:
      return state;
  }
  return state;
};

export default cart_reducer;
