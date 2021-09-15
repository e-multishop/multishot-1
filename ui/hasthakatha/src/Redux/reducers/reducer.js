
export default function cartItems(state = [], action) {
    switch (action.type) {
        case "Add_To_Cart":
            return ([
                ...state,
                { cardData: action.data }
            ])
            break;
        default:
            return state
    }
}

<<<<<<< HEAD
export function AdminDashboard(state = false, action) {
=======
export function AdminDashboard (state=[], action) {
>>>>>>> 9d523a542cbabd0ec88e661c28a183c4ee45ae5b
    switch (action.type) {
        case "Admin_Login":
            return (action.data)
            break;
        default:
            return state
    }
}