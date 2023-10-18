import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Linking,
  Platform,
} from 'react-native';
import metrics from '../Utils/Metrics';
import colors from '../Utils/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import {useCartContext} from '../context/cart_context';
import RNModal from 'react-native-modal';
import Fonts from '../Utils/Fonts';
import Colors from '../Utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

// import Ionicons from 'react-native-vector-icons/Ionicons';
const DATA = [
  {id: 1, cat: 'All'},
  {id: 2, cat: 'Bangles'},
  {id: 3, cat: 'Bracelet'},
  {id: 4, cat: 'Diamond Jewellery'},
  {id: 5, cat: 'Nose Ring'},
  {id: 6, cat: 'Chatelaine'},
];

const Drewerscreen = props => {
  const [getshow, SetShow] = useState(false);
  const [getname, setName] = useState('');
  const [getcat, SetCat] = useState([]);
  const [user, SetUser] = useState('');
  const {clear_all} = useCartContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const [getnumber, SetNumber] = useState();
  const [getwpnumber, SetWpNumber] = useState('');
  const [getfb, SetFb] = useState('');
  const [getinsta, SetInsta] = useState('');
  const [gettw, SetTw] = useState('');
  const [getweb, SetWeb] = useState('');
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getcatgoris();
      getvendorata();
      setName('');
    });
    AsyncStorage.getItem('user_name').then(val => {
      SetUser(val);
    });
    return unsubscribe;
  }, [props]);

  const getcatgoris = async () => {
    const Token = await AsyncStorage.getItem('token');
    axios
      .get(BASE_URL + 'get-category', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('Banner-->>', res.data);
        if (res.data.success == 1) {
          SetCat(res.data.data);
        } else {
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
        SetLoading(false);
      });
  };

  const getvendorata = async () => {
    const Token = await AsyncStorage.getItem('token');
    axios
      .get(BASE_URL + 'get-vendor-data', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('getvendordata-->>', res.data);
        if (res.data.success == 1) {
          SetNumber(res.data.data.number);
          SetWpNumber(res.data.data.whatsapp);
          SetFb(res.data.data.facebook);
          SetInsta(res.data.data.instagram);
          SetTw(res.data.data.twitter);
          SetWeb(res.data.data.website);
        } else {
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
        SetLoading(false);
      });
  };

  const onPressMobileNumberClick = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
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
    <View style={{flex: 1, backgroundColor: colors.lightblack}}>
      <ScrollView style={{flexGrow: 1}}>
        <TouchableOpacity
          style={styles.colse_view}
          onPress={() => props.navigation.closeDrawer()}>
          <AntDesign name="closecircle" size={28} color={colors.white} />
        </TouchableOpacity>
        <View style={{right: 50, marginLeft: '15%'}}>
          <Image
            source={require('../assets/logo.png')}
            style={{width: 220, height: 100}}
            resizeMode="center"
          />
        </View>
        <View style={styles.Welcome_view}>
          <Text style={styles.welcome_text}>WELCOME</Text>
        </View>
        <View style={styles.name_view}>
          <Text style={styles.name_text}>{user}</Text>
          {/* <TouchableOpacity style={styles.edit_view}>
            <FontAwesome5
              name="pencil-alt"
              size={25}
              color={colors.themecolor}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            marginHorizontal: '10%',
            borderBottomWidth: 1,
            backgroundColor: Colors.white,
            marginTop: 24,
          }}
        />
        <View style={styles.cat_view}>
          <Text style={styles.welcome_text}>CATEGORIES</Text>
        </View>
        <TouchableOpacity
          onPress={() => SetShow(!getshow)}
          style={[
            styles.cat_list_view,
            // {height: getshow === true ? metrics.HEIGHT * 0.5 : null},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cat_list_text}>
              {getname === '' ? 'Select Category' : getname}
            </Text>
            <View style={{marginLeft: 5}}>
              <MaterialIcons
                name={
                  getshow === false
                    ? 'keyboard-arrow-right'
                    : 'keyboard-arrow-down'
                }
                size={25}
                color={colors.white}
              />
            </View>
          </View>
          {getshow === true ? (
            <FlatList
              data={getcat}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setName(item.name);
                      SetShow(false);
                      props.navigation.navigate('Subcatgrios', {
                        imgg: item.image_full_path,
                        name: item.name,
                        iid: item.id,
                      });
                      AsyncStorage.setItem('idd', JSON.stringify(item.id));
                    }}
                    style={{
                      marginTop: '2%',
                      padding: '5%',
                      borderColor: colors.white,
                      borderWidth: 0.5,
                      marginBottom: '2%',
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 18,
                        fontFamily: Fonts.FontsType.Poppins_Medium,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: '10%',
            borderBottomWidth: 1,
            backgroundColor: Colors.white,
            marginTop: 24,
          }}
        />
        <View style={styles.cat_view}>
          <Text style={styles.welcome_text}>FOR SUPPORT</Text>
        </View>
        <View style={styles.call}>
          <TouchableOpacity
            onPress={() => onPressMobileNumberClick(getnumber)}
            style={styles.edit_view}>
            <Ionicons name="call-outline" size={25} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.call_text}>{getwpnumber}</Text>
        </View>
        <View
          style={{
            marginHorizontal: '10%',
            borderBottomWidth: 1,
            backgroundColor: Colors.white,
            marginTop: 19,
          }}
        />
        <View
          style={{
            marginHorizontal: '14%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: metrics.HEIGHT * 0.02,
            marginTop: 24,
          }}>
          {gettw === null || gettw === '' ? null : (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => Linking.openURL(`${gettw}`)}>
                <Entypo
                  name="twitter-with-circle"
                  color={Colors.white}
                  size={35}
                />
              </TouchableOpacity>
            </View>
          )}
          {getfb === null || getfb === '' ? null : (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => Linking.openURL(`${getfb}`)}>
                <MaterialCommunityIcons
                  name="facebook"
                  color={Colors.white}
                  size={35}
                />
              </TouchableOpacity>
            </View>
          )}
          {getinsta === null || getinsta === '' ? null : (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                justifyContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => Linking.openURL(`${getinsta}`)}>
                <Fontisto name="instagram" color={Colors.white} size={30} />
              </TouchableOpacity>
            </View>
          )}
          {getwpnumber === null || getwpnumber === '' ? null : (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://wa.me/91${getwpnumber}`)
                }>
                <Fontisto name="whatsapp" color={Colors.white} size={30} />
              </TouchableOpacity>
            </View>
          )}

          {/* {getweb === null || getweb === '' ? null : (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => Linking.openURL(`${getweb}`)}>
                <MaterialCommunityIcons
                  name="google-chrome"
                  color={Colors.white}
                  size={34}
                />
              </TouchableOpacity>
            </View>
          )} */}

          {/* {getwpnumber === null || getwpnumber === '' ? null : (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                backgroundColor: '#95D395',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 8,
              }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://wa.me/91${getwpnumber}`)
                }>
                <Ionicons name="logo-whatsapp" color={'#00FF00'} size={25} />
              </TouchableOpacity>
            </View>
          )}
         
          {getinsta === null || getinsta === '' ? null : (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                backgroundColor: '#f5dcfb',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 8,
              }}>
              <TouchableOpacity onPress={() => Linking.openURL(`${getinsta}`)}>
                <Ionicons name="logo-instagram" color={'#ad79bd'} size={25} />
              </TouchableOpacity>
            </View>
          )}
          
           */}
        </View>

        <TouchableOpacity
          onPress={() => logout()}
          // onPress={() => setModalVisible(true)}
          style={{
            flexDirection: 'row',
            backgroundColor: colors.themecolor,
            // padding: '5%',
            marginHorizontal: '15%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: metrics.HEIGHT * 0.02,
              color: colors.white,
              fontWeight: 'bold',
              letterSpacing: 3,
            }}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <RNModal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: colors.white,
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
                color: colors.black,
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
                backgroundColor: colors.themecolor,
              }}>
              <Text style={{color: colors.white, fontWeight: 'bold'}}>
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
                backgroundColor: colors.themecolor,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: Fonts.FontsType.Poppins_Medium,
                }}>
                LOGOUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
    </View>
  );
};

