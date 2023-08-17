import {
    StateProps,
    ReducerAction,
    ReducerActionEnum,
} from './types';

const initialState: StateProps = {
    clientWidth: 0,
    clientHeight: 0,
    contents: null,
    viewContents: null,
    categoryName: '',
    keyName: '',
    categorySitemapUrl: '',
    mainSiteHref: process.env.NEXT_PUBLIC_FRONT_SITE || '/',
    pathname: '',
    lastPathname: '',
    currMaxViewCount: 6,
    currTotalPage: 0,
    currPage: 1,
    filteredActive: {
        seeMore: false,
    }
}

type DateType = {
    publishedAt: string | number | Date;
}
type HiddenType = {
    hidden: boolean;
}
const mainReducer = (
    state: StateProps,
    action: ReducerAction
) => {
    const { type, payload } = action
    console.log("🚀 ~ file: reducer.ts:30 ~ type:", type)
    switch (action.type) {
        case ReducerActionEnum.SET_WINDOW_SIZE: {
            return {
                ...state,
                clientWidth: action.payload.width,
                clientHeight: action.payload.height,
            };
        }
        case ReducerActionEnum.SET_ALL_CONTENTS: {
            const sortedContents = action.payload.contents
                ? action.payload.contents
                    .filter(item => item.hidden === false && item.homeImagePath)
                    .sort((item1, item2) =>
                        (new Date(item2.publishedAt) as any) - (new Date(item1.publishedAt) as any)
                    )
                : null
            return {
                ...state,
                contents: sortedContents,
                viewContents: sortedContents ? sortedContents.slice(0, 6) : null,
                currTotalPage: sortedContents ? Math.ceil(sortedContents.length / 6) : 0,
                currPage: 1,
                filteredActive: {
                    seeMore: false,
                },
            };
        }
        case ReducerActionEnum.SET_CATEGORY_NAME: {
            return {
                ...state,
                categoryName: action.payload.categoryName,
            };
        }
        case ReducerActionEnum.FILTER_CATEGORY: {
            let filteredContents, filteredActive
            if (state.filteredActive[action.payload.keyName!] === null || !state.filteredActive[action.payload.keyName!]) {
                filteredActive = true
                filteredContents = state.contents?.filter((content) =>
                    content.categoryName === action.payload.categoryName
                )
            } else {
                filteredContents = state.contents!
            }
            filteredActive = !state.filteredActive[action.payload.keyName!]
            Object.keys(state.filteredActive)?.forEach((key) =>
                state.filteredActive[key] = false
            );
            filteredContents?.filter((item: HiddenType) => item.hidden === false)
                .sort((item1: DateType, item2: DateType) =>
                    (new Date(item2.publishedAt) as any) - (new Date(item1.publishedAt) as any)
                )
            return {
                ...state,
                categoryName: filteredActive ? action.payload.categoryName : null,
                keyName: filteredActive ? action.payload.keyName : null,
                categorySitemapUrl: filteredActive ? action.payload.categorySitemapUrl : null,
                viewContents: filteredContents!.length > 0 ? filteredContents?.slice(0, 6) : null,
                currTotalPage: filteredContents && Math.ceil(filteredContents?.length / 6),
                filteredActive: {
                    ...state.filteredActive,
                    [action.payload.keyName!]: filteredActive
                },
            };
        }
        case ReducerActionEnum.SET_PATHNAME: {
            return {
                ...state,
                lastPathname: action.payload.lastPathname,
                pathname: action.payload.pathname,
                mainSiteHref: action.payload.pathname?.indexOf('/c_') === -1
                    ? process.env.NEXT_PUBLIC_FRONT_SITE
                    : '/',
            };
        }
        case ReducerActionEnum.SEE_MORE: {
            Object.keys(state.filteredActive)?.forEach((key) =>
                state.filteredActive[key] = false
            );
            return {
                ...state,
                viewContents: state.viewContents && [...state.viewContents],
                categoryName: action.payload.categoryName,
                filteredActive: {
                    ...state.filteredActive,
                    seeMore: action.payload.active
                },
            };
        }
        case ReducerActionEnum.SET_CURRENT_PAGE: {
            let currPage, start, end, slicedContents

            if (action.payload.currPage === state.currPage) {
                return {
                    ...state,
                };
            }
            if (typeof action.payload.currPage === 'number') {
                currPage = action.payload.currPage;
            } else {
                if (action.payload.currPage === 'prev') {
                    currPage = state.currPage - 1
                } else {
                    currPage = state.currPage + 1
                }
            }
            if (currPage < 1) currPage = 1
            if (currPage > state.currTotalPage) currPage = state.currTotalPage

            start = (currPage - 1) * state.currMaxViewCount
            end = start + state.currMaxViewCount
            slicedContents = state.contents!.slice(start, end)
            return {
                ...state,
                viewContents: slicedContents,
                currPage: currPage
            };
        }
        case ReducerActionEnum.RESET_FILTER_STATE: {
            // console.log("🚀 ~ file: reducer.ts:140 ~ RESET_FILTER_STATE!!!")
            return {
                ...state,
                categoryName: null,
                keyName: null,
                categorySitemapUrl: null,
                filteredActive: {
                    seeMore: false,
                }
            }
        }
        default:
            throw Error('Unknown action: ' + action.type);
    }

}

export { mainReducer, initialState }