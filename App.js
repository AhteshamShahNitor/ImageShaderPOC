import React from 'react';
import {FlatList, StyleSheet, View, useWindowDimensions} from 'react-native';
import {idCards} from './data';
import {SkiaCanvas} from './src/components/skiaCanvas';
import {useSharedValue} from 'react-native-reanimated';

function App() {
  const currentIndex = useSharedValue(0);
  const {width} = useWindowDimensions();

  const onScroll = e => {
    currentIndex.value = e.nativeEvent.contentOffset.x / width;
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          data={idCards}
          horizontal
          inverted
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <SkiaCanvas {...item} currentIndex={currentIndex} index={index} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#302f2f',
  },
  wrapper: {
    height: 250,
  },
  contentContainer: {
    gap: 16,
    paddingHorizontal: 200,
  },
});

export default App;
