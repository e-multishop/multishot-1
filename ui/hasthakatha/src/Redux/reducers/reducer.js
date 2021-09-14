
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

export default function AdminDashboard (state=[], action) {
    switch (action.type) {
        case "Admin_Login":
            return ([
                ...state,
                {LoginData:action.data}
            ])
            break;
        default:
            return state
    }
}