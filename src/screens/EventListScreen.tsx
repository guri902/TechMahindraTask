import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const db = SQLite.openDatabase({ name: 'EventApp.db', location: 'default' });

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
}

const EventListScreen = ({ navigation }: { navigation: any }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const initializeDb = async () => {
      try {
        (await db).transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS events (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT,
              description TEXT,
              date TEXT,
              startTime TEXT,
              endTime TEXT
            )`
          );
        });
        fetchEvents();
      } catch (error: any) {
        console.error('Error initializing database:', error.message || error);
      }
    };

    initializeDb();

    const unsubscribe = navigation.addListener('focus', fetchEvents); // Refetch data when screen is focused
    return unsubscribe;
  }, [navigation]);

  const fetchEvents = async () => {
    try {
      (await db).transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM events',
            [],
            (_, result) => {
              const rows = result.rows;
              const eventList: Event[] = [];
              for (let i = 0; i < rows.length; i++) {
                eventList.push(rows.item(i) as Event);
              }
              setEvents(eventList);
            },
            (_, txError) => {
              console.error('Error fetching events:', txError);
              return true; // Rollback transaction
            }
          );
        },
        (txError) => console.error('Transaction error:', txError)
      );
    } catch (error: any) {
      console.error('Error during fetching events:', error.message || error);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      (await db).transaction((tx) => {
        tx.executeSql(
          'DELETE FROM events WHERE id = ?',
          [id],
          () => {
            // After deletion, fetch updated events list
            fetchEvents();
          },
          (_, error) => {
            console.error('Error deleting event:', error);
            return true; // Rollback transaction
          }
        );
      });
    } catch (error: any) {
      console.error('Error during deleting event:', error.message || error);
    }
  };

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDetails}>Date: {item.date}</Text>
      <Text style={styles.eventDetails}>
        Time: {item.startTime} - {item.endTime}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEvent(item.id)} 
      >
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {events.length > 0 ? (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        />
      ) : (
        <Text style={styles.noEventsText}>No events available. Add some events!</Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddEvent', {
            onAddEvent: fetchEvents,
          })
        }
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77b4eb',
    padding: 20,
  },
  flatList: {
    flex: 1,
    marginBottom: 20,
  },
  eventItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#333',
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default EventListScreen;


