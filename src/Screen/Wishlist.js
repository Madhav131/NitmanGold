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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../Utils/Fonts';
import images from '../Utils/images';

const Wishlist = props => {
  const [get_cart, Set_Cart] = useState([]);
  const [is_loading, Set_Loading] = useState(false);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getwishlist();
    });

    return unsubscribe;
  }, [props]);

  const getwishlist = async () => {
    Set_Loading(true);
    const Token = await AsyncStorage.getItem('token');

    axios
      .get(BASE_URL + 'get-wishlist', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('cart-->>', res.data);
        if (res.data.success === 1) {
          Set_Cart(res.data.data);
          Set_Loading(false);
        }
      })
      .catch(err => {
        Set_Loading(false);
      });
  };

  const deletecart = async id => {
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();

    fromdata.append('id', id);
    // console.log('fromdata-->', fromdata);
    axios
      .post(BASE_URL + 'delete-wishlist', fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('dalete cart-->>', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          getwishlist();
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
      });
  };

  const ADDTOCART = async id => {
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();

    fromdata.append('id', id);
    // console.log('fromdata-->', fromdata);
    axios
      .post(BASE_URL + 'convert-wishlist', fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('dalete cart-->>', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);

          getwishlist();
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(240,240,240)'}}>
      {/* <HeaderScreen navigation={props.navigation} /> */}
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          marginTop: Platform.OS === 'ios' ? metrics.HEIGHT * 0.04 : 0,
          backgroundColor: 'rgb(240,240,240)',
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
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.43,
                      shadowRadius: 9.51,
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
                                fontSize: 16,
                                color: Colors.black,
                                fontFamily: Fonts.FontsType.Poppins_SemiBold,
                              }}>
                              {item.productdetails.name}
                            </Text>
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
                                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
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
                                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
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
                                width: '45%',
                                fontFamily: Fonts.FontsType.Poppins_Regular,
                              }}>
                              Swt:{' '}
                              <Text
                                style={{
                                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
                                }}>
                                {item.stone_wt}
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

                                // fontWeight: '500',
                              }}>
                              Size:{' '}
                              <Text
                                style={{
                                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
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

                                // top: '2%',
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
                          onPress={() => ADDTOCART(item.id)}
                          style={{
                            // height: metrics.HEIGHT * 0.05,
                            // width: 120,
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
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {/* <MaterialCommunityIcons
                            name="cart-check"
                            size={22}
                            color={Colors.black}
                          /> */}
                          <Image
                            source={images.icon4}
                            style={{width: 30, height: 30}}
                            resizeMode="contain"
                          />
                          <Text
                            style={{
                              textAlign: 'center',
                              color: Colors.black,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                              fontSize: 14,
                            }}>
                            Add to cart
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
                      }}>
                      No Product Add To Cart
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Wishlist;
