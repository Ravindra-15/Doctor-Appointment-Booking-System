/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useReducer } from "react";
import { getToken } from "../config";

const readStoredUser = () => {
    try {
        const raw = localStorage.getItem("user");
        return raw && raw !== "undefined" ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const readStoredRole = () => {
    const role = localStorage.getItem("role");
    return role && role !== "null" && role !== "undefined" ? role : null;
};

const initialState = {
    user: readStoredUser(),
    role: readStoredRole(),
    token: getToken(),
};

const emptyState = { user: null, role: null, token: null };

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
        case "LOGIN_FAILURE":
        case "LOGOUT":
            return emptyState;

        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };

        case "UPDATE_USER":
            return { ...state, user: { ...state.user, ...action.payload } };

        default:
            return state;
    }
};

// Write to localStorage (or clear it) — never store the string "null"
const persistAuth = ({ user, token, role }) => {
    if (user && token && role) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, baseDispatch] = useReducer(authReducer, initialState);

    // Persist synchronously so that requests fired right after login/logout
    // (which read the token from localStorage) already see the new value.
    const dispatch = useCallback((action) => {
        if (action.type === "UPDATE_USER") {
            const user = { ...readStoredUser(), ...action.payload };
            localStorage.setItem("user", JSON.stringify(user));
        } else if (["LOGIN_START", "LOGIN_FAILURE", "LOGOUT", "LOGIN_SUCCESS"].includes(action.type)) {
            persistAuth(authReducer(emptyState, action));
        }
        baseDispatch(action);
    }, []);

    return (
        <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
            {children}
        </authContext.Provider>
    );
};
