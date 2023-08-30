import {
    StateProps,
    ReducerAction,
    ReducerActionEnum,
} from './types';

const allContentSitemapUrl = 'c_all_contents.html'

const initialState: StateProps = {
    clientWidth: 0,
    clientHeight: 0,
    contents: null,
    viewContents: null,
    categoryName: '',
    keyName: '',
    categorySitemapUrl: allContentSitemapUrl,
    mainSiteHref: '/',
    pathname: '',
    lastPathname: '',
    currMaxViewCount: 6,
    currTotalPage: 0,
    menuOpen: false,
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
            console.log("🚀 ~ file: reducer.ts:74 ~ action.payload.keyName:", action.payload.keyName)
            if (state.filteredActive[action.payload.keyName!] === null || !state.filteredActive[action.payload.keyName!]) {
                filteredActive = true
                filteredContents = state.contents?.filter((content) =>
                    content.categoryName === action.payload.categoryName
                )
            } else {
                // includes un-categories items
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
                categorySitemapUrl: filteredActive ? action.payload.categorySitemapUrl : allContentSitemapUrl,
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
                // lastPathname: action.payload.lastPathname,
                // pathname: action.payload.pathname,
                mainSiteHref: ['/c_', '/tag_'].some(route => action.payload.pathname?.includes(route)) ? '/trend' : '/'
            };
        }
        case ReducerActionEnum.SEE_MORE: {
            if (action.payload.keyName) {
                Object.keys(state.filteredActive)?.forEach((key) =>
                    state.filteredActive[key] = false
                );
            }
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
            let currentPage = action.payload.currentPage || 1,
                start,
                end,
                slicedContents

            start = (currentPage - 1) * state.currMaxViewCount
            end = start + state.currMaxViewCount
            slicedContents = state.contents!.slice(start, end)
            return {
                ...state,
                viewContents: slicedContents,
            };
        }
        case ReducerActionEnum.TOGGLE_MENU: {
            return {
                ...state,
                menuOpen: !state.menuOpen,
            };
        }
        case ReducerActionEnum.CLOSE_MENU: {
            return {
                ...state,
                menuOpen: false,
            };
        }
        case ReducerActionEnum.RESET_FILTER_STATE: {
            // console.log("🚀 ~ file: reducer.ts:140 ~ RESET_FILTER_STATE!!!")
            return {
                ...state,
                categoryName: null,
                keyName: null,
                categorySitemapUrl: allContentSitemapUrl,
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