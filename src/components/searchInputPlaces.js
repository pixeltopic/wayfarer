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

// TODO: Validation - radiusInput max/min value, initialvalues, required inputs...
// on componentdidmount, if place API is empty, make a call and autosuggest keywords too...

class SearchInputPlaces extends Component {

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const priceLevels = createSelectArray("Free", "Inexpensive", "Moderate", "Expensive", "Very Expsneive");
        // note: price levels need to be converted to its corresponding number in the action creator
        const autosuggestArr = ["cafe", "restaurant", "school", "airport"];
        // const unit_array = createSelectArray("Imperial", "Metric");

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
                    <Field name="radiusInput" type="number" placeholder="e.g. 30" label="Max Distance Away:" component={renderInput} />
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

const mapStateToProps = state => {
    return {};
}

export default connect(mapStateToProps)(
    reduxForm({ 
        form: "SearchInputPlacesForm",
    })(SearchInputPlaces)
);