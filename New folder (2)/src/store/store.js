import { configureStore } from '@reduxjs/toolkit';

// Initial state for the application
const initialState = {
  user: {
    name: localStorage.getItem('userName') || null,
    email: null,
    role: localStorage.getItem('userRole') || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  notifications: [],
  theme: 'light',
};

// User Reducer
const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('userRole', action.payload.role);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case 'USER_LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      return {
        name: null,
        email: null,
        role: null,
        token: null,
        isAuthenticated: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Notifications Reducer
const notificationsReducer = (state = initialState.notifications, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload];
    case 'REMOVE_NOTIFICATION':
      return state.filter(notif => notif.id !== action.payload);
    case 'CLEAR_NOTIFICATIONS':
      return [];
    default:
      return state;
  }
};

// Theme Reducer
const themeReducer = (state = initialState.theme, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state === 'light' ? 'dark' : 'light';
    case 'SET_THEME':
      return action.payload;
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = {
  user: userReducer,
  notifications: notificationsReducer,
  theme: themeReducer,
};

// Configure Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['USER_LOGIN', 'UPDATE_USER'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Action Creators
export const loginUser = (userData) => ({
  type: 'USER_LOGIN',
  payload: userData,
});

export const logoutUser = () => ({
  type: 'USER_LOGOUT',
});

export const updateUser = (userData) => ({
  type: 'UPDATE_USER',
  payload: userData,
});

export const addNotification = (notification) => ({
  type: 'ADD_NOTIFICATION',
  payload: {
    id: Date.now(),
    ...notification,
  },
});

export const removeNotification = (id) => ({
  type: 'REMOVE_NOTIFICATION',
  payload: id,
});

export const clearNotifications = () => ({
  type: 'CLEAR_NOTIFICATIONS',
});

export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

export const setTheme = (theme) => ({
  type: 'SET_THEME',
  payload: theme,
});

export default store;
