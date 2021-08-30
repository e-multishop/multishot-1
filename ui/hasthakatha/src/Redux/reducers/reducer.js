
export default function cartItems (state=[], action) {
    switch (action.type) {
        case "Add_To_Cart":
            return ([
                ...state,
                {cardData:action.data}
            ])
            break;
        default:
            return state
    }
}