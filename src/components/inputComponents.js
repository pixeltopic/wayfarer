import React from "react";
import { ControlLabel, FormControl, Checkbox, FormGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

// { input, meta, custom prop parameters, ...props } must always be a parameter.
// ...props preserves any leftover properties that would be lost in the destructuring
export const renderInput = ({ input, meta, name, type, placeholder, label, ...props }) => {
    // renders text input field and combines redux-form and react-bootstrap
    return (
        <div>
            <ControlLabel>{label}</ControlLabel>{' '}
            <FormControl 
                name={name}
                type={type}
                placeholder={placeholder}
                {...props} {...input}
            />
            <div className="text-help">
                { meta.touched ? meta.error : "" }
            </div>
        </div>
    );
}

export const typeaheadInput = ({ input, meta, name, type, placeholder, autosuggestArr, label, ...props }) => {
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
}

export const renderSelect = ({ input, meta, name, selectArray, label, ...props }) => {
    // renders select (dropdown) field and combines redux-form and react-bootstrap
    return (
        <div>
            <ControlLabel>{label}</ControlLabel>{' '}
            <FormControl 
                componentClass="select"
                name={name}
                {...props} {...input}>
                {selectArray}
            </FormControl>
            <div className="text-help">
                { meta.touched ? meta.error : "" }
            </div>
        </div>
    );
}

export const ynSelect = ({ input, meta, name, label, ...props }) => {
    // renders select (dropdown) field with true/false options and combines redux-form and react-bootstrap
    return (
        <div>
            <ControlLabel>{label}</ControlLabel>{' '}
            <FormControl 
                componentClass="select"
                name={name}
                {...props} {...input}>
                <option key="0" value="false">No</option>
                <option key="1" value="true">Yes</option>
            </FormControl>
        </div>
    );
}

export const checkBox = ({ input, meta, name, label, ...props }) => {
    // renders a single checkbox and combines redux-form and react-bootstrap
    return <Checkbox {...props} {...input} inline>{label}</Checkbox>
        
}

export const createSelectArray = (...arr) => {
    // dynamically initializes an array for Select dropdown given list of str.
    // Result must be passed into renderSelect via the selectArray props.
    return arr.map(
        (element) => {
            return <option key={element} value={element.toLowerCase()}>{element}</option>
        }
    );
}