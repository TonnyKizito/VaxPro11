import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactDeveloperScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Developer</Text>
      <Text style={styles.description}>
        For any inquiries or support related to this app, please feel free to reach out to the developer.
      </Text>
      <Text style={styles.label}>Developer Name:</Text>
      <Text style={styles.value}>Kizito Tonny</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>tonny.kizito22@gmail.com</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>+256755082730/+256785016275</Text>
      <Text style={styles.label}>WhatsApp:</Text>
      <Text style={styles.value}>+256755082730/+256785016275</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ContactDeveloperScreen;
