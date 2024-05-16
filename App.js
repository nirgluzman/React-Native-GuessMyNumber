import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

// enable transitions between multiple colors in a linear direction.
import { LinearGradient } from 'expo-linear-gradient';

// expo-font allows loading fonts from the web and using them in React Native components.
import { useFonts } from 'expo-font';

// The SplashScreen module from the expo-splash-screen library is used to tell the splash screen to remain visible
// until it has been explicitly told to hide.
// This is useful to do tasks that will happen behind the scenes such as making API calls, pre-loading fonts,
// animating the splash screen and so on.
import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import Colors from './constants/colors';

// keep the splash screen visible while we fetch resources.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  // font initialization - useFont hook to load fonts use them in our app.
  const [fontsLoaded, fontError] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    LemonLove: require('./assets/fonts/LemonLove.ttf'),
    MilkyCoffee: require('./assets/fonts/MilkyCoffee.otf')
  });

  // if fonts are not loaded or fontError is not null, return null.
  if (!fontsLoaded && !fontError) {
    return null;
  } else {
    // if fonts are loaded and fontError is null, hide the splash screen.
    SplashScreen.hideAsync();
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false); // set gameIsOver to false once we start a game to show the GameScreen.
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
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
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
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
