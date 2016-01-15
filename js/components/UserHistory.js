import React from 'react';
import {Link} from 'react-router';

var UserHistory = React.createClass({
    getInitialState() {
        return {
            results: []
        }
    },
    componentWillMount: function () {
        var that = this;

        var query = new Parse.Query('Searches');
        query.include(Parse.User.current());
        query.find({
            success: function (results) {
                that.setState({
                    results: results,
                });
            }, error: function (error) {
                console.log(error.message);
            }

        })
    },
    render() {
        return (
            <div className="main">
                <h1>History</h1>
                <div className="main__panel">
                    <h3>Past Searches</h3>
                    <ul className="history">
                        {this.state.results.map(function (eachResult) {
                            return <li>
                                <Link to={'/search-result/product/' + eachResult.get('productUPC')}>
                                    {eachResult.get('productName')}
                                </Link>
                            </li>
                        })}
                    </ul>

                </div>
            </div>
        )
    }
});

export default UserHistory;

