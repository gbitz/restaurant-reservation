import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import TableForm from "./TableForm";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function NewTable() {
    const intialTableValues = {
        table_name : "",
        capacity : 1
    }

    const [tableForm, setTableForm] =  useState({...intialTableValues});
    const [error, setError] =  useState(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const newTable = {
            ...tableForm
        }
        async function submitTable() {
            try {
                await createTable(newTable, abortController.signal);
                // console.log(response);
                setTableForm({...intialTableValues});
                history.push("/dashboard")
            } catch (error) {
                if(error.name !==  "AbortError") {setError(error)}
            }
        }

        submitTable();
        return()=>{
            abortController.abort();
        };
    }

    const handleChange = ({target}) => {
        const {type, value, name} = target;
        setTableForm({
            ...tableForm,
            ...(type === "number") && {[name]: Number(value)},
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
            <div>
                <ErrorAlert error={error}/>
            </div>
        </div>
    )
}

export default NewTable;