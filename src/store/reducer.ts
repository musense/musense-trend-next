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
    categorySitemapUrl: '',
    pathname: '',
    lastPathname: '',
    currMaxViewCount: 6,
    currTotalPage: 0,
    currPage: 1,
    filteredActive: {
        seeMore: false,
    }
}

const mainReducer = (
    state: StateProps,
    action: ReducerAction
) => {
    const { type, payload } = action
    switch (action.type) {
        case ReducerActionEnum.SET_WINDOW_SIZE: {
            return {
                ...state,
                clientWidth: action.payload.width,
                clientHeight: action.payload.height,
            };
        }
        case ReducerActionEnum.SET_ALL_CONTENTS: {
            return {
                ...state,
                contents: action.payload.contents,
                viewContents: action.payload.contents?.slice(0, 6),
                currTotalPage: Math.ceil(action.payload.contents!.length / 6),
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
                filteredContents = state.contents!.filter((content) =>
                    content.categories.name === action.payload.categoryName
                )
            } else {
                filteredContents = state.contents!
            }
            filteredActive = !state.filteredActive[action.payload.keyName!]
            Object.keys(state.filteredActive)?.forEach((key) =>
                state.filteredActive[key] = false
            );
            return {
                ...state,
                categoryName: filteredActive ? action.payload.categoryName : null,
                viewContents: filteredContents.slice(0, 6),
                currTotalPage: Math.ceil(filteredContents.length / 6),
                categorySitemapUrl: filteredActive ? action.payload.sitemapUrl : null,
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
                pathname: action.payload.pathname
            };
        }
        case ReducerActionEnum.SEE_MORE: {
            Object.keys(state.filteredActive)?.forEach((key) =>
                state.filteredActive[key] = false
            );
            return {
                ...state,
                viewContents: [...state.viewContents!],
                categoryName: action.payload.categoryName,
                filteredActive: {
                    ...state.filteredActive,
                    seeMore: action.payload.active
                },
            };
        }
        case ReducerActionEnum.SET_CURRENT_PAGE: {
            let currPage, start, end, slicedContents
            if (typeof action.payload.currPage === 'number') {
                currPage = action.payload.currPage;
            } else {
                if (action.payload.currPage === 'prev') {
                    currPage = state.currPage! - 1
                } else {
                    currPage = state.currPage! + 1
                }
            }
            start = (currPage - 1) * state.currMaxViewCount
            end = start + state.currMaxViewCount
            slicedContents = state.contents!.slice(start, end)
            return {
                ...state,
                viewContents: slicedContents,
                currPage: currPage
            };
        }
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export { mainReducer, initialState }