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
import metrics from '../Utils/Metrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNModal from 'react-native-modal';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import Fonts from '../Utils/Fonts';

const DATA = [
  {id: 1, name: 'Gender'},
  {id: 2, name: 'Brand'},
  {id: 3, name: 'Project'},
  {id: 4, name: 'Collection'},
  // {id: 5, name: 'Gross Wt'},
  // {id: 6, name: 'Net Wt'},
];

const FillterScreen = props => {
  const [getid, SetId] = useState(props.route.params.iiid);
  const [getpname, SetPname] = useState(props.route.params.pname);
  const [gettotal, SetTotal] = useState(props.route.params.ptotal);
  const [getcatname, SetCatName] = useState('Gender');
  const [getcat, SetCat] = useState([]);
  const [getbrand, SetBrand] = useState([]);
  const [getproject, SetProject] = useState([]);
  const [getcoll, SetColl] = useState([]);
  const [getcatid, SetCatId] = useState(props.route.params.catid);
  const [getbrandid, SetBrandId] = useState(props.route.params.brandid);
  const [getprojectid, SetProjectId] = useState(props.route.params.projectid);
  const [getcollid, SetCollId] = useState(props.route.params.collid);
  const [getindex, Setindex] = useState(0);
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     getfilter();
  //   });

  //   return unsubscribe;
  // }, [props]);
  useEffect(() => {
    getfilter();
  }, [props]);

  const getfilter = async () => {
    const Token = await AsyncStorage.getItem('token');

    axios
      .get(BASE_URL + 'get-filter', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('subcat-->>', res.data);
        if (res.data.success === 1) {
          SetCat(res.data.gender);
          SetBrand(res.data.brand);
          SetProject(res.data.project);
          SetColl(res.data.collection);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        Toast.show('somthing worng please try angin..!!');
      });
  };

  const submit = () => {
    props.navigation.replace('ProductScreen', {
      iid: getid,
      proname: getpname,
      total: gettotal,
      catid: getcatid,
      brandid: getbrandid,
      projectid: getprojectid,
      collid: getcollid,
      consd: true,
    });
  };

  const clearall = () => {
    props.navigation.replace('ProductScreen', {
      iid: getid,
      proname: getpname,
      total: gettotal,
      catid: '',
      brandid: '',
      projectid: '',
      collid: '',
      consd: false,
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
          elevation: 5,
          width: '100%',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <TouchableOpacity
          onPress={() => clearall()}
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
          <Text
            style={{
              color: Colors.black,
              fontSize: 20,
              fontFamily: Fonts.FontsType.Poppins_Regular,
            }}>
            Filter
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.white,
          borderTopColor: Colors.gray,
          borderBottomColor: Colors.gray,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          // padding: '5%',
          height: metrics.HEIGHT * 0.06,
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: Colors.lightgray,
            width: '40%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Colors.gray,
              textAlign: 'center',
            }}>
            FILTER BY
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            width: '60%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Colors.gray,
              textAlign: 'center',
              fontSize: 16,
            }}>
            {getcatname}
          </Text>
        </View>
      </View> */}
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            width: '40%',
            backgroundColor: '#F1F1F3',
          }}>
          <FlatList
            data={DATA}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    SetCatName(item.name);
                    Setindex(index);
                  }}
                  style={{
                    padding: '15%',
                    // borderTopColor: Colors.gray,
                    // borderTopWidth: 0.5,
                    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                    borderBottomWidth: 1,
                    backgroundColor:
                      getindex == index ? Colors.themecolor : null,
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      fontFamily: Fonts.FontsType,
                      fontFamily: Fonts.FontsType.Poppins_Regular,
                    }}>
                    {' '}
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            width: '60%',
            borderTopWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          {getcatname === 'Gender' ? (
            <FlatList
              data={getcat}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => SetCatId(item.id)}
                    style={{
                      padding: 21.5,
                      // borderTopColor: Colors.gray,
                      // borderTopWidth: 0.5,
                      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                      borderBottomWidth: 1,
                      backgroundColor:
                        item.id === getcatid ? Colors.white : Colors.white,
                    }}>
                    <Text
                      style={{
                        color:
                          item.id == getcatid ? Colors.themecolor : Colors.gray,
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                      }}>
                      {' '}
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          {getcatname === 'Brand' ? (
            <FlatList
              data={getbrand}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => SetBrandId(item.id)}
                    style={{
                      padding: 21.5,
                      // borderTopColor: Colors.gray,
                      // borderTopWidth: 0.5,
                      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                      borderBottomWidth: 1,

                      backgroundColor:
                        item.id === getbrandid ? Colors.white : Colors.white,
                    }}>
                    <Text
                      style={{
                        color:
                          item.id == getbrandid
                            ? Colors.themecolor
                            : Colors.gray,
                        fontSize: 16,
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                      }}>
                      {' '}
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          {getcatname === 'Project' ? (
            <FlatList
              data={getproject}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => SetProjectId(item.id)}
                    style={{
                      padding: 21.5,
                      // borderTopColor: Colors.gray,
                      // borderTopWidth: 0.5,
                      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                      borderBottomWidth: 1,
                      backgroundColor:
                        item.id === getprojectid ? Colors.white : Colors.white,
                    }}>
                    <Text
                      style={{
                        color:
                          item.id == getprojectid
                            ? Colors.themecolor
                            : Colors.gray,
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                      }}>
                      {' '}
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          {getcatname === 'Collection' ? (
            <FlatList
              data={getcoll}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => SetCollId(item.id)}
                    style={{
                      padding: 21.5,
                      // borderTopColor: Colors.gray,
                      // borderTopWidth: 0.5,
                      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                      borderBottomWidth: 1,

                      backgroundColor:
                        item.id === getcollid ? Colors.white : Colors.white,
                    }}>
                    <Text
                      style={{
                        color:
                          item.id == getcollid
                            ? Colors.themecolor
                            : Colors.gray,
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                      }}>
                      {' '}
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
        </View>
      </View>
      <View
        style={{
          marginTop: metrics.HEIGHT * 0.01,
          marginBottom: metrics.HEIGHT * 0.01,
          flexDirection: 'row',
          marginHorizontal: '3%',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => clearall()}
          style={{
            width: '43%',
            backgroundColor: Colors.lightbackground,
            justifyContent: 'center',
            padding: '4%',
            borderRadius: 10,
            alignItems: 'center',
            // elevation: 5
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: Colors.black,
              fontFamily: Fonts.FontsType.Poppins_Regular,
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => submit()}
          style={{
            width: '45%',
            backgroundColor: Colors.themecolor,
            justifyContent: 'center',
            padding: '4%',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: Colors.black,
              fontFamily: Fonts.FontsType.Poppins_Regular,
              fontSize: 18,
            }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FillterScreen;
