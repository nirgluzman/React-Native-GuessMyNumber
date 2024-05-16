import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

// enable transitions between multiple colors in a linear direction.
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false); // set gameIsOver to false once we start a game to show the GameScreen.
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // if userNumber is set, show GameScreen, otherwise show StartGameScreen.
  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
      />
    );
  }

  // if gameIsOver is true and game has been started (userNumber is truthy), show GameOverScreen.
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]} // array of colors that represent stops in the gradient.
        style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode='cover' // the image keeps its aspect ratio and fills the given dimension.
          imageStyle={{ opacity: 0.15 }} // the opacity of the image.
          style={styles.rootScreen}>
          {/* SafeAreaView to render content within the safe area boundaries of a device. It is currently only applicable to iOS devices. */}
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
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
