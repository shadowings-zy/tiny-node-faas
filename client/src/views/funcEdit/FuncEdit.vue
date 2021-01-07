<template>
  <div class="func-edit">
    <item-header text="函数信息"></item-header>
    <el-form
      class="func-option"
      :model="funcOptionsForm"
      label-width="180px"
      size="mini"
      label-position="left"
    >
      <el-form-item
        label="函数id"
        v-show="
          funcOptionsForm.funcId !== '' && funcOptionsForm.funcId !== undefined
        "
      >
        <el-input
          class="form-item"
          v-model="funcOptionsForm.funcId"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="函数作者">
        <el-input
          class="form-item"
          v-model="funcOptionsForm.author"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="命名空间">
        <el-input
          class="form-item"
          v-model="funcOptionsForm.funcName"
          :maxlength="15"
          placeholder="命名空间，仅支持英文"
        ></el-input>
      </el-form-item>
      <el-form-item label="超时时间">
        <el-input class="form-item" v-model="funcOptionsForm.timeout">
          <template #append>ms</template>
        </el-input>
      </el-form-item>
      <el-form-item label="函数描述">
        <el-input
          class="form-item"
          v-model="funcOptionsForm.description"
          :maxlength="40"
          placeholder="函数描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <divider color="#ebeef5"></divider>
    <item-header text="函数编辑" />
    <div class="func-editor" ref="editor"></div>
    <el-button class="save-button" type="primary" @click="saveCode"
      >保存函数</el-button
    >
  </div>
</template>

<script>
import Divider from "../../components/Divider.vue";
import ItemHeader from "../../components/ItemHeader.vue";
import {
  initializeCodeEditor,
  getCodeEditor,
  destoryCodeEditor,
} from "../../utils/editor";
import { LOCAL_STORAGE_VISITOR_KEY } from "../../utils/figurePrint";

export default {
  name: "FuncEdit",
  components: { "item-header": ItemHeader, divider: Divider },
  data() {
    return {
      activeNames: ["options", "edit"],
      funcOptionsForm: {
        funcId: "",
        author: window.localStorage.getItem(LOCAL_STORAGE_VISITOR_KEY),
        funcName: "",
        timeout: 5000,
        description: "",
      },
    };
  },
  mounted() {
    initializeCodeEditor(this.$refs.editor);
  },
  beforeUnmount() {
    destoryCodeEditor();
  },
  methods: {
    saveCode() {
      console.log(getCodeEditor().getValue());
    },
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.func-edit {
  width: 100vw;
  margin: 0 auto;
}
.collapse-item-title {
  margin: 0 0 0 20px;
}
.func-editor {
  height: 400px;
  border: 1px solid #ebeef5;
  margin: 0 20px;
}
.func-option {
  margin: 0 20px;
}
.form-item {
  width: 250px !important;
}
.save-button {
  float: right;
  margin: 20px;
}
</style>