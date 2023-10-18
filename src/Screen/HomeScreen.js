import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Colors from '../Utils/colors';
import metrics from '../Utils/Metrics';
import Swiper from 'react-native-swiper';
import HeaderScreen from '../components/Header';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import Fonts from '../Utils/Fonts';
import {color} from 'react-native-reanimated';
import Profile from '../assets/icon2/account2.svg';
const DATA = [
  {id: 1, img: require('../assets/b2.jpeg')},
  {id: 2, img: require('../assets/b3.jpeg')},
  {id: 3, img: require('../assets/b4.jpeg')},
];

const DATA1 = [
  {id: 1, img: require('../assets/c2.jpeg')},
  {id: 2, img: require('../assets/c3.jpeg')},
  {id: 3, img: require('../assets/c7.jpeg')},
  {id: 4, img: require('../assets/c8.jpeg')},
  {id: 5, img: require('../assets/c6.jpeg')},
];
const HomeScreen = props => {
  const [isloading, SetLoading] = useState(false);
  const [getcat, SetCat] = useState([]);
  const [getban, SetBan] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getbenner();
      getcatgoris();
    });

    return unsubscribe;
  }, [props]);

  const getbenner = async () => {
    SetLoading(true);
    const Token = await AsyncStorage.getItem('token');
    axios
      .get(BASE_URL + 'get-banner', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('Banner-->>', res.data);
        if (res.data.success == 1) {
          SetBan(res.data.data);
          SetLoading(false);
        } else {
          SetLoading(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
        SetLoading(false);
      });
  };
  const getcatgoris = async () => {
    SetLoading(true);
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
          SetLoading(false);
        } else {
          SetLoading(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
        SetLoading(false);
      });
  };

  return (
    <View style={styles.frist_view}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <HeaderScreen navigation={props.navigation} />
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

              fontSize: 16,
              marginTop: 2,
            }}>
            Please wait...
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.Banner_view}>
            <Swiper
              key={getban.length}
              loop
              autoplay={true}
              activeDot={
                <View
                  style={{
                    backgroundColor: Colors.themecolor,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: '2%',
                    bottom: 20,
                  }}
                />
              }
              dot={
                <View
                  style={{
                    backgroundColor: Colors.white,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: '2%',
                    bottom: 20,
                  }}
                />
              }>
              {getban.map((item, index) => {
                return (
                  <View style={{}}>
                    <FastImage
                      // source={
                      //   item.image_full_path == null || item.image_full_path == ''
                      //     ? require('../Images/Background/Profile.png')
                      //     : {uri: item.image_full_path}
                      // }
                      source={{
                        uri: item.image_full_path,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{
                        width: metrics.WIDTH * 0.9,
                        height: 200,
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
                      }}
                    />
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '5%',
            }}>
            <View
              style={{
                backgroundColor: Colors.themecolor,
                width: 10,
                height: 40,
              }}
            />
            <Text style={styles.category_view_text}>Categories</Text>
          </View>
          <View style={styles.cat_list}>
            <FlatList
              data={getcat}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Subcatgrios', {
                        imgg: item.image_full_path,
                        name: item.name,
                        iid: item.id,
                      });
                      AsyncStorage.setItem('idd', JSON.stringify(item.id));
                    }}
                    style={{
                      marginBottom: metrics.HEIGHT * 0.01,
                    }}>
                    <View style={{}}>
                      <FastImage
                        source={{
                          uri: item.image_full_path,
                          priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        // resizeMode={FastImage.resizeMode.center}
                        style={{
                          width: metrics.WIDTH * 0.9,
                          height: 200,
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
                        }}></FastImage>
                    </View>
                    {/* <View
                      style={{
                        backgroundColor: Colors.black,
                        // opacity: 0.7,
                        elevation: 8,
                        marginTop: metrics.HEIGHT * 0 - 7,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: Colors.white,
                          // marginLeft: '5%',
                          fontWeight: 'bold',
                          fontSize: 20,
                        }}>
                        {item.name}
                      </Text>
                    </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: '5%',
                        marginTop: 15,
                        marginBottom: 15,
                      }}>
                      <View
                        style={{
                          backgroundColor: Colors.themecolor,
                          width: 5,
                          height: 40,
                        }}
                      />
                      <Text
                        style={{
                          color: Colors.black,
                          marginLeft: 15,
                          fontSize: Fonts.FontsSize.h6,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  frist_view: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  Banner_view: {
    marginTop: metrics.HEIGHT * 0.02,
    marginHorizontal: '2%',
    height: 230,
  },
  category_view_text: {
    marginHorizontal: '5%',
    fontSize: Fonts.FontsSize.h3,
    color: Colors.black,
    fontFamily: Fonts.FontsType.Poppins_Regular,
    // fontWeight: '600',
  },
  cat_list: {
    marginTop: metrics.HEIGHT * 0.02,
    marginHorizontal: '2%',
  },
});
