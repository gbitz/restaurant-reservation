import React, { useEffect, useState,  } from "react";
import { listReservations, listTables } from "../utils/api";
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
  // const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  // const [tablesError, setTablesError] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const [date, setDate] = useState(today());
  const [error, setError] = useState(null);

  // if (query) {
  //   setDate(query.get("date"))
  // }
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
    const abortController = new AbortController();
    async function loadTables() {
      setError(null);
      try {
        const response = await listTables(abortController.signal);
        setTables(response);
      } catch (error) {
        if (error.name !== "AbortError") {setError(error)}
      }
    }
    loadTables();
    return () => {
      abortController.abort();
    }    
  }, [])

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }
  
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={error} />
      {/* <ErrorAlert error={tablesError} /> */}
      <DateSelector date={date} setDate={setDate} history={history} />
      <ReservationView reservations={reservations} />
      <TableView tables={tables} setError={setError}/>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
