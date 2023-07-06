import React from "react";
import Marketing from '@components/marketing/index';

export default function CommonPage({
    paramName = null,
    commonPageItems,
    categoryList = null,
    popularContents,
    sitemapUrl = null
}) {
    return <Marketing
        paramName={paramName}
        commonPageItems={commonPageItems}
        popularContents={popularContents}
        sitemapUrl={sitemapUrl}
    />
}
