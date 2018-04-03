import React, { Component } from "react";
import { connect } from "react-redux";
// import _ from "lodash";
import { fetchDirections } from "../actions/actionTypes";

// This component displays the STEPS from origin to destination.
class ShowDirections extends Component {
    componentDidMount() {
        // this.props.fetchDirections();
    }

    render() {
        // console.log(this.props.googleData);
        return <div />
    }
}

function mapStateToProps(state) {
    return { googleData: state.googleData };
}

// second parameter of connect is mapDispatchToProps
export default connect(mapStateToProps, { fetchDirections: fetchDirections})(ShowDirections);