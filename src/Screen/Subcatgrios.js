import React, {useEffect, useState} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import metrics from '../Utils/Metrics';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useCartContext} from '../context/cart_context';
import FastImage from 'react-native-fast-image';
import images from '../Utils/images';
import Fonts from '../Utils/Fonts';
import Search from '../assets/icon2/magnifying-glass2.svg';
const DATA1 = [
  {id: 1, img: require('../assets/sub1.jpeg')},
  {id: 2, img: require('../assets/sub2.jpeg')},
  {id: 3, img: require('../assets/sub3.jpeg')},
  {id: 4, img: require('../assets/sub4.jpeg')},
  {id: 5, img: require('../assets/sub5.jpeg')},
  {id: 5, img: require('../assets/sub6.jpeg')},
];

const Subcatgrios = props => {
  const [getimg, SetImg] = useState(props.route.params.imgg);
  const [getname, SetName] = useState();
  const [getid, SetId] = useState();
  const [isloading, SetLoading] = useState(false);
  const [subcat, SetSubcat] = useState([]);
  const [task_arrayholder, setBranchArray] = useState([]);
  const {total_qty} = useCartContext();

  const [gettotal_cart, SetTotal_Cart] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('idd').then(value => {
      SetId(value);
      getsubcat(value);
      console.log('valyue', value);
    });
    console.log('aaaaaaasss', AsyncStorage.getItem('idd'));
    const unsubscribe = props.navigation.addListener('focus', () => {
      get_Count();
    });

    return unsubscribe;
  }, [props]);

  const getsubcat = async value => {
    // console.log('idd-->', getid);
    SetLoading(true);
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();
    fromdata.append('id', value);
    // console.log('fromdata-->', fromdata);
    axios
      .post(BASE_URL + 'get-subcategory', fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('subcat-->>', res.data);
        if (res.data.success == 1) {
          SetSubcat(res.data.data);
          SetName(res.data.category_name);
          setBranchArray(res.data.data);
          SetLoading(false);
        } else {
          Toast.show(res.data.message);
          SetLoading(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
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
        // Toast.show('somthing worng please try angin..!!');
        SetLoading(false);
      });
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      //  const code1 = item.code ? item.code.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
      //  || code1.indexOf(textData) > -1;
    });

    SetSubcat(newData);
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: Platform.OS === 'ios' ? metrics.HEIGHT * 0.04 : 0,
          // justifyContent: 'space-between',

          backgroundColor: Colors.white,
          height: metrics.HEIGHT * 0.08,
          // elevation: 5,
          width: '100%',
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
          {/* <Text style={{color: Colors.black, fontSize: 25}}>{getname}</Text> */}
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
      {/* <View
        style={{
          borderRadius: 5,
          borderColor: Colors.gray,
          elevation: 5,
          borderWidth: 0.5,
          marginHorizontal: '2%',
          backgroundColor: Colors.white,
          marginTop: metrics.HEIGHT * 0.02,
          padding: '1%',
          marginBottom: metrics.HEIGHT * 0.02,
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Ionicons
            name="md-search-sharp"
            color={Colors.themecolor}
            size={25}
          />
        </View>
        <TextInput
          placeholder="Search Subcatgrios"
          placeholderTextColor={Colors.gray}
          style={{
            fontSize: 16,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
      </View> */}
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
              fontFamily: Fonts.FontsType.Poppins_Medium,
              fontSize: 16,
              marginTop: 2,
            }}>
            Please wait...
          </Text>
        </View>
      ) : (
        <ScrollView style={{paddingBottom: Platform.OS === 'ios'? '10%': null}}>
          <View
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              marginHorizontal: '2%',
              elevation: 8,
              // backgroundColor: Colors.gray,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
            }}>
            <FastImage
              source={{
                uri: getimg,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
              // resizeMode={FastImage.resizeMode.stretch}
              style={{
                width: metrics.WIDTH * 0.9,
                height: metrics.WIDTH * 0.5,
                alignSelf: 'center',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: Colors.white,
              }}
            />
          </View>
          <View
            style={{
              borderRadius: 40,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              height: Platform.OS === 'ios' ? '7%' : null,
              elevation: 5,
              marginHorizontal: '5%',
              backgroundColor: Colors.white,
              marginTop: 32,
              padding: 3,
              marginBottom: metrics.HEIGHT * 0.02,
              flexDirection: 'row',
              paddingHorizontal: '5%',
            }}>
            <TextInput
              placeholder="Search here..."
              placeholderTextColor={Colors.gray}
              style={{
                fontSize: 16,
                width: '90%',
                fontFamily: Fonts.FontsType.Poppins_Regular,
              }}
              onChangeText={value => searchFilter_branch(value)}
            />
            <View style={{justifyContent: 'center'}}>
              {/* <Image source={images.search} resizeMode="contain" /> */}
              <Search width={30} height={30} />
              {/* <FontAwesome name="search" color={Colors.lightgray} size={25} /> */}
            </View>
          </View>
          <Text
            style={{
              marginTop: metrics.HEIGHT * 0.01,
              marginHorizontal: '5%',
              fontSize: 22,
              color: Colors.black,
              fontFamily: Fonts.FontsType.Poppins_Medium,
            }}>
            {getname}
          </Text>
          <View
            style={{
              marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
              paddingBottom: Platform.OS === 'ios' ? '10%': null
            }}>
            <FlatList
              data={subcat}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ProductScreen', {
                        // imgg: item.img,
                        iid: item.id,
                        proname: item.name,
                        // total: item.totalproducts,
                        // backgroundColor: 'red',
                      });
                      AsyncStorage.setItem('idpro', item.id);
                      AsyncStorage.setItem('name', item.name);
                    }}
                    style={{
                      marginBottom: metrics.HEIGHT * 0.01,
                      borderRadius: 10,
                      // width: 150,
                      // marginLeft: 17,
                      marginTop: 2,
                      width: '46%',
                      marginHorizontal: '2%',
                    }}>
                    <View
                      style={{
                        // elevation: 3,
                        backgroundColor: 'red',

                        backgroundColor: Colors.white,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Colors.lightbackground,
                        borderRadius: 10,
                        alignItems: 'center',
                      }}>
                      <FastImage
                        source={{
                          uri: item.image_full_path,
                          priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        // resizeMode={FastImage.resizeMode.center}
                        style={{
                          width: 140,
                          height: 200,
                          marginRight: 5,
                        }}></FastImage>
                    </View>
                    <View
                      style={{
                        // position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        // width: '100%',
                        alignSelf: 'center',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: Colors.black,
                          // marginLeft: '5%',
                          marginTop: 12,
                          fontSize: 15,
                          width: 100,
                          lineHeight: 23,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: Colors.black,
                      }}>
                      Catgrios Not Available
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

export default Subcatgrios;
