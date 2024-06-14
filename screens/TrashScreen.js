import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements'; 
import { TRASH, LABELS } from '../models/dummy-data'; 

const TrashScreen = ({ navigation, route }) => {
  const [trashNotes, setTrashNotes] = useState(TRASH);

  useEffect(() => {
    if (route.params?.deletedNote) {
      setTrashNotes([...trashNotes, route.params.deletedNote]); 
    }
  }, [route.params?.deletedNote]);

  const handleRestoreNote = (restoredNote) => {
    const updatedNotes = trashNotes.filter(note => note.id !== restoredNote.id);
    setTrashNotes(updatedNotes);
    
    if (route.params && route.params.restoreNoteCallback) {
      route.params.restoreNoteCallback(restoredNote);
    }
    
    navigation.navigate('Home', { restoredNote }); 
  };

  const handleDeletePermanently = (note) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this note permanently?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setTrashNotes(trashNotes.filter(item => item.id !== note.id)); // Remove note from trash
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleRestoreAll = () => {
    if (route.params && route.params.restoreNoteCallback) {
      trashNotes.forEach(note => route.params.restoreNoteCallback(note));
    }
    setTrashNotes([]); 
    navigation.navigate('Home', { restoredNotes: trashNotes, restoredAll: true }); // Navigate to Home with restoredAll flag
  };

  const handleEmptyTrash = () => {
    Alert.alert(
      'Confirm Empty Trash',
      'Are you sure you want to empty the trash bin?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Empty Trash',
          onPress: () => setTrashNotes([]), 
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderNoteItem = ({ item }) => {
    const noteLabels = item.labelIds.map(labelId => {
      const label = LABELS.find(l => l.id === labelId);
      return label ? label.label : '';
    });

    const formattedDate = new Date(item.updateAt).toLocaleString(); 

    return (
      <View style={[styles.note, { backgroundColor: item.color || '#fff' }]}>
        <View style={styles.labelsContainer}>
          {noteLabels.map((label, index) => (
            <View key={index} style={styles.label}>
              <Text>{label}</Text>
            </View>
          ))}
        </View>
        <Text>{item.content}</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.infoText}>{formattedDate}</Text>
          <Icon
            name={item.isBookmarked ? 'bookmark' : 'bookmark-border'}
            type='material'
            size={24}
            color={item.isBookmarked ? 'blue' : 'gray'}
          />
        </View>
        <View style={styles.actionButtons}>
          <Button title="Restore" onPress={() => handleRestoreNote(item)} />
          <Button title="Delete Permanently" onPress={() => handleDeletePermanently(item)} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trashNotes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.bottomButtons}>
        <Button title="Restore All" onPress={handleRestoreAll} />
        <Button title="Empty Trash" onPress={handleEmptyTrash} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  note: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
  labelsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoText: {
    color: 'gray',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default TrashScreen;
