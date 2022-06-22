<template>
    <div>
        <div class="place__conteiner">
            <div class="place__input_room" v-if="hasRoomName === undefined || hasRoomName === null">
                <RoomPlace/>
            </div>
            <div v-else class="w-100 d-flex flex-column align-items-center justify-content-between h-100">
                <div class="w-100 nav p-2">
                    <b-button class="button_back_select_room" variant="outline-primary" @click="BackSelectRoom">Назад
                    </b-button>
                </div>
                <div class="place__border">
                    <MessagesView/>
                    <InputMessanger/>
                </div>

                <div class="user_len w-100">
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