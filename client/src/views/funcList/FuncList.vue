<template>
  <div class="func-list">
    <el-form
      :inline="true"
      :model="filterForm"
      class="func-search-form"
      size="small"
    >
      <div>
        <el-form-item label="命名空间">
          <el-input
            class="func-search-input"
            v-model="filterForm.namespace"
            placeholder="函数命名空间"
          ></el-input>
        </el-form-item>
        <el-form-item label="函数ID">
          <el-input
            class="func-search-input"
            v-model="filterForm.id"
            placeholder="函数ID"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item class="func-search-button">
        <el-button type="primary" @click="queryFunc">查询</el-button>
      </el-form-item>
    </el-form>
    <divider color="#ebeef5"></divider>
    <item-header text="函数列表"></item-header>
    <el-table :data="tableData" class="func-table">
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
import Divider from "../../components/Divider.vue";
import ItemHeader from "../../components/ItemHeader.vue";
export default {
  components: { Divider, ItemHeader },
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
.func-search-form {
  padding: 19px 20px 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.func-search-input {
  width: 20vw;
  margin-right: 40px;
}
.func-search-button {
  align-self: flex-start;
}
.func-table {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  margin: 0 20px 40px 20px;
}
</style>