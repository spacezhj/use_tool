import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

export const constantRoutes:Array<RouteRecordRaw>  =[
    {
        path:'/test-:type',
        component:()=>import("@/views/test"),
        meta:{}
    }


]



const router= createRouter({
    history:createWebHashHistory(),
    routes:constantRoutes
})



export default router
