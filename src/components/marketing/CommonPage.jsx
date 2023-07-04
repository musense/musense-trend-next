import React from "react";
import Marketing from '@components/marketing/index';

export default function CommonPage({
    paramName = null,
    commonPageItems,
    categoryList = null,
    popularContents,
    sitemapUrl = null
}) {
    return paramName && paramName.indexOf("#") !== -1 ? (
        <Marketing
            paramName={paramName}
            commonPageItems={commonPageItems}
            popularContents={popularContents}
            sitemapUrl={sitemapUrl}
        />
    ) : (
        <Marketing
            paramName={paramName}
            commonPageItems={commonPageItems}
            categoryList={categoryList}
            popularContents={popularContents}
            sitemapUrl={sitemapUrl}
        />
    );
}
