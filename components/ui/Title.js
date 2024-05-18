import { StyleSheet, Text, Platform } from 'react-native';

import Colors from '../../constants/colors';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    // fontWeight: 'bold',
    color: Colors.accent500,
    textAlign: 'center', // center the text horizontally.

    // setting properties per platform type - Android/IOs.
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: Platform.select({ ios: 0, android: 2 }),

    borderColor: Colors.accent500,
    padding: 12,
    maxWidth: '80%', // % refers to parent container; setting maxWidth to solve layout issues with small screens.
    width: 300
  }
});
