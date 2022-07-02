const initialState = {
    originalTable: {
        table: [],
        id: new Date().getTime()
    },
    copies: []
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_TABLE": {
            return {
                ...state,
                originalTable: {...state.originalTable, table: [...state.originalTable.table, action.payload]}
            }
        }
        case "COPY_TABLE": {
            if(action.copyFromCopies && state.copies.length > 1){
                const dataCopies = state.copies;
                dataCopies.splice(action.index + 1, 0, {table: action.copies, id: new Date().getTime()});
                return {
                    ...state,
                    copies: [...dataCopies]
                };
            }else{
                return {
                    ...state,
                    copies: [{table: action.copies, id: new Date().getTime()}, ...state.copies]
                };
            }
        }
        case "DELETE_TABLE": {
            return {
                ...state,
                copies: [...state.copies.filter((table) => table.id !== action.payload)]
            };
        }
        case "DELETE_USER_FROM_ORIGINAL": {
            return {
                ...state,
                originalTable: {...state.originalTable, table:
                        [...state.originalTable.table.filter((user) => user.id !== action.userId)]}
            };
        }
        case "DELETE_USER_FROM_COPIES": {
            return {
                ...state,
                copies: action.payload && action.payload.table.length === 1 ?
                    state.copies.filter((copy) => copy.id !== action.payload)
                    : state.copies.map(copy => {
                    if(copy.id === action.payload.id) {
                        return {
                            ...copy,
                            table: [...copy.table.filter((user) => user.id !== action.userId)]
                        }
                    }
                    return copy;
                })
            };
        }
        case "EDIT_USER_FROM_ORIGINAL": {
            return {
                ...state,
                originalTable: {...state.originalTable, table:
                        [...state.originalTable.table.map(user => {
                            if (user.id === action.payload.id) {
                                return {
                                    ...user,
                                    name: action.payload.name,
                                    surname: action.payload.surname,
                                    age: action.payload.age,
                                    city: action.payload.city
                                }
                            }
                            return user;
                        })]}
            };
        }
        case "EDIT_USER_FROM_COPY": {
            console.log(action.payload, 'EDIT_USER_FROM_COPY')
            return {
                ...state,
                copies: [...state.copies.map(copy => {
                    if(copy.id === action.id){
                        return {
                            ...copy,
                            table: [...copy.table.map(user => {
                                if (user.id === action.payload.id) {
                                    return {
                                        ...user,
                                        name: action.payload.name,
                                        surname: action.payload.surname,
                                        age: action.payload.age,
                                        city: action.payload.city
                                    }
                                }
                                return user;
                            })]
                        }
                    }
                    return copy;
                })]
            };
        }
        default:
            return state;
    }
}

export const createTableAction = (obj) => ({
    type: "CREATE_TABLE",
    payload: obj,
});

export const copyTableAction = (obj, index, copyFromCopies) => ({
    type: "COPY_TABLE",
    copies: obj,
    index: index,
    copyFromCopies: copyFromCopies
});

export const deleteTableAction = (id) => ({
    type: "DELETE_TABLE",
    payload: id
});

export const deleteUserFromOriginal = (userId) => ({
    type: "DELETE_USER_FROM_ORIGINAL",
    userId: userId
});

export const deleteUserFromCopies = (userId, obj) => ({
    type: "DELETE_USER_FROM_COPIES",
    userId: userId,
    payload: obj,
});

export const editUserFromOriginal = (obj) => ({
    type: "EDIT_USER_FROM_ORIGINAL",
    payload: obj
});

export const editUserFromCopy = (obj, id) => ({
    type: "EDIT_USER_FROM_COPY",
    payload: obj,
    id: id
});