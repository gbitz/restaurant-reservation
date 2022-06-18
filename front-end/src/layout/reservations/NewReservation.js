import React, {useState} from "react";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../../utils/api";
import {formatAsTime, formatAsDate} from "../../utils/date-time";
import {useHistory} from "react-router-dom";

function NewReservation() {
    const initialReservationValues = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 1,
    }
    const [reservationForm, setReservationForm] = useState({...initialReservationValues});
    const history = useHistory();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const abortController = new AbortController();
      const newReservation = {
        ...reservationForm
      }
      try {
        const response = await createReservation(newReservation, abortController.signal);
        setReservationForm({...initialReservationValues});
        history.push(`/dashboard?date=${newReservation.reservation_date}`)
        console.log(newReservation.reservation_date);
      } catch (error) {
        console.log(error);
      }

      return () => {
        abortController.abort();
      };
    }

    const handleChange =  ({target}) => {
      const {type, value, name} = target;

       setReservationForm({
        ...reservationForm,
        ...(type === "number") && {[name]: Number(value)},
        ...(type === "date") && {[name]: formatAsDate(value)},
        ...(type === "time") && {[name]: formatAsTime(value)},
        ...(type === "text") && {[name]: value},
      });
    }

    const cancelHandler = async (event) => {
      setReservationForm({...initialReservationValues})
      history.goBack();
    }
    return(
        <div>
          <ReservationForm cancelHandler={cancelHandler} changeHandler={handleChange} submitFormHandler={handleSubmit} reservationForm={reservationForm} />
        </div>
    )
}

export default NewReservation

