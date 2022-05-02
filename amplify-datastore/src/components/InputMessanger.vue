<template>
    <div>
        <form action="" class="place__input" @submit.prevent="onSubmit">
            <input type="text" v-model="message_text">
            <button>Отправить</button>
        </form>

    </div>
</template>

<script>
    export default ({
        name: 'InputMessanger',
        data: function () {
            return {
                // тест сообщения из input
                message_text: '',
                // // connect ws
                chatSocket: null,
                // // название комнаты
                // roomName: 'test',
            }
        },
        methods: {
            onSubmit() {
                console.log('submit',this.chatSocket);
                if(this.chatSocket === undefined || this.chatSocket === null){
                    this.chatSocket = this.socket.getConnectSocet();
                }
                this.chatSocket.send(JSON.stringify({
                    'message': this.message_text
                }));
                // this.message_text = '';
            },
        },
        mounted() {
            this.chatSocket = this.socket.getConnectSocet();
        },
        hide(){
            this.socket.disconnect();
        }
    })
</script>

<style scoped>
    .place__input {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .place__input input[type="text"] {
        width: 100%;
    }
</style>