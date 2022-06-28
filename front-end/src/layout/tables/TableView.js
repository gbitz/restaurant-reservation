import React from "react";

function TableView({tables}) {
    const tablesList = tables.map((table) => {
        return (
            <div>{table.table_name}</div>
        )
    })
    return (
        <div>
            {tablesList}
        </div>
    )

}

export default TableView;