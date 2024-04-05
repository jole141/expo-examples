import { Button, StyleSheet, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import StaticServer from '@dr.pogodin/react-native-static-server';

const encodeFile = (uri) => {
  return uri.split('file://')[1];
};

export default function App() {
  const [pickedFile, setPickedFile] = useState(null);
  const [serverInstance, setServerInstance] = useState(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    setPickedFile(result.assets[0].uri);
  };

  const startServer = async () => {
    if (!pickedFile) {
      console.error('No file picked');
      return;
    }
    console.log(pickFile, encodeFile(pickedFile));
    console.log('Starting server...');
    const server = new StaticServer({
      fileDir: encodeFile(pickedFile),
      port: 8080,
      nonLocal: true,
    });
    server.start().then((url) => {
      console.log('Server started at', url);
    });
    setServerInstance(server);
  };

  const stopServer = async () => {
    serverInstance.stop().then(() => {
      console.log('Server stopped');
    });
    setServerInstance(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Static Server</Text>
      <Text style={styles.subtitle}>Picked File:</Text>
      <Text>{JSON.stringify(pickedFile, null, 2)}</Text>
      <View style={styles.buttons}>
        <Button style={styles.button} title={'Pick a file'} onPress={pickFile} />
        {!serverInstance ? (
          <Button style={styles.button} title={'Start server'} onPress={startServer} />
        ) : (
          <Button style={styles.button} title={'Stop server'} onPress={stopServer} />
        )}
      </View>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
  },
  buttons: {
    gap: 10,
  },
});
