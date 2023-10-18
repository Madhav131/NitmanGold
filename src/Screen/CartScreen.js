import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  AsyncStorage,
  Platform,
} from 'react-native';
import Colors from '../Utils/colors';
import HeaderScreen from '../components/Header';
import metrics from '../Utils/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useCartContext} from '../context/cart_context';
import Toast from 'react-native-simple-toast';
import RNModal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../Utils/Fonts';
import Search from '../assets/icon2/magnifying-glass2.svg';

const DATA = [
  {
    id: 1,
    name: 'SWP-344',
    GWT: '5',
    NWT: '3',
    TGWT: '2',
    st: '5',
    pic: '1',
    re_mark: 'hello',
    KT: '3',
    img: require('../assets/sub4.jpeg'),
  },
  {
    id: 2,
    name: 'SWP-344',
    GWT: '5',
    NWT: '3',
    TGWT: '2',
    st: '5',
    pic: '1',
    re_mark: 'hello',
    KT: '3',
    img: require('../assets/sub4.jpeg'),
  },
  {
    id: 3,
    name: 'SWP-344',
    GWT: '5',
    NWT: '3',
    TGWT: '2',
    st: '5',
    pic: '1',
    re_mark: 'hello',
    KT: '3',
    img: require('../assets/sub4.jpeg'),
  },
  {
    id: 4,
    name: 'SWP-344',
    GWT: '5',
    NWT: '3',
    TGWT: '2',
    st: '5',
    pic: '1',
    re_mark: 'hello',
    KT: '3',
    img: require('../assets/sub4.jpeg'),
  },
  {
    id: 5,
    name: 'SWP-344',
    GWT: '5',
    NWT: '3',
    TGWT: '2',
    st: '5',
    pic: '1',
    re_mark: 'hello',
    KT: '3',
    img: require('../assets/sub4.jpeg'),
  },
  {
    id: 6,
    name: 'SWP-344',
    GWT: '5',
    NWT: '3',
    TGWT: '2',
    st: '5',
    pic: '1',
    re_mark: 'hello',
    KT: '3',
    img: require('../assets/sub4.jpeg'),
  },
];

