import React from 'react';
import Formsy from 'formsy-react';


import Parse from 'parse';
Parse.initialize("xMN2SDWbUpH0Tius0RAscb5Ia65CGOD7U1qKtAxH", "wlqxDznzkziAQB2hNhMFu5VKXvwKskjDonIhlSNn");

import FormSignUp4ingrAdd from './FormSignUp4ingrAdd';
import dietSpecs from './DietSpecifications';

var FormSignUp4ingr = React.createClass({
    getInitialState: function () {
        var diet = Parse.User.current().get('diet')
        return {
            canSubmit: false,
            statusMessage: false,
            diet: diet,
            ingredients: Parse.User.current().get('to_avoid'),
            dietSpecifics: dietSpecs[diet](),
            customIngredients: Parse.User.current().get('custom_avoid') || []
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
    //onChangeDiet: function (values) {
    //    this.setState({
    //        chosenDiet: values.diet
    //    })
    //},
    addIngredient: function (model) {
        event.preventDefault();
        var that = this;
        var user = Parse.User.current();

        user.addUnique('custom_avoid', model.ingredient);
        user.save({
            success: function (result) {
                that.setState({customIngredients: Parse.User.current().get('custom_avoid')})

            },
            error: function (error) {
                console.log(error.message);
            }
        });
    },
    submit: function () {
        event.preventDefault();
        this.props.history.pushState(null, '/');
    },
    render () {

        return (
            <div className="main">
                <h1>Ingredients</h1>
                <div className="main__panel">

                    <p className="step">Step 4 of 4</p>
                    <h3>{this.state.diet.toUpperCase()}</h3>
                    <br />
                    <h4>Stuff you can't eat</h4>
                    <div className="watchItems">
                        <ul>
                            {this.state.dietSpecifics.map(function (item) {
                                return <div>
                                    <li>{item}</li>
                                </div>
                            })}
                        </ul>
                    </div>
                    <h4>Additional Ingredients</h4>
                    <div className="watchItems">
                        <ul>
                            {this.state.customIngredients.map(function (item) {
                                return <div>
                                    <li>{item}</li>
                                </div>
                            })}
                        </ul>
                    </div>
                    <FormSignUp4ingrAdd addIngredient={this.addIngredient}/>

                    <button
                        className="submit-btn"
                        onClick={this.submit}
                        type="submit">
                        Next
                    </button>
                </div>
            </div>
        );
    }
});

export default FormSignUp4ingr;