<template>
    <div class="w-100">
        Мой id: {{ getMyId }}
        <form action="" @submit.prevent="onSubmit" class="d-flex w-100">
            <b-input-group class="mt-3">
                <b-form-input v-model="nameRoom" placeholder="Название комнаты"></b-form-input>
                <b-input-group-append>
                    <b-button variant="outline-primary" type="submit">Сохранить</b-button>
                </b-input-group-append>
            </b-input-group>
        </form>
        <div class="room__rows">
            <div class="room__row w-100 d-flex justify-content-between align-items-center my-2" v-for="room in rooms"
                 :key="room.name" v-on:click="selectRoom(room)">
                <div class=" px-2">{{ room.name }} : {{ room.users_len }}</div>
                <b-button variant="success" v-id="room.login">Войти</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import axios from 'axios';

export default ({
    computed: mapGetters(['getMyId']),
    name: 'RoomPlace',
    data: function () {
        return {
            nameRoom: '',
            rooms: ''
        }
    },
    methods: {
        onSubmit() {
            this.setRoom(this.nameRoom);
        },
        selectRoom(item) {
            this.setRoom(item.name);
        },
        setRoom(nameRoom) {
            if (nameRoom) {
                this.$store.dispatch('SET_Name_room', nameRoom);
                this.socket.setNameRoom(nameRoom);
            }

        }
    },
    mounted() {
        /**
         *
         *
         * Получение всех комнат которые есть
         */
        axios
            .get('http://0.0.0.0:8000/api/getRooms/')
            .then((response) => {
                console.log('getRooms', response);
                this.rooms = response.data.items;
            });
        if (!this.getMyId || this.getMyId === undefined || this.getMyId === 'undefined') {
            axios
                .get('http://0.0.0.0:8000/api/getMyId/')
                .then((response) => {
                    this.$store.dispatch('SET_MY_ID', response.data.id);
                    this.socket.setMyId(response.data.id);
                });
        } else {
            this.socket.setMyId(this.getMyId);
        }
    },
})
</script>