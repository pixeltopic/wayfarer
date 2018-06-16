import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { fetchDirections, updateSearchParameters, clearIncidents, clearPlaces, clearPlaceDetails } from "../actions/actionTypes";
import { connect } from "react-redux";
import { Form, FormGroup, ControlLabel, Button } from "react-bootstrap";
import { renderInput, renderSelect, ynSelect, checkBox, createSelectArray } from "./inputComponents";

// TODO: Validation, warnings for indoor selection, short hover descriptions of options?

class SearchInput extends Component {

    onSubmit(values) {
        // uses callback from App to force-update parent (App's) state.
        console.log("Form submitted"); 
        // console.log(values);
        this.props.clearIncidents();
        this.props.clearPlaces();
        this.props.clearPlaceDetails();
        this.props.updateSearchParameters(values);
        this.props.fetchDirections(values);
    }

    render() {
        const travel_array = createSelectArray("Driving", "Bicycling", "Walking", "Transit");
        const unit_array = createSelectArray("Imperial", "Metric");

        const { handleSubmit } = this.props;
        return(
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))} inline>
                <FormGroup controlId="formInlineOrigin">
                    <Field name="originInput" type="text" placeholder="e.g. Irvine" label="Origin:" component={renderInput} />
                </FormGroup>{' '}

                <FormGroup controlId="formInlineDestination">
                    <Field name="destinationInput" type="text" placeholder="e.g. Anaheim" label="Destination:" component={renderInput} />
                </FormGroup>{' '}

                <FormGroup controlId="formControlsSelect1">
                    <Field name="travelMode" selectArray={travel_array} label="Travel Mode:" component={renderSelect} />
                </FormGroup>{' '}

                <FormGroup controlId="formControlsSelect2">
                    <Field name="alternativeRoute" label="Alternative Routes:" component={ynSelect} />
                </FormGroup>{' '}

                <FormGroup controlId="formControlsSelect3">
                    <Field name="unit" selectArray={unit_array} label="Unit Display:" component={renderSelect} />
                </FormGroup>{' '}

                <FormGroup controlId="formControlsCheck">
                    <ControlLabel>Avoid these features:</ControlLabel>{' '}
                    <Field name="avoidTolls" label="Tolls" component={checkBox} />
                    <Field name="avoidHighways" label="Highways" component={checkBox} />
                    <Field name="avoidFerries" label="Ferries" component={checkBox} />
                    <Field name="avoidIndoor" label="Indoor" component={checkBox} />
                </FormGroup>

                {'  '}<Button type="submit">Search</Button>
            </Form>
        );

    }
}

function validate(values) {
    const errors = {};

    if (!values.originInput) {
        errors.originInput = "Enter a valid origin.";
    }

    if (!values.destinationInput) {
        errors.destinationInput = "Enter a valid destination.";
    }

    if (values.travelMode !== "walking" && values.avoidIndoor === true) {
        errors.travelMode = "You can only avoid indoor routes if you are walking.";
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        initialValues: { travelMode: "driving", alternativeRoute: "false", unit: "imperial" }
    };
}

export default connect(mapStateToProps, { fetchDirections, clearIncidents, updateSearchParameters, clearPlaces, clearPlaceDetails })(
    reduxForm({ 
        validate: validate, 
        form: "SearchInputForm",
        enableReinitialize : true,
        destroyOnUnmount : false
    })(SearchInput)
);