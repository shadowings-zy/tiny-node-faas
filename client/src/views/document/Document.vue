<template>
  <div class="document">
    <el-tabs type="border-card" class="document-tabs">
      <el-tab-pane label="快速开始">
        <div class="document-text" v-html="quickStartHTML"></div>
      </el-tab-pane>
      <el-tab-pane label="详细说明">
        <div class="document-text" v-html="documentHTML"></div>
      </el-tab-pane>
      <el-tab-pane label="其他说明">
        <div class="document-text" v-html="tipsHTML"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import showdown from "showdown";
import { quickStart, document, tips } from "./markdown";

export default {
  name: "Document",
  data() {
    return {
      quickStartHTML: "",
      documentHTML: "",
      tipsHTML: "",
    };
  },
  mounted() {
    const converter = new showdown.Converter({ simpleLineBreaks: true });
    this.quickStartHTML = converter.makeHtml(quickStart);
    this.documentHTML = converter.makeHtml(document);
    this.tipsHTML = converter.makeHtml(tips);
  },
};
</script>

<style scoped>
.document {
  width: 100%;
}
.document-tabs {
  margin: 20px;
  color: #606266;
}
</style>