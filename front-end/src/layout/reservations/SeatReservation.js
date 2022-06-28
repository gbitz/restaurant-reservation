import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

function SeatReservation(){

    const [tables, setTables] = useState([]);
    const {reservation_id} = useParams();
    const [error, setError] = useState(null);
    const [reservation, setReservation] = useState({});

    useEffect(() => {
        async function loadData() {
            try {
                const reservationResponse = await readReservation(reservation_id, abort.signal);
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

    return(
        <div>
            <ErrorAlert error={error}/>
        </div>
    )
}

export default SeatReservation