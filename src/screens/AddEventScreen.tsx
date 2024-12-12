import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({ name: 'EventApp.db', location: 'default' });

const AddEventScreen = ({ route, navigation }: any) => {
  const { addEvent } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const validateAndSave = async () => {
    if (!title || !description || !date || !startTime || !endTime) {
      Alert.alert('Validation Error', 'All fields are required!');
      return;
    }

    (await db).transaction((tx) => {
      tx.executeSql(
        `INSERT INTO events (title, description, date, startTime, endTime) VALUES (?, ?, ?, ?, ?)`,
        [title, description, date, startTime, endTime],
        () => {
          Alert.alert('Success', 'Event added successfully!');
          navigation.goBack();
        },
        (error) => {
          Alert.alert('Error', 'Failed to save event: ');
        }
      );
    });
  };
  const handleAddEvent = () => {
    const newEvent = {
      id: Math.random().toString(),
      title,
      date,
      time: `${startTime} - ${endTime}`,
    };
    addEvent(newEvent);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <></>
      <TextInput
        style={[styles.input, { height: 90,marginTop:10 }]}
        placeholder="Event Title"
      placeholderTextColor="#000000"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 90,marginTop:10 }]}
        placeholder="Event Description"
        placeholderTextColor="#000000"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={[styles.input, { height: 90,marginTop:10 }]}
        placeholder="Event Date"
        placeholderTextColor="#000000"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={[styles.input, { height: 90,marginTop:10 }]}
        placeholder="Start Time"
       placeholderTextColor="#000000"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={[styles.input, { height: 90,marginTop:10 }]}
        placeholder="End Time"
        placeholderTextColor="#000000"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TouchableOpacity style={[styles.submitButton, { marginTop: 5 }]} onPress={validateAndSave}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6c9da2',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 80,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#6c9da2',
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#77b4eb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius:25,
    width: '60%', 
    height: 85,
    marginTop: 30,
    
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEventScreen;
