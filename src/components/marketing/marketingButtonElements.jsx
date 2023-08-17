import BtnMarketing from '@components/button/btnMarketing';
import BtnMarketingWrapper from '@components/button/btnMarketingWrapper';

function DeskTopBtnMarketingWrapper({
    showCategoryList,
    btnProps
}) {
    return <BtnMarketingWrapper position='upper'>
        {showCategoryList && showCategoryList.map((category, index) =>
            <BtnMarketing key={index} {...btnProps(index, category)} />
        )}
    </BtnMarketingWrapper>;
}

function MobileBtnMarketingWrapper({
    leftCategoryList,
    rightCategoryList,
    btnProps,
}) {
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

function CommonTitle({ openTitleName }) {
    return <BtnMarketingWrapper position='upper'>
        <BtnMarketing
            type="title"
            className="spots"
            title={openTitleName}
            name={openTitleName}
            cancelHoverState={true}
        />
    </BtnMarketingWrapper>;
}

export {
    DeskTopBtnMarketingWrapper,
    MobileBtnMarketingWrapper,
    CommonTitle
}