const CartScreen = props => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      SetRemark('');
      getcart();
    });

    return unsubscribe;
  }, [props]);

  const {
    cart,
    removeFromCart,
    total,
    increase_qty,
    decrease_qty,
    PlaceOrder,
    total_qty,
    isloading,
    total1,
  } = useCartContext();

  const [getremark, SetRemark] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [getpurity, SetPurity] = useState([]);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [getpurity1, SetPurity1] = useState([]);
  const [getpuid, SetPuId] = useState();
  const [getsiid, SetSiId] = useState();
  const [loading, SetLoading12] = useState(false);
  const [task_arrayholder, setBranchArray] = useState([]);
  const submit = async () => {
    SetLoading12(true);
    const Token = await AsyncStorage.getItem('token');
    const formData = new FormData();

    formData.append('remark', getremark);

    axios
      .post(BASE_URL + 'place-order', formData, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('cart-->>', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          getcart();
          SetLoading12(false);
        } else {
          Toast.show(res.data.message);
          SetLoading12(false);
        }
      })
      .catch(err => {
        SetLoading12(false);
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
      });
  };
  const getlist = async () => {
    const Token = await AsyncStorage.getItem('token');
    const formData = new FormData();

    formData.append('ali', 'ali');

    axios
      .post(BASE_URL + 'get-instructions', formData, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('cart-->>', JSON.stringify(res.data.data, null, 2));
        if (res.data.success === 1) {
          props.navigation.navigate('Instructions', {
            item: res.data.data,
            remark: getremark,
          });
        } else {
          Toast.show(res.data.message);
        }
      })
      .catch(err => {});
  };

  const [get_cart, Set_Cart] = useState([]);
  const [gettotalqty, SetTotalQty] = useState('');
  const [gettotalgt, SetTotalGt] = useState('');
  const [getTotalnt, SetTotalNt] = useState('');
  const [is_loading, Set_Loading] = useState(false);
  const [is_loading1, Set_Loading1] = useState(false);

  const getcart = async () => {
    Set_Loading(true);
    const Token = await AsyncStorage.getItem('token');

    axios
      .get(BASE_URL + 'get-cart', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('cart-->>', res.data);
        if (res.data.success === 1) {
          Set_Cart(res.data.data);
          setBranchArray(res.data.data);
          SetTotalQty(res.data.total_qty);
          SetTotalGt(res.data.total_gross_wt);
          SetTotalNt(res.data.total_net_wt);
          Set_Loading(false);
        }
      })
      .catch(err => {
        Set_Loading(false);
        // console.log('errror-->>', err);
      });
  };

  const deletecart = async id => {
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();
    Set_Loading1(true);
    fromdata.append('id', id);
    // console.log('fromdata-->', fromdata);
    axios
      .post(BASE_URL + 'delete-cart', fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('dalete cart-->>', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          getcart();
          Set_Loading1(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        Set_Loading1(false);
      });
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.productdetails.name
        ? item.productdetails.name.toUpperCase()
        : ''.toUpperCase();
      //  const code1 = item.order_number
      //    ? item.order_number.toUpperCase()
      //    : ''.toUpperCase();
      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
      //  || code1.indexOf(textData) > -1;
    });

    Set_Cart(newData);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {/* <HeaderScreen navigation={props.navigation} /> */}
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
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('WishList')}
          style={{
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: Colors.lightbackground,
            alignItems: 'center',
          }}>
          <AntDesign name="hearto" size={20} color={Colors.black} /> */}
        {/* <FontAwesome
              name="user-circle-o"
              color={Colors.themecolor}
              size={28}
              style={{}}
            /> */}
        {/* </TouchableOpacity> */}
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
      <View
        style={{
          borderRadius: 40,
          elevation: 5,
          marginHorizontal: '5%',
          backgroundColor: Colors.white,
          marginTop: 10,
          padding: 3,
          marginBottom: metrics.HEIGHT * 0.02,
          flexDirection: 'row',
          paddingHorizontal: '5%',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <TextInput
          placeholder="Search here..."
          placeholderTextColor={Colors.gray}
          style={{
            fontSize: 16,
            width: '90%',
            fontFamily: Fonts.FontsType.Poppins_Regular,
            padding: Platform.OS === 'ios' ? 12 : 0,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
        <View style={{justifyContent: 'center'}}>
          <Search width={30} height={30} />
        </View>
      </View>
      {is_loading === true ? (
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
        <>
          <ScrollView>
            <View>
              <FlatList
                data={get_cart}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        marginTop: metrics.HEIGHT * 0.01,
                        backgroundColor: Colors.white,
                        elevation: 15,
                        marginHorizontal: '5%',
                        flexDirection: 'row',
                        padding: '4%',
                        // borderWidth: 0.2,
                        borderColor: Colors.gray,
                        marginBottom: metrics.HEIGHT * 0.01,
                        borderRadius: 10,
                        width: '90%',
                        display: 'flex',
                        flex: 1,
                        rowGap: 10,

                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 7,
                        },
                        shadowOpacity: 0.43,
                        shadowRadius: 9.51,
                      }}>
                      <View
                        style={{
                          borderRadius: 10,
                          // backgroundColor: Colors.lightbackground,
                          display: 'flex',
                          flex: 0.8,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: Colors.lightbackground,
                          // borderColor:qq
                        }}>
                        <FastImage
                          source={
                            item.product_image === null ||
                            item.product_image === ''
                              ? require('../assets/logo.png')
                              : {
                                  uri: item.product_image,
                                  priority: FastImage.priority.high,
                                }
                          }
                          style={{width: '95%', height: 198}}
                          // resizeMode={FastImage.resizeMode.center}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flex: 0.9,
                          paddingHorizontal: 5,
                          marginHorizontal: '2%',
                          // backgroundColor: 'red',
                        }}>
                        <View
                          style={{
                            // backgroundColor: 'blue',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}>
                          <View style={{}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                // width: '100%',
                                // width: '65%',
                              }}>
                              {/* <View style={{width: '40%', backgroundColor: 'red'}}> */}
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: Colors.black,
                                  fontFamily: Fonts.FontsType.Poppins_Medium,
                                }}>
                                {item.productdetails.name} {'        '}{' '}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: Colors.lightbackground,
                                  width: 25,
                                  height: 25,
                                  borderRadius: 25,
                                  bottom: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    color: Colors.black,
                                    fontFamily: Fonts.FontsType.Poppins_Medium,
                                    textAlign: 'center',
                                  }}>
                                  {index + 1}
                                </Text>
                              </View>
                              {/* </View> */}
                              <TouchableOpacity
                                style={{
                                  left: metrics.HEIGHT * 0.01,
                                  bottom: 5,
                                  backgroundColor: Colors.lightbackground,
                                  width: 25,
                                  height: 25,
                                  borderRadius: 25,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onPress={() => deletecart(item.id)}>
                                <Ionicons
                                  name="close-outline"
                                  color={Colors.black}
                                  size={22}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                marginTop: metrics.HEIGHT * 0.01,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: Colors.black,
                                  width: '55%',
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                  // fontWeight: '500',
                                }}>
                                Gwt:{' '}
                                <Text
                                  style={{
                                    fontFamily:
                                      Fonts.FontsType.Poppins_SemiBold,
                                  }}>
                                  {item.gross_wt}
                                </Text>
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: Colors.black,
                                  width: '45%',
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                }}>
                                Pt:{' '}
                                <Text
                                  style={{
                                    fontFamily:
                                      Fonts.FontsType.Poppins_SemiBold,
                                  }}>
                                  {item.puritys.name}
                                </Text>
                              </Text>
                              {/* <Text
                            style={{
                              fontSize: 14,
                              color: Colors.black,
                              width: '35%',
                              // fontWeight: '500',
                            }}>
                            Nwt: {item.net_wt}
                          </Text> */}
                            </View>
                            <View
                              style={{
                                marginTop: metrics.HEIGHT * 0.01,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: Colors.black,
                                  width: '48%',
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                }}>
                                Swt:{' '}
                                <Text
                                  style={{
                                    fontFamily:
                                      Fonts.FontsType.Poppins_SemiBold,
                                  }}>
                                  {item.stone_wt}
                                </Text>
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: Colors.black,
                                  width: '48%',
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                }}>
                                Unit:{' '}
                                <Text
                                  style={{
                                    fontFamily:
                                      Fonts.FontsType.Poppins_SemiBold,
                                  }}>
                                  {item.productdetails.units.name}
                                </Text>
                              </Text>
                            </View>
                            <View
                              style={{
                                marginTop: metrics.HEIGHT * 0.01,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              {/* <Text
                            style={{
                              fontSize: 14,
                              color: Colors.black,
                              width: '35%',
                              // fontWeight: '500',
                            }}>
                            Purity: {item.puritys.name}
                          </Text> */}
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: Colors.black,
                                  width: '35%',
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                }}>
                                Size:{' '}
                                <Text
                                  style={{
                                    fontFamily:
                                      Fonts.FontsType.Poppins_SemiBold,
                                  }}>
                                  {item.sizes.name}
                                </Text>
                              </Text>
                            </View>
                            {/* <View
                          style={{
                            marginTop: metrics.HEIGHT * 0.01,

                            justifyContent: 'space-between',
                            width: '60%',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Colors.black,
                              // fontWeight: '500',
                            }}>
                            Remark:{' '}
                            {item.remark === '' ||
                            item.remark === undefined ||
                            item.remark === null
                              ? ''
                              : item.remark}
                          </Text>
                          
                        </View> */}
                            <View
                              style={{
                                // marginTop: metrics.HEIGHT * 0.01,
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: 20,
                              }}>
                              <Text
                                style={{
                                  color: Colors.black,
                                  fontSize: 14,
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                }}>
                                Quantity:
                              </Text>

                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: Colors.black,
                                  fontSize: 13,
                                  padding: 3,
                                  backgroundColor: Colors.lightbackground,
                                  borderRadius: 5,
                                  width: 30,
                                  marginLeft: 10,
                                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
                                }}>
                                {item.quantity}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('Updatecart', {
                                iid: item.id,
                                data: item,
                              })
                            }
                            style={{
                              // height: metrics.HEIGHT * 0.05,
                              width: 120,
                              justifyContent: 'center',
                              // elevation: 9,
                              backgroundColor: Colors.themecolor,
                              // marginLeft: metrics.HEIGHT * 0.01,
                              borderColor: Colors.themecolor,
                              borderWidth: 0.5,
                              borderRadius: 10,
                              // position: 'absolute',
                              // bottom: 10,
                              padding: 10,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.black,
                                fontFamily: Fonts.FontsType.Poppins_Regular,
                                fontSize: 15,
                              }}>
                              Edit
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('Updatecart', {
                                iid: item.id,
                                data: item,
                              })
                            }
                            style={{
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.25,
                              justifyContent: 'center',
                              elevation: 9,
                              backgroundColor: Colors.themecolor,
                              marginLeft: metrics.HEIGHT * 0.01,
                              borderColor: Colors.themecolor,
                              borderWidth: 0.5,
                              borderRadius: 30,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.white,
                                fontWeight: 'bold',
                              }}>
                              EDIT
                            </Text>
                          </TouchableOpacity> */}
                        {/* <TouchableOpacity
                        onPress={() => increase_qty(item)}
                        style={{
                          height: metrics.HEIGHT * 0.035,
                          width: metrics.WIDTH * 0.1,
                          justifyContent: 'center',
                          elevation: 5,
                          backgroundColor: Colors.white,
                          marginLeft: metrics.HEIGHT * 0.01,
                          borderColor: Colors.gray,
                          borderWidth: 0.5,
                        }}>
                        <AntDesign
                          name="plus"
                          color={Colors.black}
                          size={20}
                          style={{alignSelf: 'center'}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => decrease_qty(item)}
                        style={{
                          height: metrics.HEIGHT * 0.035,
                          width: metrics.WIDTH * 0.1,
                          justifyContent: 'center',
                          elevation: 5,
                          backgroundColor: Colors.white,
                          marginLeft: metrics.HEIGHT * 0.01,
                          borderColor: Colors.gray,
                          borderWidth: 0.5,
                        }}>
                        <AntDesign
                          name="minus"
                          color={Colors.black}
                          size={20}
                          style={{alignSelf: 'center'}}
                        />
                      </TouchableOpacity> */}
                      </View>
                    </View>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: metrics.HEIGHT * 0.4,
                      }}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 16,
                          textAlign: 'center',
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        No Product Add To Cart
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
          {get_cart.length === 0 ? null : (
            <View
              style={{
                // height: metrics.HEIGHT * 0.1,
                padding: '2%',
                backgroundColor: Colors.white,
                borderRadius: 10,
                // borderTopLeftRadius: 10,
                // borderTopRightRadius: 10,
                elevation: 5,
                // borderColor: Colors.gray,
                // borderWidth: 0.5,
                marginHorizontal: '5%',
                bottom: 20,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}>
              {/* <View
                style={{
                  marginTop: metrics.HEIGHT * 0.01,
                  height: 50,
                  borderBottomColor: Colors.gray,
                  borderBottomWidth: 0.5,
                  backgroundColor: Colors.white,
                }}>
               <TextInput
                  placeholder="Enter Remark"
                  placeholderTextColor={Colors.gray}
                  style={{fontFamily: Fonts.FontsType.Poppins_Regular}}
                  onChangeText={Val => SetRemark(Val)}
                /> 
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: '2%',
                    width: '45%',
                    marginTop: 15,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 15,
                      fontFamily: Fonts.FontsType.Poppins_Regular,
                    }}>
                    Total Qty:{' '}
                    <Text style={{fontFamily: Fonts.FontsType.Poppins_Regular}}>
                      {gettotalqty}
                    </Text>
                    {/* TOTAL QTY:{`0.000032`.slice(0, 4)} */}
                  </Text>
                  <Text
                    style={{color: Colors.black, fontSize: 15, marginTop: 5}}>
                    Gross Wt:{' '}
                    <Text style={{fontFamily: Fonts.FontsType.Poppins_Regular}}>
                      {`${gettotalgt}`.slice(0, 6)}
                    </Text>
                  </Text>
                  <Text
                    style={{color: Colors.black, fontSize: 15, marginTop: 5}}>
                    Nwt Wt:{' '}
                    <Text style={{fontFamily: Fonts.FontsType.Poppins_Regular}}>
                      {`${getTotalnt}`.slice(0, 6)}
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity
                  // onPress={() => submit()}
                  onPress={() => {
                    getlist();
                  }}
                  style={{
                    width: 120,
                    justifyContent: 'center',
                    // elevation: 9,
                    backgroundColor: Colors.themecolor,
                    marginLeft: metrics.HEIGHT * 0.01,
                    borderColor: Colors.themecolor,
                    borderWidth: 0.5,
                    borderRadius: 10,
                    // padding: 10,
                    height: 50,
                    alignSelf: 'center',
                    right: 10,
                  }}>
                  {loading === true ? (
                    <ActivityIndicator color={Colors.white} size="small" />
                  ) : (
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.black,
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                        fontSize: 15,
                      }}>
                      Continue
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}

      {/* <RNModal
        isVisible={isModalVisible}
        transparent
        style={{margin: 0, justifyContent: 'flex-end'}}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            // height: '70%',
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              alignSelf: 'flex-end',
              marginHorizontal: '4%',
            }}>
            <AntDesign name="closecircle" color={Colors.black} size={30} />
          </TouchableOpacity>
          <Text
            style={{
              padding: '5%',
              fontSize: 22,
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Purity
          </Text>
          <View
            style={{
              marginTop: metrics.HEIGHT * 0.01,
              marginHorizontal: '2%',
              marginBottom: metrics.HEIGHT * 0.02,
            }}>
            <FlatList
              data={getpurity}
              numColumns={4}
              style={{alignSelf: 'center'}}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => SetPuId(item.id)}
                    style={{
                      marginTop: metrics.HEIGHT * 0.01,

                      height: metrics.HEIGHT * 0.056,
                      width: metrics.WIDTH * 0.15,
                      justifyContent: 'center',
                      elevation: 5,
                      backgroundColor:
                        item.id == getpuid ? Colors.themecolor : Colors.white,
                      marginLeft: 10,
                      borderColor:
                        item.id == getpuid
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
                          item.id == getpuid ? Colors.white : Colors.themecolor,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </RNModal>

      <RNModal
        isVisible={isModalVisible1}
        transparent
        style={{margin: 0, justifyContent: 'flex-end'}}
        onBackButtonPress={() => setModalVisible1(false)}
        onBackdropPress={() => setModalVisible1(false)}
        onRequestClose={() => {
          setModalVisible1(false);
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            // height: '70%',
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => setModalVisible1(false)}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              alignSelf: 'flex-end',
              marginHorizontal: '4%',
            }}>
            <AntDesign name="closecircle" color={Colors.black} size={30} />
          </TouchableOpacity>
          <Text
            style={{
              padding: '5%',
              fontSize: 22,
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Sizes
          </Text>
          <View
            style={{
              marginTop: metrics.HEIGHT * 0.01,
              marginHorizontal: '2%',
              marginBottom: metrics.HEIGHT * 0.02,
            }}>
            <FlatList
              data={getpurity1}
              numColumns={4}
              style={{alignSelf: 'center'}}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => SetSiId(item.id)}
                    style={{
                      marginTop: metrics.HEIGHT * 0.01,

                      height: metrics.HEIGHT * 0.056,
                      width: metrics.WIDTH * 0.15,
                      justifyContent: 'center',
                      elevation: 5,
                      backgroundColor:
                        item.id == getsiid ? Colors.themecolor : Colors.white,
                      marginLeft: 10,
                      borderColor:
                        item.id == getsiid
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
                          item.id == getsiid ? Colors.white : Colors.themecolor,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </RNModal> */}
    </View>
  );
};

export default CartScreen;
