import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { LABELS } from '../models/dummy-data'; 

const LabelsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [editedLabelName, setEditedLabelName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setLabels(LABELS);
  }, []);

  const handleLabelPress = (label) => {
    setSelectedLabel(label);
    setEditedLabelName(label.label);
    setModalVisible(true);
  };

  const handleEditLabel = () => {
    const updatedLabels = labels.map((item) =>
      item.id === selectedLabel.id ? { ...item, label: editedLabelName } : item
    );
    setLabels(updatedLabels);
    setModalVisible(false);
  };

  const handleDeleteLabel = () => {
    const updatedLabels = labels.filter((item) => item.id !== selectedLabel.id);
    setLabels(updatedLabels);
    setModalVisible(false);
  };

  const filteredLabels = labels.filter((label) =>
    label.label && label.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLabelItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLabelPress(item)} style={styles.labelButton}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleCreateLabel = () => {
    const newLabelId = Math.random().toString(36).substr(2, 9);
    const newLabel = { id: newLabelId, label: '' };
    setLabels([...labels, newLabel]);
    setSelectedLabel(newLabel);
    setEditedLabelName('');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search ..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredLabels}
        renderItem={renderLabelItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.createButtonContainer}>
        <Button title="Create a new Label" onPress={handleCreateLabel} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedLabel && (
            <View style={styles.modalContent}>
              <TextInput
                value={editedLabelName}
                onChangeText={setEditedLabelName}
                style={styles.input}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <Button title="Save" onPress={handleEditLabel} />
                <Button title="Delete" onPress={handleDeleteLabel} color="red" />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  labelButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
  createButtonContainer: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});

export default LabelsScreen;
