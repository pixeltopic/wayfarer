import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { fetchDirections, updateForm } from "../actions/actionTypes";
import { connect } from "react-redux";
import { Well } from "react-bootstrap";


// TODO: Form Styling, Validation, Parameter Inputs ( checlist needs fixing )
// FIX initial values - use initialValues props and enableReinitialize


class SearchInput extends Component {
    // componentWillMount() {
    //     const data = {
    //         travelmode: "driving",
    //         alternativeroute: "false", 
    //         unit: "imperial", 
    //     };
    //     this.props.updateForm(data);
    // }

    renderInput(field) {
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
                choice.toLowerCase() === "no" ? choice = "False" : {};
                choice.toLowerCase() === "yes" ? choice = "True" : {};
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
                <select className="form-control custom-select" value={field.value} {...field.input}>
                    {field.selectArray}
                </select>
            </div>
        );
    }

    createCheckArray(...checkboxes) {
        let key = 0;
        return checkboxes.map(checkbox => {
            return (
                <div className="form-check form-check-inline" key={key++}>
                    <input className="form-check-input" type="checkbox" id={`inlineCheckbox${key}`} value={checkbox.toLowerCase()} />
                    <label className="form-check-label" htmlFor={`inlineCheckbox${key}`}>{checkbox}</label>
                </div>
            );
        });
    }

    renderChecklist(field) {
        return (
            <div {...field.input}>
                <label>{field.label}</label>
                {field.checkArray}
            </div>
        );
    }
    /*
    const avoid_array = this.createCheckArray("Tolls", "Highways", "Ferries", "Indoor");
<Field name="avoid" label="Select features to avoid on routes." 
checkArray={avoid_array} component={this.renderChecklist} />
    */

    onSubmit(values) {
        this.props.updateForm(values);
        this.props.fetchDirections(values.origin, values.destination);
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

                <Field name="travelmode" label="How would you like to travel by?"
                selectArray={travel_array} component={this.renderSelect} />

                <Field name="alternativeroute" label="Do you want alternative routes?"
                selectArray={alt_array} component={this.renderSelect} />

                <Field name="unit" label="Display results in Imperial or Metric units?"
                selectArray={unit_array} component={this.renderSelect} />

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


// function mapStateToProps(state) {
//     return {formContent: state.formContent};
// }

// export default reduxForm({ 
//     validate: validate, 
//     form: "SearchInputForm",
// })(
//     connect(mapStateToProps, { fetchDirections, updateForm })(SearchInput)
// );