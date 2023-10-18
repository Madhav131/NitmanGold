import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../Utils/colors';
import HeaderScreen from '../components/Header';
import metrics from '../Utils/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {BASE_URL, ACCEPT_HEADER} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import {useCartContext} from '../context/cart_context';
import RNModal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../Utils/images';
import moment from 'moment';
import Fonts from '../Utils/Fonts';
import Call from '../assets/icon2/home-icon-silhouette8.svg';
import Email from '../assets/icon2/home-icon-silhouette9.svg';
import Cal from '../assets/icon2/home-icon-silhouette10.svg';
import Loc from '../assets/icon2/home-icon-silhouette11.svg';
import Home from '../assets/icon2/home-icon-silhouette12.svg';

const ProfileScreen = props => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      oderlistdata();
    });

    return unsubscribe;
  }, [props]);

  const [getname, SetName] = useState('');
  const [getnumber, SetNumber] = useState('');
  const [getemail, SetEmail] = useState('');
  const [getdate, SetDate] = useState('');
  const [getadd, SetAdd] = useState('');
  const [getcom, SetCom] = useState('');
  const [isloading, SetLoading] = useState(false);
  const {clear_all} = useCartContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const oderlistdata = async () => {
    const Token = await AsyncStorage.getItem('token');
    SetLoading(true);
    axios
      .get(BASE_URL + 'get-profile', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('orcder-->>', res.data);
        if (res.data.success === 1) {
          SetName(res.data.data.name);
          SetNumber(res.data.data.number);
          SetEmail(res.data.data.email);
          SetDate(res.data.data.expiry_date);
          SetAdd(res.data.data.address);
          SetCom(res.data.data.company_name);
          SetLoading(false);
        } else {
          Toast.show('Token Exprire.!');
          SetLoading(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        SetLoading(false);
        // Toast.show('somthing worng please try angin..!!');
      });
  };

  const logout = () => {
    clear_all();
    AsyncStorage.removeItem('islogin');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user_name');
    AsyncStorage.removeItem('cart');
    AsyncStorage.removeItem('total');
    AsyncStorage.removeItem('total1');
    AsyncStorage.removeItem('qty');
    AsyncStorage.clear();
    props.navigation.replace('SplashScreen');
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
            alignItems: 'center',
            // left: '30%',
            width: '82%',
            // backgroundColor: 'red',
          }}>
          {/* <Text style={{color: Colors.black, fontSize: 25}}>{proname}</Text> */}
          <Text
            style={{
              color: Colors.black,
              fontSize: 22,
              fontFamily: Fonts.FontsType.Poppins_Regular,
            }}>
            Profile
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
        <>
          <ScrollView style={{marginBottom: 10}}>
            <View
              style={{
                // paddingBottom: metrics.HEIGHT * 0.04,
                // backgroundColor: Colors.lightbackground,
                width: metrics.WIDTH * 0.85,
                alignSelf: 'center',
                // elevation: 5,
                // borderRadius: 10,
                marginTop: 10,
                // alignItems: 'center',
                // marginBottom: metrics.HEIGHT * 0.02,
              }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  backgroundColor: Colors.themecolor,
                  alignSelf: 'center',
                  marginTop: metrics.HEIGHT * 0.01,
                  elevation: 8,
                  justifyContent: 'center',
                  alignItems: 'center',

                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                }}>
                <Image source={images.person} resizeMode="contain" />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    marginTop: metrics.HEIGHT * 0.04,
                    fontSize: 20,
                    color: Colors.black,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                    // marginLeft: metrics.WIDTH * 0.06,
                    // textAlign: 'center',
                  }}>
                  {getname}
                </Text>
              </View>
              <View style={{marginHorizontal: '5%', marginTop: 40}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '90%',
                      // backgroundColor: 'red',
                    }}>
                    <View style={{}}>
                      {/* <Image style={{}} source={images.number} /> */}
                      <Call width={30} height={30} />
                    </View>
                    <View style={{marginLeft: 25}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        {getnumber}
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '10%', alignItems: 'flex-end'}}>
                    <Image source={images.arrow} resizeMode="contain" />
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 25,
                    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
                    borderBottomWidth: 1,
                  }}
                />
                {/* // */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 25,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '90%',
                      // backgroundColor: 'red',
                    }}>
                    <View style={{}}>
                      <Email width={30} height={30} />
                    </View>
                    <View style={{marginLeft: 25}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        {getemail}
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '10%', alignItems: 'flex-end'}}>
                    <Image source={images.arrow} resizeMode="contain" />
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 25,
                    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
                    borderBottomWidth: 1,
                  }}
                />
                {/* // */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 25,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '90%',
                      // backgroundColor: 'red',
                    }}>
                    <View style={{}}>
                      <Cal width={30} height={30} />
                    </View>
                    <View style={{marginLeft: 25}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        {moment(getdate).format('DD-MM-YYYY') == 'Invalid date'
                          ? ''
                          : moment(getdate).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '10%', alignItems: 'flex-end'}}>
                    <Image source={images.arrow} resizeMode="contain" />
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 25,
                    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
                    borderBottomWidth: 1,
                  }}
                />
                {/* // */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 25,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '90%',
                      // backgroundColor: 'red',
                    }}>
                    <View style={{}}>
                      {/* <Image style={{}} source={images.address} /> */}
                      <Loc width={30} height={30} />
                    </View>
                    <View style={{marginLeft: 25}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        {getadd}
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '10%', alignItems: 'flex-end'}}>
                    <Image source={images.arrow} resizeMode="contain" />
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 25,
                    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
                    borderBottomWidth: 1,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 25,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '90%',
                      // backgroundColor: 'red',
                    }}>
                    <View style={{}}>
                      {/* <Image style={{}} source={images.company} /> */}
                      <Home width={30} height={30} />
                    </View>
                    <View style={{marginLeft: 25}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        {getcom}
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '10%', alignItems: 'flex-end'}}>
                    <Image source={images.arrow} resizeMode="contain" />
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 25,
                    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
                    borderBottomWidth: 1,
                  }}
                />
              </View>
              {/* // */}

              {/* <TouchableOpacity
            onPress={() => logout()}
            // onPress={() => setModalVisible(true)}
            style={{
              marginTop: metrics.HEIGHT * 0.04,
              width: '45%',
              backgroundColor: Colors.themecolor,
              justifyContent: 'center',
              padding: '5%',
              borderRadius: 5,
              elevation: 5,
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: metrics.HEIGHT * 0.05,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              LOGOUT
            </Text>
          </TouchableOpacity> */}
            </View>
          </ScrollView>
        </>
      )}
      <RNModal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: Colors.white,
            width: metrics.WIDTH * 0.85,
            borderRadius: 5,
            paddingBottom: metrics.HEIGHT * 0.06,
            brderRadius: 15,
            alignSelf: 'center',
          }}>
          <View
            style={{
              marginTop: 10,

              // top: '15%',
            }}>
            <Text
              style={{
                color: Colors.black,
                marginTop: metrics.HEIGHT * 0.01,
                marginHorizontal: '5%',
                lineHeight: 24,
                fontSize: 16,
                textAlign: 'center',
              }}>
              "AFTER LOGOUT YOUR CART & WISHLIST WILL GET EMPTY"
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: metrics.HEIGHT * 0.05,
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                height: metrics.HEIGHT * 0.075,
                backgroundColor: Colors.themecolor,
              }}>
              <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => logout()}
              style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                height: metrics.HEIGHT * 0.075,
                backgroundColor: Colors.themecolor,
              }}>
              <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                LOGOUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
    </View>
  );
};

export default ProfileScreen;
