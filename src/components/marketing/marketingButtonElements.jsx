import BtnMarketing from '@components/btnMarketing';
import BtnMarketingWrapper from '@components/btnMarketingWrapper';
// import useScrollToPosition from "@services/useScrollToPosition";

function DeskTopBtnMarketingWrapper({
    selectedCategoryName,
    showCategoryList,
    btnProps
}) {
    // useScrollToPosition(selectedCategoryName, 410)
    return <BtnMarketingWrapper position='upper'>
        {showCategoryList && showCategoryList.map((category, index) =>
            <BtnMarketing key={index} {...btnProps(index, category)} />
        )}
    </BtnMarketingWrapper>;
}

function MobileBtnMarketingWrapper({
    selectedCategoryName,
    leftCategoryList,
    rightCategoryList,
    btnProps,
}) {
    // useScrollToPosition(selectedCategoryName, 165)
    return (<BtnMarketingWrapper position='upper'>
        <div>
            {leftCategoryList && leftCategoryList.map((category, index) =>
                <BtnMarketing key={index} {...btnProps(index, category)} />
            )}
        </div>
        <div>
            {rightCategoryList && rightCategoryList.map((category, index) =>
                <BtnMarketing key={index} {...btnProps(index, category)} />
            )}
        </div>
    </BtnMarketingWrapper>);
}

function CommonTitle({ paramName }) {
    return <BtnMarketingWrapper position='upper'>
        <BtnMarketing
            type="title"
            className="spots"
            title={paramName}
            name={paramName}
            cancelHoverState={true}
        />
    </BtnMarketingWrapper>;
}

export {
    DeskTopBtnMarketingWrapper,
    MobileBtnMarketingWrapper,
    CommonTitle
}