import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors.js';

// This is a reusable component to display instruction text in the app.
// It takes a 'children' prop, which is the text to display.
// It also takes a 'style' prop, which is an object containing additional styles to apply to the text.

function InstructionText({ children, style }) {
  return (
    <Text
      style={[
        styles.instructionText,
        style // 'style' can override the styles defined in this component.
      ]}>
      {children}
    </Text>
  );
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24
  }
});
