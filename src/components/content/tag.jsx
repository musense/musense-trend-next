import React from "react";
// import "./css/tag.css";


export default function Tag({ tagName, index }) {
    return (
        <span className="tag" data-tag="#" key={index}>{tagName}</span>
    );
}
