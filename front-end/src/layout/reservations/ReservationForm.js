import React from "react";

function ReservationForm({cancelHandler, changeHandler, submitFormHandler, reservationDefaultValues}) {
    return (
        <div>
            
            <form className="d-flex flex-column container fluid justify-content-center col-4" onSubmit={submitFormHandler}>
                <div className="form-group d-flex flex-column">
                <label>
                    <h5>First Name</h5>
                
                <input
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    type="text"
                    onChange={changeHandler}
                    placeholder="First Name"
                    defaultValue={reservationDefaultValues.first_name}
                />
                </label>
                <label>
                    <h5>Last Name</h5>    
                  
                <input
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    type="text"
                    onChange={changeHandler}
                    placeholder="Last Name"
                    defaultValue={reservationDefaultValues.last_name}
                />
                </label> 
                <label>
                    <h5>Mobile Number</h5>    
                  
                <input
                    className="form-control"
                    name="mobile_number"
                    id="mobile_number"
                    type="tel"
                    onChange={changeHandler}
                    placeholder="999-999-9999"
                    defaultValue={reservationDefaultValues.mobile_number}
                />
                </label> 
                <label>
                    <h5>Date of Reservation</h5>    
                
                <input
                    className="form-control"
                    name="reservation_date"
                    id="reservation_date"
                    type="date"
                    defaultValue={reservationDefaultValues.reservation_date}
                    onChange={changeHandler}
                />
                </label>   
                <label>
                    <h5>Time of Reservation</h5>    
                   
                <input
                    className="form-control"
                    name="reservation_time"
                    id="reservation_time"
                    type="time"
                    defaultValue={reservationDefaultValues.reservation_time}
                    onChange={changeHandler}
                />
                </label>
                <label>
                    <h5>Number of People</h5>    
                 
                <input
                    className="form-control"
                    name="people"
                    id="people"
                    type="number"
                    min={1}
                    placeholder={1}
                    defaultValue={reservationDefaultValues.people}
                    onChange={changeHandler}
                />
                </label>
                </div>
                <button type="button" className="btn btn-secondary m-2" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary m-2">Submit</button>
            </form>

        </div>
    )
}


export default ReservationForm;