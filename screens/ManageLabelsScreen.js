// screens/ManageLabelsScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const ManageLabelsScreen = ({ navigation }) => (
  <View>
    <Text>Manage Labels Screen</Text>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
  </View>
);

export default ManageLabelsScreen;
