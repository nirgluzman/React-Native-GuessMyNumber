import { StyleSheet, View, Text } from 'react-native';

import Title from '../components/Title';

function GameScreen() {
  return (
    <View style={styles.screen}>
      {/* Title */}
      <Title>Opponent's Guess</Title>
      {/* Player feedback to number guess */}
      <View>
        <Text>Higher or Lower?</Text>
      </View>
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
  }
});
