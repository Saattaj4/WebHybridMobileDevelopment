import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TextInput, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firestore, collection, addDoc, MESSAGES, serverTimestamp, query, orderBy, onSnapshot } from './firebase/Config';
import Login from './components/Login';

export default function App(): React.ReactElement {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const colRef = collection(firestore, MESSAGES);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const rows: string[] = snap.docs.map(d => {
        const data = d.data() as any;
        const text = data.text ?? '';
        const created = data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt ?? null;
        const time = created ? new Date(created).toLocaleString() : 'unknown';
        return `${time} — ${text}`;
      });
      setMessages(rows);
    }, (err) => {
      console.error('onSnapshot error', err);
    });
    return () => { unsubscribe(); };
  }, []);

  async function handleSend(): Promise<void> {
    if (!newMessage.trim()) return;
    try {
      const colRef = collection(firestore, MESSAGES);
      await addDoc(colRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
      });
      setNewMessage('');
    } catch (err) {
      console.error('Failed to save message', err);
    }
  }

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Login setLoggedIn={setLoggedIn} />
        <StatusBar style="auto" />
      </View>
    );
  }




  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder='Type here...'
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title='Send' onPress={handleSend} />
      </View>
      <ScrollView
        style={{ width: '100%', marginTop: 8 }}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {messages.map((m, i) => (
          <View key={i} style={{ paddingVertical: 4 }}>
            <TextInput editable={false} value={m} />
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 100,
    marginVertical: 80
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  }
});