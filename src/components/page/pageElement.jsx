import PageButton from "./PageButton";

function LeftDots({ cb, showArray }) {
    return showArray[0] !== 1 && (
        <PageButton
            cb={cb}
            styles='dots'
            label="···"
        />
    )
};

function RightDots({ cb, showArray, totalPage }) {
    return showArray[showArray.length - 1] !== totalPage && (
        <PageButton
            cb={cb}
            styles="dots"
            label="···"
        />
    )
};

function FirstButton({ setPage, currPage }) {
    return currPage !== 1 && <PageButton
        cb={() => setPage(1)}
        styles={"toFirst"}
        label={'<<'} />;
}

function LastButton({ setPage, totalPage, currPage }) {
    return currPage !== totalPage && <PageButton
        cb={() => setPage(totalPage)}
        styles={"toLast"}
        label={'>>'} />;
}

function NextButton({ nextPage, currPage, totalPage }) {
    return currPage !== totalPage && <PageButton
        cb={() => nextPage()}
        styles={"next"}
        label={'>'} />;
}

function PrevButton({ prevPage, currPage }) {
    return currPage !== 1 && <PageButton
        cb={() => prevPage()}
        styles={"prev"}
        label={'<'} />;
}

function PageNumber({ showArray, setPage, currentPage }) {
    return showArray && showArray.map((item, index) => {
        return <PageButton
            key={index}
            cb={() => setPage(item)}
            styles={currentPage === item ? 'active number' : "number"}
            label={(item)} />;
    });
}
export {
    FirstButton,
    PrevButton,
    LeftDots,
    PageNumber,
    RightDots,
    NextButton,
    LastButton,
}