<template>
  <div class="func-list">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="函数命名空间">
        <el-input
          v-model="filterForm.namespace"
          placeholder="函数命名空间"
        ></el-input>
      </el-form-item>
      <el-form-item label="函数id">
        <el-input v-model="filterForm.id" placeholder="函数命名空间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryFunc">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column prop="id" label="函数ID"> </el-table-column>
      <el-table-column prop="author" label="函数作者"> </el-table-column>
      <el-table-column prop="namespace" label="命名空间"> </el-table-column>
      <el-table-column prop="description" label="函数描述">
        <template #default="scope">
          <div class="cell">{{ scope.row.options.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="text" size="small" @click="editFunc(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "FuncList",
  data() {
    return {
      filterForm: {
        namespace: "",
        id: "",
      },
      tableData: [
        {
          id: "5f019b4cc481c755",
          author: "shadowingszy",
          namespace: "test",
          content:
            "const wait = (time) => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve()\n    }, time)\n  })\n}\n\nmodule.exports.func = async (ctx) => {\n  console.log(`This is shadowingszy's func, to get time after 1s.`)\n  await wait(1000)\n  return `currentTime: ${Date.now()}`\n}\n",
          options: {
            description: "hahah",
          },
        },
        {
          id: "9f9fd935a0af6c8f",
          author: "shadowingszy",
          namespace: "test2",
          content:
            "const wait = (time) => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve()\n    }, time)\n  })\n}\n\nmodule.exports.func = async (ctx) => {\n  console.log(`This is shadowingszy's func, to get time after 2s.`)\n  await wait(2000)\n  return `currentTime: ${Date.now()}`\n}\n",
          options: {
            description: "66666",
          },
        },
        {
          id: "f80d8c8dba48ba04",
          author: "shadowingszy",
          namespace: "test",
          content:
            "const wait = (time) => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve()\n    }, time)\n  })\n}\n\nmodule.exports.func = async (ctx) => {\n  console.log(`This is shadowingszy's func, to get time after 3s.`)\n  await wait(3000)\n  return `currentTime: ${Date.now()}`\n}\n",
          options: {
            description: "",
            timeout: 5000,
            microtaskMode: "afterEvaluate",
          },
        },
      ],
    };
  },
  methods: {
    queryFunc() {
      console.log(this.filterForm);
    },
    editFunc(row) {
      console.log(row);
    },
  },
};
</script>

<style scoped>
.func-list {
  width: 100vw;
  margin: 0 auto;
}
</style>