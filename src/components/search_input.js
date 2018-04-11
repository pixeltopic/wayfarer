import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { fetchDirections, updateForm } from "../actions/actionTypes";
import { connect } from "react-redux";
// import { Well } from "react-bootstrap";
import { Form, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";


// TODO: Form Styling, Validation, Parameter Inputs

// why won't inline styling on form work?
// finish URL builder action creator for fetching directions
// FIX initial values - use initialValues props and enableReinitialize (DONE!)

// { input, meta, custom prop parameters, ...props } must always be a parameter.
const renderInput = ({input, meta, name, type, placeholder, label, ...props}) => {
    return (
        <div>
            <ControlLabel>{label}</ControlLabel>{' '}
            <FormControl 
                name={name}
                type={type}
                placeholder={placeholder}
                {...props} {...input}
            />
        </div>
    )
}

const renderSelect = ({ input, meta, name, selectArray, label, ...props }) => {
    return (
        <div>
            <ControlLabel>{label}</ControlLabel>{' '}
            <FormControl 
                componentClass="select"
                name={name}
                {...props} {...input}>
                {selectArray}
            </FormControl>
        </div>
    )
}

class SearchInput extends Component {
    // constructor(props) {
    //     super(props);
    //     //this.handleChange = this.handleChange.bind(this);
    //     // this.handleSubmit = this.handleSubmit.bind(this);
    // }

    onSubmit(values) {
        // uses callback from App to force-update parent (App's) state.
        console.log("Form submitted"); 
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))} inline>
                <FormGroup controlId="formInlineOrigin">
                    <Field name="originInput" type="text" placeholder="e.g. Irvine" label="Origin Input" component={renderInput} />
                </FormGroup>{' '}

                <FormGroup controlId="formInlineDestination">
                    <Field name="destinationInput" type="text" placeholder="e.g. Anaheim" label="Destination Input" component={renderInput} />
                </FormGroup>{' '}

                <Button type="submit">Find Directions</Button>
            </Form>
        );

    }
}

function validate(values) {
    const errors = {};
    return errors;
}

function mapStateToProps(state) {
    return {
        initialValues: {originInput: "Irvine"},
        formContent: state.formContent
    };
}

export default connect(mapStateToProps, { fetchDirections, updateForm })(
    reduxForm({ 
        validate: validate, 
        form: "SearchInputForm",
        enableReinitialize : true
    })(SearchInput)
);





/*
class SearchInput extends Component {
    renderInput(field) {
        // renders origin and destination text input fields
        return (
            <div>
                <input type="text" className="form-control" placeholder={field.placeholder} {...field.input}/>
            </div>
        );
    }
    createSelectArray(...choices) {
        // returns an arr of select JSX, used as a prop for renderSelect method
        let key = 0;
        return choices.map(
            choice => {
                const displayText = choice;
                choice.toLowerCase() === "no" ? choice = "False" : {};
                choice.toLowerCase() === "yes" ? choice = "True" : {};
                return <option key={key++} value={choice.toLowerCase()}>{displayText}</option>
            }
        );
    }
    renderSelect(field) {
        // renders drop down menu
        // console.log("Select Field", field);
        return (
            <div>
                <label>{field.label}</label>
                <select className="form-control custom-select" value={field.value} {...field.input}>
                    {field.selectArray}
                </select>
            </div>
        );
    }

    renderCheck(field) {
        return (
            <div className="form-check form-check-inline" {...field.input}>
                <input className="form-check-input" type="checkbox" id={field.id_val} value={field.label.toLowerCase()} />
                <label className="form-check-label" htmlFor={field.id_val}>{field.label}</label>
            </div>
        );
    }

    onSubmit(values) {
        this.props.updateForm(values);
        // this.props.fetchDirections(values.origin, values.destination);
        console.log(values);
        console.log(this.props.formContent);
    }

    render() {
        const travel_array = this.createSelectArray("Driving", "Bicycling", "Walking", "Transit");
        const alt_array = this.createSelectArray("No", "Yes");
        const unit_array = this.createSelectArray("Imperial", "Metric");

        const { handleSubmit } = this.props;
        return (
            <Well>
            <form className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <Field name="origin" placeholder="Enter Origin" component={this.renderInput} />
                <Field name="destination" placeholder="Enter Destination" component={this.renderInput} />
                
                <Field name="travelmode" label="Travel Method "
                selectArray={travel_array} component={this.renderSelect} />

                <Field name="alternativeroute" label="Request Alternative Routes "
                selectArray={alt_array} component={this.renderSelect} />

                <Field name="unit" label="Unit Display "
                selectArray={unit_array} component={this.renderSelect} />
                
                <label>Features to avoid on routes</label>
                <Field name="avoid_tolls" label="Tolls" id_val="tolls" component={this.renderCheck} />
                <Field name="avoid_highways" label="Highways" id_val="highways" component={this.renderCheck} />
                <Field name="avoid_ferries" label="Ferries" id_val="ferries" component={this.renderCheck} />
                <Field name="avoid_indoor" label="Indoor" id_val="indoor" component={this.renderCheck} />

                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            </Well>
        );

    }
}

function validate(values) {
    const errors = {};

    if (!values.origin) {
        errors.origin = "Enter a valid origin!"
    }

    if (!values.destination) {
        errors.destination = "Enter a valid destination!";
    }


    return errors;
}

// reduxForm does not have props.initialValues available, 
// because it first connects and then add reduxForm, 
// if move connect around the reduxForm, then it should work

function mapStateToProps(state) {
    return {
        initialValues: {alternativeroute: "false", unit: "imperial", travelmode: "driving"},
        formContent: state.formContent
    };
}

export default connect(mapStateToProps, { fetchDirections, updateForm })(
    reduxForm({ 
        validate: validate, 
        form: "SearchInputForm",
        enableReinitialize : true
    })(SearchInput)
);
*/

// function mapStateToProps(state) {
//     return {formContent: state.formContent};
// }

// export default reduxForm({ 
//     validate: validate, 
//     form: "SearchInputForm",
// })(
//     connect(mapStateToProps, { fetchDirections, updateForm })(SearchInput)
// );