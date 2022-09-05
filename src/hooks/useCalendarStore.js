
import { useSelector,useDispatch } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
      // TODO: hit backend

      if (calendarEvent._id) {
        //updatng event
        dispatch(onUpdateEvent({...calendarEvent}))
      } else {
        //creating new event
        dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
      }

    }

    const startDeletingEvent = () => {
      // TODO: hit backend
      dispatch(onDeleteEvent());
    }

  return {
    // Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  }
}
