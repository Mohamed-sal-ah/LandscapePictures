import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../navigation/routes'
import theme from '../../themes';

export default function NotFoundScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.navigate(screenName.HOME)} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: theme.fonts.MontserratRegular,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: theme.fonts.MontserratRegular,
    color: theme.colors.green_primary,
  },
});
