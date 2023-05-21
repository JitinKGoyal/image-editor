
const initialState = {
    loginErr: {
        errors: []
    },
    signupErr: {
        errors: []
    },
    // allImages: []
}
export const myreducer = (state = initialState, { payload }) => {
    return { ...state, ...payload }
}
