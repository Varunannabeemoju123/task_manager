import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/global';
import TaskItem from '../components/TaskItem';
import { fetchTasks, updateTaskStatus } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks({ status, q: query });
      setTasks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [status, query])
  );

  const markComplete = async (task) => {
    await updateTaskStatus(task.id, 'Completed');
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by title..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={loadTasks}
        style={styles.input}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {['All', 'Pending', 'Completed'].map((s) => (
          <TouchableOpacity key={s} onPress={() => setStatus(s)}>
            <Text style={{ color: s === status ? '#1976D2' : '#000' }}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.btnText}>+ Add Task</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onMarkComplete={markComplete} />
        )}
      />
    </View>
  );
}
