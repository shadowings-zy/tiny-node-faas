<template>
  <div class="func-edit">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="options">
        <template #title>
          <p class="item-header">函数信息</p>
        </template>
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
              funcOptionsForm.funcId !== '' &&
              funcOptionsForm.funcId !== undefined
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
              v-model="funcOptionsForm.funcNameSpace"
              :maxlength="15"
              :disabled="funcOptionsForm.funcId !== ''"
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
          <el-form-item label="请求方法">
            <el-checkbox-group v-model="funcOptionsForm.allowMethod">
              <el-checkbox label="GET"></el-checkbox>
              <el-checkbox label="POST"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <item-header text="函数编辑"></item-header>
    <div
      :class="
        funcOptionsForm.funcId === '' ? 'func-editor' : 'func-editor-disable'
      "
      ref="editor"
    ></div>
    <el-button
      v-if="funcOptionsForm.funcId === ''"
      class="save-button"
      type="primary"
      @click="saveCode"
    >
      保存函数
    </el-button>
    <el-button v-else class="save-button" type="primary" @click="updateCode">
      更新函数
    </el-button>
  </div>
</template>

<script>
import ItemHeader from "../../components/ItemHeader.vue";
import {
  initializeCodeEditor,
  getCodeEditor,
  destoryCodeEditor,
} from "../../utils/editor";
import { LOCAL_STORAGE_VISITOR_KEY } from "../../utils/figurePrint";
import { getFuncList, addFunction, updateFunction } from "../../service/func";

export default {
  name: "FuncEdit",
  components: { ItemHeader },
  data() {
    return {
      activeNames: ["options"],
      funcOptionsForm: {
        funcId: "",
        author: window.localStorage.getItem(LOCAL_STORAGE_VISITOR_KEY),
        funcNameSpace: "",
        timeout: 5000,
        description: "",
        allowMethod: ["GET"],
      },
    };
  },
  mounted() {
    const _this = this;
    const funcId = this.$store.state.funcId;
    if (funcId) {
      getFuncList({
        id: funcId,
      }).then((res) => {
        const currentFunc = res.data.data.funcs[0];
        _this.funcOptionsForm.funcId = currentFunc.id;
        _this.funcOptionsForm.funcNameSpace = currentFunc.namespace;
        _this.funcOptionsForm.timeout = currentFunc.options.timeout;
        _this.funcOptionsForm.description = currentFunc.options.description;
        _this.funcOptionsForm.allowMethod = currentFunc.options.allowMethod;
        initializeCodeEditor(this.$refs.editor, currentFunc.content);
      });
    } else {
      initializeCodeEditor(this.$refs.editor);
    }
  },
  beforeUnmount() {
    this.$store.commit("setFuncId", "");
    destoryCodeEditor();
  },
  methods: {
    checkInput(namespace, timeout, content, allowMethod) {
      console.log("timeout: ", timeout);
      const timeoutReg = /^[0-9]+.?[0-9]*$/;
      const validCodeReg = /module\.exports\.func.*=/;
      if (namespace === "") {
        this.$message.error("函数命名空间不能为空");
        return false;
      }
      if (allowMethod.length === 0) {
        this.$message.error("必须选择一个函数触发方法");
        return false;
      }
      if (!timeoutReg.test(timeout)) {
        this.$message.error("函数超时时间不合法");
        return false;
      }
      if (timeoutReg.test(timeout) && parseInt(timeout) > 20000) {
        this.$message.error("函数超时时间不能超过20秒");
        return false;
      }
      if (!validCodeReg.test(content)) {
        this.$message.error(
          "函数不合法，函数名必须命名为func，并作为module.exports对象的属性"
        );
        return false;
      }
      return true;
    },
    saveCode() {
      const _this = this;
      const funcContent = getCodeEditor().getValue();
      if (
        !_this.checkInput(
          _this.funcOptionsForm.funcNameSpace,
          _this.funcOptionsForm.timeout,
          funcContent,
          _this.funcOptionsForm.allowMethod
        )
      ) {
        return;
      }
      addFunction({
        author: window.localStorage.getItem(LOCAL_STORAGE_VISITOR_KEY),
        func: funcContent,
        namespace: _this.funcOptionsForm.funcNameSpace,
        options: JSON.stringify({
          description: _this.funcOptionsForm.description,
          timeout: parseInt(_this.funcOptionsForm.timeout),
          allowMethod: _this.funcOptionsForm.allowMethod,
        }),
      })
        .then((res) => {
          if (res.data.status) {
            this.$message.success("函数添加成功");
          } else {
            this.$message.success(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error("函数添加失败");
        });
    },
    updateCode() {
      const _this = this;
      const funcContent = getCodeEditor().getValue();
      updateFunction({
        id: _this.funcOptionsForm.funcId,
        func: funcContent,
        options: JSON.stringify({
          description: _this.funcOptionsForm.description,
          timeout: _this.funcOptionsForm.timeout,
          allowMethod: _this.funcOptionsForm.allowMethod,
        }),
      })
        .then((res) => {
          if (res.data.status) {
            this.$message.success("函数更新成功");
          } else {
            this.$message.success(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error("函数更新失败");
        });
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
  height: 300px;
  border: 1px solid #ebeef5;
}
.func-editor-disable {
  height: 300px;
  border: 1px solid #ebeef5;
  pointer-events: none;
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
.item-header {
  width: 200px;
  height: 49px;
  line-height: 49px;
  font-size: 14px;
  font-weight: bold;
  padding-left: 20px;
}
</style>