import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


const EditNoteScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const [text, setText] = useState(note.text);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSaveNote}
          title="Save"
        />
      ),
    });
  }, [text]);

  const handleSaveNote = () => {
    const updatedNote = { ...note, text };
    if (route.params.updateNoteCallback) {
      route.params.updateNoteCallback(updatedNote);
    }
    navigation.navigate('Home', { updatedNote });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
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
