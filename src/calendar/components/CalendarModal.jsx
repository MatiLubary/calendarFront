import { addHours } from 'date-fns/esm';
import React, { useMemo } from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/useUiStore';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const CalendarModal = () => {


    const {isDateModalOpen, closeDateModal} = useUiStore();


    const [isOpen, setIsModalOpen] = useState(true)
    const [formSubmitted, setFormSubmitted ] = useState(false);


    const [formValues, setFormValues] = useState({
      title: 'Mati',
      notes: 'asdfa',
      start: new Date(),
      end: addHours (new Date(), 2)
    })

    const titleClass = useMemo(() => {
      if (!formSubmitted) return '';

      return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid'

    }, [formValues.title, formSubmitted])

    const onInputChanged = ({target}) => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      })
    }

    const onDateChanged = (event, changing) => {
      setFormValues({
        ...formValues,
        [changing]: event
      })
    }

    const onCloseModal = () => {
      closeDateModal();
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);
        console.log(difference)


        if (isNaN(difference) || difference <=0 ) {
          console.log('this is the error')
          Swal.fire('Incorrect dates', 'Review dates inputed', 'error')
          
          return;
        }

        if (formValues.title.length <= 0) return;

        console.log(formValues);
        // TODO:
        // close modal
        // remove errors from screen
    }

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-overlay"
        closeTimeoutMS={200}
    >
    <h1>New Event</h1>
    <hr />
    <form className="container" onSubmit={onSubmit}>
      <div className="form-group mb-2">
          <label>Start time and date</label>
          <DatePicker 
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, 'start')}
            className="form-control"
            dateFormat='Pp'
            showTimeSelect
          />
      </div>
      <div className="form-group mb-2">
          <label>End time and date</label>
          <DatePicker 
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, 'end')}
            className="form-control"
            dateFormat='Pp'
            showTimeSelect
          />
      </div>
      <hr />
      <div className="form-group mb-2">
          <label>Title and Notes</label>
          <input type="text" className={`form-control ${titleClass}`} placeholder="Event title" name="title" autoComplete="off" value={formValues.title} onChange={onInputChanged}/>
          <small id="emailHelp" className="form-text text-muted">A short description</small>
      </div>
      <div className="form-group mb-2">
          <textarea type="text" className="form-control" placeholder="Notes" rows="5" name="notes" value={formValues.notes} onChange={onInputChanged}></textarea>
          <small id="emailHelp" className="form-text text-muted">Additional Info</small>
      </div>
      <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span className="ms-2">Save</span>
      </button>
    </form>

    </Modal>
  )
}
