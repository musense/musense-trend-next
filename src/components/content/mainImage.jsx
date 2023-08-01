import Image from "next/image";
import React, { useMemo } from "react";
import { triangleRangeOrange } from "@components/index/images";;
import useLoadImage from "@services/useLoadImage";
import Iframe from "react-iframe";

export default function MainImage({
    imgSrc: mainImage,
    imgAltText
}) {
    const isVideo = mainImage && mainImage.indexOf('<iframe') !== -1;
    const iframeUrl = useMemo(() => {
        if (!isVideo) return null
        const indexOf = mainImage.indexOf(`src="`) + `src="`.length;
        const endIndexOf = mainImage.indexOf(`"`, indexOf);
        const property = mainImage.substr(indexOf, endIndexOf - indexOf);
        return property
    }, [isVideo, mainImage])
    console.log("🚀 ~ file: mainImage.jsx:12 ~ mainImage:", mainImage)
    console.log("🚀 ~ file: mainImage.jsx:12 ~ isVideo:", isVideo)
    const troImage = useLoadImage(triangleRangeOrange);

    return (
        <div className="top-banner-wrapper">
            {mainImage && (
                isVideo
                    ? <Iframe
                        className="top-banner"
                        url={iframeUrl}
                        loading='lazy'
                        width="100%"
                        height="100%"
                        display="block"
                        position="relative"

                    />
                    : <Image
                        className="top-banner"
                        src={mainImage}
                        width={1000}
                        height={1000}
                        alt={imgAltText}
                        style={{
                            objectFit: "cover",
                            objectPosition: "50% 50%"
                        }}
                    />)}
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
