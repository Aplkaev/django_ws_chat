<template>
    <div>
        <div class="place__conteiner">
            <div class="place__border">
                <MessagesView />
                <InputMessanger />
            </div>
        </div>
        <div class="user_len">
            Количество людей в комнате: {{ lenUsersRoom }}
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    import MessagesView from './MessagesView.vue';
    import InputMessanger from './InputMessanger.vue';
    export default ({
        name: 'PlaceMessanger',
        components: {
            MessagesView,
            InputMessanger
        },
        // computed: {
        //     lenUsersRoom(state) {
        //         return this.$store.getters.lenUsersRoom;
        //     }
        // },
        computed:mapGetters(['lenUsersRoom']),
        data: function () {
            return {
                users_len: 0,
                methods: {
                    // users_len: (data) => {
                    //     this.users_len = data.len;
                    // }
                }
            }
        },
        mounted() {

        }
    })
</script>


<style scoped>
    .place__conteiner {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .place__border {
        /* border: 1px solid; */
        display: flex;
        flex-direction: column;
        height: 90%;
        width: 100%;
        max-width: 800px;
        backdrop-filter: #000;
        -webkit-box-shadow: 3px 4px 32px -14px rgba(34, 60, 80, 0.2) inset;
        -moz-box-shadow: 3px 4px 32px -14px rgba(34, 60, 80, 0.2) inset;
        box-shadow: 3px 4px 32px -14px rgba(34, 60, 80, 0.2) inset;
    }

    .user_len {
        position: absolute;
        left: 10px;
        top: 10px;
    }
</style>