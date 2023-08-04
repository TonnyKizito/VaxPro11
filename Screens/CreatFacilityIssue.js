


// ==============================================================================






import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ProgressBar,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

const CreateFacilityIssue = () => {
  const [district, setDistrict] = useState('');
  const [health_facility, setHealth_facility] = useState('');
  const [vaccine_name, setVaccine_name] = useState('');
  const [expired_vaccines, setExpired_vaccines] = useState('');
  const [vvm, setVvm] = useState('');
  const [number_vaccinated, setNumber_vaccinated] = useState('');
  const [issue_quantity, setIssue_quantity] = useState('');
  const [doses_given_to_other_facilities, setDoses_given_to_other_facilities] = useState('');
  const [issue_by, setIssue_by] = useState('');
  const [issue_to, setIssue_to] = useState('');
  const [doses_wasted, setDoses_wasted] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  


      // set initial dropdown values
    const districtData = ['Select your district','Abim', 'Adjumani', 'Agago', 'Alebtong', 'Amolatar', 'Amudat', 'Amuria',
    'Amuru', 'Apac', 'Arua', 'Budaka', 'Bududa', 'Bugiri', 'Bugweri', 'Bugweri',
    'Buhweju', 'Buikwe', 'Bukedea', 'Bukomansimbi', 'Bukwa', 'Bulambuli',
    'Buliisa', 'Bundibugyo', 'Bunyangabu', 'Bunyangabu', 'Bushenyi', 'Busia',
    'Butaleja', 'Butambala', 'Butebo', 'Butebo', 'Buvuma', 'Buyende', 'Dokolo',
    'Gomba', 'Gulu', 'Hoima', 'Ibanda', 'Iganga', 'Isingiro', 'Jinja', 'Kaabong',
    'Kabale', 'Kabarole', 'Kaberamaido', 'Kagadi', 'Kagadi', 'Kakumiro',
    'Kakumiro', 'Kalaki', 'Kalaki', 'Kalangala','Kalungu', 'Kaliro', 'Kampala',
    'Kamuli', 'KamwengeKanungu', 'Kapchorwa', 'Kapelebyong', 'Kapelebyong',
    'Karenga', 'Karenga', 'Kasanda', 'Kasanda', 'Kasese', 'Katakwi', 'Kayunga',
    'Kazo', 'Kazo', 'Kibaale', 'Kiboga', 'Kibuku', 'Kikuube', 'Kikuube',
    'Kiruhura', 'Kiryandongo', 'Kisoro', 'Kitagwenda', 'Kitagwenda', 'Kitgum',
    'Koboko', 'Kole', 'Kotido', 'Kumi', 'Kwania', 'Kwania', 'Kween', 'Kyankwanzi',
    'Kyegegwa', 'Kyenjojo', 'Kyotera', 'Kyotera', 'Lamwo', 'Lira', 'Luuka',
    'Luweero', 'Lwengo', 'Lyantonde','Masaka', 'Madi-Okollo', 'Madi-Okollo',
    'Manafwa', 'Maracha', 'Masindi', 'Mayuge', 'Mbale', 'Mbarara', 'Mitooma',
    'Mityana', 'Moroto', 'Moyo', 'Mpigi', 'Mubende', 'Mukono', 'Nabilatuk',
    'Nabilatuk', 'Nakapiripirit', 'Nakaseke', 'Nakasongola', 'Namayingo',
    'Namisindwa', 'Namisindwa', 'Namutumba', 'Napak', 'Nebbi', 'Ngora',
    'Ntoroko', 'Ntungamo', 'Nwoya', 'Obongi', 'Obongi', 'Omoro', 'Omoro',
    'Otuke', 'Oyam', 'Pader', 'Pakwach', 'Pakwach', 'Pallisa', 'Rakai',
    'Rubanda', 'Rubanda', 'Rubirizi', 'Rukiga', 'Rukiga', 'Rukungiri',
    'Rwampara', 'Sembabule','Wakiso', 'Serere', 'Sheema',
    'Sironko', 'Soroti', 'Terego', 'Tororo', 'Yumbe', 'Zombo'];
    
    
    const healthFacilityData = ['Select your Health facility','BWANDA-HC','KIGASA-HC-II','VILLA-MARIA-HOSPITAL',
    'KALUNGU-HC-III','ST-MONICA-BIRONGO','KABUNGO-HC-III',
'TEGUZIBIRWA-DOM',
    
    'BUKULULA-HC-IV','BBAALA-HC-III',
    'WELSPRING-HC-III','LUKAYA-HC-III',
'ST-FRANCIS','ST-JOSEPH-MOTHER-CARE',
    'KALUNGI-HC-III','BL-LUSANGO-HC-II',
    'KABAALE-HC-III',
    'KITI-HC-III','KIRAGGA-HC-III','KIGAJJU-HC-II',
    'KASAMBYA-HC-III','KYAMULIBWA-HC-IV',
    'KYAMULIBWA-HC-III','NABUTONGWA-HC-II',
    
    ];
    
    
    const vaccineNameData = ['Select a Vaccine/Syringe/Diluent/Tab','BCG','DPT-HepB-Hib','OPV','IPV',
    'Rotavirus vaccine',
    'Yellow Fever',
    'Measles Rubella','PCV','HPV','Tetanus Toxiod diptheria(Td)','0.05mls','0.5mls','2mls',
    
    '0.3mls','0.1mls','5mls','0.1mls','Mabendazole','Vitamin A 200,000iu',
 'Vitamin A 100,000iu','Albendazole',

    'Hepatitis B','Johnson and Johnson',
    'Astrazeneca','Pfizer','Moderna','Sinovac',

    'BCG diluents','MR diluents','OPV droppers',
    'Safety boxes'];

     
// ====================================

  useEffect(() => {
    createTable();
    checkInternetConnection();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS facility_issue_vaccines1 (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          district TEXT,
          health_facility TEXT,
          vaccine_name TEXT,
          expired_vaccines TEXT,
          vvm TEXT,
          number_vaccinated TEXT,
          issue_quantity TEXT,
          doses_given_to_other_facilities TEXT,
          issue_by TEXT,
          issue_to TEXT,
          doses_wasted TEXT
        )`,
        [],
        () => {
          console.log('Table created successfully.');
        },
        (_, error) => {
          console.log('Error occurred while creating table:', error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS offline_facility_issue_vaccines1 (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          district TEXT,
          health_facility TEXT,
          vaccine_name TEXT,
          expired_vaccines TEXT,
          vvm TEXT,
          number_vaccinated TEXT,
          issue_quantity TEXT,
          doses_given_to_other_facilities TEXT,
          issue_by TEXT,
          issue_to TEXT,
          doses_wasted TEXT
        )`,
        [],
        () => {
          console.log('Offline data table created successfully.');
        },
        (_, error) => {
          console.log('Error occurred while creating offline data table:', error);
        }
      );
    });
  };










  const checkInternetConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        setSyncStatus('online');
        if (
            district &&
            health_facility &&
            vaccine_name &&
            expired_vaccines &&
            vvm &&
            number_vaccinated &&
            issue_quantity &&
            doses_given_to_other_facilities &&
            doses_given_to_other_facilities &&
            issue_by &&
            issue_to &&
            doses_wasted
          ) {
          syncData();
        }
      } else {
        setSyncStatus('offline');
      }
    });
  };

  const showSuccessModal = () => {
    setSuccessModalVisible(true);
  };

  const hideSuccessModal = () => {
    setSuccessModalVisible(false);
  };




  const insertData = () => {
    if (
      district &&
      health_facility &&
      vaccine_name &&
      expired_vaccines &&
      vvm &&
      number_vaccinated &&
      issue_quantity &&
      doses_given_to_other_facilities &&
      doses_given_to_other_facilities &&
      issue_by &&
      issue_to &&
      doses_wasted
    ) {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to insert the data?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              db.transaction(tx => {
                tx.executeSql(
                  `INSERT INTO facility_issue_vaccines1 (
                    district,
                    health_facility,
                    vaccine_name,
                    expired_vaccines,
                    vvm,
                    number_vaccinated,
                    issue_quantity,
                    doses_given_to_other_facilities,
                    doses_given_to_other_facilities,
                    issue_by,
                    issue_to,
                    doses_wasted)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
                  [
                    district,
                    health_facility,
                    vaccine_name,
                    expired_vaccines,
                    vvm,
                    number_vaccinated,
                    issue_quantity,
                    doses_given_to_other_facilities,
                    doses_given_to_other_facilities,
                    issue_by,
                    issue_to,
                    doses_wasted
                  ],
                  (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                      Alert.alert('Success', 'Data inserted successfully.');
  
                      if (isConnected) {
                        syncData();
                      } else {
                        saveOfflineData();
                        setSyncStatus('offline');
                      }
                    } else {
                      Alert.alert('Error', 'Insertion failed.');
                    }
                  },
                  (_, error) => {
                    console.log('Error occurred while inserting data:', error);
                  }
                );
              });
            },
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };
  

  
  const syncData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM facility_issue_vaccines1',
        [],
        (_, result) => {
          const dataCount = result.rows.length;
          if (dataCount === 0) {
            Alert.alert('No Data', 'There is no data to synchronize.');
          } else {
            const batchSyncPromises = [];
            for (let i = 0; i < dataCount; i++) {
              const data = result.rows.item(i);
              // const syncPromise = axios.post('https://vaccines123.pythonanywhere.com/api/facility-receive-vacines-from-other-hf/', data);
              const syncPromise = axios.post('https://vaccines123.pythonanywhere.com/api/xapiv1/facility-issue-vaccines-sync/', data);
              batchSyncPromises.push(syncPromise);
            }

            Promise.all(batchSyncPromises)
              .then(() => {
                console.log('Data synchronized successfully.');
                setSyncStatus('synced');
                removeDataFromTable();
                showSuccessModal();
              })
              .catch(error => {
                console.log('Error occurred while synchronizing data:', error);
              })
              .finally(() => {
                setIsSyncing(false); // Update state to indicate synchronization is completed
              });
          }
        },
        (_, error) => {
          console.log('Error occurred while selecting data:', error);
        }
      );
    });
  };


  
  

  const removeDataFromTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM facility_issue_vaccines1',
        [],
        () => {
          console.log('Data removed from facility_issue_vaccines1.');
        },
        (_, error) => {
          console.log('Error occurred while removing data from facility_issue_vaccines1:', error);
        }
      );
    });
  };
  
  

  const saveOfflineData = () => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO offline_facility_issue_vaccines1 ( 
          district,
          health_facility,
          vaccine_name,
          expired_vaccines,
          vvm,
          number_vaccinated,
          issue_quantity,
          doses_given_to_other_facilities,
          doses_given_to_other_facilities,
          issue_by,
          issue_to,
          doses_wasted
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            district,
            health_facility,
            vaccine_name,
            expired_vaccines,
            vvm,
            number_vaccinated,
            issue_quantity,
            doses_given_to_other_facilities,
            doses_given_to_other_facilities,
            issue_by,
            issue_to,
            doses_wasted
        ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Data saved offline successfully.');
          } else {
            console.log('Error occurred while saving data offline.');
          }
        },
        (_, error) => {
          console.log('Error occurred while saving data offline:', error);
        }
      );
    });
  };

 
  
  const syncButtonPressed = () => {
    if (isConnected) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM facility_issue_vaccines1',
          [],
          (_, result) => {
            if (result.rows.length === 0) {
              Alert.alert('No Data', 'There is no data to synchronize.');
            } else {
              setIsSyncing(true); // Update state to indicate synchronization is in progress
              syncData();
            }
          },
          (_, error) => {
            console.log('Error occurred while selecting data:', error);
          }
        );
      });
    } else {
      Alert.alert('Offline', 'Cannot sync data while offline.');
    }
  };
  



  
  return (
    <ScrollView>
      <View style={styles.container}>
        <Picker
          selectedValue={district}
          onValueChange={itemValue => setDistrict(itemValue)}
          style={styles.input}
        >
          {districtData.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>

        <Picker
          selectedValue={health_facility}
          onValueChange={itemValue => setHealth_facility(itemValue)}
          style={styles.input}
        >
          {healthFacilityData.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>

        <Picker
          selectedValue={vaccine_name}
          onValueChange={itemValue => setVaccine_name(itemValue)}
          style={styles.input}
        >
          {vaccineNameData.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>

        <TextInput
          placeholder="Issue quantity"
          value={issue_quantity}
          onChangeText={text => setIssue_quantity(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Issue by"
          value={issue_by}
          onChangeText={text => setIssue_by(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Issue to"
          value={issue_to}
          onChangeText={text => setIssue_to(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Doses given to other facilities"
          value={doses_given_to_other_facilities}
          onChangeText={text => setDoses_given_to_other_facilities(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Number vaccinated"
          value={number_vaccinated}
          onChangeText={text => setNumber_vaccinated(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="VVM"
          value={vvm}
          onChangeText={text => setVvm(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Expired vaccines"
          value={expired_vaccines}
          onChangeText={text => setExpired_vaccines(text)}
          style={styles.input}
        />

        {isSyncing && (
              <Text style={styles.syncInProgressText}>Synchronization is in progress...</Text>
            )}

        <TextInput
          placeholder="Doses wasted"
          value={doses_wasted}
          onChangeText={text => setDoses_wasted(text)}
          style={styles.input}
        />

        <TouchableHighlight
          underlayColor="#3f8abf"
          onPress={insertData}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>

        {syncStatus === 'online' && (
          <Text style={styles.syncStatusOnline}>Online</Text>
        )}
        {syncStatus === 'offline' && (
          <Text style={styles.syncStatusOffline}>Offline</Text>
        )}

 
       


        <TouchableHighlight
          underlayColor="#3f8abf"
          onPress={syncButtonPressed}
          style={styles.button1}
        >
          <Text style={styles.buttonText}>Sync</Text>
        </TouchableHighlight>
      </View>

      <Modal visible={successModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Data synchronized successfully.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={hideSuccessModal}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },

    button1: {
      backgroundColor: '#009999',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 15,



  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  syncStatusOnline: {
    textAlign: 'center',
    color: 'green',
    marginBottom: 10,
  },
  syncStatusOffline: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  progressBar: {
    height: 10,
    marginTop: 10,
    marginBottom: 20,

  },

  syncInProgressText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    
  },
});

export default CreateFacilityIssue;









