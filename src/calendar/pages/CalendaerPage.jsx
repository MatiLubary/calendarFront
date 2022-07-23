import React from 'react'
import { Navbar } from '../components/Navbar'
import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns/esm'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent';





const events = [{
  title: 'random',
  notes: 'test note 123 fake',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Mati'
  }
}]


export const CalendaerPage = () => {

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



  return (
    <>
      <Navbar />



      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter = {eventStyleGetter}
        components = {{
          event: CalendarEvent
        }}
    />



    </>
  )
}
