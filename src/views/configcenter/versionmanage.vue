<template>
  <div class="version-wrapper">
    <el-table :data="tableData" border>
      <el-table-column type="expand">
        <template v-slot="props">
          <child-table :table-param="props.row.Id" :list="detailList" :url="GetAppVersion" :group-name="groupName"></child-table>
        </template>
      </el-table-column>
      <el-table-column prop="Name" label="Name"></el-table-column>
      <el-table-column label="相关配置组">
        <template v-slot="scope">
          <span v-html="configGroups(scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="Mnemonic" label="助记符"></el-table-column>
      <el-table-column label="类型">
        <template v-slot="scope">
          <span v-html="typeString(scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="GroupString" label="组别"></el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
    </el-table>
    <paginate :limit.sync="query.PageSize" :total="total" :page.sync="query.CurrentPage" @paginate="getList"></paginate>
  </div>
</template>


<script>
import paginate from '@/components/paginate';
import childTable from '@/components/childtable';
import { SearchVersion, GetAppVersion } from '@/api/configcenter';
export default {
  data() {
    return {
      total: 0,
      query: {
        PageSize: 20,
        CurrentPage: 1,
        Name: '',
        Type: '',
        Group: ''
      },
      tableData: null,
      detailList: [
        {
          prop: 'IdcName',
          label: 'IDC',
          width: 120
        },
        {
          prop: 'RuntimeString',
          label: '运行时',
          width: 100
        },
        {
          prop: 'ServerIp',
          label: 'IP'
        },
        {
          prop: 'Version',
          label: '系统版本号'
        },
        {
          prop: 'RemoteInfo.RmtFileVersion',
          label: '远程版本号'
        },
        {
          prop: 'RemoteInfo.RmtFileTime',
          label: '远程文件时间'
        },
        {
          prop: 'RemoteInfo.RmtFileHash',
          label: '远程文件hash'
        }
      ],
      GetAppVersion: GetAppVersion,
      groupName: ['IdcName', 'RuntimeString']
    };
  },
  created() {
    this.getList(this.query);
  },
  methods: {
    getList(query) {
      SearchVersion(this.query).then(data => {
        this.total = data.Data.TotalCount;
        this.tableData = data.Data.Datas;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //合并列
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
      if (columnIndex == 0) {
        if (rowIndex > 0 && this.tableData[rowIndex].Name == this.tableData[rowIndex - 1].Name) {
          return { rowspan: 0, colspan: 0 };
        }
      }
    },
    configGroups(row) {
      var h = '';
      if (row.ConfigGroups.length > 0) {
        var cfgString = [];
        for (var cfg in row.ConfigGroups) {
          cfgString.push(row.ConfigGroups[cfg].Name);
        }
        var rend = row.ConfigGroups.length + '个(' + cfgString.join(',') + ')';
        if (rend.length > 10) {
          h = '<span title="配置组:' + cfgString.join(',') + '">' + rend.substring(0, 8) + '...</span>';
        } else {
          h = cfgString.join(',');
        }
      }
      return h;
    },
    typeString(row) {
      return '<i class="el-icon-s-cooperation"></i> ' + row.TypeString;
    }
  },
  components: {
    paginate,
    childTable
  }
};
</script>
