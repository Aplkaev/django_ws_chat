<template>
    <div>
        <div class="place__conteiner p-4">
            <div class="place__input_room" v-if="hasRoomName === undefined || hasRoomName === null">
                <RoomPlace />
            </div>
            <div v-else class="place__border">
                <b-button class="button_back_select_room" variant="outline-primary" @click="BackSelectRoom">Назад
                </b-button>
                <MessagesView />
                <InputMessanger />
                <div class="user_len">
                    <b-alert show>Количество людей в комнате: {{ lenUsersRoom }}</b-alert>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    import MessagesView from './MessagesView.vue';
    import InputMessanger from './InputMessanger.vue';
    import RoomPlace from './RoomPlace.vue';
    export default ({
        name: 'PlaceMessanger',
        components: {
            MessagesView,
            InputMessanger,
            RoomPlace
        },
        computed: mapGetters(['lenUsersRoom', 'hasRoomName']),
        data: function () {
            return {
                users_len: 0,
                methods: {}
            }
        },
        methods: {
            BackSelectRoom() {
                this.$store.dispatch('SET_Name_room', null);
                this.socket.disconnect();
            }
        },
    })
</script>