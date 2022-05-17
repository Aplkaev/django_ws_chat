export default {
    // название комнаты
    roomName: 'test',
    // подключение к ws
    _connect: null,
    // url для разные сокетов
    _urls_sokets:{
        'chat':'ws://127.0.0.1:8000/ws/chat/',
        'rooms':'ws://127.0.0.1:8000/ws/rooms/'
    },
    _main_ws:'chat',
    _my_id:-1,
    setMyId(my_id){
        /**
         * 
         * Задаем id пользователя
         * 
         */
        this._my_id = my_id;
    },
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
    connect(name = 'chat') {
        /**
         * 
         * Подключение к ws
         * 
         */
        this._connect = new WebSocket(this.getLink(name));
        // console.log('done socket', this._connect);
        this._connect.onopen = () =>{
            this._connect.send(JSON.stringify({
                'event':'connect',
                'user':this._my_id
            }));
        }
        this._connect.onclose = () => {
            this.roomName = null;
        };
    },
    getLink(name){
        // TODO: удалить
        // если такого url для scoket нет
        if(this._urls_sokets[name] === undefined){
            return this._urls_sokets[this._main_ws] + this.roomName + '/';
        }
        
        if(name==='chat'){
            return this._urls_sokets[this._main_ws] + this.roomName + '/';
        }

        return this._urls_sokets[name];

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
        this._connect = null;
    }
}