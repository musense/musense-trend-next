import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function ExtendReading({ contents }) {
    console.log("🚀 ~ file: extendReading.jsx:7 ~ ExtendReading ~ contents:", contents)

    return <div data-title="延伸閱讀" className="popular-content-wrapper">
        {
            contents && contents.slice(0, 3).map((content, index) => {
                return (
                    <Link key={index} href={content.sitemapUrl} className="popular-content">
                        <Content
                            src={content.homeImagePath}
                            alt={content.altText}
                            title={content.title}
                        />
                    </Link>)
            })
        }
    </div>;

    function Content({ src, alt, title }) {
        return <div>
            <Image
                src={src}
                alt={alt}
                width={300}
                height={300}
                className="popular-content-image"
                style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
            <div className="popular-content-title">
                <span className="ellipsis">
                    {title}
                </span>
            </div>
        </div>;
    }
}
