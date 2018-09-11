<template>
    <div>
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
                    <button class="edit-delete" @click="deleteTask(value.id)">
                        <svgicon icon="delete" height="28" width="28"></svgicon>
                    </button>
                </td>
            </tr>

            <tr>
                <td>
                    添加
                </td>
                <td>
                    <input v-model="taskName" class="edit-input">
                </td>
                <td>
                    <input v-model="taskMan" class="edit-input">
                </td>
                <td>
                    <button class="edit-confirm" @click="confirmTask">
                        <svgicon icon="confirm" height="28" width="28"></svgicon>
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
        name: "edit",
        data: () => {
            return {
                todoList: [],
                taskName: "",
                taskMan: "",
            }
        },
        mounted: function () {
            this.socketio = socketio("http://127.0.0.1:3001", {
                path: '/tasks'
            });
        },
        methods: {
            confirmTask: function (event) {
                let taskName = this.taskName.trim();
                let taskMan = this.taskMan.trim();
                if (taskName === "" || taskMan === "") {
                    alert("can not null");
                    return;
                }
                this.taskName = "";
                this.taskMan = "";
                let taskItem = {
                    id: this.todoList.length + 1,
                    name: taskName,
                    man: taskMan
                };
                this.socketio.emit("add_task",JSON.stringify(taskItem));
                this.todoList.push(taskItem);
            },
            deleteTask: function (id, event) {
                this.socketio.emit("del_task",JSON.stringify({id:id}))
                this.todoList = this.todoList.filter((item) => {
                    if (item.id === id) {
                        return false;
                    }
                    return true;
                })
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
    }

    th:first-child {
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

    .edit-input {
        margin-top: 3px;
        margin-bottom: 3px;
        width: 92%;
        font-size: 24px;
        margin-left: 4%;
        margin-right: 4%;
    }

</style>