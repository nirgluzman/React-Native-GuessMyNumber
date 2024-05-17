import { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView, // automatically adjust its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed.
  ScrollView
} from 'react-native';

import Title from '../components/ui/Title.js';
import Card from '../components/ui/Card.js';
import InstructionText from '../components/ui/InstructionText.js';
import PrimaryButton from '../components/ui/PrimaryButton.js';

import Colors from '../constants/colors.js';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

  // adjust dynamically to device orientation: 'useWindowDimensions' hook automatically updates all of its values when screen size or font scale changes.
  const { width, height } = useWindowDimensions();
  const marginTopDistance = height < 380 ? 30 : 100;

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber); // JS function to parse a string to an integer.

    // check if the entered number is a valid number (not NaN, not a negative number, not greater than 99).
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show an alert using the native alert dialog of Android/iOS.
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler }
      ]);
      return;
    }

    // valid number, so we can pass it to the 'onConfirm' function (props) of the 'GameScreen' component.
    onPickNumber(chosenNumber);
  }

  return (
    <ScrollView style={styles.screen}>
      {/* 'KeyboardAvoidingView' is used to avoid the keyboard from covering our app. */}
      {/* 'ScrollView' is used to give a better experience - scrolling the app while the keyboard occupies the screen. */}
      <KeyboardAvoidingView
        style={styles.screen}
        behavior='position' // specify how to react to the presence of the keyboard.
      >
        <View
          style={[styles.rootContainer, { marginTop: marginTopDistance }]} // marginTop is re-evaluated every time the screen size changes (device orientation).
        >
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2} // limits the maximum number of characters that can be entered.
              keyboardType='number-pad' // determines which keyboard to open.
              autoCapitalize='none' // determines whether to capitalize the first letter of a word (not releavnt for numeric values).
              autoCorrect={false} // determines whether to automatically correct the input.
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },

  rootContainer: {
    flex: 1, // takes up all available space, as there are no sibling elements.
    marginTop: 100,
    alignItems: 'center'
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500, // text color
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  buttonsContainer: {
    flexDirection: 'row'
  },

  buttonContainer: {
    flex: 1
  }
});
