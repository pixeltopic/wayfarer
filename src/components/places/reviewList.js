import React from "react";
import { Media, Label, Badge, Alert } from "react-bootstrap";

const RatingLabel = props => {
    switch(props.rating) {
        case 1: return <Label bsStyle="danger">Rating: 1</Label>
        case 2: return <Label bsStyle="warning">Rating: 2 </Label>
        case 3: return <Label bsStyle="info">Rating: 3</Label>
        case 4: return <Label bsStyle="primary">Rating: 4</Label>
        case 5: return <Label bsStyle="success">Rating: 5</Label>
        default: return <Label bsStyle="default">Rating: {props.rating}</Label>
    }
}

export default props => {
    // given an array of reviews, render them as a list
    if (!props.reviewArray)
        return <div><Alert bsStyle="warning">No Reviews Written.</Alert></div>

    return props.reviewArray.map(
        (reviewObj, index) => {
            return (
                <Media key={index}>
                    <Media.Left>
                        <img width={64} height={64} alt="Profile_Pic" src={reviewObj.profile_photo_url}/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>
                            {reviewObj.author_name}
                            {" "}<Badge>{reviewObj.relative_time_description}</Badge>
                            {" "}<RatingLabel rating={reviewObj.rating} />
                        </Media.Heading>
                        {reviewObj.text ? reviewObj.text : null}
                    </Media.Body>
                </Media>
            );
        }
    );
}