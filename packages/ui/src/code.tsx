import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CodeProps {
  code: string;
}

export const Code = ({ code }: CodeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    fontFamily: 'monospace',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
});
