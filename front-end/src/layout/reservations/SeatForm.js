import React from "react"

function SeatForm({tables, reservation, changeHandler, cancelHandler, submitHandler}){
    const tablesMenu = tables.map((table)=> {
        const invalidCapacity = Number(table.capacity) < Number(reservation.people)
            return(
                <option disabled={invalidCapacity} key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
            )
    })

    return (
        <form className="d-flex flex-column container fluid justify-content-center col-3" onSubmit={submitHandler}>
            <div className="form-group">
                <h1 className="h1 text-center">Select Table</h1>
                <select className="form-control" name="table_id" onChange={changeHandler}>
                    <option>Choose a table...</option>
                    {tablesMenu}
                </select>
            </div>
            <button type="submit" className="btn btn-primary m-2">Submit</button>
            <button type="button" className="btn btn-secondary m-2" onClick={cancelHandler}>Cancel</button>
        </form>
    )
}

export default SeatForm;