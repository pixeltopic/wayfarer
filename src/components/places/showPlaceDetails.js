import React, { Component } from "react";
import { fetchPlaceDetails, fetchPlacePhotos } from "../../actions/actionTypes";
import { connect } from "react-redux";
import _ from "lodash";
import { Panel, Button, Alert, Carousel } from "react-bootstrap";
// import { Link } from "react-router-dom";

class ShowPlaceDetails extends Component {

    componentDidUpdate() {
        // console.log("Pass");
        // if (this.props.placeDetails.result && this.props.placeDetails.result.photos)
        //     console.log("PhotoArr", this.props.placeDetails.result.photos[0].photo_reference);
        if (this.props.placeDetails.result && this.props.placeDetails.result.photos && _.isEmpty(this.props.placePhotos)) {
        // console.log("Result:",this.props.placeDetails);
            // this.props.fetchPlacePhotos(this.props.placeDetails.result.photos[0].photo_reference);
            // this.props.placeDetails.result.photos.map((photo) => this.props.fetchPlacePhotos(photo.photo_reference));
            this.props.fetchPlacePhotos(this.props.placeDetails.result.photos);
        }
    }

    generateCarousel(binaryImageObj) {
        // given a NON-EMPTY object of binary images from this.props.placePhotos, generate Carousel
        let key = 0;
        // console.log("trying to generate...");
        // console.log(binaryImageObj);

        const imgStyle = {
            maxHeight: "300px",
            margin: "auto"
        }
        return (<Carousel> 
            {_.map(binaryImageObj, binaryData => (
                <Carousel.Item key={key++}>
                    <img style={imgStyle} alt="place_pic" src={binaryData}/>
                </Carousel.Item>
            ))} 
            </Carousel>);

    }

    render() {
        if (_.isEmpty(this.props.placeDetails)) { // || (this.props.placeDetails.result.photos&&_isEmpty(this.props.placePhotos))
            return (
                <div>
                    <Alert bsStyle="warning">
                        Not loading?
                        {" "}<Button onClick={() => this.props.history.push("/")} bsStyle="warning">Go back home.</Button>
                    </Alert>
                </div>
            );
        }
        console.log(this.props.placeDetails);
        

        // style a button later to programmatically navigate back
        return(
            <div>
                <Panel>
                    Some data here
                    {" "}<Button onClick={() => this.props.history.push("/places")}>Back</Button>
                </Panel>
                { this.props.placeDetails.result && this.props.placeDetails.result.photos && !_.isEmpty(this.props.placePhotos) ? this.generateCarousel(this.props.placePhotos) : null }
            </div> 
        );
    }


}

function mapStateToProps(state) {
    return { 
        placeDetails : state.placeDetails,
        placePhotos : state.placePhotos
    }
}

export default connect(mapStateToProps, { fetchPlaceDetails, fetchPlacePhotos })(ShowPlaceDetails);