

// ========================================================

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Animated } from 'react-native';

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const position = new Animated.Value(0);

  const loadData = () => {
    fetch('https://vaccines123.pythonanywhere.com/api/facility-issue-vaccines/')
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert('Error', error.toString());
      });
  };

  useEffect(() => {
    loadData();
    startAnimation();
  }, []);

  const clickedItem = (item) => {
    props.navigation.navigate('Details', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => clickedItem(item)}>
      <View style={[styles.card, item.id === 1 && { marginTop: 40 }]} key={item.id}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.vaccine_name}</Text>
      </View>
    </TouchableOpacity>
  );

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const movingTextStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.Text style={[styles.movingText, movingTextStyle]}>Welcom to Vaccines Management System App!.{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Animated.Text>
        
        <Animated.Text style={[styles.movingText, movingTextStyle]}>To access various features, you need to click on the Home button, the minus (-) button, or the plus (+) button.</Animated.Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          onRefresh={loadData}
          refreshing={loading}
        />

        <TouchableOpacity
          style={styles.fabPlus}
          onPress={() => props.navigation.navigate('Create')}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fabMinus}
          onPress={() => props.navigation.navigate('CreateFacilityIssue')}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  movingText: {
    position: 'absolute',
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  fabPlus: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
  },
  fabMinus: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
  },
});



// =====================================================

























