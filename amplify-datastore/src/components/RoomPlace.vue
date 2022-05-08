<template>
    <div class="w-100">
        <form action="" @submit.prevent="onSubmit" class="d-flex w-100">
            <b-form-input v-model="nameRoom" placeholder="Название комнаты"></b-form-input>
            <b-button variant="outline-primary" type="submit">Сохранить</b-button>
        </form>
        <div class="room__rows">
            <div class="room__row">
                {{ rooms }}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default ({
        name: 'RoomPlace',
        data: function () {
            return {
                nameRoom: null,
                rooms: ''
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('SET_Name_room', this.nameRoom);
                this.socket.setNameRoom(this.nameRoom);
            },
        },
        mounted() {
            /**
             * 
             * 
             * Получение всех комнат которые есть
             */
            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => (this.info = response));
            this.rooms = '';
        }
    })
</script>