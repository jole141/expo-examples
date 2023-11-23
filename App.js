import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
import { useState } from 'react';
import { broadcast, setCompanyId, stopBroadcast } from 'react-native-ble-advertise';

const COMPANY_ID = '0x00E0';
const UUID = '44C13E43-097A-9C9F-537F-5666A6840C08';
const MAJOR = '1234';
const MINOR = '4321';

export default function App() {
  const [isAdvertising, setIsAdvertising] = useState(false);

  const askForPermission = async () => {
    const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE);
    if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission denied');
    }
  };

  const startAdvertising = async () => {
    if (Platform.OS === 'android') await askForPermission();
    setCompanyId(parseInt(COMPANY_ID, 16));
    setIsAdvertising(true);
    broadcast(UUID, parseInt(MAJOR, 16), parseInt(MINOR, 16)).catch((error) => {
      console.log(error);
      setIsAdvertising(false);
    });
  };

  const stopAdvertising = async () => {
    setIsAdvertising(false);
    await stopBroadcast();
  };

  return (
    <View style={styles.container}>
      <Button title={'Start advertising'} onPress={startAdvertising} disabled={isAdvertising} />
      <Button title={'Stop advertising'} onPress={stopAdvertising} disabled={!isAdvertising} />
      {isAdvertising && (
        <>
          <Text>Advertising</Text>
          <ActivityIndicator size="large" color="black" />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
