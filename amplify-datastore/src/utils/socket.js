export default {
    // название комнаты
    roomName: 'test',
    // подключение к ws
    _connect: null,

    setNameRoom(name) {
        /**
         * 
         * Задаем данные для сокет
         * 
         */
        this.roomName = name;
    },
    getConnectSocet() {
        /**
         * 
         * Получаем подключение к ws
         * Если не подключено, то подключаемся
         *  
         */
        if (this._connect === undefined || !this._connect) {
            this.connect();
        }
        return this._connect;
    },
    connect() {
        /**
         * 
         * Подключение к ws
         * 
         */
        this._connect = new WebSocket(
            'ws://127.0.0.1:8000/ws/chat/' + this.roomName + '/');
        console.log('done socket', this._connect);
        this._connect.onclose = function () {
            console.error('Chat socket closed unexpectedly');
        };
    },
    disconnect() {
        /**
         * 
         * Отключение от ws
         * 
         */
        if (this._connect === undefined || !this._connect) {
            return;
        }
        this._connect.close();
    }
}