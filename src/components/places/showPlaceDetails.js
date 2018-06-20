import React, { Component } from "react";
import { fetchPlaceDetails, fetchPlacePhotos } from "../../actions/actionTypes";
import { connect } from "react-redux";
import _ from "lodash";
import { Panel, Button, Alert, Carousel, Jumbotron, Label, Tab, Tabs, PageHeader, Badge, Breadcrumb } from "react-bootstrap";
import NavBar from "../common/navBar";
import { reconvertPriceLevel } from "./placesLogic";
import { PlacePolylineMap } from "../common/showMap";
import ReviewList from "./reviewList";
import ScheduleTable from "./scheduleTable";
import "../../style/showPlaceDetails.css";
import banner from "../../assets/place_detail_banner.gif";
// import { Link } from "react-router-dom";

const PricingLabel = props => {
    switch(props.pricing) {
        case 0: return <Label bsStyle="success">Free</Label>
        case 1: return <Label bsStyle="primary">Inexpensive</Label>
        case 2: return <Label bsStyle="info">Moderately Priced</Label>
        case 3: return <Label bsStyle="warning">Expensive</Label>
        case 4: return <Label bsStyle="danger">Very Expensive</Label>
        default: return <Label bsStyle="default">No Pricing Info</Label>
    }
}

class ShowPlaceDetails extends Component {

    componentDidUpdate() {
        if (this.props.placeDetails.result && this.props.placeDetails.result.photos && _.isEmpty(this.props.placePhotos)) {
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

        const carouselStyle = {
            backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.4), rgba(20, 35, 62, 0.4))`
        }

        return (<Carousel style={carouselStyle}> 
            {_.map(binaryImageObj, binaryData => (
                <Carousel.Item key={key++}>
                    <img style={imgStyle} alt="place_pic" src={binaryData}/>
                </Carousel.Item>
            ))} 
            </Carousel>);

    }

    generateTypeBadge(typeArray) {
        // given typeArray from this.props.placeDetails.result.types, generates an array of badges
        let key = 0;
        return typeArray.map(
            type => {
                return (
                    <div key={key++} style={{ display: "inline" }}>
                        <Badge style={{ margin: "0 1px 20px 1px" }}>{type.toString().replace(/_/g, " ")}</Badge>
                    </div>
                );
            }
        );
    }

    generateRouteTabs(directions, placeLocation) {
        // given this.props.directionData and a { lat, lng } object, generates tabs for each route and a map.
        let key=-1;
        const tabContents = _.map(directions, (route) => {
            key++;
            return (
                <Tab key={key} eventKey={key} title={`Route ${key+1}`}>
                    <PlacePolylineMap overviewPolyline={route.overview_polyline.points} routeBounds={route.bounds} placeLocation={placeLocation}/>
                </Tab>
            );
        });
        return (
            <Tabs defaultActiveKey={0} id="PlaceTabs">
                {tabContents}
             </Tabs>
        );
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
        
        const { name, rating, formatted_address, opening_hours, price_level, types, website, geometry } = this.props.placeDetails.result;
        // style a button later to programmatically navigate back
        const jumboStyle = {
            backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.4), rgba(20, 35, 62, 0.4)), url(${banner})`,
            backgroundPosition: "50% 75%",
            backgroundSize: "cover",
            textAlign: "center",
            boxShadow: "3px 3px 3px 1px rgba(0, 0, 0, .6)"
        }

        const textStyle = {
            color: "white"
        }

        return(
            <div>
                {/*<Panel>
                    {" "}<Button onClick={() => this.props.history.push("/places")}>Back</Button>
                </Panel>*/}
                <NavBar />
                <div className="PlaceDetails-body">
                    <Breadcrumb style={{ backgroundColor: "#383838" }}>
                        <Breadcrumb.Item onClick={() => this.props.history.push("/")}>Search</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => this.props.history.push("/places")}>
                            Get Places
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Place Details</Breadcrumb.Item>
                    </Breadcrumb>
                    <Jumbotron style={jumboStyle}>
                        <h1 style={textStyle}>{name}</h1>
                        <h3>{ reconvertPriceLevel(price_level) !== "None" ? <PricingLabel pricing={price_level} />: null }{" "}{rating ? <Label>Rating: {rating}/5</Label> : null }</h3>
                        <h2 style={textStyle}>{formatted_address}</h2>
                        <p>
                            { opening_hours ? <Label bsStyle={ opening_hours.open_now ? "success" : "default" }>{ opening_hours.open_now ? "Open Now" : " Closed Now" }</Label> : null }
                        </p>
                        {this.generateTypeBadge(types)}
                        <p>
                            <Button disabled={ website ? false : true } bsStyle="primary" onClick={ () => window.open(website, "_blank") }>Official Website</Button>
                        </p>
                    </Jumbotron>
                    
                    { this.props.placeDetails.result && this.props.placeDetails.result.photos && !_.isEmpty(this.props.placePhotos) ? this.generateCarousel(this.props.placePhotos) : null }
                    <Panel>
                        <Panel.Body>
                            <PageHeader>Place Location</PageHeader>
                            {this.generateRouteTabs(this.props.directionData, geometry.location)}
                            { opening_hours ? <div><PageHeader>Opening Hours</PageHeader>
                            <ScheduleTable weekdayText={opening_hours.weekday_text} /></div> : null }
                            <PageHeader>Customer Reviews</PageHeader>
                            <ReviewList reviewArray={this.props.placeDetails.result.reviews}/>
                        </Panel.Body>
                    </Panel>

                    <Breadcrumb style={{ backgroundColor: "#383838" }}>
                        <Breadcrumb.Item onClick={() => this.props.history.push("/")}>Search</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => this.props.history.push("/places")}>
                            Get Places
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Place Details</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div> 
        );
    }


}

function mapStateToProps(state) {
    return { 
        placeDetails : state.placeDetails,
        placePhotos : state.placePhotos,
        directionData : state.directionData
    }
}

export default connect(mapStateToProps, { fetchPlaceDetails, fetchPlacePhotos })(ShowPlaceDetails);