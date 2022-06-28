import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import TableForm from "./TableForm";

function NewTable() {
    const intialTableValues = {
        table_name : "",
        capacity : 1
    }

    const [tableForm, setTableForm] =  useState({...intialTableValues});
    // const [error, setError] =  useState(null);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const newTable = {
            ...tableForm
        }

        console.log(newTable);
        return()=>{
            abortController.abort();
        };
    }

    const handleChange = ({target}) => {
        const {type, value, name} = target;
        setTableForm({
            ...tableForm,
            ...(type === "capacity") && {[name]: Number(value)},
            ...(type === "text") && {[name]: value},
        });
    }

    const cancelHandler = async (event) => {
        setTableForm({...intialTableValues})
        history.goBack();
      }


    return (
        <div>
            <div>
                <TableForm cancelHandler={cancelHandler} changeHandler={handleChange} submitFormHandler={handleSubmit} tableForm={tableForm} />
            </div>
        </div>
    )
}

export default NewTable;