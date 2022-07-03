import React, {useState} from "react";
import { listReservations} from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationView from "./ReservationView";

function SearchReservation() {
    const initialValues = {
        mobile_number: ""
    }

    const [form, setForm] =  useState({...initialValues});
    const [reservations, setReservations] = useState([]);
    const [searchMessage, setSearchMessage] = useState("")
    const [error, setError] = useState(null)

    const changeHandler = ({target}) => {
        const {value} = target;
        setForm({
            ...form,
            mobile_number: value
        })
    }

    const submitHandler = async (event) =>  {
        event.preventDefault()
        const abortController = new AbortController();
        setReservations([])
        const searchForm = {
            ...form
        }
        try {
            const results = await listReservations(searchForm, abortController.signal);
            if (results.length === 0) {
                setSearchMessage("No reservations found");
            } else {
                setSearchMessage("");
                setReservations(results);

            }
        } catch (error) {
            if(error.name !=="AbortError") {setError(error)}
        }
        return () => {
            abortController.abort();
        };
    }

    return (
        <div>
            <div>
                <h1>Search By Phone Number</h1>
                <ErrorAlert error={error} />
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                    <input
                        className="form-control"
                        name="mobile_number"
                        id="mobile_number"
                        type="text"
                        onChange={changeHandler}
                        placeholder="Enter a customer's phone number"
                    />
                    </div>
                    <button type="submit" className="btn btn-primary">Find</button>
                </form>
            </div>
            {reservations.length > 0 ? 
                <div> 
                    <ReservationView reservations={reservations}/>
                </div> : <div>{searchMessage}</div>
            }

        </div>
    )
}


export default SearchReservation;