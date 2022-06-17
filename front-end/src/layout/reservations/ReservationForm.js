import React,{useState} from "react";

function ReservationForm({changeHandler, submitFormHandler, ReservationForm}) {
    return (
        <div>
            <h1>New Reservation</h1>
            
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
                    />
                </div>

                <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}


export default ReservationForm;