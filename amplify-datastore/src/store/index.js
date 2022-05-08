import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        SET_Name_room:(context, name) => {
            /**
             * 
             * Коммитим в стате название комнаты
             * 
             */
            context.commit('Set_name_room', name);

        },
        SET_Messages:(context, messages) => {
            /**
             * 
             * Коммитит изменения сообщений
             * 
             */
            context.commit('Add_messages', messages);
        }
    },
    mutations:{
        Set_name_room(state, payload){
            /**
             * 
             * Добавление название комнаты в state
             * 
             */
            state.roomName = payload;
        },
        Add_messages(state, payload){
            /**
             * 
             * Добавляем сообщение в список
             * 
             * TODO: пока никакой проверки
             * 
             */
            state.messages.push(payload)
        }
    },
    state:{
        // количество людей в комнате
        users_len:0,
        // список сообщений 
        messages:[],
        roomName:null
    },
    getters:{
        lenUsersRoom(state){
            /**
             * 
             * Вернем количество людей в комнате
             * 
             * Которое последние заполнили
             * 
             */
            return state.users_len;
        },
        getMessages(state){
            /**
             * 
             * Вернем сообщения
             * 
             */
            return state.messages;
        },
        hasRoomName(state){
            /**
             * 
             * Вернем название комнаты
             * 
             */
            return state.roomName;
        }
    },
    modules:{}
})