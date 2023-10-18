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
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNModal from 'react-native-modal';
import axios from 'axios';
import {ACCEPT_HEADER, BASE_URL} from '../Utils/const';
import Toast from 'react-native-simple-toast';
import {useCartContext} from '../context/cart_context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import images from '../Utils/images';
import Fonts from '../Utils/Fonts';
import Box from '../assets/icon2/Frame15.svg';
import Heart from '../assets/icon2/add-to-favorites3.svg';

// import Ionicons from 'react-native-vector-icons/Ionicons';
const DATA1 = [
  {id: 1, img: require('../assets/sub1.jpeg')},
  {id: 2, img: require('../assets/sub2.jpeg')},
  {id: 3, img: require('../assets/sub3.jpeg')},
  {id: 4, img: require('../assets/sub4.jpeg')},
  {id: 5, img: require('../assets/sub5.jpeg')},
  {id: 5, img: require('../assets/sub6.jpeg')},
];

const CATS = [
  {id: 1, name: 'Latest First'},
  {id: 2, name: 'Oldest First'},
  {id: 3, name: 'Gross Wt Low to High'},
  {id: 4, name: 'Gross Wt High to Low'},
  {id: 5, name: 'Net Wt Low to High'},
  {id: 6, name: 'Net Wt High to Low'},
];

const VIEWDATA = [
  {
    id: 1,
    // img: require('../assets/4square.jpeg')
    img: 'grid-outline',
  },
  {id: 2, img: images.hori},
  {id: 3, img: images.verti},
];

