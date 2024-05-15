import { StyleSheet, View, Text } from 'react-native';

function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <View>
        <Text>Higher or Lower?</Text>
      </View>
      {/* Log Rounds */}
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
