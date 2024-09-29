<script setup lang="ts">
import User from "@/api/user.ts";
import CustomTable from "@/components/CustomTable/index.vue";
import {ref} from "vue";
import {useTable} from "@/hooks/useTable.ts";
const state = ref({
    list: [],
    total: 0,
    size: 5,
    page: 1
})
const headerList = [
    {
        show: true,
        type: "index",
        width: "100",
        label: "序号",
        align: "center",
    },
    {
        show: true,
        prop: "name",
        width: "150",
        label: "姓名",
        align: "center",
    },
    {
        show: true,
        prop: "age",
        width: "150",
        label: "年龄",
        align: "center",
    }
]
const getList = () => {
    // User.getUserList({
    //     page: state.value.page,
    //     size: state.value.size
    // }).then((res) => {
    //     const {list, total} = res.result
    //     console.log("list ==>", res)
    //     state.value.list = list
    //     state.value.total = total
    // })
}
// getList()
const [list,refresh]= useTable(User.getUserList)
</script>

<template>
    <div>
        <el-button @click="refresh">刷新</el-button>
        <CustomTable
                :data="list"
                :pageSizes="state.size"
                :currentPage="state.page"
                :total="state.total"
                :tableHeader="headerList"
        ></CustomTable>
<!--                @updata:page=" state.page = $event; getList(); "-->
<!--                @updata:size="state.size = $event; getList(); "-->


        <!--        <el-table
                        :data="state.list"

                >
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="180"
                    ></el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180"
                    ></el-table-column>
                    <el-table-column
                            prop="age"
                            label="性别"
                            width="180"
                    ></el-table-column>
                </el-table>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="5"
                        :total="state.total"
                ></el-pagination>-->
    </div>
</template>

<style scoped>

</style>
