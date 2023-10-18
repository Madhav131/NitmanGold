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
  Platform,
} from 'react-native';
import Colors from '../Utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import metrics from '../Utils/Metrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import Swiper from 'react-native-swiper';
import {useCartContext} from '../context/cart_context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
const Updatecart = props => {
  const [getid, SetId] = useState(props.route.params.iid);
  const [getdata, SetData] = useState(props.route.params.data);
  const [getcheck, SetCheck] = useState(props.route.params.chack);
  const [get_redqty, Set_RedQty] = useState(props.route.params.red_qty);
  const [gettext, SetText] = useState();
  const [gettext1, SetText1] = useState();
  const [imgarray, SetImgArray] = useState();
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
  const [getqty, SetQty] = useState();
  const [gettotal_cart, SetTotal_Cart] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getsubcat();
      get_Count();
      AsyncStorage.getItem('rate').then(val => {
        // console.log(val);
        SetUser(JSON.parse(val));
      });
    });

    return unsubscribe;
  }, [props]);

  const getsubcat = async () => {
    SetLoading(true);
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();
    fromdata.append('id', getid);
    // console.log('fromdata-->', fromdata);

    axios
      .post(BASE_URL + 'edit-cart', fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('product detlis-->>', res.data);
        if (res.data.success === 1) {
          SetProId(res.data.data.id);
          SetQty(res.data.data.quantity);
          SetRemark(res.data.data.remark);
          SetText(res.data.data.purity_id);
          SetKarat(res.data.array_puritys);
          SetSize(res.data.array_sizes);
          SetText1(res.data.data.size_id);
          SetImgArray(res.data.data.product_image);
          SetProName(res.data.data.productdetails.name);

          SetGross(res.data.data.gross_wt);
          SetNet(res.data.data.net_wt);
          SetStone(res.data.data.stone_wt);
          SetStoneAn(res.data.data.stone_amount);
          SetRate(res.data.data.rates.name);

          SetLoading(false);
        } else {
          // console.log('token exprire..');
          SetLoading(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        SetLoading(false);
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
        SetLoading(false);
      })
      .catch(err => {
        // console.log('errror-->>', err);

        SetLoading(false);
      });
  };
  const [getproid, SetProId] = useState('');

  const [is_loading, Set_Loading] = useState(false);

  const apiaddtocart = async () => {
    Set_Loading(true);
    const formdata = new FormData();
    formdata.append('id', getproid);
    formdata.append('size_id', gettext1);
    formdata.append('purity_id', gettext);
    formdata.append('quantity', getqty);
    formdata.append(
      'remark',
      getremark === null || getremark === '' || getremark === undefined
        ? ''
        : getremark,
    );
    console.log('formdata-->', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'update-cart', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('respons-->', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          get_Count();
          props.navigation.goBack(null);
          Set_Loading(false);
        }
      })
      .catch(err => {
        // console.log('errr-->', err);
        Set_Loading(false);
      });
  };

  const deleteitem = async () => {
    const formdata = new FormData();
    formdata.append('id', getid);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'delete-cart', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('lofff', res.data);
        get_Count();
        props.navigation.goBack(null);
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const purtychnage = async id => {
    const formdata = new FormData();
    formdata.append('id', getproid);
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
      {/* <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          marginTop: Platform.OS === 'ios' ? metrics.HEIGHT * 0.04 : 0,
          backgroundColor: Colors.white,
          height: metrics.HEIGHT * 0.08,
          elevation: 5,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack(null)}
          style={{
            justifyContent: 'center',
            left: '20%',
            width: '10%',
          }}>
          <Ionicons
            name="arrow-back-outline"
            color={Colors.black}
            size={35}
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
          <Text style={{color: Colors.black, fontSize: 25}}>{proname}</Text>
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View> */}
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
              top: 2,
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
              height: metrics.WIDTH * 0.72,
            }}>
            <View
              style={{
                // elevation: 8,
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.lightbackground,
                alignItems: 'center',
                width: 275,
                height: 250,
                alignSelf: 'center',
              }}>
              <FastImage
                source={
                  imgarray === '' || imgarray === null
                    ? require('../assets/logo.png')
                    : {
                        uri: imgarray,
                        priority: FastImage.priority.high,
                      }
                }
                resizeMode={FastImage.resizeMode.contain}
                // resizeMode={FastImage.resizeMode.center}
                style={{
                  width: 273,
                  height: 248,
                  borderRadius: 10,
                }}
              />
            </View>
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
                {getqty}
              </Text>
              
            </View>

            <TouchableOpacity
              onPress={() => {
                SetQty(Number(getqty) + 1);
              }}
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
                getqty > 0 ? SetQty(Number(getqty) - 1) : null;
              }}
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
            {/* <View
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
                {getqty}
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                // backgroundColor: 'red',
                // width: 200,
                // justifyContent: 'space-between',
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
                    // onPress={() => {
                    //   getqty == 0
                    //     ? null
                    //     : getqty > 1
                    //     ? Qtyupdate1()
                    //     : deleteitem();
                    // }}
                    onPress={() => {
                      getqty > 1 ? SetQty(Number(getqty) - 1) : null;
                    }}
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
                    // onPress={() => {
                    //   getqty == 0 ? apiaddtocart1() : Qtyupdate();
                    // }}
                    onPress={() => {
                      SetQty(Number(getqty) + 1);
                    }}
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
                // marginTop: 15,
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

                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                        }}>
                        <Text
                          style={{
                            // marginTop: 5,
                            textAlign: 'center',
                            color:
                              item.id == gettext ? Colors.black : Colors.black,
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
                marginTop: 20,
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
                  padding: 5,
                  borderRadius: 5,

                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
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
                    fontSize: 16,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
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

                height: metrics.HEIGHT * 0.06,
                width: metrics.WIDTH * 0.75,
                elevation: 5,
                backgroundColor: Colors.white,
              }}>
              <TextInput
                onChangeText={Val => SetRemark(Val)}
                value={getremark}
              />
            </View>
          </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'center',
                marginHorizontal: '2%',
              }}>
              <Text
                style={{color: Colors.black, fontSize: 16, fontWeight: 'bold'}}>
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
                      onPress={() => SetText(item.id)}
                      style={{
                        marginTop: metrics.HEIGHT * 0.01,

                        height: metrics.HEIGHT * 0.056,
                        width: metrics.WIDTH * 0.15,
                        justifyContent: 'center',
                        elevation: 5,
                        backgroundColor:
                          item.id == gettext ? Colors.themecolor : Colors.white,
                        marginLeft: 10,
                        borderColor:
                          item.id == gettext
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
                            item.id == gettext
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
              Product Detalis:
            </Text>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.01,
                padding: '3.5%',
                backgroundColor: Colors.white,
                // borderColor: Colors.gray,
                // borderWidth: 0.5,
                marginBottom: metrics.HEIGHT * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 14,
                  fontFamily: Fonts.FontsType.Poppins_Regular,
                }}>
                Gross Wt
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
                }}>
                {Number(getgross).toFixed(3)}
              </Text>
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
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 14,
                  fontFamily: Fonts.FontsType.Poppins_Regular,
                }}>
                Net Wt
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
                }}>
                {Number(getnet).toFixed(3)}
              </Text>
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
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 14,
                  fontFamily: Fonts.FontsType.Poppins_Regular,
                }}>
                Stone Wt
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

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                // backgroundColor: 'red',
                width: '90%',
                justifyContent: 'space-between',
                marginBottom: 5,
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
                  placeholderTextColor={Colors.gray}
                  style={{
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                    padding: Platform.OS === 'ios' ? 10 : null,
                  }}
                  onChangeText={Val => SetRemark(Val)}
                  value={getremark}
                />
              </View>
            </View>
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
          <TouchableOpacity
            onPress={() => apiaddtocart()}
            style={{
              width: 170,
              backgroundColor: Colors.themecolor,
              justifyContent: 'space-around',
              padding: 8,
              borderRadius: 10,
              elevation: 5,
              alignSelf: 'center',
              marginTop: 10,
              // paddingLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '5%',
              // position: 'absolute',
              // bortt

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
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
                <Cart width={30} height={30} />
                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                    fontSize: 15,
                  }}>
                  Update cart
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Updatecart;
