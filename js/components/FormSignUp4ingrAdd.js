import React from 'react';
import Formsy from 'formsy-react';
import FormInput from './FormInput';

var FormSignUp4ingrAdd = React.createClass({
    getInitialState() {
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
    onSubmit: function (model) {
        this.myInput.setValue(null);
        this.props.addIngredient(model);
    },
    render: function () {
        return (
            <div className="main">
                <Formsy.Form
                    id="productSearch"
                    //onChange={this.onChangeDiet}
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}>

                    <div className="field searchBar">
                        <label>Anything else to add?</label>
                        <FormInput
                            ref={(ref) => this.myInput = ref}
                            placeholder="single ingredient"
                            name="ingredient"
                            title="ingredient"
                        />
                    </div>
                    <button
                        className="submit-btn searchSubmit addIngr"
                        type="submit"
                        disabled={!this.state.canSubmit}>
                        add
                    </button>
                </Formsy.Form>
            </div>
        )
    }

});

export default FormSignUp4ingrAdd;