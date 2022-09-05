import React from 'react'
import { Navbar } from '../components/Navbar'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore, useCalendarStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

const events = []


export const CalendaerPage = () => {

  const {openDateModal} = useUiStore();
  const {events, setActiveEvent} = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: 'red',
      borderRadius: '0px',
      opacity: 0.8,
      color: '#fff'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)
  }




  return (
    <>
      <Navbar />



      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter = {eventStyleGetter}
        components = {{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
    />

    <CalendarModal />
    <FabAddNew />
    <FabDelete />

    </>
  )
}
