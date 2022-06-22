<template>
    <div class="place__messages">
        <notifications group="error_message"/>
        <div v-for="item in getMessages" :key="item.message">
            <div class="place__message">
                <div class="place__item_message" v-bind:class="item.class">
                    {{ item.message }}
                </div>
            </div>
        </div>
        <div class="place__message_typing m-2 position-absolute" v-if="typing.list">
            {{ typing.list.join(',') }}
            <span v-if="typing.list.length == 1">печатает</span>
            <span v-if="typing.list.length > 1">печатают</span>
        </div>
    </div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default ({
    name: 'MessagesView',
    computed: mapGetters(['getMessages', 'getMyId']),
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
            // кто сейчас пишет
            typing: {
                timeout: {},
                list: []
            },
            // количество людей в комате
            users_len: 0,
            methods: {
                send: (data) => {
                    // сообщение пришло
                    console.log(data);
                    if (data['user'] == this.getMyId) {
                        console.log('my_message');
                        data.class = 'item_my'
                    }
                    this.$store.dispatch('SET_Messages', data);
                },
                error: (data) => {
                    console.log(data);
                    // ошибка при отправик сообщении
                    if (data['user'] == this.getMyId) {
                        this.$notify({
                            group: 'error_message',
                            title: 'Important message',
                            type: 'error',
                            text: data.message
                        });
                    }

                },
                users_len: (data) => {
                    // количество людей в комнате
                    this.users_len = data.len;
                    this.$store.state.users_len = this.users_len;
                },
                person_confirm: () => {
                    this.chatSocket.send(JSON.stringify({
                        'event': 'connect',
                        'user': this.getMyId
                    }));
                },
                typing: (data) => {
                    // оповещение печатает
                    // уже пишет и обновляем таймер
                    if (this.typing.list.includes(data['user'])) {
                        clearTimeout(this.typing.timeout[data['user']]);
                    } else {
                        // до этого не писал
                        this.typing.list.push(data['user']);
                    }
                    this.typing.timeout[data['user']] = setTimeout((user) => {
                        let user_id = this.typing.list.indexOf(user);
                        this.typing.list.splice(user_id, 1);
                        delete this.typing.timeout[user];
                    }, 2000, data['user']);
                },
                typing_stop: (data) => {
                    // убираем принудительно пользователя что он пишет
                    if (!this.typing.list.includes(data['user']))
                        return;
                    let user_id = this.typing.list.indexOf(data['user']);
                    this.typing.list.splice(user_id, 1);
                    delete this.typing.timeout[data['user']];
                }
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