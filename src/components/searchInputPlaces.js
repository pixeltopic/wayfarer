import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, FormGroup, Button, ControlLabel } from "react-bootstrap";
import { renderInput, renderSelect, createSelectArray } from "./inputComponents";
import { Typeahead } from "react-bootstrap-typeahead";

const typeaheadInput = ({ input, meta, name, type, placeholder, autosuggestArr, label, ...props }) => {
    // renders text input field and combines redux-form and react-bootstrap
    // input is from redux forms, but props is for react bootstrap form component
    return (
        <div>
            <ControlLabel>{label}</ControlLabel>{' '}
            <FormGroup>
                <Typeahead 
                options={autosuggestArr} 
                placeholder={placeholder}
                {...props} {...input}
                />
            </FormGroup>
        </div>
    );
    // <ControlLabel>{label}</ControlLabel>{' '}
    // <FormControl name={name} type={type} {...props} {...input} />
}

// TODO:
// on componentdidmount, if place API is empty, make a call and autosuggest keywords too...

// Note: This component will always assume that this.props.directionData is not empty. showPlaces.js returns
// error messages.
const convertPriceLevel = (level) => {
    // converts price level text to the proper number.
    switch(level.toLowerCase()) {
        case "free": return 0;
        case "inexpensive": return 1;
        case "moderate": return 2;
        case "expensive": return 3;
        default: return 4;
    }
}

class SearchInputPlaces extends Component {

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const priceLevels = createSelectArray("Free", "Inexpensive", "Moderate", "Expensive", "Very Expensive");
        // note: price levels need to be converted to its corresponding number in the action creator
        const autosuggestArr = ["cafe", "restaurant", "school", "airport"];
        // const unit_array = createSelectArray("Imperial", "Metric");
        // const unit = this.props.searchParameters.unit;
        // console.log(this.props.searchParameters);
        const unit = this.props.searchParameters.unit;
        const { handleSubmit } = this.props;
        return(
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))} inline>

                <FormGroup controlId="formInlineKeyword">
                    <Field name="keywordInput" type="text" placeholder="e.g. Starbucks" label="Keyword:" component={renderInput} />
                </FormGroup>{' '}

                <FormGroup controlId="formInlineType">
                    <Field name="typeInput" type="text" placeholder="e.g. Cafe" autosuggestArr={autosuggestArr} label="Place Type:" component={typeaheadInput} />
                </FormGroup>{' '}

                <FormGroup controlId="radiusInput">
                    <Field name="radiusInput" type="number" placeholder="e.g. 30" label={`Max Distance Away in ${unit === "metric" ? "m" : "mi"}:`} component={renderInput} />
                </FormGroup>{' '}

                <FormGroup controlId="formControlsMinPrice">
                    <Field name="minPrice" selectArray={priceLevels} label="Min Price:" component={renderSelect} />
                </FormGroup>{' '}

                <FormGroup controlId="formControlsMaxPrice">
                    <Field name="maxPrice" selectArray={priceLevels} label="Max Price:" component={renderSelect} />
                </FormGroup>{' '}

                {'  '}<Button type="submit">Search</Button>
            </Form>
        );

    }
}

const validate = (values, props) => {
    let errors = {};
    const unit = props.searchParameters.unit;
    // const unit = "imperial";

    if (!values.radiusInput) {
        errors.radiusInput = "Enter Distance to search from your destination.";
    } else if (unit === "imperial" && (values.radiusInput > 31 || values.radiusInput < 0.1)) {
        errors.radiusInput = "Distance must be positive and 31 miles max.";
    } else if (unit === "metric" && (values.radiusInput > 50000 || values.radiusInput < 0.1)) {
        errors.radiusInput = "Distance must be positive and 50,000 meters max.";
    }
    if (convertPriceLevel(values.minPrice) > convertPriceLevel(values.maxPrice)) {
        errors.minPrice = "Min price exceeds max price.";
    } // note: if price level is equal, it will be valid but account for that in the action...

    return errors;
}

function mapStateToProps(state) {
    return {
        initialValues: { minPrice: "free", maxPrice: "very expensive" },
        searchParameters: state.searchParameters
    };
}

export default connect(mapStateToProps)(
    reduxForm({ 
        validate,
        form: "SearchInputPlacesForm",
        enableReinitialize: true
    })(SearchInputPlaces)
);