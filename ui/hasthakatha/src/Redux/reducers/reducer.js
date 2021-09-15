
export default function cartItems(state = {}, action) {
    switch (action.type) {
        case "Add_To_Cart":
            return ([
                ...state,
                { cardData: action.data }
            ])
            break;
        case "addToCartItems":
            return({numberOfItems: action.data})
        default:
            return state
    }
}

export function AdminDashboard(state = false, action) {
    switch (action.type) {
        case "Admin_Login":
            return (action.data)
            break;
        default:
            return state
    }
}
