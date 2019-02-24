const state = {
  users: []
};

const getters = {
  getUsers(state) {
    return state.users;
  }
};

const mutations = {
  SUBMIT_FORM(state, payload) {
    state.users.push(payload);
  }
};

const actions = {
  submitForm({ commit }, payload) {
    commit("SUBMIT_FORM", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
