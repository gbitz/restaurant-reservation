import React, {useState} from "react";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../../utils/api";
import {formatAsTime, formatAsDate} from "../../utils/date-time";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

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
    const [error, setError] = useState(null)
    const history = useHistory();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const abortController = new AbortController();
      const newReservation = {
        ...reservationForm
      }
      try {
        const response = await createReservation(newReservation, abortController.signal);
        console.log("Success: " + response)
        setReservationForm({...initialReservationValues});
        history.push(`/dashboard?date=${newReservation.reservation_date}`)
      } catch (error) {
        if (error.name !== "AbortError") {setError(error)}
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
        ...(type === "date" && name === "reservation_date") && {[name]: formatAsDate(value)},
        ...(type === "time" && name === "reservation_time") && {[name]: formatAsTime(value)},
        ...(type === "text" || type === "tel") && {[name]: value},
      });
    }

    const cancelHandler = async (event) => {
      setReservationForm({...initialReservationValues})
      history.goBack();
    }
    
    return(
        <div>
          <div>
            <h1>New Reservation</h1>
            <ReservationForm cancelHandler={cancelHandler} changeHandler={handleChange} submitFormHandler={handleSubmit} reservationDefaultValues={reservationForm} />
          </div>
          <div>
            <ErrorAlert error={error} />
          </div>
        </div>
    )
}

export default NewReservation

