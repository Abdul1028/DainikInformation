

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={[styles.navbar, themeStyles.navbar]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, themeStyles.title]}>
            <Text style={[styles.dainik, themeStyles.dainik]}>दैनिक</Text>
            <Text style={[styles.info, themeStyles.info]}> Information</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, themeStyles.toggleButton]}
          onPress={toggleTheme}
        >
          <Text style={[styles.toggleButtonText, themeStyles.toggleButtonText]}>
            {isDarkMode ? 'Light' : 'Dark'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, themeStyles.text]}>
         Running on {Platform.OS}
        </Text>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Enter day number"
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        />
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Enter year"
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        />
      </View>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  navbar: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  title: {
    color: 'blue',
  },
  dainik: {
    color: 'blue',
  },
  info: {
    color: 'black',
  },
  toggleButton: {
    backgroundColor: '#007BFF',
  },
  toggleButtonText: {
    color: '#fff',
  },
  text: {
    color: '#000',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: '90%',
    marginVertical: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
  },
  navbar: {
    backgroundColor: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  title: {
    color: 'blue',
  },
  dainik: {
    color: '#007bff',
  },
  info: {
    color: '#fff',
  },
  toggleButton: {
    backgroundColor: '#1e90ff',
  },
  toggleButtonText: {
    color: '#fff',
  },
  text: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#444',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: '90%',
    marginVertical: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  dainik: {
    color: '#007bff',
  },
  info: {
    color: 'white',
  },
  toggleButton: {
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  content: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    fontSize: 18,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: '90%',
    marginVertical: 10,
  },
});
