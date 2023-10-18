import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Colors from '../Utils/colors';
import metrics from '../Utils/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from 'react-native-reanimated';
const HeaderScreen = props => {
  return (
    <View style={styles.main_view}>
      <View style={styles.header}>
        <View
          style={{
            justifyContent: 'center',
            width: '10%',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.openDrawer()}
            style={{
              justifyContent: 'center',
            }}>
            <Ionicons
              name="ios-menu"
              color={Colors.black}
              size={35}
              style={{}}
            />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: '20%',
          }}>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: 90,
              height: 60,
              // backgroundColor: Colors.black,
            }}
            resizeMode="contain"
          />
        </View> */}
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('WishList')}
            style={{
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: Colors.lightbackground,
              alignItems: 'center',
            }}>
            <AntDesign name="hearto" size={20} color={Colors.black} />
            {/* <FontAwesome
              name="user-circle-o"
              color={Colors.themecolor}
              size={28}
              style={{}}
            /> */}
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={{
            justifyContent: 'center',
          }}>
          <FontAwesome
            name="search"
            color={Colors.themecolor}
            size={28}
            style={{}}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
export default HeaderScreen;
const styles = StyleSheet.create({
  main_view: {
    backgroundColor: Colors.white,
    height: metrics.HEIGHT * 0.08,
    // elevation: 5,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? '5%' : 0,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    width: '100%',
    justifyContent: 'space-between',
  },
});
