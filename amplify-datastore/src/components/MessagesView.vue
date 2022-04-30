<template>
    <div class="place__messages">
        <div v-for="item in items" :key="item.message">
            <div class="place__message">
                <div class="place__item_message" v-bind:class="item.class">
                    {{item.message}}
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default ({
        name: 'MessagesView',
        data: function () {
            return {
                items: [
                    {
                        class: 'item_0',
                        message: 'Test'
                    },
                    {
                        class: 'item_1',
                        message: 'Test test 2'
                    }
                ],
            }
        },
        mounted() {
            this.chatSocket = this.socket.getConnectSocet();
            this.chatSocket.onmessage = (e) => {
                var data = JSON.parse(e.data);
                this.items.push(data);
            };
            this.chatSocket.onclose = function() {
                console.error('Chat socket closed unexpectedly');
            };
        },
        hide(){
            this.socket.disconnect();
        }
    })
</script>
<style scoped>
    .place__messages {
        width: 100%;
        height: 100%;
    }

    .place__message {
        margin: 1em;
    }

    .place__item_message {
        border-radius: 5px;
        padding: 5px;
        overflow: scroll;
    }

    .item_0 {
        background: rgb(247, 93, 34);
    }

    .item_1 {
        background: rgb(128, 10, 115);
        color: #fff;
    }

    .item_2 {
        background: rgb(136, 147, 37);
    }

    .item_3 {
        background: rgb(110, 2, 253);
    }

    .item_4 {
        background: rgb(52, 101, 130);
    }

    .item_5 {
        background: rgb(208, 126, 84);
    }

    .item_6 {
        background: rgb(237, 111, 254);
    }

    .item_7 {
        background: rgb(37, 4, 207);
    }

    .item_8 {
        background: rgb(37, 4, 207);
    }

    .item_9 {
        background: rgb(37, 4, 207);
    }
</style>