import React from "react";

export default function PageButton({ cb, styles, label }) {
    const props = {
        onClick: cb,
        className: `page ${styles}`,
    }
    return (
        <button {...props}>
            {label}
        </button>
    )
}
