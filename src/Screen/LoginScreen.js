// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   KeyboardAvoidingView,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   AsyncStorage,
//   ActivityIndicator,
// } from 'react-native';
// import Colors from '../Utils/colors';
// import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Entypo from 'react-native-vector-icons/Entypo';
// import LinearGradient from 'react-native-linear-gradient';
// import metrics from '../Utils/Metrics';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import {ACCEPT_HEADER, BASE_URL, vender_id} from '../Utils/const';
// import Toast from 'react-native-simple-toast';
// // import RNPreventScreenshot from 'react-native-prevent-screenshot';
// const LoginScreen = props => {
//   // useEffect(() => {
//   //   RNPreventScreenshot;
//   // }, []);

//   const [getnumber, SetNumber] = useState('');
//   const [getpass, SetPass] = useState('');
//   const [isloading, SetLoading] = useState(false);
//   const login = () => {
//     if (getnumber === '') {
//       Toast.show('Enter The Number....!!!');
//     } else if (getpass === '') {
//       Toast.show('Enter The Password....!!!');
//     } else {
//       SetLoading(true);
//       const formData = new FormData();
//       formData.append('number', getnumber);
//       formData.append('password', getpass);
//       formData.append('user_id', vender_id);
//       console.log('formdata===>', formData);

//       axios
//         .post(BASE_URL + 'login', formData, {
//           headers: {
//             Accept: ACCEPT_HEADER,
//           },
//         })
//         .then(async res => {
//           // console.log(res.data);
//           if (res.data.success === 1) {
//             AsyncStorage.setItem('token', JSON.stringify(res.data.token));
//             AsyncStorage.setItem('user_name', res.data.data.name);
//             AsyncStorage.setItem('rate', JSON.stringify(res.data.data.rate));
//             AsyncStorage.setItem('islogin', 'true');
//             props.navigation.navigate('MainTabScreen');
//             SetLoading(false);
//           } else {
//             Toast.show(res.data.message);
//             SetLoading(false);
//           }
//         })
//         .catch(err => {
//           // console.log('err', JSON.stringify(err, null, 2));
//           // Toast.show('somthing worng please try angin..!!');
//           SetLoading(false);
//         });
//     }
//   };

//   return (
//     <View style={styles.main_View}>
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{flexGrow: 1}}>
//           <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

