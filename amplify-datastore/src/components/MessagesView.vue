<template>
    <div class="place__messages">
        <notifications group="error_message" />
        <div v-for="item in getMessages" :key="item.message">
            <div class="place__message">
                <div class="place__item_message" v-bind:class="item.class">
                    {{item.message}}
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default ({
        name: 'MessagesView',
        computed: mapGetters(['getMessages','getMyId']),
        data: function () {
            return {
                items: [
                    // {
                    //     class: 'item_0',
                    //     message: 'Test'
                    // },
                    // {
                    //     class: 'item_1',
                    //     message: 'Test test 2'
                    // }
                ],
                users_len: 0,
                methods: {
                    send: (data) => {
                        // сообщение пришло
                        console.log(data);
                        if(data['user'] == this.getMyId){
                            console.log('my_message');
                            data.class = 'item_my'
                        }
                        this.$store.dispatch('SET_Messages', data);
                    },
                    error: (data) => {
                        // ошибка при отправик сообщении
                        this.$notify({
                            group: 'error_message',
                            title: 'Important message',
                            type: 'error',
                            text: data.message
                        });
                    },
                    users_len: (data) => {
                        // количество людей в комнате
                        this.users_len = data.len;
                        this.$store.state.users_len = this.users_len;
                    },
                }
            }
        },
        mounted() {
            this.$store.dispatch('RM_Messages', []);
            this.chatSocket = this.socket.getConnectSocet();
            this.chatSocket.onmessage = (e) => {
                var data = JSON.parse(e.data);
                // роут для методов из ws
                if (this.methods[data['event']]) {
                    this.methods[data['event']](data);
                }
            };

        },
    })
</script>