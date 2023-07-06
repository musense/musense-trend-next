import Image from "next/image";
import React from "react";
import { triangleRangeOrange } from "@components/index/images";;
import useLoadImage from "@services/useLoadImage";


export default function MainImage({
    imgSrc: mainImage,
    imgAltText
}) {

    const troImage = useLoadImage(triangleRangeOrange);

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
                style={{
                    objectFit: "cover",
                    objectPosition: "50% 50%"
                }}
            />}
        </div>
    )
}
