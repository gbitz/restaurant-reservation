import React from "react";
import ErrorAlert from "../ErrorAlert";
function TableView({tables, setError}) {

    async function handleFinish(table_id) {
        const abortController = new AbortController();

        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            try {
                // await finishReservation(table);
            } catch (error) {
                if (error.name !== "AbortError") {setError(error)}
            }
            return () => {
                abortController.abort();
              };
        }
    }
    

    const tablesList = tables.map((table, index) => {
        return (
            <tr key={table.table_id}>
                {/* <th scope="row">{table.table_id}</th> */}
                <td>{table.table_name}</td>   
                <td>{table.capacity}</td>
                {table.reservation_id
                    ? <td data-table-id-status={table.table_id}>Occupied</td>
                    : <td data-table-id-status={table.table_id}>Free</td>
                }
                {table.reservation_id
                    ? <td><button data-table-id-status={table.table_id}  className="btn btn-danger" onClick={()=>handleFinish(table.table_id)}>Finish</button></td>
                    : <td>Add Reservation</td>
                }
            </tr>
        )
    })
    return (
        <div>
            <table className="table table-striped">
                
                <thead>
                    <tr>
                        {/* <th scope="col">Table ID</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>

                <tbody>
                 {tablesList}
                </tbody>

            </table>
        </div>
    )

}

export default TableView;