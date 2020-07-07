import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalenderDialogue from './calenderEventDialogue';
import { v4 as uuidv4 } from 'uuid';
import './calender.css';

function Calendar() {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [eventMode, setEventMode] = useState(null);
  const [eventId, setEventId] = useState();
  const [eventDate, setEventDate] = useState();
  const [eventTitle, setEventTitle] = React.useState('');
  const [eventDescription, setEventDescription] = React.useState('');
  const [currentEvent, setCurrentEvent] = useState({
    id: '',
    date: '',
    title: '',
    description: '',
  });
  const [events, setEvents] = useState([
    { id: '1', title: 'event 1', date: '2020-07-06', description: '' },
    { id: '2', title: 'event 2', date: '2020-07-07', description: '' },
  ]);
  const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));


  const handleTitleChange = (event) => {
    setEventTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };
  const handleDialogueOpen = () => {
    setDialogueOpen(true);
  };
  const handleDialogueClose = () => {
    setDialogueOpen(false);
  };
  const handleDateClick = (selectInfo) => {
    setEventId('');
    setEventTitle('');
    setEventDescription('');
    setEventDate('');
    setEventMode('Add');
    setEventDate(selectInfo.dateStr);
    setDialogueOpen(true);
  };
  const handleEventClick = (selectInfo) => {
    const clickedEvent = events.find(
      (event) => event.id === selectInfo.event.id
    );
    console.log(clickedEvent);

    setEventMode('Edit');
    setEventId(clickedEvent.id);
    setEventTitle(clickedEvent.title);
    setEventDescription(clickedEvent.description);
    setEventDate(clickedEvent.date);
    setDialogueOpen(true);
  };
  const handleUpdateEvent = () => {
    const newEvent = {
      id: uuidv4(),
      title: eventTitle,
      date: eventDate,
      description: eventDescription,
    };

    if(eventMode === "Add"){
      setEvents([...events, newEvent]);
    }else{
      const filteredEvent = events.filter(
        (event) => event.id !== eventId
      );
      setEvents([...filteredEvent, newEvent]);
    }
    setDialogueOpen(false);
    setEventId('');
    setEventTitle('');
    setEventDescription('');
    setEventDate('');
  };
  const handleDeleteEvent = () => {
    const filteredEvent = events.filter((event) => event.id !== eventId);
    setEvents(filteredEvent);
    setDialogueOpen(false);
    setEventId('');
    setEventTitle('');
    setEventDescription('');
    setEventDate('');
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: mobileDevice ? 'prev,next' : 'prev,next today',
          center: 'title',
          right: mobileDevice
            ? 'dayGridMonth,timeGridDay'
            : 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        // allDayMaintainDuration
        weekends={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
      />
      <CalenderDialogue
        open={dialogueOpen}
        handleClickOpen={handleDialogueOpen}
        handleClose={handleDialogueClose}
        title={eventTitle}
        description={eventDescription}
        handleTitleChange={handleTitleChange}
        handleDescriptionChange={handleDescriptionChange}
        handleUpdateEvent={handleUpdateEvent}
        handleDeleteEvent={handleDeleteEvent}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        eventMode={eventMode}
      />
    </>
  );
}

export default Calendar;
