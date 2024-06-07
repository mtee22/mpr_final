// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import HomeScreen from './screens/HomeScreen';
// import LabelsScreen from './screens/LabelsScreen';
// import FoldersScreen from './screens/FoldersScreen';
// import TrashScreen from './screens/TrashScreen';

// const Drawer = createDrawerNavigator();

// function CustomHeader({ navigation, isSearchVisible, setIsSearchVisible, setSearchQuery, handleSearch }) {
//   return {
//     headerLeft: () => (
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
//           <Ionicons name="menu" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={{ marginLeft: 10, fontSize: 18 }}>Notes</Text>
//       </View>
//     ),
//     headerTitle: '',
//     headerRight: () => (
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
//         <TextInput
//           placeholder="Search notes"
//           onChangeText={setSearchQuery}
//           onSubmitEditing={handleSearch}
//           style={{
//             padding: 10,
//             borderColor: '#ccc',
//             borderWidth: 1,
//             borderRadius: 8,
//             width: 200, 
//           }}
//         />
//         <Ionicons name="search" size={20} color="black" />
//       </View>
      
//     ),
//   };
// }
// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notes App</Text>
//       </View>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }

// function MyDrawer() {
//   const [isSearchVisible, setIsSearchVisible] = React.useState(false);

//   return (
//     <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
//       />
//       <Drawer.Screen
//         name="Labels"
//         component={LabelsScreen}
//         options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
//       />
//       <Drawer.Screen
//         name="Folders"
//         component={FoldersScreen}
//         options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
//       />
//       <Drawer.Screen
//         name="Trash"
//         component={TrashScreen}
//         options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }

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
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
        <TextInput
          placeholder="Search notes"
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={{
            padding: 10,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            width: 200, 
          }}
        />
        <Ionicons name="search" size={20} color="black" />
      </View>
      
    ),
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
        options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
      />
      <Drawer.Screen
        name="Folders"
        component={FoldersScreen}
        options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
      />
      <Drawer.Screen
        name="Trash"
        component={TrashScreen}
        options={({ navigation }) => CustomHeader({ navigation, isSearchVisible, setIsSearchVisible })}
      />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
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

