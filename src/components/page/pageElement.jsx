import PageButton from "./PageButton";
import { useMemo } from "react"

function Dots({ value }) {
    return (
        <PageButton
            styles="dots"
            label="···"
            value={value}
        />
    )
};

function FirstButton() {
    return <PageButton
        styles={"toFirst"}
        label={'<<'}
        value={1}
    />;
}

function LastButton({ totalPage }) {
    return <PageButton
        styles={"toLast"}
        label={'>>'}
        value={totalPage}
    />;
}

function NextButton({ currentPage, totalPage }) {
    return <PageButton
        styles={"next"}
        label={'>'}
        value={currentPage + 1 > totalPage ? totalPage : currentPage + 1}
    />;
}

function PrevButton({ currentPage }) {
    return <PageButton
        styles={"prev"}
        label={'<'}
        value={currentPage - 1 < 1 ? 1 : currentPage - 1}
    />;
}

function PageNumber({
    currentPage,
    totalPage,
    deviceType,
    __MAX_SHOW_NUMBERS__
}) {

    const middleLeftPoint = Math.floor(__MAX_SHOW_NUMBERS__ / 2)
    const middleRightPoint = __MAX_SHOW_NUMBERS__ - middleLeftPoint

    const showArray = useMemo(() => {
        if (!currentPage) return
        if (!__MAX_SHOW_NUMBERS__) return
        let array
        if (totalPage <= __MAX_SHOW_NUMBERS__) {
            array = Array.from(Array(totalPage), (_, index) => index + 1)
            return array
        }

        if (currentPage <= middleLeftPoint) {
            array = Array.from(Array(__MAX_SHOW_NUMBERS__), (_, index) => index + 1)
            return array
        }

        if (currentPage >= totalPage - middleLeftPoint) {
            array = Array.from(Array(totalPage), (_, index) => index + 1)
            array = array.slice(totalPage - __MAX_SHOW_NUMBERS__, totalPage)
            return array
        }

        array = Array.from(Array(__MAX_SHOW_NUMBERS__), (_, index) => index - middleLeftPoint)
            .map(item => item + currentPage);
        return array.filter((item) => {
            return item > 0 && item <= totalPage
        })
    }, [__MAX_SHOW_NUMBERS__, currentPage, totalPage, middleLeftPoint])

    const showDots = totalPage > __MAX_SHOW_NUMBERS__

    let pageView
    if (deviceType === 'desktop') {
        pageView = showArray && showArray.map((value, index) => {
            if (showDots === false) {
                return <PageButton
                    key={index}
                    styles={currentPage === value ? 'active number' : "number"}
                    label={value}
                    value={(value)} />
            }
            if (currentPage < middleRightPoint) {
                if (index < __MAX_SHOW_NUMBERS__ - 1) {
                    return <PageButton
                        key={index}
                        styles={currentPage === value ? 'active number' : "number"}
                        label={value}
                        value={(value)}
                    />
                } else {
                    return <Dots
                        key={index}
                        value={(value)}
                    />
                }
            }
            if (currentPage >= middleRightPoint && currentPage <= totalPage - middleLeftPoint) {
                if (index === 0 || index === __MAX_SHOW_NUMBERS__ - 1) {
                    return <Dots
                        key={index}
                        value={(value)}
                    />
                }
                return <PageButton
                    key={index}
                    styles={currentPage === value ? 'active number' : "number"}
                    label={value}
                    value={value} />
            }
            if (currentPage > totalPage - middleLeftPoint) {
                if (index === 0) {
                    return <Dots
                        key={index}
                        value={(value)}
                    />
                } else {
                    return <PageButton
                        key={index}
                        styles={currentPage === value ? 'active number' : "number"}
                        label={value}
                        value={(value)}
                    />
                }
            }
        });
    } else if (deviceType === 'mobile') {
        pageView = showArray && showArray.map((value, index) => {
            return <PageButton
                key={index}
                styles={currentPage === value ? 'active number' : "number"}
                label={value}
                value={(value)} />
        });
    } else {
        pageView = null
    }

    return pageView
}
export {
    FirstButton,
    PrevButton,
    PageNumber,
    NextButton,
    LastButton,
}