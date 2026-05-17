import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card title="Welcome to Shared UI">
          <Text style={styles.text}>
            This page is rendered in the Expo app using components shared with the web app.
          </Text>
          <Code code="const shared = true;" />
          <Button 
            title="Click Me!" 
            onPress={() => Toast.show({
              type: 'error',
              text1: 'Hello!',
              text2: 'This is a toast from Mobile! 👋'
            })} 
            style={{ marginTop: 20 }} 
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
