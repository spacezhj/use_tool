<template>
  <div>
    <el-table
      class="custom_table"
      ref="customtable"
      :class="openRowClick ? 'normal_table': ''"
      :element-loading-text="elementLoadingText"
      :element-loading-spinner="elementLoadingSpinner"
      :element-loading-sackground="elementLoadingBackground"
      v-loading="loading"
      :row-key="rowKey"
      :max-height="maxHeight"
      :stripe="stripe"
      :data="data"
      :border="border"
      @selection-change="tableSelectionChange"
      @filter-change="filterChange"
      :highlight-current-row="openRowClick"
      @current-change="rowClick"
      row-class-name="blue_row"
    >
      <template
        v-for="(item,index) in tableHeader"
        :key="index"
      >
        <template v-if="item.show">
          <!-- 多选框 -->
          <el-table-column
            v-if="item.type == 'selection'"
            :type="item.type"
            :label="item.label"
            :width="item.width"
            :align="item.align"
            :selectable="optionalRules"
            :reserve-selection="reserveSelection"
          >
          </el-table-column>
          <!-- 索引行 -->
          <el-table-column
            v-else-if="item.type == 'index'"
            :label="item.label"
            :width="item.width"
            :align="item.align"
          >
            <template #default="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type == 'image'"
            :label="item.label"
            :width="item.width"
            :prop="item.prop"
            :align="item.align"
            :sortable="item.sortable"
          >
            <template #default="scope">
              <div
                class="content-image"
                @click="watchImage(scope.row[item.prop])"
              ><img :src="scope.row[item.prop]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type == 'date'"
            :label="item.label"
            :width="item.width"
            :min-prop="item.prop"
            :align="item.align"
            :sortable="item.sortable"
          >
            <template #default="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ item.formatter ? item.formatter(scope.row) : scope.row[item.prop]
                }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type == 'slot'"
            :label="item.label"
            :min-width="item.width"
            :fixed="item.fixed"
            :align="item.align"
            :sortable="item.sortable"
          >
            <template #default="scope">
              <slot
                :name="item.prop"
                :row="(scope.row)"
              ></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type == 'handle'"
            :label="item.label"
            :min-width="item.width"
            :fixed="item.fixed"
            :align="item.align"
          >
            <template #default="scope">
              <slot
                name="handles"
                :row="(scope.row)"
                :index="(scope.$index)"
              ></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :label="item.label"
            :min-width="item.width"
            :prop="item.prop"
            :formatter="item.formatter"
            :align="item.align"
            :sortable="item.sortable"
          >
            <template #default="{row}">
              {{(row[item.prop] == '0.00' || !row[item.prop]) ? emptyText :row[item.prop]}}
            </template>
          </el-table-column>
        </template>
      </template>
      <template #empty>
        <div class="no_data_box flex_center">
<!--          <img src="@/assets/invoice/empty.png" alt="">-->
          <p>暂无数据</p>
        </div>
      </template>
    </el-table>
    <div class="flex_jus_between" v-if="total > 0">
      <div>
        <slot name="nav"></slot>
      </div>
      <div
        :class="isRightPage ? 'top_nav' : 'paginations'"
        v-if="isShowPage"
      >
        <el-pagination
          v-if="showPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :currentPage="currentPage"
          :page-sizes="[5,10, 50, 100, 200]"
          :page-size="pageSizes"
          :layout="layout"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, reactive, watchEffect, computed, ref } from 'vue';
