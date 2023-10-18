import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import Colors from '../Utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import metrics from '../Utils/Metrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import Swiper from 'react-native-swiper';
import {useCartContext} from '../context/cart_context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import images from '../Utils/images';
import Fonts from '../Utils/Fonts';
import Cart from '../assets/icon2/cart12.svg';

const DATA = [
  {id: 1, karat: 18},
  {id: 2, karat: 22},
  {id: 3, karat: 24},
];

const DATA1 = [
  {id: 1, karat: 2.4},
  {id: 2, karat: 3.6},
  {id: 3, karat: 4.5},
];
const Viewproduct = props => {
  const [getid, SetId] = useState(props.route.params.iid);
  const [getdata, SetData] = useState(props.route.params.data);
  const [getcheck, SetCheck] = useState(props.route.params.chack);
  const [get_redqty, Set_RedQty] = useState(props.route.params.red_qty);
  const [gettext, SetText] = useState();
  const [gettext1, SetText1] = useState();
  const [imgarray, SetImgArray] = useState([]);
  const [proname, SetProName] = useState();
  const [karat, SetKarat] = useState([]);
  const [size, SetSize] = useState([]);
  const [getgross, SetGross] = useState();
  const [getnet, SetNet] = useState();
  const [getstone, SetStone] = useState();
  const [stonean, SetStoneAn] = useState();

  const [getrate, SetRate] = useState();
  const [isloading, SetLoading] = useState(false);
  const [getremark, SetRemark] = useState('');
  const [getuser, SetUser] = useState('');
  const [gettotal_cart, SetTotal_Cart] = useState('');
  const [getunity, SetUnity] = useState();
  const [getcarticon, SetCartIcon] = useState();
  const [getwishicon, SetWishIcon] = useState();
  const [getmodal, SetModal] = useState(false);
  const [img_url, SetImg_uel] = useState('');

  const {
    addToCart,
    cart,
    increase_qty,
    decrease_qty,
    total,
    removeFromCart,
    qty,
    total_qty,
  } = useCartContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getsubcat();
      get_Count();
      // AsyncStorage.getItem('rate').then(val => {
      //   console.log(val);
      //   SetUser(JSON.parse(val));
      // });
    });

    return unsubscribe;
  }, [props]);

  const addValueInCart = async item => {
    // console.log('item-->', item);
    var object = await {
      ...item,
      user_qty: 1,
      remark: getremark,
    };
    var data = await object;
    // console.log('----value:', data.user_qty);
    Set_RedQty(data.user_qty);

    addToCart(data);
  };
  const getsubcat = async () => {
    SetLoading(true);
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();
    fromdata.append('id', getid);
    // console.log('fromdata-->', fromdata);

    axios
      .post(BASE_URL + 'get-product-detail', fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('product detlis-->>', res.data);
        if (res.data.success === 1) {
          SetProId(res.data.data.id);
          SetText(res.data.data.purity_id);
          SetSize(res.data.data.array_sizes);
          SetText1(res.data.data.size_id);
          SetImgArray(res.data.data.productimages);
          SetProName(res.data.data.name);

          SetKarat(res.data.data.array_purity);
          SetGross(res.data.data.gross_weight);
          SetNet(res.data.data.net_weight);
          SetStone(res.data.data.stone_weight);
          SetStoneAn(res.data.data.stone_amount);
          SetRate(res.data.data.rates.name);
          SetUnity(res.data.data.units.name);
          SetCartIcon(res.data.data.cart);
          SetWishIcon(res.data.data.wishlist);
          SetQty(res.data.data.cart_qty);
          SetLoading(false);
        } else {
          // console.log('token exprire..');
          SetLoading(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        SetLoading(false);
        // Toast.show('somthing worng please try angin..!!');
      });
  };

  const [getproid, SetProId] = useState('');
  const [getqty, SetQty] = useState(props.route.params.data);
  const [is_loading, Set_Loading] = useState(false);

  const apiaddtocart = async () => {
    Set_Loading(true);
    const formdata = new FormData();
    formdata.append('product_id', getproid);
    formdata.append('size_id', gettext1);
    formdata.append('purity_id', gettext);
    formdata.append('quantity', getqty === '' || getqty == 0 ? 1 : getqty);
    formdata.append('remark', getremark);
    console.log('formdata-->', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'add-cart', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('respons-->', res.data);
        if (res.data.success === 1) {
          if (getqty == 0) {
            SetQty(1);
          }
          get_Count();
          Toast.show(res.data.message);
          Set_Loading(false);
        }
      })
      .catch(err => {
        // console.log('errr-->', err);
        Set_Loading(false);
      });
  };
  const apiaddtocart1 = async () => {
    Set_Loading(true);
    const formdata = new FormData();
    formdata.append('product_id', getproid);
    formdata.append('size_id', gettext1);
    formdata.append('purity_id', gettext);
    formdata.append('quantity', 1);
    formdata.append('remark', getremark);
    console.log('formdata-->', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'add-cart', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('respons-->', res.data);
        if (res.data.success === 1) {
          get_Count();
          getsubcat();
          Toast.show(res.data.message);
          Set_Loading(false);
        }
      })
      .catch(err => {
        // console.log('errr-->', err);
        Set_Loading(false);
      });
  };

  const get_Count = async () => {
    // console.log('idd-->', getid);
    SetLoading(true);
    const Token = await AsyncStorage.getItem('token');

    axios
      .get(BASE_URL + 'count-cart', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('subcat-->>', res.data);
        SetTotal_Cart(res.data.data);
        SetUser(res.data.rate);
        SetLoading(false);
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
        SetLoading(false);
      });
  };

  const Qtyupdate = async () => {
    const formdata = new FormData();
    formdata.append('product_id', getid);
    formdata.append('quantity', Number(getqty) + 1);

    console.log('fromdata-=-=>', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'update-cart-list', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('lofff', res.data);
        Toast.show(res.data.message);
        getsubcat();
        get_Count();
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const Qtyupdate1 = async () => {
    const formdata = new FormData();
    formdata.append('product_id', getid);
    formdata.append('quantity', Number(getqty) - 1);

    // console.log('fromdata-=-=>', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'update-cart-list', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('lofff', res.data);
        Toast.show(res.data.message);
        getsubcat();
        get_Count();
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const deleteitem = async () => {
    const formdata = new FormData();
    formdata.append('product_id', getid);
    console.log('madhva');
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'delete-cart-list', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('lofff', res.data);
        Toast.show(res.data.message);
        getsubcat();
        get_Count();
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const purtychnage = async id => {
    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('purity_id', id);

    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'get-product-detail-purity', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        SetGross(res.data.gross_weight);
        SetNet(res.data.net_weight);
        // console.log('lofff', res.data);
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          marginTop: Platform.OS === 'ios' ? metrics.HEIGHT * 0.04 : 0,
          backgroundColor: Colors.white,
          height: metrics.HEIGHT * 0.08,
          // elevation: 5,
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack(null)}
          style={{
            justifyContent: 'center',
            left: '20%',
            width: '10%',
          }}>
          <MaterialIcons
            name="keyboard-arrow-left"
            color={Colors.black}
            size={33}
            style={{}}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            left: '50%',
            width: '75%',
            // backgroundColor: 'red',
          }}>
          {/* <Text style={{color: Colors.black, fontSize: 25}}>{proname}</Text> */}
          <Text
            style={{
              color: Colors.black,
              fontSize: 20,
              fontFamily: Fonts.FontsType.Poppins_Regular,
            }}>
            Back
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('WishList')}
          style={{
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: Colors.lightbackground,
            alignItems: 'center',
          }}>
          <AntDesign name="hearto" size={20} color={Colors.black} />
          {/* <FontAwesome
              name="user-circle-o"
              color={Colors.themecolor}
              size={28}
              style={{}}
            /> */}
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Cart');
          }}
          style={{justifyContent: 'center', width: '10%'}}>
          <FontAwesome5
            name="shopping-cart"
            color={Colors.themecolor}
            size={25}
          />
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: 'red',
              borderRadius: 50,
              position: 'absolute',
              right: -5,
              top: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 13}}>{gettotal_cart}</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      {isloading === true ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.transparentBlack,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={Colors.themecolor} />
          <Text
            style={{
              color: Colors.themecolor,
              fontFamily: Fonts.FontsType.Poppins_Regular,
              fontSize: 16,
              marginTop: 2,
            }}>
            Please wait...
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              marginTop: metrics.HEIGHT * 0.01,
              // height: metrics.WIDTH * 0.73,
              height: 270,
            }}>
            <Swiper
              key={imgarray.length}
              showsButtons={true}
              buttonWrapperStyle={{}}
              nextButton={
                // <Text style={{color: Colors.black, size:30}}>›</Text>
                <SimpleLineIcons
                  name="arrow-right"
                  size={20}
                  color={Colors.black}
                />
              }
              prevButton={
                <SimpleLineIcons
                  name="arrow-left"
                  size={20}
                  color={Colors.black}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: Colors.black,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: '2%',
                  }}
                />
              }
              dot={
                <View
                  style={{
                    backgroundColor: Colors.gray,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: '2%',
                  }}
                />
              }>
              {imgarray.map((item, index) => {
                return (
                  <View
                    style={{
                      elevation: 8,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 4.65,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: '2%',
                      }}>
                      {/* {getcarticon == 1 ? (
                        <TouchableOpacity>
                          <Ionicons
                            name="ios-cart"
                            size={35}
                            color={'#1D811D'}
                          />
                        </TouchableOpacity>
                      ) : null} */}
                      {/* {getwishicon == 1 ? (
                        <TouchableOpacity>
                          <Ionicons
                            name="heart-circle-outline"
                            size={35}
                            color={'#1D811D'}
                          />
                        </TouchableOpacity>
                      ) : null} */}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        SetImg_uel(item.image_full_path);
                        SetModal(true);
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.lightbackground,
                          alignItems: 'center',
                          width: 275,
                          height: 250,
                          alignSelf: 'center',
                          // paddingBottom: 10,
                        }}>
                        <FastImage
                          source={{
                            uri: item.image_full_path,
                            priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                          // resizeMode={FastImage.resizeMode.center}
                          style={{
                            width: 273,
                            height: 248,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </Swiper>
            {imgarray.length === 0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '2%',
                  }}>
                  {getcarticon == 1 ? (
                    <TouchableOpacity>
                      <Ionicons name="ios-cart" size={35} color={'#1D811D'} />
                    </TouchableOpacity>
                  ) : null}
                  {getwishicon == 1 ? (
                    <TouchableOpacity>
                      <Ionicons
                        name="heart-circle-outline"
                        size={35}
                        color={'#1D811D'}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <FastImage
                  source={require('../assets/logo.png')}
                  // resizeMode={FastImage.resizeMode.center}
                  style={{
                    width: metrics.WIDTH * 1,
                    height: metrics.WIDTH * 0.6,
                  }}></FastImage>
              </>
            ) : null}
          </View>
          {/* <View
            style={{
              // backgroundColor: ,
              flexDirection: 'row',
              height: metrics.HEIGHT * 0.08,
              backgroundColor: Colors.white,
              elevation: 5,
              // justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                marginHorizontal: '2%',
                width: '20%',
              }}>
              <Text
                style={{color: Colors.black, fontSize: 16, fontWeight: 'bold'}}>
                Quantity:
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: Colors.gray,
                width: '40%',
                height: metrics.HEIGHT * 0.06,
                marginTop: metrics.HEIGHT * 0.01,
                justifyContent: 'center',
                backgroundColor: Colors.white,
                elevation: 8,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.black,
                  fontSize: 16,
                }}>
                {getqty === '' ? 1 : getqty}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                getqty == 0 ? apiaddtocart1() : Qtyupdate();
              }}
              // onPress={() => {
              //   SetQty(Number(getqty) + 1);
              // }}
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 5,
                height: metrics.HEIGHT * 0.06,
                width: metrics.WIDTH * 0.1,
                justifyContent: 'center',
                elevation: 5,
                backgroundColor: Colors.white,
                // right: metrics.HEIGHT * 0.01,
                marginLeft: metrics.HEIGHT * 0.02,
              }}>
              <AntDesign
                name="plus"
                color={Colors.black}
                size={20}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                getqty == 0 ? null : getqty > 1 ? Qtyupdate1() : deleteitem();
              }}
              // onPress={() => {
              //   getqty > 0 ? SetQty(Number(getqty) - 1) : null;
              // }}
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                borderRadius: 5,
                height: metrics.HEIGHT * 0.06,
                width: metrics.WIDTH * 0.1,
                justifyContent: 'center',
                elevation: 5,
                backgroundColor: Colors.white,
                // right: metrics.HEIGHT * 0.03,
                marginLeft: metrics.HEIGHT * 0.02,
              }}>
              <AntDesign
                name="minus"
                color={Colors.black}
                size={20}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View> */}
          <View style={{marginTop: 15, marginHorizontal: '11%'}}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.black,
                  fontFamily: Fonts.FontsType.Poppins_Medium,
                }}>
                {proname}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                // backgroundColor: 'red',
                width: 200,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  fontFamily: Fonts.FontsType.Poppins_Medium,
                }}>
                Qty :
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: metrics.HEIGHT * 0.01,
                    marginBottom: metrics.HEIGHT * 0.01,
                    justifyContent: 'space-between',
                    marginHorizontal: '2%',
                    backgroundColor: Colors.white,
                    elevation: 7,
                    padding: 5,
                    borderRadius: 8,
                    alignItems: 'center',
                    width: 100,

                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      getqty == 0
                        ? null
                        : getqty > 1
                        ? Qtyupdate1()
                        : deleteitem();
                    }}
                    // onPress={() => {
                    //   getqty > 0 ? SetQty(Number(getqty) - 1) : null;
                    // }}
                    style={{
                      borderRadius: 5,
                      padding: 6,
                      // height: metrics.HEIGHT * 0.05,
                      // width: metrics.WIDTH * 0.09,
                      justifyContent: 'center',
                      elevation: 2,
                      backgroundColor: Colors.lightbackground,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                    }}>
                    <Entypo
                      name="minus"
                      color={Colors.black}
                      size={15}
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.black,
                        fontSize: 16,
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                      }}>
                      {getqty === '' ? 1 : getqty}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      getqty == 0 ? apiaddtocart1() : Qtyupdate();
                    }}
                    // onPress={() => {
                    //   SetQty(Number(getqty) + 1);
                    // }}
                    style={{
                      borderRadius: 5,
                      padding: 6,
                      // height: metrics.HEIGHT * 0.05,
                      // width: metrics.WIDTH * 0.09,
                      justifyContent: 'center',
                      elevation: 2,
                      backgroundColor: Colors.lightbackground,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                    }}>
                    <Entypo
                      name="plus"
                      color={Colors.black}
                      size={15}
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                  {/* <View
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.2,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.black,
                                fontSize: 16,
                              }}>
                              {redux_item === undefined
                                ? 0
                                : redux_item.cart_qty}
                            </Text>
                          </View> */}

                  {/* <TouchableOpacity
                            onPress={() =>
                              item.cart_qty == 0
                                ? apiaddtocart(item)
                                : Qtyupdate(item.id, redux_item.cart_qty)
                            }
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="plus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              redux_item.cart_qty == 0
                                ? null
                                : redux_item.cart_qty > 1
                                ? Qtyupdate1(item.id, redux_item.cart_qty)
                                : deleteitem(item.id);
                            }}
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="minus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity> */}
                </View>
                {/* <TouchableOpacity
                  onPress={() => {
                    apiaddtocart(item);
                  }}
                  style={{
                    marginLeft: 6,
                    backgroundColor: Colors.white,
                    padding: 5,
                    borderRadius: 8,
                    elevation: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name="add-shopping-cart"
                    size={23}
                    color={Colors.black}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                // backgroundColor: 'red',
                width: 230,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  // marginHorizontal: '2%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Medium,
                  }}>
                  Purity:
                </Text>
              </View>
              <View style={{}}>
                <FlatList
                  data={karat}
                  numColumns={4}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          SetText(item.id);
                          purtychnage(item.id);
                        }}
                        style={{
                          marginTop: metrics.HEIGHT * 0.01,
                          borderRadius: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: 40,

                          elevation: 5,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          backgroundColor:
                            item.id == gettext
                              ? Colors.themecolor
                              : Colors.white,
                          marginLeft: 12,
                          // borderColor:
                          //   item.id == gettext
                          //     ? Colors.themecolor
                          //     : Colors.themecolor,
                          // borderWidth: 0.5,
                          marginBottom: 5,
                        }}>
                        <Text
                          style={{
                            // marginTop: 5,
                            textAlign: 'center',
                            color:
                              item.id == gettext ? Colors.black : Colors.black,
                            fontWeight: item.id == gettext ? '700' : '400',
                            fontFamily:
                              item.id == gettext
                                ? Fonts.FontsType.Poppins_Medium
                                : Fonts.FontsType.Poppins_Regular,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                // backgroundColor: 'red',
                width: 220,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  fontFamily: Fonts.FontsType.Poppins_Medium,
                }}>
                Size :
              </Text>
              <View
                style={{
                  width: 130,
                  backgroundColor: Colors.white,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Dropdown
                  data={size}
                  placeholder="Select Size"
                  search
                  searchPlaceholder="Search Size"
                  value={gettext1}
                  labelField="name"
                  valueField="id"
                  itemTextStyle={{
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}
                  inputSearchStyle={{
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}
                  style={{
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                    // width: 90,
                    // padding: 10,
                  }}
                  placeholderStyle={{
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}
                  selectedTextStyle={{
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                    fontSize: 16,
                  }}
                  onChange={(itemValue, itemIndex) => {
                    SetText1(itemValue.id);
                  }}
                  renderRightIcon={() => (
                    <View
                      style={{
                        padding: 3,
                        backgroundColor: Colors.lightbackground,
                        borderRadius: 3,
                        elevation: 3,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                      }}>
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={20}
                        color={Colors.black}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                // backgroundColor: 'red',
                width: 275,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  // marginHorizontal: '2%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Medium,
                  }}>
                  Remark :
                </Text>
              </View>
              <View
                style={{
                  marginTop: metrics.HEIGHT * 0.01,
                  // height: metrics.HEIGHT * 0.06,
                  width: 185,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor: Colors.white,
                  borderRadius: 5,
                }}>
                <TextInput
                  placeholder="Enter Remark"
                  placeholderTextColor={Colors.g}
                  style={{
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                    padding: Platform.OS === 'ios' ? 10 : null,
                  }}
                  onChangeText={Val => SetRemark(Val)}
                />
              </View>
            </View>
          </View>

          {/* <View
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              flexDirection: 'row',
              height: metrics.HEIGHT * 0.08,
              backgroundColor: Colors.white,
              elevation: 5,
            }}>
            <View
              style={{
                justifyContent: 'center',
                marginHorizontal: '2%',
              }}>
              <Text
                style={{color: Colors.black, fontSize: 16, fontWeight: 'bold'}}>
                Remarks:
              </Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                height: metrics.HEIGHT * 0.06,
                width: metrics.WIDTH * 0.75,
                elevation: 5,
                backgroundColor: Colors.white,
              }}>
              <TextInput
                placeholder="Enter Remark"
                onChangeText={Val => SetRemark(Val)}
              />
            </View>
          </View> */}

          {/* <View
            style={{
              flexDirection: 'row',
              marginBottom: '5%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                marginHorizontal: '2%',
              }}>
              <Text
                style={{color: Colors.black, fontSize: 16, fontWeight: 'bold'}}>
                Size:
              </Text>
            </View>
            <View style={{}}>
              <FlatList
                data={size}
                numColumns={4}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => SetText1(item.id)}
                      style={{
                        marginTop: metrics.HEIGHT * 0.02,

                        height: metrics.HEIGHT * 0.055,
                        width: metrics.WIDTH * 0.15,
                        justifyContent: 'center',
                        elevation: 5,
                        backgroundColor:
                          item.id == gettext1
                            ? Colors.themecolor
                            : Colors.white,
                        marginLeft: 10,
                        borderColor:
                          item.id == gettext1
                            ? Colors.themecolor
                            : Colors.themecolor,
                        borderWidth: 0.5,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          marginTop: 5,
                          textAlign: 'center',
                          color:
                            item.id == gettext1
                              ? Colors.white
                              : Colors.themecolor,
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View> */}
          <View
            style={{
              marginHorizontal: '10%',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontFamily: Fonts.FontsType.Poppins_Medium,
              }}>
              Product Detail:
            </Text>
            {/* <TouchableOpacity
              onPress={() => apiaddtocart()}
              style={{
                width: 170,
                backgroundColor: Colors.themecolor,
                justifyContent: 'space-around',
                padding: 10,
                borderRadius: 10,
                elevation: 5,
                alignSelf: 'center',
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {is_loading === true ? (
                <ActivityIndicator
                  color={Colors.white}
                  size="small"
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <>
                  <MaterialIcons
                    name="add-shopping-cart"
                    size={30}
                    color={Colors.black}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Colors.black,
                      fontWeight: '400',
                      fontSize: 15,
                    }}>
                    ADD TO CART
                  </Text>
                </>
              )}
            </TouchableOpacity> */}
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}>
                  Gross Wt
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    marginTop: 5,
                    fontFamily: Fonts.FontsType.Poppins_SemiBold,
                  }}>
                  {Number(getgross).toFixed(3)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}>
                  Net Wt
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    marginTop: 5,
                    fontFamily: Fonts.FontsType.Poppins_SemiBold,
                  }}>
                  {Number(getnet).toFixed(3)}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}>
                  Stone Amount
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontFamily: Fonts.FontsType.Poppins_SemiBold,
                  }}>
                  {stonean}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}>
                  Unit
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontFamily: Fonts.FontsType.Poppins_SemiBold,
                  }}>
                  {getunity}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}>
                  Stone weight
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    fontFamily: Fonts.FontsType.Poppins_SemiBold,
                  }}>
                  {getstone}
                </Text>
              </View>
            </View>
            {getuser === 1 ? (
              <View
                style={{
                  marginTop: metrics.HEIGHT * 0.01,
                  padding: '3.5%',
                  backgroundColor: Colors.white,
                  marginBottom: metrics.HEIGHT * 0.01,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontFamily: Fonts.FontsType.Poppins_Regular,
                    }}>
                    Rate
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      fontFamily: Fonts.FontsType.Poppins_SemiBold,
                    }}>
                    {getrate}
                  </Text>
                </View>
              </View>
            ) : null}

            {/* <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.black, fontSize: 16}}>Net Wt</Text>
              <Text style={{color: Colors.black, fontSize: 16}}>{getnet}</Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.black, fontSize: 16}}>Stone Wt</Text>
              <Text style={{color: Colors.black, fontSize: 16}}>
                {getstone}
              </Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.black, fontSize: 16}}>
                Stone Amount
              </Text>
              <Text style={{color: Colors.black, fontSize: 16}}>{stonean}</Text>
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.black, fontSize: 16}}>Unit</Text>
              <Text style={{color: Colors.black, fontSize: 16}}>
                {getunity}
              </Text>
            </View>
            {getuser === 1 ? (
              <View
                style={{
                  marginTop: metrics.HEIGHT * 0.01,
                  padding: '3.5%',
                  backgroundColor: Colors.white,
                  borderColor: Colors.gray,
                  borderWidth: 0.5,
                  marginBottom: metrics.HEIGHT * 0.01,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: Colors.black, fontSize: 16}}>Rate</Text>
                <Text style={{color: Colors.black, fontSize: 16}}>
                  {getrate}
                </Text>
              </View>
            ) : null} */}
          </View>
        </ScrollView>
      )}
      {isloading === true ? null : (
        <View
          style={{
            marginTop: metrics.HEIGHT * 0.01,
            marginBottom: metrics.HEIGHT * 0.01,
            flexDirection: 'row',
            marginHorizontal: '2%',
            justifyContent: 'space-between',
          }}>
          {/* <TouchableOpacity
          style={{
            width: '45%',
            backgroundColor: Colors.themecolor,
            justifyContent: 'center',
            padding: '5%',
            borderRadius: 5,
            elevation: 5,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: Colors.white,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            ADD TO WISHLIST
          </Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => apiaddtocart()}
            style={{
              width: '45%',
              backgroundColor: Colors.themecolor,
              justifyContent: 'center',
              padding: '5%',
              borderRadius: 5,
              elevation: 5,
            }}>
            {is_loading === true ? (
              <ActivityIndicator
                color={Colors.white}
                size="small"
                style={{alignSelf: 'center'}}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.white,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                ADD TO CART
              </Text>
            )}
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => apiaddtocart()}
            style={{
              width: 170,
              backgroundColor: Colors.themecolor,
              justifyContent: 'space-around',
              padding: 8,
              borderRadius: 10,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              alignSelf: 'center',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '5%',
              // position: 'absolute',
              // bortt
            }}>
            {is_loading === true ? (
              <ActivityIndicator
                color={Colors.white}
                size="small"
                style={{alignSelf: 'center'}}
              />
            ) : (
              <>
                {/* <MaterialIcons
                  name="add-shopping-cart"
                  size={30}
                  color={Colors.black}
                /> */}
                {/* <Image source={images.cartblack} resizeMode="contain" /> */}
                <Cart width={30} height={30} />
                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                    fontSize: 15,
                  }}>
                  Add to cart
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={getmodal}
        // visible={true}
        onRequestClose={() => SetModal(false)}>
        <View style={{flex: 1, backgroundColor: Colors.black}}>
          {Platform.OS === 'ios' ? (
            <MaterialCommunityIcons
              name="close"
              color={Colors.white}
              size={34}
              style={{
                marginTop: '5%',
                left: '5%',
              }}
              onPress={() => SetModal(false)}
            />
          ) : (
            <MaterialCommunityIcons
              name="close"
              color={Colors.white}
              size={32}
              style={{
                padding: '3%',
                position: 'absolute',
                right: '2%',
                top: '2%',
              }}
              onPress={() => SetModal(false)}
            />
          )}

          <ImageViewer
            imageUrls={[{url: img_url}]}
            saveToLocalByLongPress={false}
            // imageUrls={this.state.image_array}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Viewproduct;
