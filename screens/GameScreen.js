import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer.js';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function GameScreen({ userNumber }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber); // making sure that the initial guess is not the userNumber.
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  return (
    <View style={styles.screen}>
      {/* Title */}
      <Title>Opponent's Guess</Title>
      {/* Player feedback to number guess */}
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
      </View>
      {/* Log rounds */}
      <View></View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, // takes up all available space, as there are no sibling elements.
    padding: 24
  }
});
