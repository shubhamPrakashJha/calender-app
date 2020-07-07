import React, { useState, useEffect} from 'react';
import {
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalenderDialogue from './calenderEventDialogue';
import { v4 as uuidv4 } from 'uuid';
import './calender.css';

/* Redux */
import { connect } from "react-redux";

/* Redux Actions */
import { fetchDataAction, addEvent, deleteEvent, editEvent } from "../../redux/actions/calender.action";


function Calendar(props) {
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

  const { fetchEvents } = props;
  useEffect(() => {
    const fetchEventss = async () => {
      await fetchEvents();
    };
    fetchEventss();
  }, [fetchEvents]);

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
    const clickedEvent = props.events.find(
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
    if(eventMode === "Add"){
      const newEvent = {
        id: uuidv4(),
        title: eventTitle,
        date: eventDate,
        description: eventDescription,
      };
      props.addEvent(newEvent);
    }
    if (eventMode === 'Edit') {
      const currentEvent = {
        id: eventId,
        title: eventTitle,
        date: eventDate,
        description: eventDescription,
      };
      props.editEvent(currentEvent);
    }
    setDialogueOpen(false);
    setEventId('');
    setEventTitle('');
    setEventDescription('');
    setEventDate('');
  };
  const handleDeleteEvent = () => {
    props.deleteEvent(eventId);
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
        events={props.events}
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

/* Map State And Action-Dispatcher to components Props*/
const mapStateToProps = state => ({
	events: state.fetchDataReducer.events
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchDataAction()),
  addEvent: (newEvent) => dispatch(addEvent(newEvent)),
  deleteEvent: (eventObj) => dispatch(deleteEvent(eventObj)),
  editEvent: (eventObj) => dispatch(editEvent(eventObj)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
