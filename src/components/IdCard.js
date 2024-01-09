import {makeImageFromView} from '@shopify/react-native-skia';
import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const {width} = Dimensions.get('screen');

const IdCard = ({name, photo, lastName, city, address, expires, setImage}) => {
  const viewRef = useRef();

  const takeSnapshot = async () => {
    if (viewRef.current) {
      const snapshot = await makeImageFromView(viewRef);
      setImage(snapshot);
    }
  };

  return (
    <View ref={viewRef} style={style.wrapper}>
      <View style={style.strip}>
        <Text style={style.heading}>Identity Card</Text>
      </View>
      <View style={style.container}>
        <Image
          onLoad={takeSnapshot}
          source={{uri: photo}}
          style={style.avatar}
        />
        <View style={style.contentContainer}>
          <Text style={style.label}>Name: {name}</Text>
          <Text style={style.label}>LastName: {lastName}</Text>
          <Text style={style.label}>City: {city}</Text>
          <Text style={style.label}>Address: {address}</Text>
          <Text style={style.label}>Expires: {expires}</Text>
        </View>
      </View>
    </View>
  );
};

export default IdCard;

const style = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: width * 0.9,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5, // for shadow on Android
    shadowColor: 'rgba(0, 0, 0, 0.1)', // for shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  strip: {
    backgroundColor: 'black',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});
