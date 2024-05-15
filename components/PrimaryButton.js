// custom button

import { Text, View, Pressable, StyleSheet } from 'react-native';

function PrimaryButton({ children }) {
  function pressHandler() {
    console.log('pressed');
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={styles.buttonInnerContainer}
        onPress={pressHandler}
        android_ripple={{ color: '#640233' }}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden' // 'hidden' ensures that any styling effects from inside the container which would go outside the containr are clipped (e.g. android_ripple).
  },

  buttonInnerContainer: {
    backgroundColor: '#72063c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2 // shadow for Android
  },

  buttonText: {
    color: 'white', // we cannot add the text styling within the <View>, we must add the text styling within the <Text> component as there is no inheritance in React Native.
    textAlign: 'center'
  },

  pressed: {
    opacity: 0.75
  }
});
