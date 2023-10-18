import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import Colors from '../Utils/colors';
import Fonts from '../Utils/Fonts';
import metrics from '../Utils/Metrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';

const Instructions = props => {
  const [getdata, SetData] = useState(props.route.params.item);
  const [getremark, SetRemark] = useState('');
  const [getwerr, SetWerr] = useState('');

  var [inputarray, setinputarray] = useState([]);
  setChange = async (text, index, item) => {
    var check_id_exist = inputarray.some((i, index) => i.id === item.id);
    var exist_index = inputarray.findIndex((i, index) => i.id === item.id);

    // console.log('-===========', check_id_exist, exist_index);
    const temp = inputarray;

    if (check_id_exist) {
      temp[exist_index].text = text;
      inputarray = temp;
    } else {
      inputarray.push({id: item.id, text: text});
    }
  };

  var [inputarray1, setinputarray1] = useState([]);
  setChange1 = async (text, index, item) => {
    var check_id_exist = inputarray1.some((i, index) => i.id === item.id);
    var exist_index = inputarray1.findIndex((i, index) => i.id === item.id);

    // console.log('-===========', check_id_exist, exist_index);
    const temp = inputarray1;

    if (check_id_exist) {
      temp[exist_index].text = text;
      inputarray1 = temp;
    } else {
      inputarray1.push({id: item.id, text: text});
    }
  };

  var [inputarray2, setinputarray2] = useState([]);
  setChange2 = async (text, index, item) => {
    var check_id_exist = inputarray2.some((i, index) => i.id === item.id);
    var exist_index = inputarray2.findIndex((i, index) => i.id === item.id);

    // console.log('-===========', check_id_exist, exist_index);
    const temp = inputarray2;

    if (check_id_exist) {
      temp[exist_index].text = text;
      inputarray2 = temp;
    } else {
      inputarray2.push({id: item.id, text: text});
    }
  };
  var [inputarray3, setinputarray2] = useState([]);
  setChange3 = async (text, index, item) => {
    var check_id_exist = inputarray3.some((i, index) => i.id === item.id);
    var exist_index = inputarray3.findIndex((i, index) => i.id === item.id);

    // console.log('-===========', check_id_exist, exist_index);
    const temp = inputarray3;

    if (check_id_exist) {
      temp[exist_index].text = text;
      inputarray3 = temp;
    } else {
      inputarray3.push({id: item.id, text: text});
    }
  };

  const [loading, SetLoading12] = useState(false);
  const PlaceOrder = async () => {
    SetLoading12(true);
    const Token = await AsyncStorage.getItem('token');
    const formData = new FormData();

    formData.append('remark', getremark);

    for (var i = 0; i < inputarray.length; i++) {
      formData.append('field1[' + inputarray[i].id + ']', inputarray[i].text);
    }
    for (var i = 0; i < inputarray1.length; i++) {
      formData.append('field2[' + inputarray1[i].id + ']', inputarray1[i].text);
    }
    for (var i = 0; i < inputarray2.length; i++) {
      formData.append('field2[' + inputarray2[i].id + ']', inputarray2[i].text);
    }
    for (var i = 0; i < inputarray3.length; i++) {
      formData.append('field3[' + inputarray3[i].id + ']', inputarray3[i].text);
    }
    // console.log('formdata', formData);

    axios
      .post(BASE_URL + 'place-order', formData, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('cart-->>', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          props.navigation.replace('MainTabScreen');
          SetLoading12(false);
        } else {
          Toast.show(res.data.message);
          SetLoading12(false);
        }
      })
      .catch(err => {
        console.log('erere', JSON.stringify(err, null, 2));
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
          <Text
            style={{
              color: Colors.black,
              fontSize: 20,
              fontFamily: Fonts.FontsType.Poppins_Regular,
            }}>
            Back
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: '5%',
          }}>
          <Text
            style={{
              fontSize: 22,
              color: Colors.themecolor,
              fontFamily: Fonts.FontsType.Poppins_Medium,
            }}>
            ORDER INSTRUCTIONS:
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: '5%',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.black,
              fontFamily: Fonts.FontsType.Poppins_Medium,
            }}>
            Remark
          </Text>
        </View>
        <View
          style={{
            // marginTop: metrics.HEIGHT * 0.01,
            // height: metrics.HEIGHT * 0.06,
            // width: '%',
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
            marginHorizontal: '5%',
            marginBottom: '5%',
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
          />
        </View>
        <FlatList
          data={getdata}
          renderItem={({item, index}) => {
            return (
              <>
                {item.control_type == 1 ? (
                  <View
                    style={{
                      marginTop: 5,

                      width: '90%',

                      marginHorizontal: '5%',
                      marginBottom: 5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Medium,
                        }}>
                        {item.name}
                        {''}
                        {item.required == 1 ? (
                          <Text style={{color: 'red'}}>*</Text>
                        ) : null}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: metrics.HEIGHT * 0.01,
                        // height: metrics.HEIGHT * 0.06,
                        // width: '%',
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
                        placeholder="Enter text"
                        placeholderTextColor={Colors.gray}
                        style={{
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                          padding: Platform.OS === 'ios' ? 10 : null,
                        }}
                        onChangeText={text => {
                          setChange(text, index, item);
                        }}
                        // onChangeText={Val => SetRemark(Val)}
                        // value={getremark}
                      />
                    </View>
                  </View>
                ) : item.control_type == 2 ? (
                  <View
                    style={{
                      marginTop: 5,

                      width: '90%',

                      marginHorizontal: '5%',
                      marginBottom: 5,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Medium,
                        }}>
                        {item.name}
                        {item.required == 1 ? (
                          <Text style={{color: 'red'}}>*</Text>
                        ) : null}
                      </Text>
                    </View>
                    <View
                      style={{
                        // width: 130,

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
                        data={item.child1}
                        value={getwerr}
                        placeholder="Select"
                        labelField="fields"
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
                          marginHorizontal: 2,
                          top: 2,
                          // width: 90,
                          // padding: 10,
                        }}
                        placeholderStyle={{
                          color: Colors.black,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}
                        selectedTextStyle={{
                          color: Colors.black,
                          fontSize: 14,
                          fontFamily: Fonts.FontsType.Poppins_Regular,
                        }}
                        onChange={(itemValue, itemIndex) => {
                          setChange1(itemValue.fields, index, item);
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
                ) : item.control_type == 3 ? (
                  <>
                    <View
                      style={{
                        marginTop: 5,

                        width: '90%',

                        marginHorizontal: '5%',
                        marginBottom: 5,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Colors.black,
                            fontFamily: Fonts.FontsType.Poppins_Medium,
                          }}>
                          {item.name}
                          {item.required == 1 ? (
                            <Text style={{color: 'red'}}>*</Text>
                          ) : null}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 5,

                        width: '90%',
                        flexDirection: 'row',
                        marginHorizontal: '5%',
                        marginBottom: 5,
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          width: '48%',
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
                          data={item.child1}
                          value={getwerr}
                          placeholder="Select"
                          labelField="fields"
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
                            marginHorizontal: 2,
                            top: 2,
                            // width: 90,
                            // padding: 10,
                          }}
                          placeholderStyle={{
                            color: Colors.black,
                            fontFamily: Fonts.FontsType.Poppins_Regular,
                          }}
                          selectedTextStyle={{
                            color: Colors.black,
                            fontSize: 14,
                            fontFamily: Fonts.FontsType.Poppins_Regular,
                          }}
                          onChange={(itemValue, itemIndex) => {
                            setChange2(itemValue.fields, index, item);
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
                      <View
                        style={{
                          width: '48%',
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
                          data={item.child2}
                          value={getwerr}
                          placeholder="Select"
                          labelField="fields"
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
                            marginHorizontal: 2,
                            top: 2,
                            // width: 90,
                            // padding: 10,
                          }}
                          placeholderStyle={{
                            color: Colors.black,
                            fontFamily: Fonts.FontsType.Poppins_Regular,
                          }}
                          selectedTextStyle={{
                            color: Colors.black,
                            fontSize: 14,
                            fontFamily: Fonts.FontsType.Poppins_Regular,
                          }}
                          onChange={(itemValue, itemIndex) => {
                            setChange3(itemValue.fields, index, item);
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
                  </>
                ) : null}
              </>
            );
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          PlaceOrder();
        }}
        style={{
          // width: 120,
          width: '90%',
          justifyContent: 'center',
          marginTop: metrics.HEIGHT * 0.1,
          backgroundColor: Colors.themecolor,
          marginLeft: metrics.HEIGHT * 0.01,
          borderColor: Colors.themecolor,
          borderWidth: 0.5,
          borderRadius: 10,

          height: 50,
          alignSelf: 'center',
          bottom: '3%',
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
            Place Order
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Instructions;
