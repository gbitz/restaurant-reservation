import React, { useEffect, useState,  } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import queryString from "query-string"
import DateSelector from "./DateSelector";
import useQuery from "../utils/useQuery"
import {useHistory} from "react-router-dom"
import ReservationView from "../layout/reservations/ReservationView";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();
  const history = useHistory();
  
  if (query) {
    setDate(query.get("date"))
  } 
  useEffect(loadDashboard, [date]);

  

  function loadDashboard() {
    
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DateSelector date={date} setDate={setDate} history={history} />
      <ReservationView reservations={reservations} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
