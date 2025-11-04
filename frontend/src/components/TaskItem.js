import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/global';

export default function TaskItem({ task, onMarkComplete }) {
  return (
    <View style={{ borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={{ color: task.status === 'Completed' ? 'green' : 'orange' }}>
          {task.status}
        </Text>
      </View>
      <Text style={styles.small}>{task.description}</Text>

      {task.status !== 'Completed' && (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: 'green' }]}
          onPress={() => onMarkComplete(task)}
        >
          <Text style={styles.btnText}>Mark Completed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
