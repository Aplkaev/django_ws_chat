
export default{
    roomName:'test',
    _connect:null,
    getConnectSocet(){
        if(this._connect === undefined || !this._connect){
            this.connect();
        }
        return this._connect;
    },
    connect(){
        this._connect = new WebSocket(
            'ws://127.0.0.1:8000/ws/chat/' + this.roomName + '/');
        console.log('done socket', this._connect);
        this._connect.onclose = function () {
            console.error('Chat socket closed unexpectedly');
        };
    },
    disconnect(){
        if(this._connect === undefined || !this._connect){
            return;
        }
        this._connect.close();
    }
}