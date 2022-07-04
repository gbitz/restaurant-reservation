import React from "react";

function TableForm({cancelHandler, changeHandler, submitFormHandler, tableForm}) {
    return (
        <div>
            <h1 className="text-center">Create Table</h1>
            
            <form className="d-flex flex-column container fluid justify-content-center col-3" onSubmit={submitFormHandler}>
                <div className="form-group">
                <label>
                    <h3>Table Name:</h3>
                </label>
                <input
                    className="form-control"
                    name="table_name"
                    id="table_name"
                    type="text"
                    min={2}
                    onChange={changeHandler}
                    placeholder="Must be 2 Characters"
                    required
                />
                
                <label>
                    <h3>Capacity:</h3>    
                </label>   
                <input
                    className="form-control"
                    name="capacity"
                    id="capacity"
                    type="number"
                    min={1}
                    placeholder={1}
                    onChange={changeHandler}
                    required
                />
           
                </div>
                <button type="button" className="btn btn-secondary m-2" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary m-2">Submit</button>
            </form>

        </div>
    )
}


export default TableForm;