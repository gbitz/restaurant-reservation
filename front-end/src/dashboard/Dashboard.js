import React, { useEffect, useState,  } from "react";
import { listReservations, listTables, finishReservation, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DateSelector from "./DateSelector";
import useQuery from "../utils/useQuery"
import {useHistory} from "react-router-dom"
import ReservationView from "../layout/reservations/ReservationView";
import { today } from "../utils/date-time";
import TableView from "../layout/tables/TableView"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const query = useQuery();
  const history = useHistory();
  const [date, setDate] = useState(today());
  const [error, setError] = useState(null);

  useEffect(() => {
    const dateQueryCheck = async () => {
      const dateQuery = query.get("date");
      if (dateQuery) {
        setDate(dateQuery);
      } else {
        setDate(today());
      }
    }
    dateQueryCheck();
  }, [query, date])

  useEffect(() => {
    loadTables();
  }, [])

  useEffect(loadDashboard, [date]);

  async function loadTables() {
    const abortController = new AbortController();
    setError(null);
    try {
      const response = await listTables(abortController.signal);
      setTables(response);
    } catch (error) {
      if (error.name !== "AbortError") {setError(error)}
    }
    return () => {
      abortController.abort();
    } 
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    
    return () => abortController.abort();
  }

  async function handleFinish(table_id, reservation_id) {
    const abortController = new AbortController();
        try {
          if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            await finishReservation(table_id, abortController.signal);
            await loadDashboard();
            await loadTables();
          }
        } catch (error) {
            if (error.name !== "AbortError") {setError(error)}
        }
        return () => {
            abortController.abort();
        };
  }

  async function cancelReservation(reservation_id) {
    const abortController = new AbortController();
    try {
      if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        await updateStatus(reservation_id, "cancelled", abortController.signal);
        await loadDashboard();
        await loadTables();
      }
    } catch (error) {
      if (error.name !== "AbortError") {setError(error)}
    }
    return () => {
      abortController.abort();
    };
  }
  
  return (
    <main>
      <div className="col d-flex justify-content-center">
        <h1>Reservation Scheduler</h1>
      </div>
      <div className="col d-flex justify-content-center">
        <h4>{date}</h4>
      </div>
      <div className="col d-flex justify-content-center m-2">
        <DateSelector date={date} setDate={setDate} history={history} />
      </div>
      <ErrorAlert error={error} />
      {reservations.length > 0 ? <ReservationView reservations={reservations} cancelReservation={cancelReservation} /> : <h1>No reservations Found</h1>}
      <TableView tables={tables} setError={setError} handleFinish={handleFinish} loadTables={loadTables}/>
    </main>
  );
}

export default Dashboard;
