import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Colors from '../Utils/colors';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import metrics from '../Utils/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL, vender_id} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import Fonts from '../Utils/Fonts';
import {Dropdown} from 'react-native-element-dropdown';

// import RNPreventScreenshot from 'react-native-prevent-screenshot';
const Registration = props => {
  const data = [{label: 'India', value: 101}];
  const [valueState, setValueState] = useState('');
  const [statearray, setstatearray] = useState([]);
  const [cityarray, setcityarray] = useState([]);

  // useEffect(() => {
  //   RNPreventScreenshot;
  // }, []);
  const [value, setValue] = useState('India');
  const [isFocus, setIsFocus] = useState(false);

  const [getnumber, SetNumber] = useState('');
  const [getpass, SetPass] = useState('');
  const [isloading, SetLoading] = useState(false);
  const validemail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
  const Register = () => {
    if (getname === '') {
      Toast.show('Enter The Name....!!!');
    } else if (getnumber === '') {
      Toast.show('Enter The Mobile No....!!!');
    } else if (getnumber.length < 9) {
      Toast.show('Enter Valid Mobile Number....!!!');
    } else if (getpass === '') {
      Toast.show('Enter The Password....!!!');
    } else if (getpass.length < 6) {
      Toast.show('Password Must be a more then 6 characters....!!!');
    } else if (getemail === '') {
      Toast.show('Enter The Email address....!!!');
    } else if (validemail.test(getemail) === false) {
      Toast.show('Enter Valid Email address....!!!');
    } else if (companyname === '') {
      Toast.show('Enter The Company name....!!!');
    } else if (valueState === '') {
      Toast.show('Select a State....!!!');
    } else if (valueCity === '') {
      Toast.show('Select a City....!!!');
    } else if (address === '') {
      Toast.show('ENter a address....!!!');
    } else {
      SetLoading(true);
      const formData = new FormData();
      formData.append('user_id', vender_id);
      formData.append('number', getnumber);
      formData.append('password', getpass);
      formData.append('name', getname);
      formData.append('email', getemail);
      formData.append('company_name', companyname);
      formData.append('country_id', 101);
      formData.append('state_id', valueState);
      formData.append('cities_id', valueCity);
      formData.append('address', address);
      console.log('formdata===>', JSON.stringify(formData, null, 2));

      axios
        .post(BASE_URL + 'register', formData, {
          headers: {
            Accept: ACCEPT_HEADER,
          },
        })
        .then(res => {
          console.log('sdvvsdvsd', res.data);
          if (res.data.status === 1) {
            Toast.show(res.data.message);
            // AsyncStorage.setItem('token', JSON.stringify(res.data.token));
            // AsyncStorage.setItem('user_name', res.data.data.name);
            // AsyncStorage.setItem('rate', JSON.stringify(res.data.data.rate));
            // AsyncStorage.setItem('islogin', 'true');
            props.navigation.goBack('');
            SetLoading(false);
          } else {
            Toast.show(res.data.message);
            SetLoading(false);
          }
        })
        .catch(err => {
          console.log('err register', JSON.stringify(err, null, 2));
          // Toast.show('somthing worng please try angin..!!');
          SetLoading(false);
        });
    }
  };
  const [valueCity, setValueCity] = useState('');
  const [getname, setname] = useState('');
  const [companyname, setcompanyname] = useState('');
  const [address, setaddress] = useState('');
  const [getemail, setemail] = useState('');

  useEffect(() => {
    State();
    console.log('sfsv', statearray);
  }, []);

  const State = async () => {
    const formData = new FormData();
    formData.append('country_id', 101);
    console.log('formdata', formData);
    axios
      .post(BASE_URL + 'get-states', formData, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      })
      .then(res => {
        console.log('ssfdvfdbdbd', JSON.stringify(res.data.data, null, 2));
        setstatearray(res.data.data);
        // SetLoading(false);
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
        // Toast.show('somthing worng please try angin..!!');
        // SetLoading(false);
      });
  };
  const City = async id => {
    const formData = new FormData();
    formData.append('state_id', id);
    console.log('formdata', formData);
    axios
      .post(BASE_URL + 'get-cities', formData, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      })
      .then(res => {
        console.log('ssfdvfdbdbd', JSON.stringify(res.data.data, null, 2));
        setcityarray(res.data.data);
        // SetLoading(false);
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
        // Toast.show('somthing worng please try angin..!!');
        // SetLoading(false);
      });
  };

  return (
    <View style={styles.main_View}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <StatusBar backgroundColor={Colors.black} barStyle="light-content" />

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View style={styles.footer}>
              <Text style={styles.text_footer}>REGISTRATION</Text>

              <View style={{marginVertical: 30, width: '100%'}}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={Colors.black}
                  style={[styles.textInput, {marginBottom: 30}]}
                  autoCapitalize="none"
                  onChangeText={val => setname(val)}
                />
                <TextInput
                  placeholder="Mobile Number"
                  placeholderTextColor={Colors.black}
                  style={[styles.textInput, {marginBottom: 30}]}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  maxLength={10}
                  onChangeText={val => SetNumber(val)}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={Colors.black}
                  style={[styles.textInput, {marginBottom: 30}]}
                  autoCapitalize="none"
                  onChangeText={val => SetPass(val)}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={Colors.black}
                  style={[styles.textInput, {marginBottom: 30}]}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={val => setemail(val)}
                />
                <TextInput
                  placeholder="Company name"
                  placeholderTextColor={Colors.black}
                  style={[styles.textInput, {marginBottom: 20}]}
                  autoCapitalize="none"
                  onChangeText={val => setcompanyname(val)}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 30,
                    marginBottom: 20,
                  }}>
                  <View
                    style={[
                      styles.dropdown,
                      {
                        paddingHorizontal: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: Fonts.FontsSize.medium,
                        textAlign: 'center',
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                      }}>
                      India
                    </Text>
                  </View>
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={{
                      color: '#000',
                      fontFamily: Fonts.FontsType.Poppins_Regular,
                    }}
                    iconStyle={styles.iconStyle}
                    data={statearray}
                    search
                    // maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="State"
                    searchPlaceholder="Search..."
                    value={valueState}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValueState(item.id);
                      City(item.id);
                      setIsFocus(false);
                    }}
                    //   renderLeftIcon={() => (
                    //     <AntDesign
                    //       style={styles.icon}
                    //       color={isFocus ? 'blue' : 'black'}
                    //       name="Safety"
                    //       size={20}
                    //     />
                    //   )}
                  />
                </View>
                <View style={{marginBottom: 10}}>
                  <Dropdown
                    style={[
                      styles.dropdownthird,
                      isFocus && {borderColor: 'blue'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={{color: '#000'}}
                    iconStyle={styles.iconStyle}
                    data={cityarray}
                    search
                    labelField="name"
                    valueField="id"
                    placeholder="City"
                    searchPlaceholder="Search..."
                    value={valueCity}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValueCity(item.id);
                      setIsFocus(false);
                    }}
                    //   renderLeftIcon={() => (
                    //     <AntDesign
                    //       style={styles.icon}
                    //       color={isFocus ? 'blue' : 'black'}
                    //       name="Safety"
                    //       size={20}
                    //     />
                    //   )}
                  />
                </View>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor={Colors.transparentgary}
                  style={styles.textInput}
                  autoCapitalize="none"
                  multiline={true}
                  keyboardType="default"
                  onChangeText={val => setaddress(val)}
                />
              </View>

              <TouchableOpacity
                style={{
                  width: '100%',
                  // height: 50,
                  paddingVertical: 11,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                  backgroundColor: Colors.themecolor,
                }}
                onPress={() => {
                  Register();
                }}
                // props.navigation.navigate('MainTabScreen')}
              >
                {isloading === true ? (
                  <ActivityIndicator
                    color={Colors.white}
                    size="small"
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                  />
                ) : (
                  <Text style={[styles.textSign, {color: Colors.white}]}>
                    SUBMIT
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
                }}
                onPress={() => {
                  props.navigation.navigate('LoginScreen');
                }}
                // props.navigation.navigate('MainTabScreen')}
              >
                <Text
                  style={{
                    color: Colors.white,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.white,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  main_View: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: Fonts.FontsSize.h1,
  },
  text_header2: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: Fonts.FontsSize.h6,
    marginTop: 10,
  },
  text_header3: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Fonts.FontsSize.medium,
    marginTop: 10,
    textAlign: 'center',
  },
  dropdownthird: {
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 8,
    width: '100%',
    padding: 5,
    border: 'none',
    backgroundColor: '#fff',
    marginBottom: 20,
  },

  footer: {
    // flex: 3,
    width: '90%',
    padding: 20,
    marginHorizontal: '10%',
    backgroundColor: Colors.transparentBlack2,
    // height: 300,
    borderRadius: 29,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  text_footer: {
    color: Colors.white,
    fontSize: Fonts.FontsSize.h5,
    letterSpacing: 3,
    fontFamily: Fonts.FontsType.Poppins_Medium,
  },

  textInput: {
    // flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 23,
    color: Colors.black,
    // marginBottom: 25,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingVertical: 13,
    // paddingStart: 20,
    fontFamily: Fonts.FontsType.Poppins_Regular,
  },
  dropdown: {
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 10,
    width: '48%',
    padding: 5,
    border: 'none',
    borderRadius: 2,
    backgroundColor: '#fff',
    fontFamily: Fonts.FontsType.Poppins_Regular,
    paddingLeft: 5,
  },

  signIn: {
    width: '100%',
    // height: 50,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.themecolor,

    // elevation: 3,
  },
  textSign: {
    fontSize: 18,
    fontFamily: Fonts.FontsType.Poppins_SemiBold,
    letterSpacing: 3,
  },
});
