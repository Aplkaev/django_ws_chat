<template>
    <div>
        <div class="place__conteiner p-4">
            <div class="place__input_room" v-if="hasRoomName === undefined || hasRoomName === null">
                <RoomPlace />
            </div>
            <div v-else class="place__border">
                <MessagesView />
                <InputMessanger />
                <div class="user_len">
                    Количество людей в комнате: {{ lenUsersRoom }}
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
        mounted() {

        },
    })
</script>