import * as types from "./mutation_types";

export default {
  [types.PROPRIETAIRE_SHOW_RESET](state) {
    Object.assign(state, {
      error: "",
      isLoading: false,
      retrieved: null,
      hubUrl: null,
    });
  },

  [types.PROPRIETAIRE_SHOW_SET_ERROR](state, error) {
    Object.assign(state, { error });
  },

  [types.PROPRIETAIRE_SHOW_SET_RETRIEVED](state, retrieved) {
    Object.assign(state, { retrieved });
  },

  [types.PROPRIETAIRE_SHOW_SET_HUB_URL](state, hubUrl) {
    Object.assign(state, { hubUrl });
  },

  [types.PROPRIETAIRE_SHOW_TOGGLE_LOADING](state) {
    Object.assign(state, { error: "", isLoading: !state.isLoading });
  },
};
