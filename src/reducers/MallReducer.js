const MallReducer = (state, action) => {
    const {type, payload} = action
    console.log(payload, 2382)
    switch (type){
        case 'SET_ALL_CHILD':
            return { 
                ...state,
                allItems: payload.allItems,
            }
        case 'GET_CHILD':
            return { 
                ...state,
                allItems: payload.allItems,
            }
        default: return state
    }
}
export default MallReducer