import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditNoteScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const [text, setText] = useState(note.text);

  const handleSaveNote = () => {
    note.text = text;
    navigation.navigate('Home', { updatedNote: note });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Save Note" onPress={handleSaveNote} />
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

export default EditNoteScreen;

