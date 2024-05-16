import { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Alert } from 'react-native';

import Title from '../components/ui/Title.js';
import PrimaryButton from '../components/ui/PrimaryButton.js';
import Colors from '../constants/colors.js';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

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
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <View style={styles.inputContainer}>
        <Text style={styles.instructionText}>Enter a Number</Text>
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
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, // takes up all available space, as there are no sibling elements.
    marginTop: 100,
    alignItems: 'center'
  },

  inputContainer: {
    justifyContent: 'center', // position elements along the main axis (default - column).
    alignItems: 'center', // position elements along the cross axis.
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // shadow setting for Android
    elevation: 4,
    // shadow setting for iOS, https://reactnative.dev/docs/shadow-props
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25
  },

  instructionText: {
    color: Colors.accent500,
    fontSize: 24
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
