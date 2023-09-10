const state = {
    isAuth : localStorage.getItem('auth') === 'true'
}

const mutations = {
    SET_LOGGED_IN(state){
        state.isAuth = true;
    },

    SET_LOGGED_OUT(state){
        state.isAuth = false;
    }
}

const actions = {
    async login({commit}, loginData){
        try {
            if(loginData.email === 'user@example.com'){
                if(loginData.password === 'admin'){
                    localStorage.setItem('auth', true);
                    commit('SET_LOGGED_IN')
                    return 'logged in';
                }
                return 'wrong password';
            }
            return 'no such user';
        } catch (error) {
            console.error('error logging in')
        }
    },
    async logout({commit}){
        try {
            localStorage.setItem('auth', false);
            commit('SET_LOGGED_OUT');
            return 'logged out';
        } catch (error) {
            console.error('error logging out')
        }
    }
}

const getters = {
    isAuth: (state) => state.isAuth,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
  