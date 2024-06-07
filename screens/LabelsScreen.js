// screens/LabelsScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const LabelsScreen = ({ navigation }) => (
  <View>
    <Text>Labels Screen</Text>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    <Button title="Manage Labels" onPress={() => navigation.navigate('ManageLabels')} />
  </View>
);

export default LabelsScreen;
