<template>
  <div class="paginate-wrapper">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      required: true,
      type: Number
    },
    limit: {
      type: Number,
      default: 20
    },
    page: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      }
    }
  },
  computed: {
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        //修改调用该组件的父组件中属性
        //page-size.sync由elementUi中方法emit修改
        this.$emit('update:limit', val);
      }
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      //每条页数
      this.$emit('paginate', { CurrentPage: this.currentPage, PageSize: val });//paginate方法中query参数
    },
    handleCurrentChange(val) {
      //当前页
      this.$emit('paginate', { CurrentPage: val, PageSize: this.pageSize });
    }
  }
};
</script>
