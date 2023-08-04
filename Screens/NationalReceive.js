


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.description}>
        Welcome to the Vaccines Management System app! This app allows you to manage and track vaccines for different patients.
      </Text>
      <Text style={styles.description}>
        Features:
        - Add new vaccines and their details.
        - Update and delete vaccine records.
        - View vaccination history.
        - Generate reports and analytics on vaccine usage.
      </Text>
      <Text style={styles.version}>Version 1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  version: {
    fontSize: 14,
    marginTop: 20,
    color: 'gray',
    textAlign: 'center',
  },
});

export default AboutScreen;
