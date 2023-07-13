import React from "react";
import Image from "next/image";
import { marketingBanner } from "@components/index/images";;
import useLoadImage from "@services/useLoadImage";

export default function MarketingBanner() {

    const banner = useLoadImage(marketingBanner);

    return (
        <div className={'marketing-banner'}>
            {banner && <Image
                placeholder="blur"
                src={banner.default.src}
                blurDataURL={banner.default.blurDataURL}
                width={banner.default.width}
                height={banner.default.height}
                alt={''}
                style={{
                    objectFit: "cover",
                    objectPosition: "50% 50%"
                }}
            />}
        </div>
    )

}
