import React from "react";

function ReservationForm({cancelHandler, changeHandler, submitFormHandler, reservationDefaultValues}) {
    return (
        <div>
            
            <form onSubmit={submitFormHandler}>
                <div className="form-group">
                <label>
                    <h3>First Name</h3>
                </label>
                <input
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    type="text"
                    onChange={changeHandler}
                    placeholder="First Name"
                    defaultValue={reservationDefaultValues.first_name}
                />
                
                <label>
                    <h3>Last Name</h3>    
                </label>   
                <input
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    type="text"
                    onChange={changeHandler}
                    placeholder="Last Name"
                    defaultValue={reservationDefaultValues.last_name}
                />
               
                <label>
                    <h3>Mobile Number</h3>    
                </label>   
                <input
                    className="form-control"
                    name="mobile_number"
                    id="mobile_number"
                    type="tel"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={changeHandler}
                    placeholder="999-999-9999"
                    defaultValue={reservationDefaultValues.mobile_number}
                />
                
                <label>
                    <h3>Date of Reservation</h3>    
                </label>   
                <input
                    className="form-control"
                    name="reservation_date"
                    id="reservation_date"
                    type="date"
                    defaultValue={reservationDefaultValues.reservation_date}
                    onChange={changeHandler}
                />

                <label>
                    <h3>Time of Reservation</h3>    
                </label>   
                <input
                    className="form-control"
                    name="reservation_time"
                    id="reservation_time"
                    type="time"
                    defaultValue={reservationDefaultValues.reservation_time}
                    onChange={changeHandler}
                />

                <label>
                    <h3>Number of People</h3>    
                </label> 
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
                
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}


export default ReservationForm;