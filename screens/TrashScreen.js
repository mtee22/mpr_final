// screens/TrashScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const TrashScreen = ({ navigation }) => (
  <View>
    <Text>Trash Screen</Text>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
  </View>
);

export default TrashScreen;
