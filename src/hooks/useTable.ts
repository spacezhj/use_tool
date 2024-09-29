import {Ref, ref, UnwrapRef} from "vue";

interface UseTable<T> {
    0:Array<T>;
    1:(...args:any)=>void
}

/**
 * 表格的hooks
 * @param api {Function} api接口
 * @returns  {[]}  返回数据源和刷新数据的方法
 */
export const useTable = (api: Function) :[Ref<UnwrapRef<any[]>>, () => void] => {
    //数据源
    const data = ref([]);
    /**
     * 刷新数据
     */
    const refresh = () => {
        api().then((res: any) => {
            console.log("res ==>", res)
            const {list} = res.result
            data.value = list
        })
    }
    refresh()
    return [data, refresh]

}
