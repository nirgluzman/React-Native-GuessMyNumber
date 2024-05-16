import { StyleSheet, View, Dimensions } from 'react-native';

import Colors from '../../constants/colors.js';

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

// get the application window's width (available viewport).
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center', // position elements along the main axis (default - column).
    alignItems: 'center', // position elements along the cross axis.
    marginTop: deviceWidth < 380 ? 18 : 36,
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
  }
});
