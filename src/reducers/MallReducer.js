const MallReducer = (state, action) => {
    const {type, payload} = action
    console.log(payload, 2382)
    switch (type){
        case 'SET_ALL_CHILD':
            return { 
                ...state,
                allItems: payload.allItems,
            }
        {/*case 'SET_ALL_SHOP':
            return { 
                ...state,
                allShops: payload.allShops,
            }*/}
        case 'GET_CHILD':
            return { 
                ...state,
                allItems: payload.allItems,
            }
        default: return state
    }
}
export default MallReducer