const props = defineProps({
  // 显示的数据
  data: Array,
  tableHeader: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  // Table 的高度
  height: {
    type: [String, Number]
  },
  // 最大高度
  maxHeight: {
    type: String|Number
  },
  // 是否为斑马纹 table
  stripe: {
    type: Boolean,
    default: false
  },
  border:{
    type: Boolean,
    default: false
  },
  // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
  rowKey: {
    type: [String, Function] as unknown as () => string | Function,
    default: 'id',
  },
  // 是否显示loading
  loading: {
    type: Boolean,
    default: false
  },
  // loading显示提示的文本
  elementLoadingText: {
    type: String,
    default: '拼命加载中'
  },
  // loading显示提示的icon
  elementLoadingSpinner: {
    type: String,
    default: 'el-icon-loading'
  },
  // loading背景颜色
  elementLoadingBackground: {
    type: String,
    default: 'rgba(0,0,0,0.8)'
  },

  // 是否显示分页
  isShowPage: {
    type: Boolean,
    default: true
  },
  // 当前显示的是第多少页
  currentPage: {
    type: Number,
    default: 1
  },
  // 每页显示多少条数据
  pageSizes: {
    type: Number,
    default: 5
  },
  // 一共有多少条数据
  total: {
    type: Number,
    default: 40
  },
  // 分页样式
  layout: {
    type: String,
    default: 'prev, pager, next,sizes'
  },
  // 是否懒加载显示tree层级
  lazy: {
    type: Boolean,
    default: false
  },
  openRowClick:{
    type: Boolean,
    default: false
  },
  isRightPage:{
    type: Boolean,
    default: false
  },
//   可选择的规则
   optionalRules:{
      type:Function,
      default:()=>true
   },
  reserveSelection:{
    type:Boolean,
    default:false
  },
//   没有数据时，用--代替
  emptyText:{
    type:String,
    default:"--"
  }
});
//是否显示分页
let showPage = ref(props.isShowPage);
watchEffect(() => {
  showPage.value = props.total > 0;
});
const emit = defineEmits([
  // 当表格的筛选条件
  'filter-change',
  // 分页被修改事件
  'updata:page',
  //分页页数修改
  'updata:size',
  //全选或部分选择
  'getcheck',
  'row-hange'
]);

/* 分页被修改事件 */
const handleCurrentChange = (v: any) => {
  emit('updata:page', v);
};
/* 每页页数被修改事件 */
const handleSizeChange = (v: number) => {
  emit('updata:size', v);
};
/* 筛选器被修改事件 */
const filterChange = (v: any) => {
  emit('filter-change', v);
};
//弹窗表格单选
const rowClick = (val:any) => {
  if(props.openRowClick){
    emit('row-hange', val);
  }
}
const multipleSelection = ref<[]>([]);
//表格多选，通知父组件接收数据
const tableSelectionChange = (val: []) => {
  multipleSelection.value = val;
  emit('getcheck', multipleSelection.value);
};
const customtable = ref(null) as any;
//清空多选
const clearCheck = () => {
  customtable.value!.clearSelection();
};
defineExpose({
  clearCheck,
  getSelectionRows:()=>customtable.value?.getSelectionRows(),
  toggleAllSelection:()=>customtable.value?.toggleAllSelection()
});
//图片查看器状态
let imageVisible = ref(false);
//图片查看器中图片路径
let imageUrl = ref('');
//打开图片查看器
const watchImage = (val: string) => {
  imageVisible.value = true;
  imageUrl.value = val;
};
</script>
<style scoped="scoped" lang="scss">
.paginations {
  margin: 20px auto 0;
}
.top_nav{
  margin-top:20px;
}
.content-image {
  cursor: pointer;
  width: 48px;
  height: 32px;
  img {
    width: 100%;
    height: 100%;
  }
}
.normal_table{
  :deep(.current-row){
    td{
      background-color:#fff!important
    }
  }
  :deep(.el-table__inner-wrapper::before){
    background-color:transparent!important;
  }
}
.custom_table{
  :deep(.current-row){
    td{
      background-color:#E5F0FF!important
    }
  }
}
.no_data_box{
  padding: 80px 0 100px;
  flex-direction: column;
  img{
    width:160px;
    height: 180px;
    margin-bottom: 20px;
  }
  p{
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 20px;
  }
}
</style>

