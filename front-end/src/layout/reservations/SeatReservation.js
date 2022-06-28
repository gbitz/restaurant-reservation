import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import {readReservation, listTables, seatReservation} from "../../utils/api";
import TableView from "../tables/TableView";
import SeatForm from "./SeatForm";

function SeatReservation(){
    const initialForm = {
        table_id : null,
        table_name : "",
    }
    const [tables, setTables] = useState([]);
    const {reservation_id} = useParams();
    const [error, setError] = useState(null);
    const [reservation, setReservation] = useState({});
    const [form, setForm] = useState({...initialForm})
    const history = useHistory();


    useEffect(() => {
        const abortController = new AbortController();
        async function loadData() {
            try {
                const reservationResponse = await readReservation(reservation_id, abortController.signal);
                const tablesResponse = await listTables();
                setReservation(reservationResponse);
                setTables(tablesResponse)
            } catch (error) {
                if (error.name !== "AbortError") {setError(error)}
            }
        }
        loadData();
        return () => {
            abortController.abort();
        }; 
    }, [reservation_id])

    const cancelHandler = async (event) => {
        setForm({...initialForm});
        history.goBack();
    }

    const changeHandler = ({target}) => {
        const {value,name} = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const table_id = Number(form.table_id);
        const {reservation_id} = reservation;
        // console.log(Number(table_id))
        // console.log(reservation_id)
        try {
            const response = await seatReservation(reservation_id, table_id, abortController.signal)
            console.log("Success: " + response);
            setForm({...initialForm})
            history.push("/dashboard");
        } catch (error) {
            if(error.name !=="AbortError") {setError(error)}
        }
        return () => {
            abortController.abort();
        };
    }
    


    console.log(reservation)
    return(
        <div>
            <ErrorAlert error={error}/>
            <SeatForm tables={tables} form={form} changeHandler={changeHandler} cancelHandler={cancelHandler} submitHandler={submitHandler} />
            <TableView tables={tables}/>
        </div>
    )
}

export default SeatReservation