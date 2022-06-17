import React, {useState} from "react";
import Layout from "../Layout";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../../utils/api";
import {formatAsTime, formatAsDate} from "../../utils/date-time";


function NewReservation() {
    const initialReservationValues = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 0,
    }
    const [reservationForm, setReservationForm] = useState({...initialReservationValues});
    const history = useHistory();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const abortController = new AbortController;
      const newReservation = {
        ...reservationForm,
        people: Number(reservationForm.people),
        reservation_date: formatAsDate(reservationForm.reservation_date),
        reservation_time: formatAsTime(reservationForm.reservation_time),
      }

      try {
        const response = await createReservation(newReservation, abortController.signal);

      } catch (error) {
        
      }

      console.log("Submitted:", reservationForm);
      setFormData({...initialValues})
    }

    const handleChange = ({target}) => {
      const value = target.value;
      setFormData({
        ...formData,
        [target.name]: value,
      })
    }

    return(
        <div>
          <ReservationForm changeHandler={handleChange} submitFormHandler={handleSubmit} reservationForm={reservationForm} />
        </div>
    )
}

export default NewReservation

