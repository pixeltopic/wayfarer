import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import { fetchDirections } from "../actions/actionTypes";

class SearchInput extends Component {
    renderInput(field) {
        // renders origin and destination text input fields
        
        return (
            <div>
            <label>{field.label}</label>
                <input type="text" className="form-control" {...field.input}/>
            </div>
        );
    }

    renderDropDown() {
        // renders drop down menu
    }

    // render checklist/check for form

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <Field
                name="origin"
                label="Origin"
                component={this.renderInput}
                />

                <button type="submit" className="btn btn-primary">Search</button>
            </form>

        );

    }
}

function validate() {
    const errors = {};

    return errors;
}

export default reduxForm({ validate: validate, form: "SearchInputForm" })(SearchInput); // add connect later