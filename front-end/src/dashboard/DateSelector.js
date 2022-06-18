import React, { useEffect, useState } from "react";
import {previous, next, today} from "../utils/date-time";

function DateSelector({date, setDate}) {

    return (
        <div class="card">
        <div class="card-header">
            Select New Date
        </div>
        <div class="card-body">
        <div>{date}</div>
        <button class="btn btn-primary" onClick={()=>{setDate(previous(date))}}>Previous</button>
        <button class="btn btn-primary" onClick={()=>{setDate(today())}}>Today</button>
        <button class="btn btn-primary" onClick={()=>{setDate(next(date))}}>Next</button>
        </div>
        </div>
    )
}

export default DateSelector;
