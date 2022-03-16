const initial_state = {
    userData: {}
}

export default function (state = initial_state, action) {
    switch (action.type) {
        case 'SAVE_DATA':
            const data = action.payload
            return { userData: data }
        default:
            return { ...state }
    }
}