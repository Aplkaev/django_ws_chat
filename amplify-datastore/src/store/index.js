import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        SET_Messages:(context, messages) => {
            context.commit('Add_messages', messages);
        }
    },
    mutations:{
        Add_messages(state, payload){
            state.messages.push(payload)
            // state.messages = payload;
        }
    },
    state:{
        users_len:0,
        messages:[]
    },
    getters:{
        lenUsersRoom(state){
            return state.users_len;
        },
        getMessages(state){
            return state.messages;
        },
    },
    modules:{}
})