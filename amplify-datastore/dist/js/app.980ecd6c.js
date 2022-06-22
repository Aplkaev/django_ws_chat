(function(){"use strict";var t={4635:function(t,e,s){var n=s(8935),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("PlaceMessanger")],1)},i=[],a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"place__conteiner"},[void 0===t.hasRoomName||null===t.hasRoomName?s("div",{staticClass:"place__input_room"},[s("RoomPlace")],1):s("div",{staticClass:"w-100 d-flex flex-column align-items-center justify-content-between h-100"},[s("div",{staticClass:"w-100 nav p-2"},[s("b-button",{staticClass:"button_back_select_room",attrs:{variant:"outline-primary"},on:{click:t.BackSelectRoom}},[t._v("Назад ")])],1),s("div",{staticClass:"place__border"},[s("MessagesView"),s("InputMessanger")],1),s("div",{staticClass:"user_len w-100"},[s("b-alert",{attrs:{show:""}},[t._v("Количество людей в комнате: "+t._s(t.lenUsersRoom))])],1)])])])},r=[],c=s(4665),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"place__messages"},[s("notifications",{attrs:{group:"error_message"}}),t._l(t.getMessages,(function(e){return s("div",{key:e.message},[s("div",{staticClass:"place__message"},[s("div",{staticClass:"place__item_message",class:e.class},[t._v(" "+t._s(e.message)+" ")])])])})),t.typing.list?s("div",{staticClass:"place__message_typing m-2 position-absolute"},[t._v(" "+t._s(t.typing.list.join(","))+" "),1==t.typing.list.length?s("span",[t._v("печатает")]):t._e(),t.typing.list.length>1?s("span",[t._v("печатают")]):t._e()]):t._e()],2)},u=[],m={name:"MessagesView",computed:(0,c.Se)(["getMessages","getMyId"]),data:function(){return{items:[],typing:{timeout:{},list:[]},users_len:0,methods:{send:t=>{console.log(t),t["user"]==this.getMyId&&(console.log("my_message"),t.class="item_my"),this.$store.dispatch("SET_Messages",t)},error:t=>{console.log(t),t["user"]==this.getMyId&&this.$notify({group:"error_message",title:"Important message",type:"error",text:t.message})},users_len:t=>{this.users_len=t.len,this.$store.state.users_len=this.users_len},person_confirm:()=>{this.chatSocket.send(JSON.stringify({event:"connect",user:this.getMyId}))},typing:t=>{this.typing.list.includes(t["user"])?clearTimeout(this.typing.timeout[t["user"]]):this.typing.list.push(t["user"]),this.typing.timeout[t["user"]]=setTimeout((t=>{let e=this.typing.list.indexOf(t);this.typing.list.splice(e,1),delete this.typing.timeout[t]}),2e3,t["user"])},typing_stop:t=>{if(!this.typing.list.includes(t["user"]))return;let e=this.typing.list.indexOf(t["user"]);this.typing.list.splice(e,1),delete this.typing.timeout[t["user"]]}}}},mounted(){this.$store.dispatch("RM_Messages",[]),this.chatSocket=this.socket.getConnectSocet(),this.chatSocket.onmessage=t=>{var e=JSON.parse(t.data);this.methods[e["event"]]&&this.methods[e["event"]](e)}}},d=m,h=s(3736),_=(0,h.Z)(d,l,u,!1,null,null,null),p=_.exports,g=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",{staticClass:"place__input",attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.onSubmit.apply(null,arguments)}}},[s("b-input-group",[s("b-form-input",{attrs:{placeholder:"Сообщение"},nativeOn:{keydown:function(e){return t.typing.apply(null,arguments)}},model:{value:t.message_text,callback:function(e){t.message_text=e},expression:"message_text"}}),s("b-input-group-append",[s("b-button",{attrs:{variant:"success",type:"submit"}},[t._v("Отправить")])],1)],1)],1)])},f=[],y={computed:(0,c.Se)(["getMyId"]),name:"InputMessanger",data:function(){return{message_text:"",chatSocket:null}},methods:{onSubmit(){void 0!==this.chatSocket&&null!==this.chatSocket||(this.chatSocket=this.socket.getConnectSocet()),this.chatSocket.send(JSON.stringify({event:"message",message:this.message_text,user:this.getMyId})),this.message_text=""},typing(){this.message_text?this.chatSocket.send(JSON.stringify({event:"typing",user:this.getMyId})):this.chatSocket.send(JSON.stringify({event:"typing_stop",user:this.getMyId}))}},mounted(){this.chatSocket=this.socket.getConnectSocet()}},v=y,b=(0,h.Z)(v,g,f,!1,null,null,null),S=b.exports,M=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"w-100"},[t._v(" Мой id: "+t._s(t.getMyId)+" "),s("form",{staticClass:"d-flex w-100",attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.onSubmit.apply(null,arguments)}}},[s("b-input-group",{staticClass:"mt-3"},[s("b-form-input",{attrs:{placeholder:"Название комнаты"},model:{value:t.nameRoom,callback:function(e){t.nameRoom=e},expression:"nameRoom"}}),s("b-input-group-append",[s("b-button",{attrs:{variant:"outline-primary",type:"submit"}},[t._v("Сохранить")])],1)],1)],1),s("div",{staticClass:"room__rows"},t._l(t.rooms,(function(e){return s("div",{key:e.name,staticClass:"room__row w-100 d-flex justify-content-between align-items-center my-2",on:{click:function(s){return t.selectRoom(e)}}},[s("div",{staticClass:" px-2"},[t._v(t._s(e.name)+" : "+t._s(e.users_len))]),s("b-button",{directives:[{name:"id",rawName:"v-id",value:e.login,expression:"room.login"}],attrs:{variant:"success"}},[t._v("Войти")])],1)})),0)])},k=[],w=s(6166),x=s.n(w),R={computed:(0,c.Se)(["getMyId"]),name:"RoomPlace",data:function(){return{nameRoom:"",rooms:""}},methods:{onSubmit(){this.setRoom(this.nameRoom)},selectRoom(t){this.setRoom(t.name)},setRoom(t){t&&(this.$store.dispatch("SET_Name_room",t),this.socket.setNameRoom(t))}},mounted(){x().get("http://127.0.0.1:8000/api/getRooms/").then((t=>{console.log("getRooms",t),this.rooms=t.data.items})),this.getMyId&&void 0!==this.getMyId&&"undefined"!==this.getMyId?this.socket.setMyId(this.getMyId):x().get("http://127.0.0.1:8000/api/getMyId/").then((t=>{this.$store.dispatch("SET_MY_ID",t.data.id),this.socket.setMyId(t.data.id)}))}},I=R,O=(0,h.Z)(I,M,k,!1,null,null,null),C=O.exports,N={name:"PlaceMessanger",components:{MessagesView:p,InputMessanger:S,RoomPlace:C},computed:(0,c.Se)(["lenUsersRoom","hasRoomName"]),data:function(){return{users_len:0,methods:{}}},methods:{BackSelectRoom(){this.$store.dispatch("SET_Name_room",null),this.socket.disconnect()}}},E=N,T=(0,h.Z)(E,a,r,!1,null,null,null),j=T.exports,P={name:"App",components:{PlaceMessanger:j},mounted(){}},$=P,Z=(0,h.Z)($,o,i,!1,null,null,null),J=Z.exports,A=s(8729),D=s.n(A),U=s(9483),V={roomName:"test",_connect:null,_urls_sokets:{chat:"ws://127.0.0.1:8000/ws/chat/",rooms:"ws://127.0.0.1:8000/ws/rooms/"},_main_ws:"chat",_my_id:-1,setMyId(t){this._my_id=t},setNameRoom(t){this.roomName=t},getConnectSocet(){return void 0!==this._connect&&this._connect||this.connect(),this._connect},connect(t="chat"){this._connect=new WebSocket(this.getLink(t)),this._connect.onopen=()=>{this._connect.send(JSON.stringify({event:"connect",user:this._my_id}))},this._connect.onclose=()=>{this.roomName=null}},getLink(t){return void 0===this._urls_sokets[t]||"chat"===t?this._urls_sokets[this._main_ws]+this.roomName+"/":this._urls_sokets[t]},disconnect(){void 0!==this._connect&&this._connect&&(this._connect.close(),this._connect=null)}};n["default"].use(c.ZP);var B=new c.ZP.Store({actions:{SET_Name_room:(t,e)=>{t.commit("Set_name_room",e)},SET_Messages:(t,e)=>{t.commit("Add_messages",e)},RM_Messages(t){t.commit("Rm_messages")},SET_MY_ID(t,e){t.commit("Set_my_id",e)}},mutations:{Set_name_room(t,e){t.roomName=e},Add_messages(t,e){t.messages.push(e)},Rm_messages(t){t.messages.splice(0,t.messages.length)},Set_my_id(t,e){t.id=e,localStorage.setItem("my_id_client_message",e)}},state:{users_len:0,messages:[],roomName:null,id:0},getters:{lenUsersRoom(t){return t.users_len},getMessages(t){return t.messages},hasRoomName(t){return t.roomName},getMyId(t){if(!t.id||void 0===t.id){let e=localStorage.getItem("my_id_client_message");t.id=void 0!==e&&e?e:0}return t.id}},modules:{}}),L=s(8262),Y=s(3266);s(44);n["default"].use(L.XG7),n["default"].use(Y.A7),n["default"].use(U.Z,x()),n["default"].config.productionTip=!1,n["default"].prototype.socket=V,n["default"].use(D()),new n["default"]({socket:V,store:B,render:t=>t(J)}).$mount("#app")}},e={};function s(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.loaded=!0,i.exports}s.m=t,function(){s.amdO={}}(),function(){var t=[];s.O=function(e,n,o,i){if(!n){var a=1/0;for(u=0;u<t.length;u++){n=t[u][0],o=t[u][1],i=t[u][2];for(var r=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(s.O).every((function(t){return s.O[t](n[c])}))?n.splice(c--,1):(r=!1,i<a&&(a=i));if(r){t.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[n,o,i]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.hmd=function(t){return t=Object.create(t),t.children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t}}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,i,a=n[0],r=n[1],c=n[2],l=0;if(a.some((function(e){return 0!==t[e]}))){for(o in r)s.o(r,o)&&(s.m[o]=r[o]);if(c)var u=c(s)}for(e&&e(n);l<a.length;l++)i=a[l],s.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return s.O(u)},n=self["webpackChunkamplify_datastore"]=self["webpackChunkamplify_datastore"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(4635)}));n=s.O(n)})();
//# sourceMappingURL=app.980ecd6c.js.map