import React from 'react';
import {Link} from 'react-router';

var UserHistory = React.createClass({
    render() {
        return (
            <div className="main">
                <h1>History</h1>
                <div className="main__panel">
                    <table className="history">
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Result</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <Link to="/">
                                    Nutella sdfefsd sefrsv sdf sdfwef sdfwe fsdf se
                                </Link>
                            </td>
                            <td>12/12/1212</td>
                            <td><i className="fa fa-times-circle"></i></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
});

export default UserHistory;