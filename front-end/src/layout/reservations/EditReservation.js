import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import ErrorAlert from "../ErrorAlert"
import EditForm from "./EditForm"
import { editReservation, readReservation,} from "../../utils/api";
import {formatAsTime, formatAsDate} from "../../utils/date-time";

function EditReservation() {


    const [reservation, setReservation] = useState({});
    const [reservationId, setReservationId] = useState("")
    const params = useParams();
    const [form, setForm] = useState({});
    const history = useHistory();
    const [error, setError] =  useState(null);

    useEffect(() => {
        const reservationQueryCheck = async () => {
            setReservationId(params.reservation_id);
        }
        reservationQueryCheck();
      }, [params.reservation_id])

    useEffect(() => {
        const loadPreviousReservationValues = async () => {
            const abortController = new AbortController();
            // const reservationId = query.get("reservation_id")
            try {
                const foundReservation = await readReservation(reservationId, abortController.signal);
                
                setReservation({
                    ...foundReservation,
                    reservation_date : formatAsDate(foundReservation.reservation_date),
                    reservation_time : formatAsTime(foundReservation.reservation_time)
                    // first_name: reservation.first_name,
                    // last_name: reservation.last_name,
                    // mobile_number: reservation.mobile_number,
                    // reservation_date: reservation.reservation_date,
                    // reservation_time: reservation.reservation_time,
                    // people: reservation.people,
                })
            } catch (error) {
                if(error.name !=="AbortError") {setError(error)}
            }
            return () => {
                abortController.abort();
            };
        }
        loadPreviousReservationValues();

    }, [reservationId]);

    const submitHandler = async (event) => {
        event.preventDefault();
       
        const update = {
            ...reservation,
            ...form
        }
        const abortController = new AbortController();
        try {
            await editReservation(update, abortController.signal);
            history.push(`/dashboard?date=${update.reservation_date}`)      
        } catch (error) {
            if(error.name !=="AbortError") {setError(error)}
        }
        return () => {
            abortController.abort();
        };
    }

    const cancelHandler = async (event) => {
        history.push(`/dashboard?date=${reservation.reservation_date}`)      
    }

    const changeHandler =  ({target}) => {
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
            <ErrorAlert error={error}/>
            <EditForm cancelHandler={cancelHandler} changeHandler={changeHandler} submitFormHandler={submitHandler} reservation={reservation}/>
        </div>
    )
}

export default EditReservation;