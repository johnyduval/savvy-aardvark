import React from 'react';
import request from 'superagent';
import {Link} from 'react-router';

import Formsy from 'formsy-react';
import FormInput from './FormInput';

import Parse from 'parse'
Parse.initialize("xMN2SDWbUpH0Tius0RAscb5Ia65CGOD7U1qKtAxH", "wlqxDznzkziAQB2hNhMFu5VKXvwKskjDonIhlSNn");

var Search = React.createClass({
    getInitialState() {
        return {
            canSubmit: false,
        }
    },
    enableButton: function () {
        this.setState({
            canSubmit: true
        });
    },
    disableButton: function () {
        this.setState({
            canSubmit: false
        });
    },
    submit: function (model) {
        event.preventDefault();
        this.props.history.pushState(null, '/search-result/'+ model.searchInput);

    },
    render: function () {
        return (
            <div className="main">
                <h1>Search</h1>
                <Formsy.Form
                    className="main__panel"
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}>

                    <div className="field searchBar">
                        <label>Diet: {Parse.User.current().get("diet")}</label>
                        <FormInput
                            name="searchInput"
                            title="Search"
                            required/>
                    </div>
                    <button
                        className="submit-btn searchSubmit"
                        type="submit"
                        disabled={!this.state.canSubmit}>
                        Go!
                    </button>
                </Formsy.Form>

                <div className="main__panel">
                    <p>Product: {this.state.product_name}</p>
                    <p>Food Category: {this.state.food_category}</p>
                    <p>Ingredients: {this.state.ingredients}</p>
                    <p>Allergens: {this.state.allergens}</p>
                </div>
            </div>
        )
    }
});

export default Search;