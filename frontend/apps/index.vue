<template>
    <div id="app-router" style="height: 100%; width: 100%;">
        <h1 style="text-align: center ; width: 100% ;"> {{ title }}</h1>
        <hr/>
        <div>
            <router-link to="/edit">编辑任务</router-link>
            <router-link to="/list">列表</router-link>
        </div>
        <hr/>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "router",
        data: () => {
            return {
                title: "Todo List Demo"
            }
        }
    }
</script>

<style scoped>

</style>