import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]); // Cập nhật danh sách ghi chú với ghi chú mới được thêm
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditNote', { note: item })}>
            <Text style={styles.note}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewNote', { addNoteCallback: addNote })} // Truyền hàm callback cho màn hình NewNoteScreen
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
  note: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
