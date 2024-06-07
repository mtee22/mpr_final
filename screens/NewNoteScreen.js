import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NewNoteScreen = ({ route, navigation }) => {
  const [text, setText] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      addNoteCallback: route.params.addNoteCallback,
    });
  }, [navigation, route.params.addNoteCallback]);

  const handleAddNote = () => {
    const newNote = { id: Date.now(), text };
    if (route && route.params && route.params.addNoteCallback) {
      route.params.addNoteCallback(newNote);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter note text"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Add Note" onPress={handleAddNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    padding: 8,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default NewNoteScreen;
