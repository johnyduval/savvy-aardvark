import React from 'react';
import request from 'superagent';
import {Link} from 'react-router';

import Formsy from 'formsy-react';
import FormInput from './FormInput';

import Parse from 'parse'
Parse.initialize("xMN2SDWbUpH0Tius0RAscb5Ia65CGOD7U1qKtAxH", "wlqxDznzkziAQB2hNhMFu5VKXvwKskjDonIhlSNn");

var _ = require("underscore");

var SearchResultProduct = React.createClass({
    getInitialState() {
        return {
            isLoading: true,
            notFound: false,
            canSubmit: false,
            ingredientFound: false,
            product_name: [],
            allergens: [],
            food_category: [],
            ingredients: []
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
    componentDidMount: function () {

        var searchInputObj = this.props.params.upc;
        var that = this;

        Parse.Cloud.run('UPC', {search: searchInputObj}).then(function (response) {
            that.state.isLoading = false;

            var ProductArray = response.productsArray[0].ingredients.toLowerCase().split(" ");
            var newProductArray = ProductArray.map(function (string) {
                return string.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            })
            var ProductArray2 = response.productsArray[0].ingredients.toLowerCase().split(", ")
            var newProductArray2 = ProductArray2.map(function (string) {
                return string.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            })

            var ProductArrayMaster = newProductArray.concat(newProductArray2);
            var UserArray = Parse.User.current().get("to_avoid");

            if (_.intersection(UserArray, ProductArrayMaster).length === 0) {
                console.log(_.intersection(UserArray, ProductArrayMaster).length);
                var state = "eat"; // "eat" means you can eat it

            } else {
                var state = "noteat" // "noteat" means don't it
            }

            that.setState({
                product_name: response.productsArray[0].product_name.toLowerCase(),
                ingredients: response.productsArray[0].ingredients.toLowerCase(),
                food_category: response.productsArray[0].food_category,
                ingredientFound: state
            })

            Parse.Cloud.run("productAdditives", {search: searchInputObj}).then(function (output) {
                that.setState({
                    allergens: output.allergens.map(function (allergen) {
                        if (allergen.allergen_value > 0) {
                            return allergen.allergen_name + ', ';
                        } else {
                            console.log("excluded allergens");
                        }
                    })
                })
            })
        }, function (error) {
            console.log(error.message);
        })
    },
    render() {
        //if (this.state.isLoading) {
        //    return (
        //        <div id="verdict-wrapper">
        //            <div className="loading">
        //                <h1>
        //                    <i className="fa fa-spinner fa-pulse"></i>
        //                </h1>
        //            </div>
        //        </div>
        //    )
        //}
        if (this.state.ingredientFound === "eat") {
            return (
                <div id="verdict-wrapper">
                    <div className="verdict">
                        <h1 className="verdict__yes" title="Yes!">
                            <i className="fa fa-check-circle"></i>
                        </h1>
                    </div>

                    <div className="main">
                        <div className="main__panel productResult">
                            <h2>{this.state.product_name}</h2>
                            <h3>Ingredients</h3>
                            <p>{this.state.ingredients}</p>
                            {console.log(this.state.ingredients)}
                            <h3>Food Category</h3>
                            <p>{this.state.food_category}</p>
                            <h3>Allergens</h3>
                            <p>{this.state.allergens}</p>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.ingredientFound === "noteat") {
            return (
                <div id="verdict-wrapper">
                    <div className="verdict">
                        <h1 className="verdict__no" title="Yes!">
                            <i className="fa fa-times-circle"></i>
                        </h1>
                    </div>

                    <div className="main">
                        <h2>Results</h2>
                        <div className="main__panel">
                            <ul className="productResult">
                                <li>Product: {this.state.product_name}</li>
                                <br/>
                                <li>ingredients: {this.state.ingredients}</li>
                                <br/>
                                <li>Food Category: {this.state.food_category}</li>
                                <br/>
                                <li>Allergens: {this.state.allergens}</li>
                                <br/>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div id="verdict-wrapper">
                    <div className="verdict">
                        <h1 className="verdict__warn" title="Yes!">
                            <i className="fa fa-exclamation-circle"></i>
                        </h1>
                    </div>

                    <div className="main">
                        <h2>Results</h2>
                        <div className="main__panel">
                            <ul className="productResult">
                                <li>Product: {this.state.product_name}</li>
                                <br/>
                                <li>ingredients: {this.state.ingredients}</li>
                                <br/>
                                <li>Food Category: {this.state.food_category}</li>
                                <br/>
                                <li>Allergens: {this.state.allergens}</li>
                                <br/>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    }

});

export default SearchResultProduct;