const ProductScreen = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [viewmodal, SetViewModal] = useState(false);
  const [getindex, setIndex] = useState(1);
  const [getid, SetId] = useState(props.route.params.iid);
  const [name, SetName] = useState(props.route.params.proname);
  const [gettotal, SetTotal] = useState();
  const [isloading, SetLoading] = useState(false);
  const [get_product, Set_Product] = useState([]);
  const [getviewid, SetViewId] = useState(1);
  const [getname, Set_Name] = useState('');
  const [getcondation, SetCondation] = useState(
    props.route.params.consd === undefined ? false : props.route.params.consd,
  );
  const [getcatid, SetCatId] = useState(props.route.params.catid);
  const [getbrandid, SetBrandId] = useState(props.route.params.brandid);
  const [getprojectid, SetProjectId] = useState(props.route.params.projectid);
  const [getcollid, SetCollId] = useState(props.route.params.collid);
  const [gettotal_cart, SetTotal_Cart] = useState('');
  const [getqty, SetQTY] = useState(1);
  const [gettouch, SetTouch] = useState();
  const [gettouch1, SetTouch1] = useState();
  const [last_count, SetLast_Count] = useState();
  const [getcarticon, SetCartIcon] = useState();
  const [getwishicon, SetWishIcon] = useState();
  const [task_arrayholder, setBranchArray] = useState([]);
  const {
    addToCart,
    cart,
    increase_qty,
    decrease_qty,
    total,
    removeFromCart,
    qty,
    total_qty,
  } = useCartContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      get_Count();
      getcart();
      getwishlist();
    });

    return unsubscribe;
  }, [props]);

  useEffect(() => {
    getProduct(1);
  }, [props]);

  const [loads, setloads] = useState(false);

  const getProduct = async id => {
    console.log('page--->', page);
    console.log('id----->', id);
    setLoading(true);
    setloads(true);
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();
    // fromdata.append('page', page);
    if (id == 1) {
      fromdata.append('id', getid);
      fromdata.append('latest', 1);
    } else if (id == 2) {
      fromdata.append('oldest', 1);
      fromdata.append('id', getid);
    } else if (id == 3) {
      fromdata.append('gross_asc', 1);
      fromdata.append('id', getid);
    } else if (id == 4) {
      fromdata.append('gross_desc', 1);
      fromdata.append('id', getid);
    } else if (id == 5) {
      fromdata.append('net_asc', 1);
      fromdata.append('id', getid);
    } else if (id == 6) {
      fromdata.append('net_desc', 1);
      fromdata.append('id', getid);
    }
    if (getcondation === true) {
      fromdata.append('id', getid);
      fromdata.append('gender_id', getcatid);
      fromdata.append('brand_id', getbrandid);
      fromdata.append('project_id', getprojectid);
      fromdata.append('collection_id', getcollid);
    }
    fetch(
      'https://jewelcate.com/jewelcate/api/v1/get-product-list-new?page=' +
        page,

      {
        method: 'POST',
        body: fromdata,
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson--->', responseJson);
        //Successful response

        // // //Increasing the offset for the next API call
        Set_Product([...get_product, ...responseJson.data.data]);
        SetTotal(responseJson.data.total);
        setBranchArray(responseJson.data.data);
        SetPage(page + 1);
        getcart();
        getwishlist();
        setLoading(false);
        setloads(false);
      })
      .catch(error => {
        console.error(error);
      });
    // axios
    //   .post(
    //     `https://jewelcate.com/jewelcate/api/v1/get-product-list-new?page=${page}`,
    //     fromdata,
    //     {
    //       headers: {
    //         Accept: ACCEPT_HEADER,
    //         Authorization: 'Bearer ' + JSON.parse(Token),
    //       },
    //     },
    //   )
    //   .then(res => {
    //     if (res.data.success == 1) {
    //       console.log('respone-=->', res.data.data);
    //       SetPage(page + 1);
    //       SetTotal(res.data.total_count);
    //       Set_Product(...get_product, res.data.data.data);
    //       // Set_Product(res.data.data);
    //       setBranchArray(res.data.data);
    //       setLoading(false);
    //     } else {
    //       // SetLoading(false);
    //     }
    //   })
    //   .catch(err => {
    //     // console.log('errror-->>', err);
    //     // SetLoading(false);
    //   });
  };

  const apiaddtocart = async item => {
    const formdata = new FormData();
    formdata.append('product_id', item.id);
    formdata.append('size_id', item.size_id);
    formdata.append('purity_id', item.purity_id);
    formdata.append('quantity', getqty === '' ? '1' : getqty);
    formdata.append('remark', '');
    // console.log('formdata-->addtocart', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'add-cart', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('respons-->', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          get_Count();
          // getProduct(1);

          SetQTY('');
          getcart();
        }
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const apiaddtowish = async item => {
    const formdata = new FormData();
    formdata.append('product_id', item.id);
    formdata.append('size_id', item.size_id);
    formdata.append('purity_id', item.purity_id);

    // console.log('formdata-->', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'add-wishlist', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('respons-->', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          get_Count();
          // getProduct(1);
          SetQTY('');
          getwishlist();
        }
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };
  const get_Count = async () => {
    // console.log('idd-->', getid);
    // SetLoading(true);
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
        // SetLoading(false);
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // SetLoading(false);
      });
  };

  const searchFilter_branch = text => {
    const newData = task_arrayholder.filter(function (item) {
      const employee = item.name ? item.name.toUpperCase() : ''.toUpperCase();

      const textData = text.toUpperCase();
      return employee.indexOf(textData) > -1;
    });
    console.log('dddd', newData);
    Set_Product(newData);
  };

  const Qtyupdate = async (id, qty) => {
    // console.log('item-->', id, qty);
    const formdata = new FormData();
    formdata.append('product_id', id);
    formdata.append('quantity', Number(qty) + 1);

    // console.log('fromdata-=-=>updateQty', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'update-cart-list', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        console.log('lofff', res.data);
        Toast.show(res.data.message);

        get_Count();
        getcart();
        // getProduct(1);
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const Qtyupdate1 = async (id, qty) => {
    const formdata = new FormData();
    formdata.append('product_id', id);
    formdata.append('quantity', Number(qty) - 1);

    console.log('fromdata-=-=>minus', formdata);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'update-cart-list', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('lofff', res.data);
        Toast.show(res.data.message);
        get_Count();
        getcart();
        // getProduct(1);
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const deleteitem = async id => {
    const formdata = new FormData();
    formdata.append('product_id', id);
    const Token = await AsyncStorage.getItem('token');
    axios
      .post(BASE_URL + 'delete-cart-list', formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('lofff', res.data);
        Toast.show(res.data.message);
        get_Count();
        getcart();
        // getProduct(1);
      })
      .catch(err => {
        // console.log('errr-->', err);
      });
  };

  const [loading, setLoading] = useState(true);
  const [page, SetPage] = useState(1);

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => getProduct(getindex)}
          //On Click of button load more data
          style={{
            padding: 10,
            backgroundColor: Colors.themecolor,

            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '5%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              textAlign: 'center',
              fontFamily: Fonts.FontsType.Poppins_Regular,
            }}>
            Load More
          </Text>
          {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : (
            <AntDesign
              name="down"
              color={Colors.white}
              size={22}
              style={{marginLeft: 8}}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const [get_cart, Set_Cart] = useState([]);
  const [get_wishlist, Set_WishList] = useState([]);

  const getcart = async () => {
    const Token = await AsyncStorage.getItem('token');

    axios
      .get(BASE_URL + 'get-cart', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('cart-->>', res.data);
        if (res.data.success === 1) {
          Set_Cart(res.data.data);
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
      });
  };

  const getwishlist = async () => {
    const Token = await AsyncStorage.getItem('token');

    axios
      .get(BASE_URL + 'get-wishlist', {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('cart-->>', res.data);
        if (res.data.success === 1) {
          Set_WishList(res.data.data);
        }
      })
      .catch(err => {});
  };

  const RenderFooter = () => {
    getProduct(getindex);
    setLoading(true);
    setloads(true);
  };

  const xyz = () => {
    return loading === true ? (
      <ActivityIndicator color="#000" size="small" />
    ) : null;
  };

  const [getcon, setcon] = useState(false);

  const deletecart = async id => {
    const Token = await AsyncStorage.getItem('token');
    const fromdata = new FormData();

    fromdata.append('id', id);
    console.log('fromdata-->', fromdata);
    axios
      .post(BASE_URL + 'delete-wishlist', fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(Token),
        },
      })
      .then(res => {
        // console.log('dalete cart-->>', res.data);
        if (res.data.success === 1) {
          Toast.show(res.data.message);
          getProduct(1);
          props.navigation.goBack();
        }
      })
      .catch(err => {
        // console.log('errror-->>', err);
        // Toast.show('somthing worng please try angin..!!');
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            width: '36%',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack(null)}
            style={{
              justifyContent: 'center',
              // left: '20%',
              // width: '10%',
            }}>
            <MaterialIcons
              name="keyboard-arrow-left"
              color={Colors.black}
              size={33}
              style={{}}
            />
          </TouchableOpacity>
          {/* <View
          style={{
            justifyContent: 'center',
            left: '50%',
            width: '70%',
            // backgroundColor: 'red',
          }}>
          <Text style={{color: Colors.black, fontSize: 25}}>
            {name} ({gettotal}){' '}
          </Text>
        </View> */}
          <View
            style={{
              justifyContent: 'center',
              left: '30%',
              width: 100,
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            width: '53%',
          }}>
          {getcon == true ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F0F0F0',
                borderRadius: 100,
                paddingHorizontal: 10,
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="search1" size={22} color={Colors.gray} />
                <TextInput
                  placeholder="Search here..."
                  placeholderTextColor={Colors.gray}
                  style={{
                    fontSize: 15,
                    width: 125,
                    padding: 8,
                    fontFamily: Fonts.FontsType.Poppins_Regular,
                  }}
                  onChangeText={value => searchFilter_branch(value)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  // Set_Product([]);
                  setcon(false);
                  searchFilter_branch('');
                  // getProduct(1);
                }}
                style={{}}>
                <Ionicons name="close" size={22} color={Colors.gray} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  SetPage(1);
                  Set_Product([]);
                }}
                style={{
                  backgroundColor: '#F0F0F0',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={images.icon3} style={{}} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('FillterScreen', {
                    iiid: getid,
                    pname: name,
                    ptotal: gettotal,
                    catid: getcatid === undefined ? '' : getcatid,
                    brandid: getbrandid === undefined ? '' : getbrandid,
                    projectid: getprojectid === undefined ? '' : getprojectid,
                    collid: getcollid === undefined ? '' : getprojectid,
                  });

                  SetCondation(true);
                }}
                style={{
                  backgroundColor: '#F0F0F0',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={images.icon2}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                {/* <Box width={50} height={50} /> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  SetViewModal(true);
                }}
                style={{
                  backgroundColor: '#F0F0F0',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={images.icon1}
                  style={{width: 18, height: 18}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setcon(true);
                }}
                style={{
                  backgroundColor: '#F0F0F0',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign name="search1" size={22} color={Colors.black} />
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Cart');
          }}
          style={{
            justifyContent: 'center',
            width: '10%',
            marginLeft: metrics.HEIGHT * 0.02,
          }}>
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

      {/* <ScrollView> */}
      {/* <View
        style={{
          elevation: 9,
          borderRadius: 2,
          marginHorizontal: '2%',
          backgroundColor: Colors.white,
          marginTop: metrics.HEIGHT * 0.02,
          padding: '4%',
          marginBottom: metrics.HEIGHT * 0.01,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            SetPage(1);
            Set_Product([]);
          }}
          style={{
            flexDirection: 'row',
          }}>
          <MaterialCommunityIcons
            name="arrow-up-down-bold"
            color={Colors.black}
            size={25}
            style={{}}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: Colors.black,
              fontSize: 16,
            }}>
            SORT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FillterScreen', {
              iiid: getid,
              pname: name,
              ptotal: gettotal,
              catid: getcatid === undefined ? '' : getcatid,
              brandid: getbrandid === undefined ? '' : getbrandid,
              projectid: getprojectid === undefined ? '' : getprojectid,
              collid: getcollid === undefined ? '' : getprojectid,
            });

            SetCondation(true);
          }}
          style={{
            flexDirection: 'row',
          }}>
          <FontAwesome
            name="filter"
            color={Colors.black}
            size={25}
            style={{}}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: Colors.black,
              fontSize: 16,
            }}>
            FILTER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SetViewModal(true)}
          style={{
            flexDirection: 'row',
          }}>
          <FontAwesome
            name="th-large"
            color={Colors.black}
            size={22}
            style={{top: '2%'}}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: Colors.black,
              fontSize: 14,
              left: '15%',
            }}>
            VIEW STYLE
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* <View
        style={{
          borderRadius: 5,
          borderColor: Colors.gray,
          elevation: 5,
          borderWidth: 0.5,
          marginHorizontal: '2%',
          backgroundColor: Colors.white,
          // marginTop: metrics.HEIGHT * 0.01,
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
          placeholder="Search Product"
          placeholderTextColor={Colors.gray}
          style={{
            fontSize: 16,
          }}
          onChangeText={value => searchFilter_branch(value)}
        />
      </View> */}

      <View
        style={{
          marginHorizontal: '10%',
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.black,
            fontSize: 20,
            fontFamily: Fonts.FontsType.Poppins_Medium,
            width: '90%',
          }}>
          {name} ({gettotal}){' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Cart');
          }}
          style={{
            justifyContent: 'center',
            // width: '10%',
            marginLeft: metrics.HEIGHT * 0.02,
          }}>
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
              borderRadius: 25,
              position: 'absolute',
              right: -5,
              // top: 5,
              bottom: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 10}}>{gettotal_cart}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // marginTop: metrics.HEIGHT * 0.01,
          // marginHorizontal: '1.5%',
          // alignSelf: 'center',
          marginHorizontal: '2%',
        }}>
        {isloading === true ? (
          <ActivityIndicator
            size={'large'}
            color={Colors.themecolor}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <>
            {getviewid === 1 ? (
              <View style={{marginTop: 17}}>
                <FlatList
                  data={get_product}
                  numColumns={2}
                  keyExtractor={(item, index) => item.id}
                  style={{marginBottom: 100}}
                  renderItem={({item, index}) => {
                    var check = '';
                    var redux_item;
                    var check1 = '';
                    var reduxitem1;
                    if (get_cart.length > 0) {
                      check = get_cart.some(
                        data => data.product_id == item.id && data.cart == 1,
                      );
                      redux_item = get_cart.find(
                        data => data.product_id == item.id,
                      );
                      // console.log('check-=--=>', che/ck, redux_item);
                    }
                    if (get_wishlist.length > 0) {
                      check1 = get_wishlist.some(
                        data =>
                          data.product_id == item.id && data.wishlist == 1,
                      );
                      reduxitem1 = get_wishlist.find(
                        data =>
                          data.product_id == item.id && data.wishlist == 1,
                      );
                    }
                    return (
                      <View
                        style={{
                          // marginBottom: 30,
                          // borderRadius: 10,
                          // // width: 155,
                          // marginLeft: 15,
                          // marginTop: 2,
                          marginHorizontal: '3%',
                          width: '44%',
                          marginBottom: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('Viewproduct', {
                              iid: item.id,
                              data: item.cart_qty,
                              chack: check,
                              red_qty: redux_item ? redux_item.user_qty : '0',
                            })
                          }>
                          <View
                            style={{
                              // elevation: 3,
                              backgroundColor: Colors.white,
                              borderRadius: 10,
                            }}>
                            <FastImage
                              imageStyle={{
                                borderRadius: 5,
                              }}
                              // source={require('../assets/logo.png')}
                              source={
                                item.productimages.length === 0
                                  ? require('../assets/logo.png')
                                  : {
                                      uri: item.productimages[0]
                                        .image_full_path,
                                      priority: FastImage.priority.high,
                                    }
                              }
                              resizeMode={FastImage.resizeMode.contain}
                              style={{
                                width: '100%',
                                height: 200,
                                // marginRight: 5,
                                borderWidth: 1,
                                borderColor: Colors.lightbackground,
                                borderRadius: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginHorizontal: '2%',
                                }}>
                                {/* {check ? (
                                  <TouchableOpacity>
                                    <Ionicons
                                      name="ios-cart"
                                      size={35}
                                      color={'#1D811D'}
                                    />
                                  </TouchableOpacity>
                                ) : null} */}
                                {check1 ? (
                                  <TouchableOpacity
                                    onPress={
                                      () =>
                                        // deletecart(item.id)
                                        console.log(
                                          'iii',
                                          JSON.stringify(item, null, 2),
                                        )
                                      // props.navigation.navigate('WishList')
                                    }
                                    style={{
                                      justifyContent: 'center',
                                      width: 40,
                                      height: 40,
                                      borderRadius: 40,
                                      backgroundColor: Colors.lightbackground,
                                      alignItems: 'center',
                                      top: 10,
                                      right: 5,
                                      position: 'absolute',
                                    }}>
                                    <AntDesign
                                      name="heart"
                                      size={20}
                                      color={'green'}
                                    />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => apiaddtowish(item)}
                                    style={{
                                      justifyContent: 'center',
                                      width: 40,
                                      height: 40,
                                      borderRadius: 40,
                                      backgroundColor: Colors.lightbackground,
                                      alignItems: 'center',
                                      top: 10,
                                      right: 5,
                                      position: 'absolute',
                                    }}>
                                    <AntDesign
                                      name="hearto"
                                      size={20}
                                      color={Colors.black}
                                    />
                                    {/* <FontAwesome
                                  name="user-circle-o"
                                  color={Colors.themecolor}
                                  size={28}
                                  style={{}}
                                /> */}
                                  </TouchableOpacity>
                                )}
                              </View>
                            </FastImage>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            marginHorizontal: '4%',
                            alignItems: 'flex-start',
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 16,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                            }}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 5,
                            }}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 14,
                                fontFamily: Fonts.FontsType.Poppins_Regular,
                              }}>
                              Gwt: <Text>{item.gross_weight}</Text>
                            </Text>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 14,
                                marginLeft: 10,
                                fontFamily: Fonts.FontsType.Poppins_Regular,
                              }}>
                              Nwt: {item.net_weight}
                            </Text>
                          </View>
                        </View>
                        {/* {item.cart === 1 ? ( */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginTop: 5,
                            // justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: metrics.HEIGHT * 0.01,
                              marginBottom: metrics.HEIGHT * 0.01,
                              justifyContent: 'space-between',
                              marginHorizontal: '2%',
                              backgroundColor: Colors.white,
                              elevation: 7,
                              padding: 5,
                              borderRadius: 8,
                              alignItems: 'center',
                              width: '70%',

                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.29,
                              shadowRadius: 4.65,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                redux_item === undefined
                                  ? null
                                  : redux_item.cart_qty > 1
                                  ? Qtyupdate1(item.id, redux_item.cart_qty)
                                  : deleteitem(item.id);
                              }}
                              style={{
                                borderRadius: 5,
                                padding: 5,
                                // height: metrics.HEIGHT * 0.05,
                                // width: metrics.WIDTH * 0.09,
                                justifyContent: 'center',
                                elevation: 2,
                                backgroundColor: Colors.lightbackground,

                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                              }}>
                              <Entypo
                                name="minus"
                                color={Colors.black}
                                size={15}
                                style={{alignSelf: 'center'}}
                              />
                            </TouchableOpacity>
                            <View>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                  minWidth: 43,
                                }}>
                                {redux_item === undefined
                                  ? 0
                                  : redux_item.cart_qty}
                                
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() =>
                                item.cart_qty == 0
                                  ? apiaddtocart(item)
                                  : Qtyupdate(item.id, redux_item.cart_qty)
                              }
                              style={{
                                borderRadius: 5,
                                padding: 5,
                                // height: metrics.HEIGHT * 0.05,
                                // width: metrics.WIDTH * 0.09,
                                justifyContent: 'center',
                                elevation: 2,
                                backgroundColor: Colors.lightbackground,

                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                              }}>
                              <Entypo
                                name="plus"
                                color={Colors.black}
                                size={15}
                                style={{alignSelf: 'center'}}
                              />
                            </TouchableOpacity>
                            {/* <View
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.2,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.black,
                                fontSize: 16,
                              }}>
                              {redux_item === undefined
                                ? 0
                                : redux_item.cart_qty}
                            </Text>
                          </View> */}

                            {/* <TouchableOpacity
                            onPress={() =>
                              item.cart_qty == 0
                                ? apiaddtocart(item)
                                : Qtyupdate(item.id, redux_item.cart_qty)
                            }
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="plus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              redux_item.cart_qty == 0
                                ? null
                                : redux_item.cart_qty > 1
                                ? Qtyupdate1(item.id, redux_item.cart_qty)
                                : deleteitem(item.id);
                            }}
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="minus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity> */}
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtocart(item);
                            }}
                            style={{
                              marginLeft: 6,
                              backgroundColor: check ? '#1D811D' : Colors.white,
                              padding: 5,
                              borderRadius: 8,
                              elevation: 7,
                              alignItems: 'center',
                              justifyContent: 'center',

                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.29,
                              shadowRadius: 4.65,
                            }}>
                            {/* {check ? (
                              <MaterialIcons
                                name="add-shopping-cart"
                                size={20}
                                color="#1D811D"
                              />
                            ) : */}
                            <MaterialIcons
                              name="add-shopping-cart"
                              size={20}
                              color={check ? Colors.white : Colors.black}
                            />
                            {/* } */}

                            {/* <Image source={images.cart} resizeMode="contain" /> */}
                          </TouchableOpacity>
                        </View>

                        {/* // ) : null} */}
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            marginTop: metrics.HEIGHT * 0.01,
                            marginBottom: metrics.HEIGHT * 0.01,
                            justifyContent: 'space-between',
                            marginHorizontal: '2%',
                            // alignSelf: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtocart(item);
                            }}
                            style={{
                              borderColor: Colors.themecolor,
                              borderWidth: 1,
                              height: metrics.HEIGHT * 0.04,
                              width: metrics.WIDTH * 0.22,
                              justifyContent: 'center',
                              borderRadius: 5,
                              elevation: 2,
                              backgroundColor: Colors.themecolor,
                              flexDirection: 'row',
                            }}>
                            <View style={{justifyContent: 'center'}}>
                              <Ionicons
                                name="cart"
                                color={Colors.white}
                                size={20}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 18,
                                  color: Colors.white,
                                  fontWeight: '700',
                                }}>
                                {check ? 'Added' : 'Add'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtowish(item);
                            }}
                            style={{
                              // borderColor: Colors.themecolor,
                              // borderWidth: 1,
                              height: metrics.HEIGHT * 0.04,
                              width: metrics.WIDTH * 0.22,
                              justifyContent: 'center',
                              borderRadius: 5,
                              // elevation: 2,
                              backgroundColor: Colors.themecolor,
                              flexDirection: 'row',
                              right: 3,
                            }}>
                            <View style={{justifyContent: 'center'}}>
                              <Ionicons
                                name="heart-circle-outline"
                                color={Colors.white}
                                size={20}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  color: Colors.white,
                                  fontWeight: '700',
                                }}>
                                {check1 ? 'Wishlist' : 'Wishlist'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View> */}
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            marginTop: metrics.HEIGHT * 0.01,
                            marginBottom: metrics.HEIGHT * 0.01,
                            // justifyContent: 'space-between',
                            marginHorizontal: '2%',
                            alignSelf: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtowish(item);

                              SetTouch(item.id);
                            }}
                            style={{
                              borderColor: Colors.themecolor,
                              borderWidth: 1,
                              height: metrics.HEIGHT * 0.04,
                              width: metrics.WIDTH * 0.4,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.themecolor,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 18,
                                color: Colors.white,
                                fontWeight: '700',
                              }}>
                              Wishlist
                            </Text>
                          </TouchableOpacity>
                        </View> */}
                      </View>
                    );
                  }}
                  // onEndReachedThreshold={0}
                  // ItemSeparatorComponent={ItemSeparatorView}
                  // ListFooterComponent={renderFooter}
                  onEndReached={RenderFooter}
                  onEndThreshold={0}
                  // onEndReachedThreshold={0}
                  // ItemSeparatorComponent={ItemSeparatorView}
                  // // ListFooterComponent={renderFooter}
                  // onEndReached={RenderFooter}
                  // onEndThreshold={0}
                  // ListFooterComponent={() => {
                  //   return loading === true ? (
                  //     <ActivityIndicator color="#000" size="small" />
                  //   ) : null;
                  // }}
                  // ListFooterComponent={xyz}
                />
              </View>
            ) : null}
            {getviewid === 2 ? (
              <View style={{marginTop: 17}}>
                <FlatList
                  data={get_product}
                  keyExtractor={(item, index) => item.id}
                  style={{marginBottom: 100}}
                  renderItem={({item, index}) => {
                    var check = '';
                    var redux_item;
                    var check1 = '';
                    var reduxitem1;
                    if (get_cart.length > 0) {
                      check = get_cart.some(
                        data => data.product_id == item.id && data.cart == 1,
                      );
                      redux_item = get_cart.find(
                        data => data.product_id == item.id,
                      );
                      // console.log('check-=--=>', check, redux_item);
                    }
                    if (get_wishlist.length > 0) {
                      check1 = get_wishlist.some(
                        data =>
                          data.product_id == item.id && data.wishlist == 1,
                      );
                      reduxitem1 = get_wishlist.find(
                        data =>
                          data.product_id == item.id && data.wishlist == 1,
                      );
                    }
                    return (
                      <View
                        style={{
                          marginBottom: metrics.HEIGHT * 0.01,
                          marginTop: metrics.HEIGHT * 0.01,
                          elevation: 7,
                          marginHorizontal: '5%',
                          borderRadius: 10,
                          // alignItems: 'center',
                          backgroundColor: Colors.white,

                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.29,
                          shadowRadius: 4.65,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('Viewproduct', {
                              iid: item.id,
                              data: item.cart_qty,
                              chack: check,
                              red_qty: redux_item ? redux_item.user_qty : '0',
                            })
                          }>
                          <View
                            style={{
                              marginTop: 10,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: Colors.lightbackground,
                              alignItems: 'center',
                              width: 280,
                              height: 250,
                              alignSelf: 'center',
                            }}>
                            <FastImage
                              imageStyle={{
                                borderRadius: 10,
                              }}
                              source={
                                item.productimages.length === 0
                                  ? require('../assets/logo.png')
                                  : {
                                      uri: item.productimages[0]
                                        .image_full_path,
                                    }
                              }
                              resizeMode={FastImage.resizeMode.cover}
                              // resizeMode={FastImage.resizeMode.center}
                              style={{
                                width: 278,
                                height: 248,
                                borderRadius: 10,
                                // marginRight: 5,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginHorizontal: '2%',
                                }}>
                                {/* {check ? (
                                  <TouchableOpacity>
                                    <Ionicons
                                      name="ios-cart"
                                      size={35}
                                      color={'#1D811D'}
                                    />
                                  </TouchableOpacity>
                                ) : null} */}
                                {check1 ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      props.navigation.navigate('WishList')
                                    }
                                    style={{
                                      justifyContent: 'center',
                                      width: 40,
                                      height: 40,
                                      borderRadius: 40,
                                      backgroundColor: Colors.lightbackground,
                                      alignItems: 'center',
                                      top: 10,
                                      right: 5,
                                      position: 'absolute',
                                    }}>
                                    <AntDesign
                                      name="heart"
                                      size={20}
                                      color={'green'}
                                    />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => apiaddtowish(item)}
                                    style={{
                                      justifyContent: 'center',
                                      width: 40,
                                      height: 40,
                                      borderRadius: 40,
                                      backgroundColor: Colors.lightbackground,
                                      alignItems: 'center',
                                      top: 10,
                                      right: 5,
                                      position: 'absolute',
                                    }}>
                                    <AntDesign
                                      name="hearto"
                                      size={20}
                                      color={Colors.black}
                                    />
                                    {/* <FontAwesome
                                  name="user-circle-o"
                                  color={Colors.themecolor}
                                  size={28}
                                  style={{}}
                                /> */}
                                  </TouchableOpacity>
                                )}
                              </View>
                            </FastImage>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 25,
                            marginHorizontal: '5%',
                          }}>
                          <View>
                            <View
                              style={
                                {
                                  // alignItems: 'center',
                                }
                              }>
                              <Text
                                style={{
                                  color: Colors.black,
                                  fontSize: 15,
                                  fontFamily: Fonts.FontsType.Poppins_SemiBold,
                                }}>
                                {item.name}{' '}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: 120,
                                  marginTop: 5,
                                }}>
                                <Text
                                  style={{
                                    color: Colors.black,
                                    fontSize: 15,
                                    fontFamily: Fonts.FontsType.Poppins_Regular,
                                  }}>
                                  Gwt:{' '}
                                  <Text
                                    style={{
                                      fontFamily:
                                        Fonts.FontsType.Poppins_SemiBold,
                                    }}>
                                    {item.gross_weight}
                                  </Text>
                                </Text>
                                <Text
                                  style={{
                                    color: Colors.black,
                                    fontSize: 15,
                                    fontFamily: Fonts.FontsType.Poppins_Regular,
                                    marginLeft: 10,
                                  }}>
                                  Nwt:{' '}
                                  <Text
                                    style={{
                                      fontFamily:
                                        Fonts.FontsType.Poppins_SemiBold,
                                      color: Colors.black,
                                    }}>
                                    {item.net_weight}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: metrics.HEIGHT * 0.01,
                              marginBottom: metrics.HEIGHT * 0.01,
                              justifyContent: 'space-between',
                              marginHorizontal: '2%',
                              backgroundColor: Colors.white,
                              elevation: 7,
                              padding: 8,
                              borderRadius: 8,
                              alignItems: 'center',
                              width: 110,

                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.29,
                              shadowRadius: 4.65,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                redux_item === undefined
                                  ? null
                                  : redux_item.cart_qty > 1
                                  ? Qtyupdate1(item.id, redux_item.cart_qty)
                                  : deleteitem(item.id);
                              }}
                              style={{
                                borderRadius: 5,
                                padding: 6,
                                // height: metrics.HEIGHT * 0.05,
                                // width: metrics.WIDTH * 0.09,
                                justifyContent: 'center',
                                elevation: 2,
                                backgroundColor: Colors.lightbackground,

                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                              }}>
                              <Entypo
                                name="minus"
                                color={Colors.black}
                                size={15}
                                style={{alignSelf: 'center'}}
                              />
                            </TouchableOpacity>
                            <View>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                  minWidth: 38,
                                }}>
                                {redux_item === undefined
                                  ? 0
                                  : redux_item.cart_qty}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() =>
                                item.cart_qty == 0
                                  ? apiaddtocart(item)
                                  : Qtyupdate(item.id, redux_item.cart_qty)
                              }
                              style={{
                                borderRadius: 5,
                                padding: 6,
                                // height: metrics.HEIGHT * 0.05,
                                // width: metrics.WIDTH * 0.09,
                                justifyContent: 'center',
                                elevation: 2,
                                backgroundColor: Colors.lightbackground,

                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                              }}>
                              <Entypo
                                name="plus"
                                color={Colors.black}
                                size={15}
                                style={{alignSelf: 'center'}}
                              />
                            </TouchableOpacity>
                            {/* <View
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.2,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.black,
                                fontSize: 16,
                              }}>
                              {redux_item === undefined
                                ? 0
                                : redux_item.cart_qty}
                            </Text>
                          </View> */}

                            {/* <TouchableOpacity
                            onPress={() =>
                              item.cart_qty == 0
                                ? apiaddtocart(item)
                                : Qtyupdate(item.id, redux_item.cart_qty)
                            }
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="plus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              redux_item.cart_qty == 0
                                ? null
                                : redux_item.cart_qty > 1
                                ? Qtyupdate1(item.id, redux_item.cart_qty)
                                : deleteitem(item.id);
                            }}
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="minus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity> */}
                          </View>
                        </View>

                        {/* {item.cart == 1 ? ( */}
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            marginTop: metrics.HEIGHT * 0.01,
                            marginBottom: metrics.HEIGHT * 0.01,
                            // justifyContent: 'space-between',
                            marginHorizontal: '2%',
                            backgroundColor: Colors.white,
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.2,
                              justifyContent: 'center',
                              elevation: 2,
                              marginHorizontal: '2%',
                              backgroundColor: Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.black,
                                fontSize: 16,
                              }}>
                              {redux_item === undefined
                                ? 0
                                : redux_item.cart_qty}
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() =>
                              item.cart_qty == 0
                                ? apiaddtocart(item)
                                : Qtyupdate(item.id, redux_item.cart_qty)
                            }
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                              marginHorizontal: '2%',
                            }}>
                            <AntDesign
                              name="plus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              redux_item.cart_qty == 0
                                ? null
                                : redux_item.cart_qty > 1
                                ? Qtyupdate1(item.id, redux_item.cart_qty)
                                : deleteitem(item.id);
                            }}
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              marginHorizontal: '2%',
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="minus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                        </View> */}
                        {/* ) : null} */}
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: metrics.HEIGHT * 0.02,
                            marginBottom: metrics.HEIGHT * 0.01,
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            width: 300,
                            paddingHorizontal: '5%',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtocart(item);
                            }}
                            style={{
                              width: 125,
                              justifyContent: 'space-between',
                              elevation: 2,
                              backgroundColor: check ? '#1D811D' : Colors.white,
                              flexDirection: 'row',
                              borderRadius: 10,
                              height: 50,
                              paddingHorizontal: '8%',
                              alignItems: 'center',
                              // paddingTop: 10,
                              // paddingBottom: 10,

                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 1.41,
                            }}>
                            <View style={{justifyContent: 'center'}}>
                              <MaterialIcons
                                name="add-shopping-cart"
                                size={23}
                                color={check ? Colors.white : Colors.black}
                              />
                              {/* <Image
                                source={images.cartblack}
                                style={{width: 25, height: 25}}
                              /> */}
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  // textAlign: 'center',
                                  fontSize: 15,
                                  color: check ? Colors.white : Colors.black,
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                }}>
                                {check ? 'Added' : 'Add'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginBottom: metrics.HEIGHT * 0.01,
                              justifyContent: 'space-between',
                              marginHorizontal: '2%',
                              alignSelf: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                apiaddtowish(item);
                              }}
                              style={{
                                width: 125,
                                justifyContent: 'space-evenly',
                                elevation: 2,
                                backgroundColor: Colors.themecolor,
                                flexDirection: 'row',
                                borderRadius: 10,
                                height: 50,
                                paddingHorizontal: '8%',
                                // paddingTop: 13,
                                // paddingBottom: 13,

                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                              }}>
                              <View style={{justifyContent: 'center'}}>
                                {/* <Image
                                  source={images.heart}
                                  style={{width: 25, height: 25}}
                                /> */}
                                <Heart height={25} width={25} />
                              </View>
                              <View style={{justifyContent: 'center'}}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 15,
                                    color: Colors.black,
                                    fontFamily: Fonts.FontsType.Poppins_Regular,
                                  }}>
                                  {check1 ? 'Added' : 'Add'}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  // onEndReachedThreshold={0}
                  // ItemSeparatorComponent={ItemSeparatorView}
                  // ListFooterComponent={renderFooter}
                  onEndReached={RenderFooter}
                  onEndThreshold={0}
                  // onEndReachedThreshold={0}
                  // ItemSeparatorComponent={ItemSeparatorView}
                  // // ListFooterComponent={renderFooter}
                  // onEndReached={RenderFooter}
                  // onEndThreshold={0}
                  // ListFooterComponent={() => {
                  //   return loading === true ? (
                  //     <ActivityIndicator color="#000" size="small" />
                  //   ) : null;
                  // }}
                />
              </View>
            ) : null}
            {getviewid === 3 ? (
              <View style={{marginTop: 34}}>
                <FlatList
                  data={get_product}
                  horizontal={true}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item, index}) => {
                    var check = '';
                    var redux_item;
                    var check1 = '';
                    var reduxitem1;
                    if (get_cart.length > 0) {
                      check = get_cart.some(
                        data => data.product_id == item.id && data.cart == 1,
                      );
                      redux_item = get_cart.find(
                        data => data.product_id == item.id,
                      );
                      // console.log('check-=--=>', check, redux_item);
                    }
                    if (get_wishlist.length > 0) {
                      check1 = get_wishlist.some(
                        data =>
                          data.product_id == item.id && data.wishlist == 1,
                      );
                      reduxitem1 = get_wishlist.find(
                        data =>
                          data.product_id == item.id && data.wishlist == 1,
                      );
                    }
                    return (
                      <View
                        style={{
                          marginBottom: metrics.HEIGHT * 0.01,
                          // elevation: 7,
                          // backgroundColor: Colors.white,
                          marginHorizontal: 1,
                          // height: metrics.HEIGHT * 0.8,
                          marginLeft: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('Viewproduct', {
                              iid: item.id,
                              data: item.cart_qty,
                              chack: check,
                              red_qty: redux_item ? redux_item.user_qty : '0',
                            })
                          }>
                          <View
                            style={{
                              // elevation: 3,
                              backgroundColor: Colors.white,
                              borderRadius: 10,
                            }}>
                            <FastImage
                              imageStyle={{
                                borderRadius: 5,
                              }}
                              // source={require('../assets/logo.png')}
                              source={
                                item.productimages.length === 0
                                  ? require('../assets/logo.png')
                                  : {
                                      uri: item.productimages[0]
                                        .image_full_path,
                                      priority: FastImage.priority.high,
                                    }
                              }
                              resizeMode={FastImage.resizeMode.contain}
                              style={{
                                width: 150,
                                height: 270,
                                marginRight: 5,
                                borderWidth: 1,
                                borderColor: Colors.lightbackground,
                                borderRadius: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginHorizontal: '2%',
                                }}>
                                {/* {check ? (
                                  <TouchableOpacity>
                                    <Ionicons
                                      name="ios-cart"
                                      size={35}
                                      color={'#1D811D'}
                                    />
                                  </TouchableOpacity>
                                ) : null} */}
                                {check1 ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      props.navigation.navigate('WishList')
                                    }
                                    style={{
                                      justifyContent: 'center',
                                      width: 40,
                                      height: 40,
                                      borderRadius: 40,
                                      backgroundColor: Colors.lightbackground,
                                      alignItems: 'center',
                                      top: 10,
                                      right: 5,
                                      position: 'absolute',
                                    }}>
                                    <AntDesign
                                      name="heart"
                                      size={20}
                                      color={'green'}
                                    />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => apiaddtowish(item)}
                                    style={{
                                      justifyContent: 'center',
                                      width: 40,
                                      height: 40,
                                      borderRadius: 40,
                                      backgroundColor: Colors.lightbackground,
                                      alignItems: 'center',
                                      top: 10,
                                      right: 5,
                                      position: 'absolute',
                                    }}>
                                    <AntDesign
                                      name="hearto"
                                      size={20}
                                      color={Colors.black}
                                    />
                                    {/* <FontAwesome
                                  name="user-circle-o"
                                  color={Colors.themecolor}
                                  size={28}
                                  style={{}}
                                /> */}
                                  </TouchableOpacity>
                                )}
                              </View>
                            </FastImage>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            // marginHorizontal: '4%',
                            alignItems: 'center',
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 16,
                              fontFamily: Fonts.FontsType.Poppins_Regular,
                            }}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 5,
                            }}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 14,
                                fontFamily: Fonts.FontsType.Poppins_Regular,
                              }}>
                              Gwt: {item.gross_weight}
                            </Text>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 14,
                                marginLeft: 10,
                                fontFamily: Fonts.FontsType.Poppins_Regular,
                              }}>
                              Nwt: {item.net_weight}
                            </Text>
                          </View>
                        </View>
                        {/* {item.cart === 1 ? ( */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                            // justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: metrics.HEIGHT * 0.01,
                              marginBottom: metrics.HEIGHT * 0.01,
                              justifyContent: 'space-between',
                              marginHorizontal: 5,
                              backgroundColor: Colors.white,
                              elevation: 7,
                              padding: 5,
                              borderRadius: 8,
                              alignItems: 'center',
                              width: 105,

                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.29,
                              shadowRadius: 4.65,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                redux_item === undefined
                                  ? null
                                  : redux_item.cart_qty > 1
                                  ? Qtyupdate1(item.id, redux_item.cart_qty)
                                  : deleteitem(item.id);
                              }}
                              style={{
                                borderRadius: 5,
                                padding: 5,
                                // height: metrics.HEIGHT * 0.05,
                                // width: metrics.WIDTH * 0.09,
                                justifyContent: 'center',
                                elevation: 2,
                                backgroundColor: Colors.lightbackground,

                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                              }}>
                              <Entypo
                                name="minus"
                                color={Colors.black}
                                size={15}
                                style={{alignSelf: 'center'}}
                              />
                            </TouchableOpacity>
                            <View>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontFamily: Fonts.FontsType.Poppins_Regular,
                                  minWidth: 39,
                                }}>
                                {redux_item === undefined
                                  ? 0
                                  : redux_item.cart_qty}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() =>
                                item.cart_qty == 0
                                  ? apiaddtocart(item)
                                  : Qtyupdate(item.id, redux_item.cart_qty)
                              }
                              style={{
                                borderRadius: 5,
                                padding: 5,
                                // height: metrics.HEIGHT * 0.05,
                                // width: metrics.WIDTH * 0.09,
                                justifyContent: 'center',
                                elevation: 2,
                                backgroundColor: Colors.lightbackground,

                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                              }}>
                              <Entypo
                                name="plus"
                                color={Colors.black}
                                size={15}
                                style={{alignSelf: 'center'}}
                              />
                            </TouchableOpacity>
                            {/* <View
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.2,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.black,
                                fontSize: 16,
                              }}>
                              {redux_item === undefined
                                ? 0
                                : redux_item.cart_qty}
                            </Text>
                          </View> */}

                            {/* <TouchableOpacity
                            onPress={() =>
                              item.cart_qty == 0
                                ? apiaddtocart(item)
                                : Qtyupdate(item.id, redux_item.cart_qty)
                            }
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="plus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              redux_item.cart_qty == 0
                                ? null
                                : redux_item.cart_qty > 1
                                ? Qtyupdate1(item.id, redux_item.cart_qty)
                                : deleteitem(item.id);
                            }}
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <AntDesign
                              name="minus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity> */}
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtocart(item);
                            }}
                            style={{
                              marginLeft: 6,
                              backgroundColor: check ? '#1D811D' : Colors.white,
                              padding: 5,
                              borderRadius: 8,
                              elevation: 7,
                              alignItems: 'center',
                              justifyContent: 'center',

                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.29,
                              shadowRadius: 4.65,
                            }}>
                            {/* {check ? (
                              <MaterialIcons
                                name="add-shopping-cart"
                                size={20}
                                color="#1D811D"
                              />
                            ) : */}
                            <MaterialIcons
                              name="add-shopping-cart"
                              size={20}
                              color={check ? Colors.white : Colors.black}
                            />
                            {/* } */}

                            {/* <Image source={images.cart} resizeMode="contain" /> */}
                          </TouchableOpacity>
                        </View>
                        {/* <View
                          style={{
                            marginHorizontal: 1,
                            position: 'absolute',
                            bottom: '40%',
                          }}>
                          <Text style={{color: Colors.black, fontSize: 16}}>
                            {item.name}{' '}
                          </Text>
                          <Text style={{color: Colors.black, fontSize: 14}}>
                            Gwt: {item.gross_weight}
                          </Text>
                          <Text style={{color: Colors.black, fontSize: 14}}>
                            Nwt: {item.net_weight}
                          </Text>
                        </View> */}
                        {/* {item.cart == 1 ? ( */}
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            marginTop: metrics.HEIGHT * 0.01,
                            marginBottom: metrics.HEIGHT * 0.01,
                            justifyContent: 'space-between',
                            marginHorizontal: 1,
                            backgroundColor: Colors.white,
                            position: 'absolute',
                            bottom: '30%',
                          }}>
                          <View
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.2,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: Colors.black,
                                fontSize: 16,
                              }}>
                              {redux_item === undefined
                                ? 0
                                : redux_item.cart_qty}
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() =>
                              item.cart_qty == 0
                                ? apiaddtocart(item)
                                : Qtyupdate(item.id, redux_item.cart_qty)
                            }
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                              marginLeft: '5%',
                            }}>
                            <AntDesign
                              name="plus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              redux_item.cart_qty == 0
                                ? null
                                : redux_item.cart_qty > 1
                                ? Qtyupdate1(item.id, redux_item.cart_qty)
                                : deleteitem(item.id);
                            }}
                            style={{
                              borderColor: Colors.gray,
                              borderWidth: 0.5,
                              borderRadius: 5,
                              height: metrics.HEIGHT * 0.05,
                              width: metrics.WIDTH * 0.09,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.white,
                              marginLeft: '5%',
                            }}>
                            <AntDesign
                              name="minus"
                              color={Colors.black}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                        </View> */}
                        {/* ) : null} */}
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            marginTop: metrics.HEIGHT * 0.01,
                            marginBottom: metrics.HEIGHT * 0.01,
                            // justifyContent: 'space-between',
                            marginHorizontal: 1,
                            alignSelf: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtocart(item);
                            }}
                            style={{
                              borderColor: Colors.themecolor,
                              borderWidth: 1,
                              height: metrics.HEIGHT * 0.04,
                              width: metrics.WIDTH * 0.4,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.themecolor,
                              marginTop: metrics.HEIGHT * 0.12,
                              flexDirection: 'row',
                              borderRadius: 5,
                            }}>
                            <View style={{justifyContent: 'center'}}>
                              <Ionicons
                                name="ios-cart"
                                color={Colors.white}
                                size={20}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 18,
                                  color: Colors.white,
                                  fontWeight: '700',
                                }}>
                                {check ? 'Added' : 'Add'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: metrics.HEIGHT * 0.01,
                            marginBottom: metrics.HEIGHT * 0.01,
                            // justifyContent: 'space-between',
                            marginHorizontal: 1,
                            alignSelf: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              apiaddtowish(item);
                            }}
                            style={{
                              borderColor: Colors.themecolor,
                              borderWidth: 1,
                              height: metrics.HEIGHT * 0.04,
                              width: metrics.WIDTH * 0.4,
                              justifyContent: 'center',
                              elevation: 2,
                              backgroundColor: Colors.themecolor,
                              // marginTop: metrics.HEIGHT * 0.25,
                              flexDirection: 'row',
                              borderRadius: 5,
                            }}>
                            <View style={{justifyContent: 'center'}}>
                              <Ionicons
                                name="heart-circle-outline"
                                size={20}
                                color={Colors.white}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 18,
                                  color: Colors.white,
                                  fontWeight: '700',
                                }}>
                                {check1 ? 'Wishlist' : 'Wishlist'}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View> */}
                      </View>
                    );
                  }}
                  onEndReached={RenderFooter}
                  onEndThreshold={0}
                  // onEndReachedThreshold={0}
                  // ItemSeparatorComponent={ItemSeparatorView}
                  // ListFooterComponent={renderFooter}
                />
              </View>
            ) : null}
          </>
        )}
      </View>
      {/* </ScrollView> */}
      {/* <TouchableOpacity
        onPress={() => Refresh()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 20,
          right: 15,
          height: metrics.images.large,
          backgroundColor: Colors.themecolor,
          width: metrics.images.large,
          borderRadius: metrics.images.large,
          alignSelf: 'flex-end',
          paddingRight: '5%',
        }}>
        <FontAwesome name="refresh" color={Colors.white} size={25} />
      </TouchableOpacity> */}
      {/* sort modal */}
      <RNModal
        isVisible={isModalVisible}
        transparent
        style={{margin: 0, justifyContent: 'flex-end'}}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        {/*All views of Modal*/}

        <View
          style={{
            backgroundColor: Colors.white,
            // height: '70%',
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          {/* <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              alignSelf: 'flex-end',
              marginHorizontal: '4%',
            }}>
            <AntDesign name="closecircle" color={Colors.black} size={30} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              width: 100,
              borderBottomWidth: 3,
              borderRadius: 3,
              borderBottomColor: Colors.lightgray,
              alignSelf: 'center',
            }}></TouchableOpacity>
          <Text
            style={{
              padding: '5%',
              fontSize: 22,
              color: Colors.black,
              fontFamily: Fonts.FontsType.Poppins_Medium,
            }}>
            Sort
          </Text>
          <View
            style={{
              marginTop: metrics.HEIGHT * 0.01,
              marginHorizontal: '2%',
            }}>
            <FlatList
              data={CATS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIndex(item.id);

                      getProduct(item.id);

                      setModalVisible(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      padding: '5%',
                      // borderColor: Colors.gray,
                      // borderWidth: 0.2,
                      marginBottom: '2%',
                      // elevation: 5,
                      // backgroundColor: Colors.white,
                    }}>
                    {getindex === item.id ? (
                      <FontAwesome
                        name={'circle'}
                        color={Colors.themecolor}
                        size={23}
                      />
                    ) : (
                      <View
                        style={{
                          borderRadius: 21,
                          width: 21,
                          height: 21,
                          backgroundColor: Colors.lightbackground,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: metrics.HEIGHT * 0.02,
                        color: Colors.black,
                        fontFamily: Fonts.FontsType.Poppins_Regular,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </RNModal>
      {/* sort modal */}
      {/* View modal */}
      <RNModal
        isVisible={viewmodal}
        transparent
        style={{margin: 0, justifyContent: 'flex-end'}}
        onBackButtonPress={() => SetViewModal(false)}
        onBackdropPress={() => SetViewModal(false)}
        onRequestClose={() => {
          SetViewModal(false);
        }}>
        {/*All views of Modal*/}

        <View
          style={{
            backgroundColor: Colors.white,
            height: '30%',
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity
            onPress={() => SetViewModal(false)}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              alignSelf: 'flex-end',
              marginHorizontal: '4%',
            }}>
            <AntDesign name="closecircle" color={Colors.black} size={30} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => SetViewModal(false)}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              width: 100,
              borderBottomWidth: 3,
              borderRadius: 3,
              borderBottomColor: Colors.lightgray,
            }}></TouchableOpacity>
          <Text
            style={{
              padding: '5%',
              fontSize: 22,
              color: Colors.black,
              fontFamily: Fonts.FontsType.Poppins_Regular,
            }}>
            View Style
          </Text>
          <View
            style={{
              marginTop: metrics.HEIGHT * 0.01,
              marginHorizontal: '2%',
            }}>
            <FlatList
              data={VIEWDATA}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      SetViewId(item.id);
                      SetViewModal(false);
                    }}
                    style={{
                      marginHorizontal: '5%',
                      borderColor: item.id === getviewid ? Colors.gray : null,
                      borderWidth: item.id === getviewid ? 1 : null,
                      borderRadius: 70,
                      padding: '3%',
                      width: 70,
                      height: 70,
                      backgroundColor: Colors.lightbackground,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {item.id == 1 ? (
                      <Ionicons
                        name="grid-outline"
                        size={30}
                        color={Colors.black}
                      />
                    ) : (
                      <View style={{}}>
                        <Image
                          source={item.img}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </RNModal>
      {/* view modal */}
      <RNModal
        isVisible={loads}
        transparent
        style={{}}
        // onBackButtonPress={() => set(false)}
        // onBackdropPress={() => SetViewModal(false)}
        // onRequestClose={() => {
        //   SetViewModal(false);
        // }}
      >
        {/*All views of Modal*/}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={'large'} color={Colors.white} />
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              marginTop: 2,
            }}>
            Please wait...
          </Text>
        </View>
      </RNModal>
    </View>
  );
};

export default ProductScreen;
