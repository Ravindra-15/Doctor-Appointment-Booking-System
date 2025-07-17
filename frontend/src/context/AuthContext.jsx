import { createContext, useContext, useEffect, useState, useReducer } from "react";

const initialState = {
    user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null
    // loading: false,
    // error: null
};
 
export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                // ...state,
                user: null,
                role: null,
                token: null
                // loading: true,
                // error: null
            };

        case 'LOGIN_SUCCESS':
            return {
                // ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role
                // loading: false,
                // error: null
            };

        case 'LOGIN_FAILURE':
            return {
                // ...state,
                user: null,
                token: null,
                role: null
                // loading: false,
                // error: action.payload
            };

        case 'LOGOUT':
            return {
                // ...state,
                user: null,
                token: null,
                role: null
                // loading: false,
                // error: null
            };

        // case 'UPDATE_USER':
        //     return {
        //         ...state,
        //         user: action.payload,
        //         loading: false,
        //         error: null
        //     };

        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    //     // Initialize auth state from localStorage
    //     useEffect(() => {
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         const token = localStorage.getItem('token');
    //         const role = localStorage.getItem('role');

    //         if (user && token && role) {
    //             dispatch({
    //                 type: 'LOGIN_SUCCESS',
    //                 payload: { user, token, role }
    //             });
    //         }
    //     }, []);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', state.token);
        localStorage.setItem('role', state.role);
    }, [state])

    //     // Persist auth state to localStorage
    //     useEffect(() => {
    //         if (state.user && state.token && state.role) {
    //             localStorage.setItem('user', JSON.stringify(state.user));
    //             localStorage.setItem('token', state.token);
    //             localStorage.setItem('role', state.role);
    //         } else {
    //             localStorage.removeItem('user');
    //             localStorage.removeItem('token');
    //             localStorage.removeItem('role');
    //         }
    //     }, [state.user, state.token, state.role]);

    return (
        // <authContext.Provider value={{ ...state, dispatch }}>
        <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
            {children}
        </authContext.Provider>
    );
};

// export const useAuthContext = () => {
//     const context = useContext(authContext);
//     if (!context) {
//         throw new Error('useAuthContext must be used within an AuthContextProvider');
//     }
//     return context;
// };