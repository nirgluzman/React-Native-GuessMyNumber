import { TextInput, View, StyleSheet } from 'react-native';

import PrimaryButton from '../components/PrimaryButton.js';

function StartGameScreen() {
  return (
    <View style={styles.inputContainer}>
      <TextInput placeholder='Enter a number' />
      <PrimaryButton>Reset</PrimaryButton>
      <PrimaryButton>Confirm</PrimaryButton>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1, // takes up all available space, as there are no sibling elements.
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#72063c',
    borderRadius: 8,
    // shadow setting for Android
    elevation: 4,
    // shadow setting for iOS, https://reactnative.dev/docs/shadow-props
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25
  }
});
