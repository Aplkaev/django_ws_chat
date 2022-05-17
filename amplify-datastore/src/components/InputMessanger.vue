<template>
    <div>

        <form action="" @submit.prevent="onSubmit" class="place__input">
            <b-input-group>
                <b-form-input v-model="message_text" placeholder="Сообщение" @keydown.native="typing"></b-form-input>
                <b-input-group-append>
                    <b-button variant="success" type="submit">Отправить</b-button>
                </b-input-group-append>
            </b-input-group>
        </form>

    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default ({
        computed: mapGetters(['getMyId']),
        name: 'InputMessanger',
        data: function () {
            return {
                // тест сообщения из input
                message_text: '',
                // // connect ws
                chatSocket: null,
                // // название комнаты
            }
        },
        methods: {
            onSubmit() {
                if (this.chatSocket === undefined || this.chatSocket === null) {
                    this.chatSocket = this.socket.getConnectSocet();
                }
                this.chatSocket.send(JSON.stringify({
                    'event':'message',
                    'message': this.message_text,
                    'user':this.getMyId
                }));
                this.message_text = '';
            },
            typing() {
                // поле сообщение не пустое
                if(this.message_text){
                    this.chatSocket.send(JSON.stringify({
                        'event':'typing',
                        'user':this.getMyId
                    }));
                }else{
                    // пусто поле и "перестаем писать"
                    this.chatSocket.send(JSON.stringify({
                        'event':'typing_stop',
                        'user':this.getMyId
                    }));
                }

            }
        },
        mounted() {
            this.chatSocket = this.socket.getConnectSocet();
        }
    })
</script>
