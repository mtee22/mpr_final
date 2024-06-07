// screens/FoldersScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const FoldersScreen = ({ navigation }) => (
  <View>
    <Text>Folders Screen</Text>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
  </View>
);

export default FoldersScreen;
