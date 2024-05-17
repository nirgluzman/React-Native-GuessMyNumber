import { StyleSheet, View, Image, Text, useWindowDimensions, ScrollView } from 'react-native';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

function GameOverScreen({ userNumber, roundsNumber, onStartNewGame }) {
  // useWindowDimensions hook to get dynamically (automatically updates) the width and height of the device.
  const { width, height } = useWindowDimensions();

  // setting the image size based on the device's width and height.
  let imageSize = 300;
  if (width < 380) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }

  // setting the image style based on the imageSize.
  const imageStyle = { width: imageSize, height: imageSize, borderRadius: imageSize / 2 };

  return (
    // enable scrollable screen if required in landcape orientation.
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER</Title>
        {/* imageSize is set according to phone orientation */}
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/success.png')}
          />
        </View>

        {/* Game summary */}
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the
          number <Text style={styles.highlight}>{userNumber}</Text>
        </Text>

        {/* Button to start a new game */}
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

// get the application window's width (available viewport).
// note that this value is evaluated only once when the code is first executed (it does not adjust to device orientation).
// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },

  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageContainer: {
    // circle image
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden', // to hide the image original border.
    margin: 36
  },

  image: {
    // re-size the image to fit the imageContainer.
    width: '100%',
    height: '100%'
  },

  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16
  },

  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
});
