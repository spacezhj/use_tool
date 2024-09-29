import {ref} from "vue";

/**
 * 分页hook
 * @param cb {Function} 回调函数
 * @param sizeOption 页脚器的可选项
 */
export const usePagination = (cb: Function, sizeOption: Array<number> = [10, 20, 50, 100]) => {
    const state = ref({
        page: 1,
        size: sizeOption[0],
        total: 0,
        sizeOption
    })
    /**
     * 当前页变化的回调
     * @param page  当前页
     */
    const onChangePage = (page: number) => {
        state.value.page = page
        return cb()
    }
    /**
     * 数量变化的回调
     * @param size  数量
     */
    const onChangeSize = (size: number) => {
        state.value.size = size
        return cb()
    }
    /**
     * 设置总数量 ，一般被动调用
     * @param total 总数
     */
    const setTotal = (total: number) => {
        state.value.total= total
    }
    /**
     * 重置
     */
    const reset = () => {
        state.value.page = 1
        state.value.size = sizeOption[0]
        state.value.total = 0
        return cb()
    }

   return [state, onChangePage, onChangeSize, setTotal, reset]

}

