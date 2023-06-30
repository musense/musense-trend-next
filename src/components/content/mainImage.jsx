import Image from "next/image";
import React, { useState, useEffect } from "react";
// import "./css/contentBanner.css"
import { triangleRangeOrange } from "@components/index/images";;


export default function MainImage({ imgSrc: mainImage, imgAltText }) {

    // const [mainImage, setMainImage] = useState(null);
    const [troImage, setTroImage] = useState(null);

    useEffect(() => {
        const clientWidth = window.innerWidth;
        let troImport
        if (clientWidth > 768) {
            troImport = triangleRangeOrange.get('pc')
        } else {
            troImport = triangleRangeOrange.get('mobile')
        }
        troImport.then(res => setTroImage({ default: res.default }))
    }, []);
    return (
        <div className="top-banner-wrapper">
            {mainImage && <Image className="top-banner"
                src={mainImage}
                width={1000}
                height={1000}
                alt={imgAltText}
                style={{
                    objectFit: "cover",
                    objectPosition: "50% 50%"
                }}
            />}
            {troImage && <Image className="triangle-range_orange"
                placeholder="blur"
                blurDataURL={troImage.default.blurDataURL}
                src={troImage.default.src}
                width={troImage.default.width}
                height={troImage.default.height}
                alt={''}
            />}
            {/* <div className="triangle-range_orange" /> */}
        </div>
    )
}
