import React from "react";
import {Link} from "react-router-dom"

function ReservationView({reservations}) {
    const reservationList = reservations.map((reservation, index) => {
        if (reservation.status !== "finished") {
            return (
                <tr key={reservation.reservation_id}>
                    <th scope="row">{reservation.reservation_id}</th>
                    <td>{reservation.first_name}</td>   
                    <td>{reservation.last_name}</td>
                    <td>{reservation.mobile_number}</td>
                    <td>{reservation.people}</td>
                    <td>{reservation.reservation_date}</td>
                    <td>{reservation.reservation_time}</td>
                    <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                    <td>
                        {
                            reservation.status === "booked" ? (
                            <Link  className="btn btn-primary" to={`/reservations/${reservation.reservation_id}/seat`}>
                                Seat
                            </Link>
                            
                            )
                            :
                            null                        
                        }
                    </td>
                </tr>
            )
        }

    });
    return(
        <div>
            <table className="table table-striped">
                
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Party Size</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Find Table</th>
                    </tr>
                </thead>

                <tbody>
                 {reservationList}
                </tbody>

            </table>
        </div>
    )
}

export default ReservationView;