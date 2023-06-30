import Image from "next/image";
import React from "react";
// import "./css/popularContent.css"


export default function PopularContent({ popularContents }) {

    return <div data-title="延伸閱讀" className="popular-content-wrapper">
        {
            popularContents && popularContents.map((content, index) => {
                return <div key={index} className="popular-content">
                    <Image src=
                        {content.img.src}
                        alt={content.img.altText}
                        className="popular-content-image"
                         />
                    <div className="popular-content-title">
                        <span className="ellipsis">
                            {content.title}
                        </span>
                    </div>
                </div>
            })
        }

    </div>;
}
