
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity, Image, Alert } from 'react-native';
// import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // import the icon library
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { WebView } from 'react-native-webview';

// =============================================

// import { WebView } from 'react-native-webview'; 
import Home from './Screens/Home';
import Create from './Screens/Create';
import CreateFacilityIssue from './Screens/CreatFacilityIssue';

import DistrictIssue from './Screens/DistrictIssue';

import DistrictReceive from './Screens/DistrictReceive';

import NationalReceive from './Screens/NationalReceive';
import Contact from './Screens/Contact';


// ====================================



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const IssuedVaccinesStack = createStackNavigator();


const myStyles = {
  title: 'Issue and Receive vaccines screen',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'green'
  }
};

function HomeStack() {
  return (
    

    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={myStyles} />
      <Stack.Screen name="Create" component={Create} options={{ ...myStyles, title: 'Add Vaccines' }} />

      <Stack.Screen name="CreateFacilityIssue" component={CreateFacilityIssue} options={{ ...myStyles, title: 'Issue Vaccines' }} />

      
    
    </Stack.Navigator>



  );
}

function IssueStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IssueVaccine"
        component={FacilityIssue}
        options={{ ...myStyles, title: 'Issue vaccine' }}
      />
      {/* Other Stack.Screen components */}
      <Stack.Screen name='IssueVaccine' component={FacilityIssue} options={{ ...myStyles, title: 'Issue vaccine' }} />
      
    </Stack.Navigator>
  );
}

function DistrictIssueStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IssueDistrict"
        component={DistrictIssue}
        options={{ ...myStyles, title: 'District issue to HF' }}
      />
      
    </Stack.Navigator>
  );
}

function DistrictReceiveStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceiveDistrict"
        component={DistrictReceive}
        options={{ ...myStyles, title: 'District Receive from NMS' }}
      />
      {/* Other Stack.Screen components */}
      <Stack.Screen name='National-Receive' component={NationalReceive} options={{ ...myStyles, title: 'District Receive vaccines' }} />
     
    </Stack.Navigator>
  );
}

function NationalReceiveStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="National-Receive"
        component={NationalReceive}
        options={{ ...myStyles, title: 'Vaccines Management App' }}
      />
      {/* Other Stack.Screen components */}
    </Stack.Navigator>
  );
}






function ContactStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Developer contact"
        component={Contact}
        options={{ ...myStyles, title: 'Developer contacts' }}
      />
      {/* Other Stack.Screen components */}
    </Stack.Navigator>
  );
}






function LinkScreen() {
  return (
    <WebView
      source={{ uri: 'https://vaccines123.pythonanywhere.com/vaccinatorlogin' }}
      style={{ flex: 1 }}
    />


  );
}






function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView style={{ backgroundColor: 'skyblue' }} {...props}>
      <Image source={require('./img/bottle.jpg')} style={myStyles.image} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function AccessCodeScreen({ setAccessCode, setAccessGranted }) {
  const [inputCode, setInputCode] = useState('');

  const [inputName, setInputName] = useState('');
  
  




// ============================================================
const handleAccessCodeSubmit = () => {
  const facility_names = ['BWANDA-HC', 'VILLA-MARIA-HOSPITAL', 'BAALA-HC','test'];
  const facility_codes = ['000', '789','111','1234'];

  const index = facility_names.findIndex((name) => name === inputName);

  if (index !== -1 && facility_codes[index] === inputCode) {
    setAccessGranted(true);
  } else {
    Alert.alert('Error', 'Invalid facility name or access code. Please try again.', [{ text: 'OK' }]);
  }
};
// ===================================================================






  return (
    

    

// ========================================================
<View style={styles.container}>
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
        VACCINE MANAGEMENT SYSTEM
      </Text>
      <Image source={require('./img/bottle.jpg')} style={styles.headingImage} />
      <Text style={styles.title}>Enter Name</Text>
      <TextInput
        placeholder="Enter name here"
        placeholderTextColor="white"
        style={styles.input}
        value={inputName}
        onChangeText={setInputName}
      />
      <Text style={styles.title}>Enter Access Code</Text>
      <TextInput
        placeholder="Enter code here"
        placeholderTextColor="white"
        style={styles.input}
        value={inputCode}
        onChangeText={setInputCode}
      />
      <TouchableOpacity
        style={{ backgroundColor: '#007ba7', borderRadius: 20, padding: 10, width: 200 }}
        onPress={handleAccessCodeSubmit}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};




// ================================================

function IssuedVaccinesStackScreen() {
  return (
    <IssuedVaccinesStack.Navigator>
      <IssuedVaccinesStack.Screen
        name="Issued Vaccines"
        component={IssueHome}
      />
    </IssuedVaccinesStack.Navigator>
  );
}



// ============================================

function App() {
  const [accessCode, setAccessCode] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  

  if (!accessGranted) {
    return (
      <AccessCodeScreen
        setAccessCode={setAccessCode}
        setAccessGranted={setAccessGranted}
      />
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={CustomDrawerContent}>
        <Drawer.Screen
          name="<Home"
          component={HomeStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )
          }}
        />
        
        
        <Drawer.Screen
          name="Main App"
          component={LinkScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="apps" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="District Issue to HFs"
          component={DistrictIssueStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="star" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="District Receive vaccines"
          component={DistrictReceiveStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name="About"
          component={NationalReceiveStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            )
          }}
        />


       <Drawer.Screen
          name="Contact"
          component={ContactStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            )
          }}
        />



        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'skyblue'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    

  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: 'white',
    textAlign: 'center'
    
  },
    button: {
      backgroundColor: 'blue',
      borderRadius: 5,
      padding: 10,
    },
      headingImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
      
    
  },
});

export default App;









