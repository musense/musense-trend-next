import React, { useState, useEffect } from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import MiscButtonList from '@components/marketing/miscButtonList';
import HotContent from '@components/marketing/hotContent';

export default function Page({
    mainTitle,
    commonPageItems,
    categoryList,
}) {
    // console.log("🚀 ~ file: index.jsx:12 ~ categoryList:", categoryList)
    // console.log("🚀 ~ file: index.jsx:12 ~ commonPageItems:", commonPageItems)
    // console.log("🚀 ~ file: index.jsx:12 ~ mainTitle:", mainTitle)


    return (<>
        <MarketingButtonList categoryList={categoryList} />
        <CardWrapper contents={commonPageItems} />
        <MiscButtonList />
        <HotContent />
    </>);
}
