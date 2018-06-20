import React from "react";
import { Table } from "react-bootstrap";

export default props => {
    // given weekday_text info from google places API, display days open on table.
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {props.weekdayText.map(
                    (str, index) => {
                        return (<tr key={index}>
                            <td>{str.substr(0,str.indexOf(" "))}</td>
                            <td>{str.substr(str.indexOf(" ")+1)}</td>
                        </tr>);
                    }
                )}
            </tbody>
        </Table>
    );
}