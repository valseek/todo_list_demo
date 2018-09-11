<template>
    <h1 style="text-align: center ; width: 100% ;"> {{ title }}</h1>
    <hr/>
    <p>
        <router-link to="/edit">编辑任务</router-link>
        <router-link to="/list">列表</router-link>
    </p>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "header",

    }
</script>

<style scoped>

</style>