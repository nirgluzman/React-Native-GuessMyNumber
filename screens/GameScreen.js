import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText.js';
import NumberContainer from '../components/game/NumberContainer.js';
import PrimaryButton from '../components/ui/PrimaryButton';

// function to generate a random number between 'min' and 'max', excluding the 'exclude' number (this is for the inital guess to make sure that it is not the userNumber).
// this function is recursive, so it will keep calling itself until it finds a number that is not the userNumber.
// note that 'max' is not included in the range, whereas 'min' is included in the range.
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber); // making sure that the initial guess is not the userNumber.
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();

      Alert.alert('GAME OVER!', 'Guessed number is found!', [{ text: 'Ok', style: 'default' }]);
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    // verifying that the user does not provide wrong info, to avoid infinite loop with the app logic.
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      // the user provided the wrong info, so we show a worning alert.
      Alert.alert('Dont lie!', 'You know that this is wrong ...', [
        { text: 'Sorry', style: 'cancel' }
      ]);
      return;
    }

    // the user provided the correct info, so we can proceed with the game logic.
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else if (direction === 'higher') {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      {/* Title */}
      <Title>Opponent's Guess</Title>

      {/* Number guessed */}
      <NumberContainer>{currentGuess}</NumberContainer>

      {/* Player feedback to number guess */}
      <Card>
        <InstructionText style={styles.instructionText}>
          Is your number Higher or Lower?
        </InstructionText>
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            {/* we use the 'bind' method to pass/pre-configure the context of this function to the onPress handler. */}
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>+</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            {/* we use the 'bind' method to pass/pre-configure the context of this function to the onPress handler. */}
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
          </View>
        </View>
      </Card>

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
  },

  instructionText: {
    marginBottom: 12,
    fontSize: 18 // overriding the fontSize defined in InstructionText component.
  },

  buttonsContainer: {
    flexDirection: 'row'
  },

  buttonContainer: {
    flex: 1
  }
});
