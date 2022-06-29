import React from "react";
import {previous, next, today} from "../utils/date-time";

function DateSelector({date, history}) {

    return (
        <div className="card">
            <div className="card-header">
                Select New Date
            </div>
            <div className="card-body">
            <div>{date}</div>
            <button className="btn btn-primary" onClick={()=>{history.push(`/dashboard?date=${previous(date)}`)}}>Previous</button>
            <button className="btn btn-primary" onClick={()=>{history.push(`/dashboard?date=${today()}`)}}>Today</button>
            <button className="btn btn-primary" onClick={()=>{history.push(`/dashboard?date=${next(date)}`)}}>Next</button>
            </div>
        </div>
    )
}

export default DateSelector;
