import React from "react"

function SeatForm({tables, changeHandler, cancelHandler, submitHandler, form}){

    const tablesMenu = tables.map((table)=> {
        return(
            <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
            </option>
        )
    })

    return (
        <form onSubmit={submitHandler}>
            <div className="formGroup">
                <label htmlFor="table_id">Select Table</label>
                <select className="form-control" name="table_id" onChange={changeHandler}>
                    <option>Choose a table...</option>
                    {tablesMenu}
                </select>
            </div>
            <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default SeatForm