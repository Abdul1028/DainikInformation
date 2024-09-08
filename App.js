import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Platform, Keyboard } from 'react-native';
import { Button, Provider as PaperProvider, Portal, Dialog, Paragraph } from 'react-native-paper';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';



export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dayNumber, setDayNumber] = useState('');
  const [year, setYear] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dateInfo, setDateInfo] = useState({});

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const clearFields = () => {
    setDayNumber('');
    setYear('');
    Keyboard.dismiss();
  };
  
  const checkDate = () => {
    Keyboard.dismiss();
    const dayNum = parseInt(dayNumber, 10);
    const yr = parseInt(year, 10);

    if (!dayNumber) {

      if (Platform.OS == "web") {
        window.alert("Enter a valid day number (1-365 or 1-366 for leap year)");
      }

      Alert.alert("Invalid Input", "Please enter a day number.");
      return;
    }

    if (!year) {
      if (Platform.OS == "web") {
        window.alert("Please Enter a year");
      }
      Alert.alert("Invalid Input", "Please enter a year.");
      return;
    }

    if (dayNumber && (dayNum < 1 || (dayNum > 365 && !isLeapYear(yr)) || dayNum > 366)) {
      if (Platform.OS == "web") {
        window.alert("Enter a valid day number (1-365 or 1-366 for leap year).");
      }
      Alert.alert("Invalid Input", "Enter a valid day number (1-365 or 1-366 for leap year).");
      return;
    }

    if (year && (year.length !== 4 || yr < 1)) {
      if (Platform.OS == "web") {
        window.alert("Enter a valid 4-digit year.");
      }
      Alert.alert("Invalid Input", "Enter a valid 4-digit year.");
      return;
    }

    const date = moment().year(yr).dayOfYear(dayNum);

    const formattedDate = date.format("DD-MM-YYYY");
    const weekOfYear = date.isoWeek();
    const leapYear = isLeapYear(yr) ? "Yes" : "No";

    setDateInfo({ formattedDate, weekOfYear, leapYear });
    setIsDialogVisible(true);
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;


  return (

    <PaperProvider>
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
              {/* {isDarkMode ? <Sun size={24} color="black" /> : <Moon size={24} color="black" /> } */}
              {isDarkMode ? <Ionicons name="sunny-outline" size={24} color="black" /> : <Ionicons name="cloudy-night" size={24} color="black" />}
              {/* {isDarkMode ? "Light" : "Dark" } */}

            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content} >
          <View>
            <Text style={[styles.text, themeStyles.text]}>Check Day of the Year</Text>
          </View>
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="Enter day number"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            keyboardType="numeric"
            returnKeyType="done"
            value={dayNumber}
            onChangeText={setDayNumber}
          />
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="Enter year"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            keyboardType="numeric"
            returnKeyType="done"
            value={year}
            onChangeText={setYear}
          />



          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={checkDate}
              style={[styles.button, themeStyles.button]}
              labelStyle={[themeStyles.buttonText]}
            >
              Check
            </Button>
            <Button
              mode="contained"
              onPress={clearFields}
              style={[styles.button, themeStyles.button]}
              labelStyle={[themeStyles.buttonText]}
            >
              Clear
            </Button>
          </View>
        </View>

        <Text style={[themeStyles.runningOS]} >You're running on {Platform.OS} ❤️</Text>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Portal>
          <Dialog 
            visible={isDialogVisible}
            style={[themeStyles.dialog]}
            onDismiss={() => setIsDialogVisible(false)  }
          >
            <Dialog.Title style={[themeStyles.dialogTitle]} >Date Information</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={[themeStyles.dialogContent]} >Date: {dateInfo.formattedDate}</Paragraph>
              <Paragraph style={[themeStyles.dialogContent]} >Week of the Year: {dateInfo.weekOfYear}</Paragraph>
              <Paragraph style={[themeStyles.dialogContent]} >Leap Year: {dateInfo.leapYear}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsDialogVisible(false)}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>


      </View>
    </PaperProvider>
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
    color: '#007bff',
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
  button: {
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
  },

  dialog: {
    backgroundColor: '#fff', // White background for light mode
  },
  dialogTitle: {
    color: '#000', // Black text for title
    fontWeight:"bold"
  },
  dialogContent: {
    color: '#000', // Black text for content
    fontSize:18,
    padding:5,
    
    
  },
  runningOS:{
    alignSelf:"center",
    padding:15,
    fontWeight:"bold",
    fontSize:16,

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
    backgroundColor: '#fff',
  },
  toggleButtonText: {
    color: '#fff',
  },
  text: {
    color: '#fff',
  },

  dialogTitle:{
    color: "#fff",
  },
  input: {
    backgroundColor: '#444',
    color: "#fff",
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: '90%',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: '#1e90ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  dialog: {
    backgroundColor: '#333', // Dark background for dark mode
  },
  dialogTitle: {
    color: '#fff', // White text for title
    fontWeight:"bold"
  },
  dialogContent: {
    color: '#fff', // White text for content
    fontSize:18,
    padding:5,
  },

  runningOS:{
    alignSelf:"center",
    padding:15,
    color:"white",
    fontWeight:"bold",
    fontSize:16,

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
    marginTop: 35,
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
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '5%', // 5% below the navbar
    width: '90%',
    marginLeft: '5%',
  },
  text: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 5,
    width: 'full',
  },
});
