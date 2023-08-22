import PageButton from "./PageButton";

function Dots({ cb }) {
    return (
        <PageButton
            cb={cb}
            styles="dots"
            label="···"
        />
    )
};

function FirstButton({ setPage }) {
    return <PageButton
        cb={() => setPage(1)}
        styles={"toFirst"}
        label={'<<'} />;
}

function LastButton({ setPage, totalPage }) {
    return <PageButton
        cb={() => setPage(totalPage)}
        styles={"toLast"}
        label={'>>'} />;
}

function NextButton({ nextPage }) {
    return <PageButton
        cb={() => nextPage()}
        styles={"next"}
        label={'>'} />;
}

function PrevButton({ prevPage }) {
    return <PageButton
        cb={() => prevPage()}
        styles={"prev"}
        label={'<'} />;
}

function PageNumber({ showArray, setPage, currentPage, showDots, totalPage }) {
    return showArray && showArray.map((item, index) => {
        if (showDots === false) {
            return <PageButton
                key={index}
                cb={() => setPage(item)}
                styles={currentPage === item ? 'active number' : "number"}
                label={(item)} />
        }
        if (currentPage < 3) {
            if (index < 4) {
                return <PageButton
                    key={index}
                    cb={() => setPage(item)}
                    styles={currentPage === item ? 'active number' : "number"}
                    label={(item)} />
            } else {
                return <Dots
                    key={index}
                    cb={() => setPage(item)}
                />
            }
        }
        if (currentPage >= 3 && currentPage <= totalPage - 2) {
            if (index === 0 || index === 4) {
                return <Dots
                    key={index}
                    cb={() => setPage(item)}
                />
            }
            return <PageButton
                key={index}
                cb={() => setPage(item)}
                styles={currentPage === item ? 'active number' : "number"}
                label={(item)} />
        }
        if (currentPage > totalPage - 2) {
            if (index === 0) {
                return <Dots
                    key={index}
                    cb={() => setPage(item)}
                />
            } else {
                return <PageButton
                    key={index}
                    cb={() => setPage(item)}
                    styles={currentPage === item ? 'active number' : "number"}
                    label={(item)} />
            }
        }
    });
}
export {
    FirstButton,
    PrevButton,
    // LeftDots,
    PageNumber,
    // RightDots,
    NextButton,
    LastButton,
}