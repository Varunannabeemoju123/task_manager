import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from '../styles/global';
import { createTask } from '../services/api';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    try {
      await createTask(title, description);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to add task');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={addTask}>
        <Text style={styles.btnText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}
