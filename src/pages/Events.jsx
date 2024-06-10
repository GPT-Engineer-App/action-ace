import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", venue_id: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", venue_id: "" });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <Container centerContent maxW="container.md" py={10} minH="80vh">
      <VStack spacing={4} w="100%">
        <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
          <FormControl>
            <FormLabel>Event Name</FormLabel>
            <Input
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              placeholder="Event Name"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Event Date</FormLabel>
            <Input
              name="date"
              type="date"
              value={newEvent.date}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Venue ID</FormLabel>
            <Input
              name="venue_id"
              value={newEvent.venue_id}
              onChange={handleInputChange}
              placeholder="Venue ID"
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Box>
        <VStack w="100%" spacing={3}>
          {events.map((event) => (
            <HStack key={event.id} w="100%" justifyContent="space-between">
              {editingEvent?.id === event.id ? (
                <>
                  <Input
                    name="name"
                    value={editingEvent.name}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, name: e.target.value })
                    }
                  />
                  <Input
                    name="date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                  />
                  <Input
                    name="venue_id"
                    value={editingEvent.venue_id}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        venue_id: e.target.value,
                      })
                    }
                  />
                  <IconButton
                    aria-label="Save"
                    icon={<FaEdit />}
                    onClick={() => handleUpdateEvent(editingEvent)}
                  />
                </>
              ) : (
                <>
                  <Text>{event.name}</Text>
                  <Text>{event.date}</Text>
                  <Text>{event.venue_id}</Text>
                  <IconButton
                    aria-label="Edit"
                    icon={<FaEdit />}
                    onClick={() => setEditingEvent(event)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteEvent(event.id)}
                  />
                </>
              )}
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Events;