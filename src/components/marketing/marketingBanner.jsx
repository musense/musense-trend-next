import { useMemo } from "react";
import Image from "next/image";
import { marketingBanner } from "@components/index/images";;
import useLoadImage from "@services/useLoadImage";
import { useAppContext } from "@store/context";


export default function MarketingBanner() {
    const { state } = useAppContext();
    const banner = useLoadImage(marketingBanner);

    const style = useMemo(() => {
        const baseStyle = {
            objectFit: "contain",
            objectPosition: "50% 50%",
            filter: 'drop-shadow(2px 6px 10px rgba(0 0 0/0.5))',
        }
        if (state.clientWidth === 0) return baseStyle
        if (state.clientWidth <= 768) {
            return ({
                ...baseStyle,
                aspectRatio: 'unset',
                height: 'auto',
                width: '100%',
            })
        } else {
            return ({
                ...baseStyle
            })
        }
    }, [state.clientWidth])
    return (
        <div className={'marketing-banner'}>
            {banner &&
                (state.clientWidth <= 768
                    ? <Image
                        placeholder="blur"
                        src={banner.default.src}
                        blurDataURL={banner.default.blurDataURL}
                        width={banner.default.width}
                        height={banner.default.height}
                        alt={''}
                        style={style}
                    />
                    : <Image
                        placeholder="blur"
                        src={banner.default.src}
                        blurDataURL={banner.default.blurDataURL}
                        width={banner.default.width}
                        height={banner.default.height}
                        alt={''}
                        style={style}
                    />)
            }
        </div>
    )

}
