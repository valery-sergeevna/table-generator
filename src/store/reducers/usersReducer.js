const initialState = {
    usersList: [],
    editedUser: {}
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_USER": {
            return {
                ...state,
                usersList: [...state.usersList, {
                        name: action.payload.name,
                        surname: action.payload.surname,
                        age: action.payload.age,
                        city: action.payload.city,
                        id: action.payload.id
                    }]
            };
        }
        case "SAVE_EDITED_USER": {
            return {
                ...state,
                editedUser: action.payload
            };
        }
        default:
            return state;
    }
}

export const createUserAction = (obj) => ({
    type: "CREATE_USER",
    payload: obj
});

export const saveUserAction = (obj) => ({
    type: "SAVE_EDITED_USER",
    payload: obj
});