"use client";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";

export default function Home() {
  return (
    <View style={styles.container}>
      <Card title="Welcome to Shared UI">
        <Text style={styles.text}>
          This page is rendered in the web app using components shared with the mobile app.
        </Text>
        <Code code="const shared = true;" />
        <Button 
          title="Click Me!" 
          onPress={() => alert('Hello from Web!')} 
          style={{ marginTop: 20 }} 
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
