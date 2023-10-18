import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  AsyncStorage,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
} from 'react-native';
import Colors from '../Utils/colors';
import HeaderScreen from '../components/Header';
import metrics from '../Utils/Metrics';
import axios from 'axios';
import {BASE_URL, ACCEPT_HEADER} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../Utils/images';
import Fonts from '../Utils/Fonts';
import Search from '../assets/icon2/magnifying-glass2.svg';

const Oderlist = props => {
  const [getlist, SetList] = useState([]);
  const [task_arrayholder, setBranchArray] = useState([]);
  const [isloading, SetLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      oderlistdata();
    });

    return unsubscribe;
  }, [props]);

  const oderlistdata = async () => {
    SetLoading(true);
    const Token = await AsyncStorage.getItem('token');
    axios
      .get(BASE_URL + 'order-list', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('orcder-->>', res.data);
        if (res.data.success === 1) {
          SetList(res.data.data);
          setBranchArray(res.data.data);
          SetLoading(false);
        } else {
          Toast.show('Token Exprire.!');
          SetLoading(false);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        SetLoading(false);
        Toast.show('somthing worng please try angin..!!');
      });
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.remark
        ? item.remark.toUpperCase()
        : ''.toUpperCase();
      const code1 = item.order_number
        ? item.order_number.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1 || code1.indexOf(textData) > -1;
    });

    SetList(newData);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
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
              top: 2,
            }}>
            Back
          </Text>
        </View>
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
          placeholder="Search Order"
          placeholderTextColor={Colors.gray}
          style={{
            fontSize: 16,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
      </View> */}
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

          elevation: 5,
          marginHorizontal: '5%',
          backgroundColor: Colors.white,
          marginTop: 10,
          padding: 3,
          marginBottom: metrics.HEIGHT * 0.02,
          flexDirection: 'row',
          paddingHorizontal: '5%',
          height: Platform.OS === 'ios' ? '8%' : null,
        }}>
        <TextInput
          placeholder="Search here..."
          placeholderTextColor={Colors.gray}
          style={{
            fontSize: 16,
            width: '90%',
            padding: 7,
            fontFamily: Fonts.FontsType.Poppins_Regular,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
        <View style={{justifyContent: 'center'}}>
          <Search width={30} height={30} />
          {/* <FontAwesome name="search" color={Colors.lightgray} size={25} /> */}
        </View>
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
              marginTop: 20,
            }}>
            <FlatList
              data={getlist}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      marginBottom: metrics.HEIGHT * 0.01,
                    }}>
                    <View
                      style={{
                        // marginTop: metrics.HEIGHT * 0.01,
                        marginHorizontal: '5%',
                        backgroundColor: Colors.white,
                        // borderColor: Colors.gray,
                        // borderWidth: 0.5,
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,

                        borderRadius: 10,
                        padding: 10,
                        margin: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                          paddingHorizontal: '2%',
                          marginTop: 10,
                        }}>
                        <View style={{width: '49%'}}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 15,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                            }}>
                            Order No :{' '}
                            <Text
                              style={{
                                fontFamily: Fonts.FontsType.Poppins_SemiBold,
                              }}>
                              {item.order_number}
                            </Text>
                          </Text>
                        </View>
                        <View style={{width: '49%'}}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 15,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                            }}>
                            Gross wt :{' '}
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontFamily: Fonts.FontsType.Poppins_SemiBold,
                              }}>
                              {item.total_gross_wt}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                          paddingHorizontal: '2%',
                          marginTop: 5,
                        }}>
                        <View style={{width: '49%'}}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 15,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                            }}>
                            Net wt
                            <Text
                              style={{
                                fontFamily: Fonts.FontsType.Poppins_SemiBold,
                              }}>
                              {'     '}: {item.total_net_wt}
                            </Text>
                          </Text>
                        </View>
                        <View style={{width: '49%'}}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 15,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                            }}>
                            Quantity{'  '}
                            <Text
                              style={{
                                fontFamily: Fonts.FontsType.Poppins_SemiBold,
                              }}>
                              : {item.total_qty}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                          paddingHorizontal: '2%',
                          marginTop: 5,
                        }}>
                        <View style={{}}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 15,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                            }}>
                            Remark
                            <Text
                              style={{
                                fontFamily: Fonts.FontsType.Poppins_SemiBold,
                              }}>
                              {' '}
                              : {item.remark}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                          paddingHorizontal: '2%',
                          marginTop: 20,
                          marginBottom: 15,
                        }}>
                        <TouchableOpacity
                          style={{
                            width: '46%',
                            backgroundColor: Colors.themecolor,
                            padding: 10,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                              fontSize: 16,
                              color: Colors.black,
                            }}>
                            {item.status == 1
                              ? 'Pending'
                              : item.status == 2
                              ? 'Accepted'
                              : item.status == 3
                              ? 'Rejected'
                              : item.status == 4
                              ? 'Completed'
                              : null}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            Linking.openURL(item.print);
                          }}
                          style={{
                            width: '46%',
                            backgroundColor: Colors.themecolor,
                            padding: 10,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                              fontSize: 16,
                              color: Colors.black,
                            }}>
                            Print
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {/* <View
                          style={{
                            backgroundColor:
                              item.status == 1
                                ? '#ff8b3d'
                                : item.status == 2
                                ? '#00b200'
                                : item.status == 3
                                ? '#e50000'
                                : item.status == 4
                                ? '#808080'
                                : null,
                            padding: 4,
                            borderRadius: 30,
                            elevation: 9,
                            width: '30%',
                          }}>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: 16,
                              textAlign: 'center',
                            }}>
                            {item.status == 1
                              ? 'Pending'
                              : item.status == 2
                              ? 'Accepted'
                              : item.status == 3
                              ? 'Rejected'
                              : item.status == 4
                              ? 'Complated'
                              : null}
                          </Text>
                        </View> */}
                    </View>
                    {/* <Text
                        style={{
                          color: Colors.black,
                          fontSize: 16,
                          marginTop: metrics.HEIGHT * 0.01,
                        }}>
                        Gross wt: {item.total_gross_wt}
                      </Text> */}

                    {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 16,
                              marginTop: metrics.HEIGHT * 0.01,
                            }}>
                            Qty: {item.total_qty}
                          </Text>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 16,
                              marginTop: metrics.HEIGHT * 0.01,
                            }}>
                            Remark: {item.remark}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(item.print)}
                          style={{
                            right: metrics.HEIGHT * 0.01,
                            borderColor: Colors.gray,
                            borderWidth: 0.5,

                            height: metrics.HEIGHT * 0.05,
                            width: metrics.WIDTH * 0.25,
                            borderRadius: 30,
                            elevation: 8,
                            backgroundColor: Colors.themecolor,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: Colors.white,
                              textAlign: 'center',
                              fontSize: 16,
                            }}>
                            View Print
                          </Text>
                        </TouchableOpacity>
                      </View> */}
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      Order List Empty
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

export default Oderlist;
