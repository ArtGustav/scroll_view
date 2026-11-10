import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

export default function App() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Função para consumir a API de posts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
      .then((response) => response.json())
      .then((json) => {
        setDados(json);
        setCarregando(false);
      })
      .catch((error) => {
        console.error('Erro ao consumir a API:', error);
        setCarregando(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Posts</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {dados.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardId}>ID: {item.id}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody} numberOfLines={3}>{item.body}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  cardBody: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
});