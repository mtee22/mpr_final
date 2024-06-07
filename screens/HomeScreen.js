import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to add a new note
  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  // Function to update a note
  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  // Function to render each note item
  const renderNoteItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditNote', { note: item, updateNoteCallback: updateNote })}>
      <Text style={styles.note}>{item.text}</Text>
    </TouchableOpacity>
  );

  // Function to filter notes based on search query
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search notes"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <Icon name="search" size={24} color="black" />
      </View>
      {/* FlatList to display the list of notes */}
      <FlatList
        data={filteredNotes} // Use filtered notes
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
      />
      {/* Button to add a new note */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewNote', { addNoteCallback: addNote })}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  note: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
