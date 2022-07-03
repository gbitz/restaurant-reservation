import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import ErrorAlert from "../ErrorAlert"
import { editReservation, readReservation} from "../../utils/api";
import {formatAsTime, formatAsDate} from "../../utils/date-time";
import ReservationForm from "./ReservationForm";

function EditReservation() {

    const [reservation, setReservation] = useState({});
    const {reservation_id} = useParams();
    const [form, setForm] = useState({});
    const history = useHistory();
    const [error, setError] =  useState(null);

    useEffect(() => {
        const loadPreviousReservationValues = async () => {
            const abortController = new AbortController();
            try {
                const foundReservation = await readReservation(reservation_id, abortController.signal);
                setReservation({
                    ...foundReservation,
                    reservation_date : formatAsDate(foundReservation.reservation_date),
                    reservation_time : formatAsTime(foundReservation.reservation_time),
                    people: Number(foundReservation.people)
                })
            } catch (error) {
                if(error.name !=="AbortError") {setError(error)}
            }
            return () => {
                abortController.abort();
            };
        }
        loadPreviousReservationValues();
    }, [reservation_id]);

    async function submitHandler(event)  {
        event.preventDefault();
        const update = {
            ...reservation,
            ...form
        }
        const abortController = new AbortController();
        try {
            await editReservation(update, abortController.signal);
            history.push(`/dashboard?date=${formatAsDate(update.reservation_date)}`);
        } catch (error) {
            if(error.name !=="AbortError") {setError(error)}
        }

        return () => {
            abortController.abort();
        };
    }

    const cancelHandler = (event) => {
        event.preventDefault()
        history.goBack()
    }

    const changeHandler = ({target}) => {
        const {type, value, name} = target;
        if (value) {
            setForm({
                ...form,
                ...(type === "number") && {[name]: Number(value)},
                ...(type === "date" && name === "reservation_date") && {[name]: formatAsDate(value)},
                ...(type === "time" && name === "reservation_time") && {[name]: formatAsTime(value)},
                ...(type === "text" || type === "tel") && {[name]: value},
              });
        }
      }

    return (
        <div>
            <h1>Edit Reservation</h1>
            <ErrorAlert error={error}/>
            <ReservationForm cancelHandler={cancelHandler} changeHandler={changeHandler} submitFormHandler={submitHandler} reservationDefaultValues={reservation} />
        </div>
    )
}

export default EditReservation;