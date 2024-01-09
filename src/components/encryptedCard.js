import { makeImageFromView } from '@shopify/react-native-skia';
import React, {useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const EncryptedCard = ({setImage}) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const viewRef = useRef();

  const takeSnapshot = async () => {
    if (viewRef.current) {
      const snapshot = await makeImageFromView(viewRef);
      setImage(snapshot);
    }
  };

  const randomArray = useMemo(() => {
    const array = [];
    for (let i = 0; i < 150; i++) {
      const randomindex = Math.floor(Math.random() * chars.length);
      const randomChar = chars[randomindex];
      array.push(randomChar);
    }
    return array;
  }, [chars]);

  return (
    <View ref={viewRef} onLayout={takeSnapshot} style={styles.wrapper}>
      <Text style={styles.textStyle}>{randomArray.join(' ')}</Text>
    </View>
  );
};

export default EncryptedCard;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: width * 0.9,
    height: 250,
    backgroundColor: 'black',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 7,
  },
});
