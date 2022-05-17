<template>
    <div>

        <form action="" @submit.prevent="onSubmit" class="place__input">
            <b-input-group>
                <b-form-input v-model="message_text" placeholder="Сообщение"></b-form-input>
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
        },
        mounted() {
            this.chatSocket = this.socket.getConnectSocet();
        }
    })
</script>
