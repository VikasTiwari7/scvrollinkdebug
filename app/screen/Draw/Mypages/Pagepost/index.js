import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Utility from '../../../../utility/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import DocumentPicker from 'react-native-document-picker';
import {TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

const Pagepost = ({navigation}) => {
  const [filePath, setFilepath] = useState();
  const [caption, setCaption] = useState();
  const [pagename, setPagename] = useState();
  const [pageurl, setDescription] = useState();

  const uploadPost = async () => {
    let userId = await Utility.getFromLocalStorge('userId');
    let token = await Utility.getFromLocalStorge('JWT');
    let name = await Utility.getFromLocalStorge('fullName');
    let pageId = await Utility.getFromLocalStorge('pageId');

    console.log(
      `http://79.133.41.198:4000/users/${userId}/updatepage/${pageId}/updatePageInfo`,
    );

    try {
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/updatepage/${pageId}/updatePageInfo`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            user_id: userId,
            username: 'Rohan',
            post_type: 'image',
            caption: 'something is better the oo',
            tag_people: 'vikas',
            location: 'delhi',
            description: 'blaah balhha so doing good',
          }),
        },
      );
      let json = await response;
      console.log(json);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('drawer');
  };
  const chooseFile = async photo => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setFilepath(res.uri);
      Imageupload(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const Imageupload = async photo => {
    console.log('vikkkkkassss');
    const data = new FormData();

    data.append('pageProfileImg', {
      name: photo.name,
      type: 'image/jpeg',
      uri: photo.uri,
    });
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('pageId');

    console.log('token= in page ' + token);
    try {
      console.log(
        `http://79.133.41.198:4000/users/${userId}/pageid/${pageId}/updatePageProfilePic`,
      );
      console.log(data);
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/pageid/${pageId}/updatePageProfilePic`, // getCoverPic
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: data,
        },
      );
      let json = await response;
      console.log('resone after page profile uploaded,,,', json);
    } catch (error) {
      console.log('nhi howa ');
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Page post </Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View>
          <Image
            source={require('../../../../images/png/albums.png')}
            style={{height: 50, width: 50}}></Image>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text>Vikas Tiwari</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: wp('30%'),
          alignSelf: 'center',
          borderColor: 'white',
          borderWidth: 5,
          borderRadius: 50,
        }}>
        {filePath ? (
          <Image
            source={{uri: filePath}}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              alignSelf: 'center',
            }}></Image>
        ) : (
          <Image
            source={require('../../../../images/splashlogo.png')}
            style={{height: 100, width: 100}}></Image>
        )}
        <TouchableOpacity onPress={() => chooseFile('photo')}>
          <MaterialCommunityIcons
            name="camera"
            size={25}
            color={'green'}
            style={{marginTop: hp('8%')}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          margin: wp('5%'),
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
        }}>

        {/* <View style={{margin: wp('5%')}}>
            <Input
              placeholder="Comment"
              leftIcon={{type: 'font-awesome', name: 'comment'}}
              style={styles}
              value={caption}
              onChangeText={text => setCaption(text)}
            />
          </View> */}

        {/* onChangeText={value => this.setState({ comment: value })} */}
        
        <View style={{margin: wp('5%')}}>
          <TextInput
            label="Caption"
            value={caption}
            onChangeText={text => setCaption(text)}
          />
        </View>

        <View style={{margin: wp('5%')}}>
          <TextInput
            label="Description"
            value={pageurl}
            onChangeText={text => setDescription(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            margin: wp('5%'),
            backgroundColor: '#b9424d',
            padding: 15,
            borderRadius: 10,
          }}
          onPress={() => uploadPost()}>
          <View>
            <Text style={{color: 'white', fontSize: 18}}>Upload Post</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Pagepost;
