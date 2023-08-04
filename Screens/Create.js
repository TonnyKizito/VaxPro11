
//==============================================================================================================


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

const db = SQLite.openDatabase('YourDatabase.db');

function Create(props) {
  const [district, setDistrict] = useState('');
  const [health_facility, setHealth_facility] = useState('');
  const [vaccine_name, setVaccine_name] = useState('');
  const [Batch_No, setBatch_No] = useState('');
  const [vial_size, setVial_size] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [exp_date, setExp_date] = useState('');
  const [From, setFrom] = useState('');
  const [quantity, setQuantity] = useState('');
  const [VVM, setVVM] = useState('');
  const [issued_by, setIssued_by] = useState('');
  const [issued_to, setIssued_to] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  

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
        `CREATE TABLE IF NOT EXISTS facility_receive (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          district TEXT,
           Date TEXT,
           health_facility TEXT,
           vaccine_name TEXT,
           Batch_No TEXT,
           vial_size TEXT,
           manufacturer TEXT,
           exp_date TEXT,
           [From] TEXT,
           quantity INTEGER,
           VVM INTEGER,
           issued_by TEXT,
           issued_to TEXT
           
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
        `CREATE TABLE IF NOT EXISTS offline_facility_receive (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          district TEXT,
           Date TEXT,
           health_facility TEXT,
           vaccine_name TEXT,
           Batch_No TEXT,
           vial_size TEXT,
           manufacturer TEXT,
           exp_date TEXT,
           [From] TEXT,
           quantity INTEGER,
           VVM INTEGER,
           issued_by TEXT,
           issued_to TEXT
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
          Batch_No && 
          vial_size && 
          manufacturer && 
          exp_date && 
          From && 
          quantity && 
          VVM && 
          issued_by && 
          issued_to
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
      Batch_No && 
      vial_size && 
      manufacturer && 
      exp_date && 
      From && 
      quantity && 
      VVM && 
      issued_by && 
      issued_to
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
                  `INSERT INTO facility_receive (district, 
                    health_facility,
                    vaccine_name,
                    Batch_No,
                    vial_size,
                    manufacturer,
                    exp_date,
                    [From],
                    quantity,
                    VVM,
                    issued_by,
                    issued_to) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
                  [
                    district, 
                    health_facility,
                    vaccine_name,
                    Batch_No,
                    vial_size,
                    manufacturer,
                    exp_date,
                    From,
                    quantity,
                    VVM,
                    issued_by,
                    issued_to
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
        'SELECT * FROM facility_receive',
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
              const syncPromise = axios.post('https://vaccines123.pythonanywhere.com/api/xapiv1/facility-receive-vacines-from-other-hf-sync/', data);
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
        'DELETE FROM facility_receive',
        [],
        () => {
          console.log('Data removed from facility_receive.');
        },
        (_, error) => {
          console.log('Error occurred while removing data from facility_receive:', error);
        }
      );
    });
  };
  
  

  const saveOfflineData = () => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO offline_facility_receive (district, 
          health_facility,
          vaccine_name,
          Batch_No,
          vial_size,
          manufacturer,
          exp_date,
          From,
          quantity,
          VVM,
          issued_by,
          issued_to) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          district, 
            health_facility,
            vaccine_name,
            Batch_No,
            vial_size,
            manufacturer,
            exp_date,
            From,
            quantity,
            VVM,
            issued_by,
            issued_to
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
          'SELECT * FROM facility_receive',
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
          placeholder="Batch No"
          value={Batch_No}
          onChangeText={text => setBatch_No(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Vial size"
          value={vial_size}
          onChangeText={text => setVial_size(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Manufacturer"
          value={manufacturer}
          onChangeText={text => setManufacturer(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Expiry date"
          value={exp_date}
          onChangeText={text => setExp_date(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="From"
          value={From}
          onChangeText={text => setFrom(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={text => setQuantity(text)}
          style={styles.input}
        />


         {isSyncing && (
                  <Text style={styles.syncInProgressText}>Synchronization is in progress...</Text>
                )}




        <TextInput
          placeholder="VVM"
          value={VVM}
          onChangeText={text => setVVM(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Issued By"
          value={issued_by}
          onChangeText={text => setIssued_by(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Issued To"
          value={issued_to}
          onChangeText={text => setIssued_to(text)}
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

export default Create;




// =======================================================================================

