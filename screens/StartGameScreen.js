import { TextInput, View, StyleSheet } from 'react-native';

import PrimaryButton from '../components/PrimaryButton.js';

function StartGameScreen() {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2} // limits the maximum number of characters that can be entered.
        keyboardType='number-pad' // determines which keyboard to open.
        autoCapitalize='none' // determines whether to capitalize the first letter of a word (not releavnt for numeric values).
        autoCorrect={false} // determines whether to automatically correct the input.
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1, // takes up all available space, as there are no sibling elements.
    justifyContent: 'center', // position elements along the main axis (default - column).
    alignItems: 'center', // position elements along the cross axis.
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#4e0329',
    borderRadius: 8,
    // shadow setting for Android
    elevation: 4,
    // shadow setting for iOS, https://reactnative.dev/docs/shadow-props
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f', // text color
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
