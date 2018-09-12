<template>
    <div>
        <div v-if="!taskManOk">
            <input style="margin-bottom: 10px; font-size: 24px;" v-model="taskMan"/>
            <button style="font-size: 24px;" @click="inputMan">选择指派人</button>
        </div>
        <h2 v-if="taskManOk"> 接收人 {{taskMan}}</h2>
        <table border="1" cellspacing="0">
            <thead>
            <th>#</th>
            <th>任务名称</th>
            <th>任务指派</th>
            <th>操作</th>
            </thead>
            <tbody>
            <tr v-for="(value,key,index) in todoList">
                <td>{{value.id}}</td>
                <td>{{value.name}}</td>
                <td>{{value.man}}</td>
                <td>
                    <button class="edit-delete" @click="deleteTask(value.id,value.man)">
                        <svgicon icon="delete" height="28" width="28"></svgicon>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import "../static/icon/confirm"
    import "../static/icon/delete"
    import socketio from 'socket.io-client'
    export default {
        name: "list",
        data : ()=>{
            return {
                todoList:[],
                taskMan: "",
                taskManOk : false ,

            }
        },
        mounted : function(){
            this.socketio = socketio("http://127.0.0.1:3001", {
                path: '/tasks'
            });
        },
        methods : {
            inputMan : function(){
                if(this.taskMan === "") {
                    alert("can not null");
                    return null;
                }
                this.taskManOk =  true;
                let svue = this;
                console.log("modify_msg_" + this.taskMan)
                this.socketio.on("modify_msg_"+this.taskMan,function(message){
                    console.log(message)
                    let msg = JSON.parse(message);
                    if(msg.type === "delete") {
                        let id = msg.id;
                        svue.todoList = svue.todoList.filter((item)=>{
                            if(item.id === id){
                                return false;
                            }
                            return true;
                        })
                    }else if(msg.type === "add") {
                        svue.todoList.push(msg.data)
                    }
                })
            } ,
            deleteTask : function(id , man , event){
                this.socketio.emit("del_task",JSON.stringify({id:id,man:man}))
                this.todoList = this.todoList.filter((item)=>{
                    if(item.id === id){
                        return false;
                    }
                    return true;
                })
            }
        },
    }
</script>

<style scoped>
    table {
        width: 100%;
    }
    th:first-child{
        width: 5%;
    }
    th:last-child {
        width: 5%;
    }
    th:nth-child(3) {
        width: 10%;
    }
    td {
        text-align: center;
        line-height: 36px;
    }
    .edit-input{
        margin-top: 3px;
        margin-bottom: 3px;
        width: 92%;
        font-size: 24px;
        margin-left: 4%;
        margin-right: 4%;
    }

</style>