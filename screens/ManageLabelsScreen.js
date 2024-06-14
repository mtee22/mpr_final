import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { LABELS } from '../models/dummy-data'; // Import dummy data

const ManageLabelsScreen = ({ route, navigation }) => {
  const { note, updateNoteCallback } = route.params;
  const [labels, setLabels] = useState(LABELS); // Assume LABELS is an array of objects with id and label properties
  const [noteLabels, setNoteLabels] = useState(note.labels || []);
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    // Sync note labels with initial state
    const noteLabelIds = note.labels || [];
    setNoteLabels(noteLabelIds);
  }, [note]);

  const addLabelToNote = (labelId) => {
    if (!noteLabels.includes(labelId)) {
      setNoteLabels([...noteLabels, labelId]);
    }
  };

  const removeLabelFromNote = (labelId) => {
    setNoteLabels(noteLabels.filter(id => id !== labelId));
  };

  const handleSaveLabels = () => {
    const updatedNote = { ...note, labels: noteLabels };
    if (updateNoteCallback) {
      updateNoteCallback(updatedNote);
    }
    navigation.navigate('EditNote', { updatedNote });
  };

  const addNewLabel = () => {
    if (newLabel.trim()) {
      const newId = labels.length ? labels[labels.length - 1].id + 1 : 1;
      const updatedLabels = [...labels, { id: newId, label: newLabel.trim() }];
      setLabels(updatedLabels);
      setNewLabel('');
    }
  };

  const renderLabelItem = ({ item }) => {
    const isSelected = noteLabels.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.labelItem, isSelected && styles.selectedLabelItem]}
        onPress={() => (isSelected ? removeLabelFromNote(item.id) : addLabelToNote(item.id))}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Labels</Text>
      <FlatList
        data={labels}
        renderItem={renderLabelItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.labelList}
      />
      <View style={styles.newLabelContainer}>
        <TextInput
          value={newLabel}
          onChangeText={setNewLabel}
          placeholder="New label"
          style={styles.newLabelInput}
        />
        <Button title="Add" onPress={addNewLabel} />
      </View>
      <Button title="Save" onPress={handleSaveLabels} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  labelList: {
    marginBottom: 16,
  },
  labelItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedLabelItem: {
    backgroundColor: '#cce5ff',
  },
  newLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newLabelInput: {
    flex: 1,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default ManageLabelsScreen;