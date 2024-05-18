import { useState, useEffect } from 'react';
import { StyleSheet, Alert, View, FlatList, useWindowDimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; // various types of icons

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText.js';
import NumberContainer from '../components/game/NumberContainer.js';
import PrimaryButton from '../components/ui/PrimaryButton';
import GuessLogItem from '../components/game/GuessLogItem.js';

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

// boundaries for the random number generator (to be set only once, when the component is mounted for the first time).
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber); // making sure that the initial guess is not the userNumber.
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [roundsData, setRoundsData] = useState([initialGuess]);

  // useWindowDimensions hook to get dynamically (automatically updates) the width and height of the device.
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRoundsListLength);

      // Alert.alert('GAME OVER!', 'Number is found!', [{ text: 'Ok', style: 'default' }]);
    }
  }, [currentGuess, userNumber, onGameOver]);

  // useEffect hook to reset the boundaries when the user starts a new game.
  useEffect(
    () => {
      minBoundary = 1;
      maxBoundary = 100;
    },
    // we need to pass an empty array to the useEffect hook to make sure that the boundaries are reset when the user starts a new game (component is rendered for the first time).
    []
  );

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

    // add newRndNumber to roundsData array.
    setRoundsData(prevRoundsData => [newRndNumber, ...prevRoundsData]); // we use the spread operator to add the newRndNumber to roundsData array.
  }

  // calculated every time the component is rendered.
  const guessRoundsListLength = roundsData.length;

  // phone in portrait mode
  let content = (
    <>
      {/* Number guessed */}
      <NumberContainer>{currentGuess}</NumberContainer>

      {/* Player feedback to number guess */}
      <Card>
        {/* Instruction text */}
        <InstructionText style={styles.instructionText}>
          Is your number Higher or Lower?
        </InstructionText>
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            {/* we use the 'bind' method to pass/pre-configure the context of this function to the onPress handler. */}
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
              <Ionicons
                name='add-outline'
                size={24}
                color='white'
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            {/* we use the 'bind' method to pass/pre-configure the context of this function to the onPress handler. */}
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons
                name='remove'
                size={24}
                color='white'
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  // phone in landscape mode
  if (width > 500) {
    content = (
      <>
        {/* Buttons + Number guessed */}
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            {/* we use the 'bind' method to pass/pre-configure the context of this function to the onPress handler. */}
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
              <Ionicons
                name='add-outline'
                size={24}
                color='white'
              />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            {/* we use the 'bind' method to pass/pre-configure the context of this function to the onPress handler. */}
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons
                name='remove'
                size={24}
                color='white'
              />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Title */}
      <Title>Opponent's Guess</Title>

      {content}

      {/* Log rounds */}
      <View style={styles.listContainer}>
        {/* {roundsData.map(roundData => (<Text key={roundData}>{roundData}</Text>))} */}
        <FlatList
          data={roundsData} // array of data to output
          renderItem={
            // function to take one item from the source and returns a formatted component to render.
            itemData => (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            )
          }
          keyExtractor={item => item} // tells FlatList to use the 'item' itself for the react keys instead of the default 'key' property.
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, // takes up all available space, as there are no sibling elements.
    marginTop: 20,
    padding: 24,
    alignItems: 'center'
  },

  instructionText: {
    marginBottom: 12,
    fontSize: 16 // overriding the fontSize defined in InstructionText component.
  },

  buttonsContainer: {
    flexDirection: 'row'
  },

  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  buttonContainer: {
    flex: 1
  },

  // set the size of the FlatList container to enable scrolling.
  listContainer: {
    flex: 1, // takes the max available space.
    padding: 16
  }
});
