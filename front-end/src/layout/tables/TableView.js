import React from "react";

function TableView({tables}) {
    const tablesList = tables.map((table, index) => {
        return (
            <tr key={table.tableId}>
                {/* <th scope="row">{table.table_id}</th> */}
                <td>{table.table_name}</td>   
                <td>{table.capacity}</td>
                {table.reservation_id
                    ? <td data-table-id-status={table.table_id}>Occupied</td>
                    : <td data-table-id-status={table.table_id}>Free</td>
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