//           <View style={styles.header}>
//             <Text style={styles.text_header}>Welcome!</Text>
//           </View>
//           <Animatable.View style={styles.footer} animation="fadeInUpBig">
//             <Text style={styles.text_footer}>Login</Text>
//             <View style={styles.action}>
//               <Ionicons name="ios-call" color={Colors.themecolor} size={25} />
//               <TextInput
//                 placeholder="Enter Mobile Number"
//                 placeholderTextColor="#666666"
//                 style={styles.textInput}
//                 autoCapitalize="none"
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 onChangeText={val => SetNumber(val)}
//               />
//             </View>
//             <View style={[styles.action, {marginTop: metrics.HEIGHT * 0.05}]}>
//               <Entypo name="lock" color={Colors.themecolor} size={25} />
//               <TextInput
//                 placeholder="Enter Password"
//                 placeholderTextColor="#666666"
//                 style={styles.textInput}
//                 autoCapitalize="none"
//                 keyboardType="default"
//                 maxLength={10}
//                 onChangeText={val => SetPass(val)}
//               />
//             </View>
//             <View style={styles.button}>
//               <TouchableOpacity
//                 style={styles.signIn}
//                 onPress={() => {
//                   login();
//                 }}
//                 // props.navigation.navigate('MainTabScreen')}
//               >
//                 <LinearGradient
//                   colors={[Colors.themecolor, Colors.themecolor]}
//                   style={styles.signIn}>
//                   {isloading === true ? (
//                     <ActivityIndicator
//                       color={Colors.white}
//                       size="small"
//                       style={{justifyContent: 'center', alignSelf: 'center'}}
//                     />
//                   ) : (
//                     <Text style={[styles.textSign, {color: Colors.white}]}>
//                       Sign In
//                     </Text>
//                   )}
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </Animatable.View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   main_View: {
//     flex: 1,
//     backgroundColor: Colors.themecolor,
//   },
//   header: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     paddingBottom: 50,
//   },
//   text_header: {
//     color: Colors.white,
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   footer: {
//     flex: 3,
//     backgroundColor: Colors.white,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   text_footer: {
//     color: Colors.black,
//     fontSize: 18,
//   },
//   action: {
//     flexDirection: 'row',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.themecolor,
//     paddingBottom: 5,
//   },
//   textInput: {
//     flex: 1,
//     marginTop: Platform.OS === 'ios' ? 0 : -12,
//     paddingLeft: 10,
//     color: Colors.black,
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   signIn: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     // elevation: 3,
//   },
//   textSign: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

////
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
  BackHandler,
  Linking,
  Alert,
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
import VersionCheck from 'react-native-version-check';
// import RNPreventScreenshot from 'react-native-prevent-screenshot';
const LoginScreen = props => {
  // useEffect(() => {
  //   RNPreventScreenshot;
  // }, []);

  useEffect(() => {
    Checkversion();
  }, []);

  const Checkversion = async () => {
    try {
      let updateneed = await VersionCheck.needUpdate();
      if (updateneed && updateneed.isNeeded) {
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateneed.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [getnumber, SetNumber] = useState('');
  const [getpass, SetPass] = useState('');
  const [isloading, SetLoading] = useState(false);
  const login = () => {
    if (getnumber === '') {
      Toast.show('Enter The Number....!!!');
    } else if (getpass === '') {
      Toast.show('Enter The Password....!!!');
    } else {
      SetLoading(true);
      const formData = new FormData();
      formData.append('number', getnumber);
      formData.append('password', getpass);
      formData.append('user_id', vender_id);
      console.log('formdata===>', formData);

      axios
        .post(BASE_URL + 'login', formData, {
          headers: {
            Accept: ACCEPT_HEADER,
          },
        })
        .then(async res => {
          // console.log(res.data);
          if (res.data.success === 1) {
            AsyncStorage.setItem('token', JSON.stringify(res.data.token));
            AsyncStorage.setItem('user_name', res.data.data.name);
            AsyncStorage.setItem('rate', JSON.stringify(res.data.data.rate));
            AsyncStorage.setItem('islogin', 'true');
            props.navigation.navigate('MainTabScreen');
            SetLoading(false);
          } else {
            Toast.show(res.data.message);
            SetLoading(false);
          }
        })
        .catch(err => {
          // console.log('err', JSON.stringify(err, null, 2));
          // Toast.show('somthing worng please try angin..!!');
          SetLoading(false);
        });
    }
  };

  return (
    <View style={styles.main_View}>
      {/* <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}> */}
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
          <View style={styles.header}>
            <Text style={styles.text_header}>WELCOME</Text>
            <Text style={styles.text_header3}>
              We're so glad to see you again.{'\n'} Thank you for choosing to
              use our services.
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text_footer}>LOGIN</Text>

            <View
              style={{
                marginVertical: 30,
                width: '100%',
              }}>
              <TextInput
                placeholder="Enter Mobile Number"
                placeholderTextColor={Colors.transparentgary}
                style={[styles.textInput, {marginBottom: 30}]}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={val => SetNumber(val)}
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.transparentgary}
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={val => SetPass(val)}
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
                login();
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
                props.navigation.navigate('Form');
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
                Registration
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default LoginScreen;

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
    fontSize: Fonts.FontsSize.h1,
    fontFamily: Fonts.FontsType.Poppins_SemiBold,
  },
  text_header2: {
    color: Colors.white,
    fontSize: Fonts.FontsSize.h6,
    marginTop: 10,
    fontFamily: Fonts.FontsType.Poppins_Medium,
  },
  text_header3: {
    color: Colors.white,
    fontFamily: Fonts.FontsType.Poppins_Regular,
    fontSize: Fonts.FontsSize.medium,
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    // flex: 3,
    width: '80%',
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
    fontFamily: Fonts.FontsType.Poppins_SemiBold,
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
    fontFamily: Fonts.FontsType.Poppins_Medium,
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
    fontWeight: '900',
    letterSpacing: 3,
    fontFamily: Fonts.FontsType.Poppins_Bold,
  },
});
