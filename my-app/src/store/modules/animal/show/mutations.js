import * as types from "./mutation_types";

export default {
  [types.ANIMAL_SHOW_RESET](state) {
    Object.assign(state, {
      error: "",
      isLoading: false,
      retrieved: null,
      hubUrl: null,
    });
  },

  [types.ANIMAL_SHOW_SET_ERROR](state, error) {
    Object.assign(state, { error });
  },

  [types.ANIMAL_SHOW_SET_RETRIEVED](state, retrieved) {
    Object.assign(state, { retrieved });
  },

  [types.ANIMAL_SHOW_SET_HUB_URL](state, hubUrl) {
    Object.assign(state, { hubUrl });
  },

  [types.ANIMAL_SHOW_TOGGLE_LOADING](state) {
    Object.assign(state, { error: "", isLoading: !state.isLoading });
  },
};
