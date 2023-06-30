import {
    StateProps,
    ReducerAction,
    ReducerActionEnum,
} from './types';

const initialState: StateProps = {
    clientWidth: 1920,
    clientHeight: 0,
    contents: null,
    viewContents: null,
    categoryName: '',
    pathname: '',
    lastPathname: '',
    currMaxViewCount: 6,
    currTotalPage: 0,
    currPage: 1,
    filteredActive: {
        seeMore: false,
        advertise: false,
        seo: false,
        socialMedia: false,
        cis: false,
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
                currTotalPage: Math.ceil(action.payload.contents!.length / 6)
            };
        }
        case ReducerActionEnum.SET_CATEGORY_NAME: {
            return {
                ...state,
                categoryName: action.payload.categoryName,
            };
        }
        case ReducerActionEnum.FILTER_ADVERTISE: {
            let filteredContents
            if (state.filteredActive.advertise) {
                filteredContents = state.contents!
            } else {
                filteredContents = state.contents!.filter((content) =>
                    content.categories.name === "廣告投放代理"
                )
            }
            return {
                ...state,
                viewContents: filteredContents.slice(0, 6),
                currTotalPage: Math.ceil(filteredContents.length / 6),
                filteredActive: {
                    seeMore: false,
                    advertise: action.payload.active,
                    seo: false,
                    socialMedia: false,
                    cis: false,
                },
            };
        }
        case ReducerActionEnum.FILTER_SEO: {
            let filteredContents
            if (state.filteredActive.seo) {
                filteredContents = state.contents!
            } else {
                filteredContents = state.contents!.filter((content) =>
                    content.categories.name === "SEO網站優化"
                )
            }
            return {
                ...state,
                viewContents: filteredContents.slice(0, 6),
                currTotalPage: Math.ceil(filteredContents.length / 6),
                filteredActive: {
                    seeMore: false,
                    advertise: false,
                    seo: action.payload.active,
                    socialMedia: false,
                    cis: false,
                },
            };
        }
        case ReducerActionEnum.FILTER_SOCIAL_MEDIA: {
            let filteredContents
            if (state.filteredActive.socialMedia) {
                filteredContents = state.contents!
            } else {
                filteredContents = state.contents!.filter((content) =>
                    content.categories.name === "社群口碑行銷"
                )
            }

            return {
                ...state,
                viewContents: filteredContents.slice(0, 6),
                currTotalPage: Math.ceil(filteredContents.length / 6),
                filteredActive: {
                    seeMore: false,
                    advertise: false,
                    seo: false,
                    socialMedia: action.payload.active,
                    cis: false,
                },
            };
        }
        case ReducerActionEnum.FILTER_CIS: {
            let filteredContents
            if (state.filteredActive.cis) {
                filteredContents = state.contents!
            } else {
                filteredContents = state.contents!.filter((content) =>
                    content.categories.name === "數位形象設計"
                )
            }

            return {
                ...state,
                viewContents: filteredContents.slice(0, 6),
                currTotalPage: Math.ceil(filteredContents.length / 6),
                filteredActive: {
                    seeMore: false,
                    advertise: false,
                    seo: false,
                    socialMedia: false,
                    cis: action.payload.active,
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
            const length = state.viewContents!.length;
            const pageNumber = Math.ceil(length / 6);
            const start = pageNumber * 6
            const end = start + 6
            const slicedContents = state.contents!.slice(start, end)
            return {
                ...state,
                viewContents: [
                    ...state.viewContents!,
                    ...slicedContents
                ],
                filteredActive: {
                    seeMore: action.payload.active,
                    advertise: false,
                    seo: false,
                    socialMedia: false,
                    cis: false,
                },
                // currMaxViewCount: state.currMaxViewCount + pageNumber * 6,
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