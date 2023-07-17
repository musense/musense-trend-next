import React from "react";
import { useAppContext } from "@store/context";

export default function useLoadImage(imageNameMap) {

    const { state } = useAppContext();
    const [image, setImage] = React.useState();

    const loadImage = (imageNameMap, setImage, clientWidth) => {
        let imageImport
        if (clientWidth === 0) return null
        if (clientWidth > 768) {
            imageImport = imageNameMap.get('pc')
        } else {
            imageImport = imageNameMap.get('mobile')
        }
        imageImport.then(res => {
            if (!res.after) {
                setImage({
                    default: res.default,
                    after: null,
                    before: null
                })

            } else if (!res.before) {
                const defaultImport = res.default
                const afterImport = res.after
                Promise.all([defaultImport, afterImport]).then(res => {
                    setImage({
                        default: res[0].default,
                        after: res[1].default,
                        before: null
                    })
                })
            } else {
                const defaultImport = res.default
                const afterImport = res.after
                const beforeImport = res.before
                Promise.all([defaultImport, afterImport, beforeImport]).then(res => {
                    setImage({
                        default: res[0].default,
                        after: res[1].default,
                        before: res[2].default,
                    })
                })
            }
        })
    }
    React.useEffect(() => {
        loadImage(imageNameMap, setImage, state.clientWidth)
    }, [imageNameMap, setImage, state.clientWidth]);

    return image
}