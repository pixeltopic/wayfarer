import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import { fetchDirections } from "../actions/actionTypes";
import { Well } from "react-bootstrap";


// TODO: Form Styling, Validation, Parameter Inputs


class SearchInput extends Component {
    renderInput(field) {
        // console.log(field);
        // renders origin and destination text input fields
        
        return (
            <div>
                <input type="text" className="form-control" placeholder={field.placeholder} {...field.input}/>
            </div>
        );
    }

    createSelectArray(...choices) {
        let key = 0;
        return choices.map(
            choice => {
                return <option key={key++} value={choice.toLowerCase()}>{choice}</option>
            }
        );
    }

    renderSelect(field) {
        // renders drop down menu
        // console.log("Select Field", field);
        return (
            <div>
                <label>{field.label}</label>
                <select className="form-control custom-select" {...field.input}>
                    {field.selectArray}
                </select>
            </div>
        );
    }

    // render checklist/check for form

    renderChecklist() {

    }

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const travel_array = this.createSelectArray("Driving", "Bicycling", "Walking", "Transit");
        const { handleSubmit } = this.props;
        return (
            <Well>
            <form className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <Field
                name="origin"
                placeholder="Enter Origin"
                component={this.renderInput}
                />

                <Field
                name="destination"
                placeholder="Enter Destination"
                component={this.renderInput}
                />

                <Field
                name="travelmode"
                label="Enter a mode of travel:"
                selectArray={travel_array}
                component={this.renderSelect}
                />

                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            </Well>
        );

    }
}

function validate() {
    const errors = {};

    return errors;
}

export default reduxForm({ validate: validate, form: "SearchInputForm" })(SearchInput); // add connect later