export default Drewerscreen;

const styles = StyleSheet.create({
  colse_view: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginHorizontal: '5%',
    marginTop:
      Platform.OS === 'ios' ? metrics.HEIGHT * 0.05 : metrics.HEIGHT * 0.02,
  },

  Welcome_view: {
    marginHorizontal: '10%',
    marginTop: metrics.HEIGHT * 0.05,
  },
  welcome_text: {
    color: colors.white,
    fontSize: Fonts.FontsSize.h5,
    // fontWeight: '500',
    fontFamily: Fonts.FontsType.Poppins_Medium,
  },
  name_view: {
    marginTop: metrics.HEIGHT * 0.02,
    marginHorizontal: '10%',
    flexDirection: 'row',
    // backgroundColor: colors.white,
    // padding: '5%',
    justifyContent: 'space-between',
  },
  name_text: {
    color: colors.white,
    fontSize: 17,
    fontFamily: Fonts.FontsType.Poppins_Medium,
  },
  edit_view: {},
  cat_view: {
    marginHorizontal: '10%',
    marginTop: 25,
  },
  cat_text: {
    color: colors.themecolor,
    fontSize: metrics.HEIGHT * 0.025,
    fontWeight: 'bold',
  },
  callus_text: {
    color: colors.themecolor,
    fontSize: metrics.HEIGHT * 0.025,
    fontWeight: 'bold',
  },
  cat_list_view: {
    marginTop: metrics.HEIGHT * 0.015,
    marginHorizontal: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5, // backgroundColor: colors.,
    // padding: '5%',
  },
  cat_list_text: {
    color: colors.white,
    fontSize: 17,
    fontFamily: Fonts.FontsType.Poppins_Medium,
  },
  call: {
    marginTop: metrics.HEIGHT * 0.02,
    marginHorizontal: '10%',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  call_text: {
    color: colors.white,
    fontSize: 19,
    marginLeft: 10,
    fontFamily: Fonts.FontsType.Poppins_Regular,
  },
});
