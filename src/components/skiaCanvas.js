import React, {useState} from 'react';
import {
  Canvas,
  Fill,
  ImageShader,
  Shader,
  Skia,
  useImage,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {clamp} from 'react-native-redash';
import IdCard from './IdCard';
import EncryptedCard from './encryptedCard';

const source = Skia.RuntimeEffect.Make(`
uniform shader image1;
uniform shader image2;

uniform float progress;
uniform float2 resolution;

vec4 getFromColor(vec2 p) {
    return image1.eval(p * resolution);
}

vec4 getToColor(vec2 p) {
    return image2.eval(p * resolution);
}

vec4 transition(vec2 uv) {
  vec2 p=uv.xy/vec2(1.0).xy;
  vec4 a=getFromColor(p);
  vec4 b=getToColor(p);
  return mix(a, b, step(0.0+p.x,progress));
}
 
half4 main(float2 xy) {  
  vec2 uv = xy / resolution; 
  return transition(uv);
}`);

const {width, height} = Dimensions.get('window');

const IMAGE_WIDTH = width * 0.9;
const IMAGE_HEIGHT = 250;

export const SkiaCanvas = props => {
  const progress = useSharedValue(0);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const uniforms = useDerivedValue(() => ({
    progress: progress.value,
    resolution: [width, height],
  }));

  useDerivedValue(() => {
    const selfIndex = props.index + 1;
    if (props.currentIndex.value >= selfIndex) {
      progress.value = 0;
    } else {
      progress.value = selfIndex - props.currentIndex.value;
    }
  });

  if (!image1) {
    return <IdCard {...props} setImage={setImage1} />;
  }

  if (!image2) {
    return <EncryptedCard setImage={setImage2} />;
  }

  return (
    <Canvas style={styles.container}>
      <Fill>
        <Shader source={source} uniforms={uniforms}>
          <ImageShader
            image={image2}
            fit="cover"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
          />
          <ImageShader
            image={image1}
            fit="cover"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
          />
        </Shader>
      </Fill>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    width: width,
  },
});
