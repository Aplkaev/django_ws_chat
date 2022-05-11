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
        },
        RM_Messages(context){
            /**
             * 
             * Коммит удаление сообщений из стате
             * 
             */
            context.commit('Rm_messages');
        },
        SET_MY_ID(context, id){
            /**
             * 
             * Коммитем id пользователя
             * 
             */
            context.commit('Set_my_id', id);
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
        },
        Rm_messages(state){
            /**
             * 
             * Удаляем сообщения из стате
             * 
             */
            state.messages.splice(0,state.messages.length);
        },
        Set_my_id(state, id){
            /**
             * 
             * Задаем id пользователю для чата
             * 
             */
            state.id = id;
            localStorage.setItem('my_id_client_message',id);
        }
    },
    state:{
        // количество людей в комнате
        users_len:0,
        // список сообщений 
        messages:[],
        roomName:null,
        id:0
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
        },
        getMyId(state){
            /**
             * 
             * Вернем id пользователя
             * 
             */
            if(!state.id || state.id === undefined){
                let id = localStorage.getItem('my_id_client_message');
                if(id !== undefined && id){
                    state.id = id;
                }else{
                    state.id = 0;
                }
            }
            return state.id;
        }
    },
    modules:{}
})