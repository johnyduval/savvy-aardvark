import React from 'react';
import Formsy from 'formsy-react';


import Parse from 'parse';
Parse.initialize("xMN2SDWbUpH0Tius0RAscb5Ia65CGOD7U1qKtAxH", "wlqxDznzkziAQB2hNhMFu5VKXvwKskjDonIhlSNn");

import FormRadio from './FormRadio';
import dietSpecs from './DietSpecifications';

var FormSignUp3diet = React.createClass({
    getInitialState: function () {
        return {
            canSubmit: false,
            statusMessage: false
        }
    },
    enableButton: function () {
        this.setState({
            canSubmit: true,
            statusMessage: true
        });
    },
    disableButton: function () {
        this.setState({
            canSubmit: false,
            statusMessage: false
        });
    },
    onChangeDiet: function (values) {
        console.log(values.diet);
        this.setState({
            chosenDiet: values.diet
        })
    },

    submit: function (model) {
        event.preventDefault();
        var that = this;

        var user = Parse.User.current();

        user.set("diet", model.diet);
        if (model.diet === "Vegetarian") {
            user.set('to_avoid', dietSpecs.restrictionsVegetarian());
            user.set('to_alert', dietSpecs.warningsVegetarian());
            user.set('nutrients_to_avoid', dietSpecs.nutrientsVegetarian());
        } else if (model.diet === "Vegan") {
            user.set('to_avoid', dietSpecs.restrictionsVegan());
            user.set('to_alert', dietSpecs.warningsVegan());
            user.set('nutrients_to_avoid', dietSpecs.nutrientsVegan());
        } else if (model.diet === "Paleo") {
            user.set('to_avoid', dietSpecs.restrictionsPaleo());
            user.set('to_alert', dietSpecs.warningsPaleo());
            user.set('nutrients_to_avoid', dietSpecs.nutrientsPaleo());
        } else if (model.diet === "None") {
            user.set('to_avoid', []);
            user.set('to_alert', []);
            user.set('nutrients_to_avoid', []);
        }
        user.save({
            success: function (result) {
            },
            error: function (error) {
                console.log(error.message);
            }
        }).then(function () {
            that.props.history.pushState(null, '/ingredients');
        });
    },
    render () {
        return (
            <div className="main">
                <h1>Diet</h1>
                <div className="main__panel">
                    <p className="step">Step 3 of 4</p>
                    <Formsy.Form
                        onChange={this.onChangeDiet}

                        onValidSubmit={this.submit}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}>

                        <h2>Choose a diet</h2>
                        <p>You'll be able to add to the list in the next step...</p>

                        <FormRadio
                            required
                            name="diet"
                            items={["Vegetarian (Ovo-Lacto)", "Vegan", "Paleo", "None"]}
                        />
                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={!this.state.canSubmit}>
                            Next
                        </button>
                    </Formsy.Form>
                </div>
            </div>
        );
    }
});

export default FormSignUp3diet;