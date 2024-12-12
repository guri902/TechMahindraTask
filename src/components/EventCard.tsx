import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location }) => (
  <View style={styles.card}>
    <Text>{title}</Text>
    <Text>{date}</Text>
    <Text>{location}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default EventCard;
