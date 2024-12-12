export interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
  }
    export const getEvents = async (): Promise<Event[]> => {
    // Simulating a database fetch
    return [
      { id: 1, title: 'Event 1', date: '2024-12-01', location: 'Location 1' },
      { id: 2, title: 'Event 2', date: '2024-12-02', location: 'Location 2' },
    ];
  };
  