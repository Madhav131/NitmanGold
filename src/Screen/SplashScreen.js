import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
import Colors from '../Utils/colors';
import * as Animatable from 'react-native-animatable';

const {height, width} = Dimensions.get('screen');
const SplashScreen = props => {
  useEffect(async () => {
    var islogins = await AsyncStorage.getItem('islogin');

    setTimeout(() => {
      if (islogins === 'true') {
        props.navigation.replace('MainTabScreen');
      } else {
        props.navigation.replace('LoginScreen');
      }
      // props.navigation.replace('LoginScreen');
    }, 2000);
  }, [props]);

  return (
    <View style={styles.main_View}>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <Animatable.View
        animation="bounceIn"
        style={{
          marginTop: '25%',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: width * 1, height: height * 0.6, marginTop: 55}}
          resizeMode="contain"
        />
      </Animatable.View>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  main_View: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
