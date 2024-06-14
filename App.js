import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import LabelsScreen from './screens/LabelsScreen';
import FoldersScreen from './screens/FoldersScreen';
import TrashScreen from './screens/TrashScreen';
import NewNoteScreen from './screens/NewNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import ManageLabelsScreen from './screens/ManageLabelsScreen';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomHeader({ navigation, isSearchVisible, setIsSearchVisible, setSearchQuery, handleSearch }) {
  return {
    headerLeft: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Notes</Text>
      </View>
    ),
    headerTitle: '',
  };
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notes App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
      />
      <Drawer.Screen
        name="Labels"
        component={LabelsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Labels',
        })}
      />
      <Drawer.Screen
        name="Folders"
        component={FoldersScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Folders',
        })}      />
      <Drawer.Screen
        name="Trash"
        component={TrashScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Trash',
        })}      />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
      <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
      {/* <Stack.Screen name="Trash" component={TrashScreen} /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

