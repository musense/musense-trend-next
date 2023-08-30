export interface StateProps {
    clientWidth: number;
    clientHeight: number;
    contents: any[] | null;
    viewContents: any[] | null;
    categoryName: string;
    categorySitemapUrl: string;
    mainSiteHref: string;
    keyName?: string,
    pathname: string;
    lastPathname: string;
    currMaxViewCount: number;
    currTotalPage: number;
    menuOpen: boolean;
    filteredActive: {
        [key: string]: false,
    }
}
export type payloadProps = {
    width?: number,
    height?: number,
    contents?: any[],
    categoryName?: string,
    categorySitemapUrl?: string,
    mainSiteHref?: string,
    keyName?: string,
    pathname?: string,
    lastPathname?: string,
    active?: boolean,
    currentPage?: number,
}
export enum ReducerActionEnum {
    SET_WINDOW_SIZE = 'SET_WINDOW_SIZE',
    SET_ALL_CONTENTS = 'SET_ALL_CONTENTS',
    SET_CATEGORY_NAME = 'SET_CATEGORY_NAME',
    SET_PATHNAME = 'SET_PATHNAME',
    SET_LAST_PATHNAME = 'SET_LAST_PATHNAME',
    SEE_MORE = 'SEE_MORE',
    BACK_TO_TREND = 'BACK_TO_TREND',
    FILTER_ADVERTISE = 'FILTER_ADVERTISE',
    FILTER_SEO = 'FILTER_SEO',
    FILTER_SOCIAL_MEDIA = 'FILTER_SOCIAL_MEDIA',
    FILTER_CIS = 'FILTER_CIS',
    FILTER_CATEGORY = 'FILTER_CATEGORY',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    CLOSE_MENU = 'CLOSE_MENU',
    TOGGLE_MENU = 'TOGGLE_MENU',
    RESET_FILTER_STATE = 'RESET_FILTER_STATE',
}

export type ReducerAction = {
    type: ReducerActionEnum,
    payload: payloadProps,
}

