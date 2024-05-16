import { StyleSheet, Text, View, Dimensions } from 'react-native';

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

// get the application window's width (available viewport).
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: 'white',
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  numberText: {
    fontFamily: 'open-sans-bold',
    color: 'white',
    fontSize: deviceWidth < 380 ? 28 : 36
    // fontWeight: 'bold'
  }
});
