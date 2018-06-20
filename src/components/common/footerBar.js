import React from "react";

export default (props) => {
    // const footerStyle = {
    //     position: "fixed",
    //     left: "0",
    //     bottom: "0",
    //     width: "100%",
    //     backgroundColor: "rgba(105,105,105,0.3)",
    //     color: "white",
    //     textAlign: "center",
    //     fontSize: "11px"
    // }
    const footerStyle = {
        marginTop: "auto",
        textAlign: "center",
        fontSize: "11px",
        color: "white",
        flex: "0 0 50px", /*or just height: "50px",*/
        width: "100%",
        backgroundColor: "rgba(105,105,105,0.3)",
        padding: "5px 5px 5px 5px"
    }
    return (
        <div style={footerStyle}>
            <p>
                Powered by Google and Mapquest. App by pixeltopic. Art by various artists.
            </p>
            <a href="https://github.com/pixeltopic/wayfarer">Github Repo</a>
        </div>
    );
}