import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { LABELS } from '../models/dummy-data'; 

const EditNoteScreen = ({ route, navigation }) => {
  const { note, updateNoteCallback } = route.params;
  const [text, setText] = useState(note.content);
  const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked || false);
  const [modalVisible, setModalVisible] = useState(false);
  const [labels, setLabels] = useState(note.labelIds || []); 
  const [selectedColor, setSelectedColor] = useState(note.color || ''); 

  const colors = [
    'lightseagreen', 'skyblue', 'lightcoral',
    'lightpink', 'lightgreen', 'lightblue',
    'orange', 'palegreen'
  ];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSaveNote}
          title="Save"
        />
      ),
    });
  }, [text, isBookmarked, labels, selectedColor]);

  const handleSaveNote = () => {
    const updatedNote = { ...note, content: text, isBookmarked, labelIds: labels, color: selectedColor, updatedAt: new Date() }; 
    if (updateNoteCallback) {
      updateNoteCallback(updatedNote);
    }
    navigation.navigate('Home', { updatedNote }); 
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDeleteNote = () => {
    if (route.params.deleteNoteCallback) {
      route.params.deleteNoteCallback(note.id);
    }
    navigation.navigate('Trash', { deletedNote: note }); 
  };
  
  const handleAddLabel = (labelId) => {
    setLabels([...labels, labelId]);
  };

  const handleLabelPress = (label) => {
    if (labels.includes(label.id)) {
      const updatedLabels = labels.filter((id) => id !== label.id);
      setLabels(updatedLabels);
    } else {
      setLabels([...labels, label.id]);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.colorCircle,
        { backgroundColor: item },
        selectedColor === item ? { opacity: 1 } : { opacity: 0.5 } 
      ]}
      onPress={() => handleColorSelect(item)}
    />
  );

  const renderLabelItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLabelPress(item)} style={[styles.labelContainer, labels.includes(item.id) ? styles.selectedLabel : null]}>
      <Text style={styles.labelText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={colors}
              renderItem={renderColorItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              style={styles.colorList}
            />
            <View style={styles.manageLabelsContainer}>
              <FlatList
                data={LABELS}
                renderItem={renderLabelItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                style={styles.labelsList}
              />
              <Button title="+ Manage labels" onPress={() => { setModalVisible(false); navigation.navigate('ManageLabels', { note, updateNoteCallback, handleAddLabel }); }} />
            </View>
            <TouchableOpacity style={styles.modalOption} onPress={() => { /* handle copy to clipboard */ }}>
              <Icon name="content-copy" size={24} color="black" type="material" />
              <Text style={styles.modalText}>Copy to Clipboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => { /* handle share */ }}>
              <Icon name="share" size={24} color="black" type="material" />
              <Text style={styles.modalText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleDeleteNote}>
              <Icon name="delete" size={24} color="black" type="material" />
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => { /* handle make a copy */ }}>
              <Icon name="file-copy" size={24} color="black" type="material" />
              <Text style={styles.modalText}>Make a Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => { /* handle pin */ }}>
              <Icon name="push-pin" size={24} color="black" type="material" />
              <Text style={styles.modalText}>Pin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => { /* handle add a reminder */ }}>
              <Icon name="alarm" size={24} color="black" type="material" />
              <Text style={styles.modalText}>Add a Reminder</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={handleBookmarkToggle}
        >
          <Icon name={isBookmarked ? "bookmark" : "bookmark-outline"} size={30} color="white" type="material" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moreVertButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="more-vert" size={30} color="white" type="material" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 5,
  },
  input: {
    padding: 8,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: 'gray',
    paddingHorizontal: 10,
  },
  bookmarkButton: {
    marginLeft: 10,
  },
  moreVertButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 18,
    paddingLeft: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  colorList: {
    marginBottom: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  manageLabelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelsList: {
    flexGrow: 0,
    marginRight: 10,
  },
  labelContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  labelText: {
    fontSize: 14,
  },
  selectedLabel: {
    backgroundColor: 'blue', 
  },
});

export default EditNoteScreen;

