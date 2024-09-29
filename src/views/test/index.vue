<script setup lang="ts">
//设置组件的名称
import {computed, defineComponent} from "vue";
// import use from "@/views/useCommand";
import use from "@/views/useCommand/index.vue"
import {useRoute} from "vue-router"
import User from "@/api/user.ts";
const route:any = useRoute()

defineComponent({
    name: "111"
})
const state = {
    0:use
}
const componentKey=computed(()=>{
    console.log("当前组件==>",route.params.type, state[route.params.type])
    return state[route.params?.type]
})


</script>

<template>
    <div>
      <el-text type="danger">我是test</el-text>
        <component :is="componentKey"></component>
    </div>
</template>

<style scoped>

</style>
