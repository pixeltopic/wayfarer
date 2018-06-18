import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, FormGroup, Button } from "react-bootstrap";

import { fetchPlaces, clearPlaceDetails } from "../../actions/actionTypes";
import { renderInput, renderSelect, createSelectArray, typeaheadInput } from "../common/inputComponents";
import { convertPriceLevel } from "./placesLogic";

// Note: This component will always assume that this.props.directionData is not empty. showPlaces.js returns
// error messages.

const autosuggestArr = ["accounting", "airport", "amusement park", "aquarium", "art gallery",
        "atm", "bakery", "bank", "bar", "beauty salon", "bicycle store", "book store",
        "bowling alley", "bus station", "cafe", "campground", "car dealer", "car rental", "car repair", 
        "car wash", "casino", "cemetery", "church", "city hall", "clothing store", "convenience store",
        "courthouse", "dentist", "department store", "doctor", "electrician", "electronics store",
        "embassy", "fire station", "florist", "funeral home", "furniture store",
        "gas station", "gym", "hair care", "hardware store", "hospital", "jewelry store", "laundry",
        "lawyer", "library", "liquor store", "local government office",
        "locksmith", "lodging", "movie theater", "museum", "night club",
        "park", "parking", "pet store", "pharmacy", "police", "post office", "restaurant",
        "school", "shoe store", "shopping mall", "spa", "stadium", "store", "subway station", 
        "supermarket", "train station", "transit station", "veterinary care", "zoo"];

class SearchInputPlaces extends Component {

    onSubmit(values) {
        console.log(values);
        if (values.typeInput) {
            values.typeInput = values.typeInput.toString().toLowerCase().replace(/ /g,"_");
        }
        // console.log("Edited:",values);
        this.props.clearPlaceDetails();
        this.props.fetchPlaces(
            values, this.props.directionData["0"]["legs"]["0"]["end_location"], this.props.searchParameters.unit);
    }

    render() {
        const priceLevels = createSelectArray("None", "Free", "Inexpensive", "Moderate", "Expensive", "Very Expensive");
        // note: price levels need to be converted to its corresponding number in the action creator
        // const autosuggestArr = ["cafe", "restaurant", "school", "airport"];
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
                    <Field name="radiusInput" type="number" placeholder="e.g. 30" label={`Max Distance Away in ${unit === "metric" ? "km" : "mi"}:`} component={renderInput} />
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
    } else if (unit === "metric" && (values.radiusInput > 50 || values.radiusInput < 0.1)) {
        errors.radiusInput = "Distance must be positive and 50 kilometers max.";
    }
    if (convertPriceLevel(values.minPrice) > convertPriceLevel(values.maxPrice)) {
        errors.minPrice = "Min price exceeds max price.";
    } // note: if price level is equal, it will be valid but account for that in the action...

    if (values.typeInput && !autosuggestArr.includes(values.typeInput.toString().toLowerCase())) {
        errors.typeInput = "Type must be equal to an autosuggestion."
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        initialValues: { minPrice: "none", maxPrice: "none" },
        searchParameters: state.searchParameters,
        directionData: state.directionData
    };
}

export default connect(mapStateToProps, { fetchPlaces, clearPlaceDetails })(
    reduxForm({ 
        validate,
        form: "SearchInputPlacesForm",
        enableReinitialize: true
    })(SearchInputPlaces)
);