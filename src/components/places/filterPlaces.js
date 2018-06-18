import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, FormGroup } from "react-bootstrap";
import { typeaheadInput } from "../common/inputComponents";

class FilterPlaces extends Component {
    render() {
        const autosuggestArr = this.props.placesData.results ? this.props.placesData.results.map(place => place.name) : [];
        let unique = [...new Set(autosuggestArr)];
        return (
            <Form inline>
                <FormGroup controlId="formInlineType">
                    <Field name="filterInput" type="text" placeholder="e.g. Snow Monster" autosuggestArr={unique} label="Filter Locations:" component={typeaheadInput} />
                </FormGroup>{' '}
            </Form>
        );
    }
}

function validate(values, props) {
    let errors = {};
    const lowerCaseNames = props.placesData.results.map(place => place.name.toString().toLowerCase());
    if (values.filterInput && !lowerCaseNames.includes(values.filterInput.toString().toLowerCase())) {
        errors.filterInput = "Place not found";
    }
    return errors;
}

function mapStateToProps(state) {
    return { placesData: state.placesData }
}

export default connect(mapStateToProps)(
    reduxForm({ 
        validate,
        form: "FilterPlacesForm",
    })(FilterPlaces)
);