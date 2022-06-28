import React from "react";

function TableForm({cancelHandler, changeHandler, submitFormHandler, tableForm}) {
    return (
        <div>
            <h1>Create Table</h1>
            
            <form onSubmit={submitFormHandler}>
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
                    placeholder="Table Name"
                />
                
                <label>
                    <h3>Capacity:</h3>    
                </label>   
                <input
                    className="form-control"
                    name="capacity"
                    id="capacity"
                    type="num"
                    min={1}
                    placeholder={1}
                    onChange={changeHandler}
                />
           
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}


export default TableForm;