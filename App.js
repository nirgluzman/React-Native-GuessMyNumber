import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground } from 'react-native';

// enable transitions between multiple colors in a linear direction.
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} />;
  }

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient
        colors={['#4e0329', '#ddb52f']} // array of colors that represent stops in the gradient.
        style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode='cover' // the image keeps its aspect ratio and fills the given dimension.
          imageStyle={{ opacity: 0.15 }} // the opacity of the image.
          style={styles.rootScreen}>
          {screen}
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1 // takes up all available space, as there are no sibling elements.
  }
});
