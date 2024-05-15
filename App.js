import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// enable transitions between multiple colors in a linear direction.
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  return (
    <LinearGradient
      colors={['#4e0329', '#ddb52f']} // array of colors that represent stops in the gradient.
      style={styles.rootScreen}>
      <StartGameScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1 // takes up all available space, as there are no sibling elements.
  }
});
