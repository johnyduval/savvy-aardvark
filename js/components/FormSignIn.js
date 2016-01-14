import React from 'react';
import {Link} from 'react-router';
import Formsy from 'formsy-react';

import Parse from 'parse'
Parse.initialize("xMN2SDWbUpH0Tius0RAscb5Ia65CGOD7U1qKtAxH", "wlqxDznzkziAQB2hNhMFu5VKXvwKskjDonIhlSNn");


import FormInput from './FormInput';

var SignIn = React.createClass({
    getInitialState: function () {
        return {
            canSubmit: false
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
        var that = this;
        Parse.User
            .logIn(model.email, model.password, {
                success: function (user) {
                },
                error: function (user, error) {
                    console.log("Sign up error: " + error.message);
                }
            }).then(function () {
                that.props.history.pushState(null, '/search');
            }
        );
    },
    render: function () {
        return (
            <div className="main">
                <h1 className="main__title">Sign In</h1>
                <Formsy.Form
                    className="main__panel"
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}>
                    <div className="field">
                        <label>Enter your email</label>
                        <FormInput
                            className="input"
                            name="email"
                            title="Email"
                            validations="isEmail"
                            validationError="This is not a valid email"
                            required/>
                    </div>
                    <div className="field">
                        <label>Enter Password</label>
                        <FormInput
                            name="password"
                            title="Password"
                            type="password"

                            validationError="This is not a valid password"
                            required/>
                    </div>
                    <button
                        className="submit-btn"
                        type="submit"
                        disabled={!this.state.canSubmit}>
                        Sign In!
                    </button>
                    <p id="registered">Want an Account? <Link to="/signup">Sign Up!</Link></p>
                </Formsy.Form>
            </div>
        );
    }
});

export default SignIn;