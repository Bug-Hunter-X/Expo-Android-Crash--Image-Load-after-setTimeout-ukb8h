import * as React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';

const MyComponent = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [imageSource, setImageSource] = React.useState(null);

  React.useEffect(() => {
    const loadResource = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await fetch('https://reactnative.dev/img/tiny_logo.png');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const imageUri = await Expo.FileSystem.writeAsStringAsync(Expo.FileSystem.documentDirectory + 'image.png', blob);
        setImageSource({ uri: imageUri });
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadResource();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading image: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default MyComponent;