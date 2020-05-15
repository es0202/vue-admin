<template>
  <div class="childtable-wrapper">
    <el-table border :data="tableData" :span-method="objectSpanMethod">
      <el-table-column v-for="item in list" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    tableParam: '',
    url: '',
    groupName: ''
  },
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.url({ appId: this.tableParam, runtime: '' }).then(data => {
      this.tableData = data.Data;
    });
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < this.groupName.length) {
        let _data = this.tableData;
        if (
          (rowIndex > 0 && _data[rowIndex - 1][this.groupName[columnIndex]] !== row[this.groupName[columnIndex]]) ||
          rowIndex == 0
        ) {
          let _row = rowIndex + 1;
          while (_row < _data.length && _data[_row][this.groupName[columnIndex]] == row[this.groupName[columnIndex]]) {
            _row++;
          }
          return [_row - rowIndex, 1];
        } else {
          return [0, 0];
        }
      }
    }
  }
};
</script>
