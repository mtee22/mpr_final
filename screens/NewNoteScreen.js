import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NewNoteScreen = ({ route, navigation }) => {
  const [content, setContent] = useState('');
  const { addNoteCallback } = route.params;

  const handleSave = () => {
    const newNote = {
      id: Date.now(),
      content,
      updateAt: new Date(),
      labelIds: [], 
      color: '#FFFFFF', 
      isBookmarked: false, 
    };
    addNoteCallback(newNote);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Note content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <Button title="Save Note" onPress={handleSave} />
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