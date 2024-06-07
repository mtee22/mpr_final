// // screens/LabelsScreen.js

// import React from 'react';
// import { View, Text, Button } from 'react-native';

// const LabelsScreen = ({ navigation }) => (
//   <View>
//     <Text>Labels Screen</Text>
//     <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//     <Button title="Manage Labels" onPress={() => navigation.navigate('ManageLabels')} />
//   </View>
// );

// export default LabelsScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, StyleSheet } from 'react-native';

// Define the LabelsScreen component
const LabelsScreen = () => {
  // State for modal visibility, selected label, edited label name, and search query
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [editedLabelName, setEditedLabelName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [labels, setLabels] = useState([]);

  // Sample labels
  const sampleLabels = [
    { id: 'l1', name: 'React Native' },
    { id: 'l2', name: 'Final Exam' },
    { id: 'l3', name: 'Mini Project' },
    { id: 'l4', name: 'Team Work' },
    { id: 'l5', name: 'React Basic' },
  ];

  // Effect to update labels when component mounts
  useEffect(() => {
    setLabels(sampleLabels);
  }, []);

  // Function to handle label selection
  const handleLabelPress = (label) => {
    setSelectedLabel(label);
    setEditedLabelName(label.name); // Set initial value for the edited label name
    setModalVisible(true);
  };

  // Function to handle editing a label
  const handleEditLabel = () => {
    // Update the selected label with the edited name
    const updatedLabels = labels.map((item) =>
      item.id === selectedLabel.id ? { ...item, name: editedLabelName } : item
    );
    setLabels(updatedLabels);
    setModalVisible(false); // Close the modal after editing
  };

  // Function to filter labels based on search query
  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to render each label item
  const renderLabelItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLabelPress(item)} style={styles.labelButton}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <TextInput
        placeholder="Search labels..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      {/* FlatList to display the list of labels */}
      <FlatList
        data={filteredLabels} // Use filtered labels
        renderItem={renderLabelItem}
        keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
      />
      {/* Modal for editing the selected label */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedLabel && (
            <View>
              <Text>Edit Label: {selectedLabel.name}</Text>
              {/* TextInput and Button for editing the label */}
              <TextInput
                value={editedLabelName}
                onChangeText={setEditedLabelName}
                style={styles.input}
              />
              <Button title="Save" onPress={handleEditLabel} />
            </View>
          )}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

// Styles for the component
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
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default LabelsScreen;
