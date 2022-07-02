import React, { useEffect, useState,  } from "react";
import { listReservations, listTables, finishReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
// import queryString from "query-string"
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
            // await updateStatus(reservation_i, dstatus, abortController.signal);
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
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={error} />
      <DateSelector date={date} setDate={setDate} history={history} />
      <ReservationView reservations={reservations} />
      <TableView tables={tables} setError={setError} handleFinish={handleFinish} loadTables={loadTables}/>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
