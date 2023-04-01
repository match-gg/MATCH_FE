import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstTerm: false,
  secondTerm: false,
  representative: '',
  games: {
    lol: '',
    pubg: '',
    overwatch: '',
    lostark: '',
    maplestory: '',
  },
  gamesCheck: {
    lol: true,
    pubg: true,
    overwatch: true,
    lostark: true,
    maplestory: true,
  },
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    SET_FIRST_TERM: (state, action) => {
      state.firstTerm = action.payload;
    },
    SET_SECOND_TERM: (state, action) => {
      state.secondTerm = action.payload;
    },
    SET_REPRESENTATIVE: (state, action) => {
      state.representative = action.payload;
    },
    SET_GAMES: (state, action) => {
      state.games = action.payload;
    },
    SET_GAMES_WITH_ID: (state, action) => {
      state.games[action.payload.id] = action.payload.value;
      state.gamesCheck[action.payload.id] = false;
    },
    SET_GAMESCHECK_WITH_ID: (state, action) => {
      state.gamesCheck[action.payload.id] = true;
    },
    DELETE_REGISTER: (state, _action) => {
      state.representative = '';
      state.games = {
        lol: '',
        pubg: '',
        overwatch: '',
        lostark: '',
        maplestory: '',
      };
      state.gamesCheck = {
        lol: true,
        pubg: true,
        overwatch: true,
        lostark: true,
        maplestory: true,
      };
    },
  },
});

export const registerActions = registerSlice.actions;

export default registerSlice;
