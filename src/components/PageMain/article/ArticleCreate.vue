<template>
  <a-layout-content
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px','border-radius':'4px' }"
  >
    <div class="article_create">
      <a-row type="flex" justify="space-between" align="middle" style="margin-bottom:18px;">
        <a-col>创建文章</a-col>
        <a-col>
          <a-row type="flex" justify="end" align="middle" class="btn_group">
            <a-button type="primary" @click="submit">发布</a-button>
            <a-button class="btn_caogao">保存为草稿</a-button>
          </a-row>
        </a-col>
      </a-row>
      <div class="form">
        <a-row type="flex" align="middle" class="form_wrap">
          <a-col>
            <label class for="title">文章标题：</label>
          </a-col>
          <a-col>
            <div>
              <a-input type="text" placeholder="文章标题" id="title" v-model="formData.title" />
            </div>
          </a-col>
        </a-row>
        <a-row type="flex" align="top" class="form_wrap">
          <a-col>
            <label class for="cate">文章分类：</label>
          </a-col>
          <a-col>
            <div class="cate_btn_group">
              <a-button
                type="default"
                v-for="(item,index) in cateArr"
                :key="index"
                size="small"
                :class="['cate_btn',item.actived?'active':'']"
                @click="selectCate(index)"
              >{{item.name}}</a-button>
              <a-button
                type="primary"
                size="small"
                :class="['cate_btn']"
                @click="showCreateCatePop"
              >+</a-button>
            </div>
          </a-col>
        </a-row>

        <a-row type="flex" align="top" class="form_wrap">
          <a-col>
            <label class for="tag">文章标签：</label>
          </a-col>
          <a-col>
            <div class="cate_btn_group">
              <a-button
                type="default"
                v-for="(item,index) in tagArr"
                :key="index"
                size="small"
                :class="['cate_btn',item.actived?'active':'']"
                @click="selectTags(index)"
              >{{item.name}}</a-button>
              <a-button
                type="primary"
                size="small"
                :class="['cate_btn']"
                @click="showCreateTagPop"
              >+</a-button>
            </div>
          </a-col>
        </a-row>

        <a-row type="flex" align="top" class="form_wrap">
          <a-col :span="24">
            <div id="markdown_container">
              <mavon-editor v-model="formData.content" :toolbars="mavonToolBars" />
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-modal
      title="创建分类"
      :visible="createCatePopVisible"
      @ok="handleCreateCate"
      :confirmLoading="createCateLoading"
      @cancel="handleCancelCreateCate"
      okText="确定"
      cancelText="取消"
    >
      <a-input placeholder="分类" v-model="createCateVal" />
    </a-modal>
    <a-modal
      title="创建标签"
      :visible="createTagPopVisible"
      @ok="handleCreateTag"
      :confirmLoading="createTagLoading"
      @cancel="handleCancelCreateTag"
      okText="确定"
      cancelText="取消"
    >
      <a-input placeholder="标签" v-model="createTagVal" />
    </a-modal>
  </a-layout-content>
</template>

<script>
export default {
  name: "article-create",
  props: {},
  data() {
    return {
      qiniuToken:'',
      formData: {
        title: "",
        content: "",
        cate_id: "",
        tags_group: []
      },
      mavonToolBars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      cateArr: [],
      createCateVal: "",
      createCatePopVisible: false,
      createCateLoading: false,
      //tag
      tagArr: [],
      createTagVal: "",
      createTagPopVisible: false,
      createTagLoading: false
    };
  },
  computed: {},
  created() {
    this.getCateList();
    this.getTagList();
    this.getQiniuToken();
  },
  mounted() {},
  methods: {
    getQiniuToken() {
      let _this = this;
      this.$get("api/b/getQiniuToken").then(res => {});
    },
    submit() {
      this.formData.tags_group = this.formData.tags_group.join(",");
    },
    handleCreateCate() {
      let _this = this;
      if (!!!_this.createCateVal.trim()) {
        return;
      }
      this.createCateLoading = true;
      this.$post("api/b/createCate", { name: _this.createCateVal.trim() }).then(
        res => {
          console.log(res);
          if (res.code == 200) {
            _this.$message.success("创建成功！");
            _this.createCateVal = "";
            _this.getCateList();
          }
          this.createCatePopVisible = false;
          this.createCateLoading = false;
        }
      );
    },
    showCreateCatePop() {
      this.createCatePopVisible = true;
    },
    handleCancelCreateCate() {
      this.createCatePopVisible = false;
    },

    selectCate(index) {
      let _this = this;
      this.cateArr = this.cateArr.map((item, i) => {
        if (index == i) {
          let actived = item.actived;
          _this.$set(_this.cateArr[i], "actived", !item.actived);
          _this.$set(_this.formData, "cate_id", !actived ? item.id : "");
        } else {
          _this.$set(_this.cateArr[i], "actived", false);
        }
        return item;
      });
    },
    getCateList() {
      this.cateArr = [];
      this.$get("api/b/cateList").then(res => {
        if (res.code == 200) {
          res.data.forEach(item => {
            this.cateArr.push({ ...item, actived: false });
          });
        }
      });
    },
    //tag
    handleCreateTag() {
      let _this = this;
      if (!!!_this.createTagVal.trim()) {
        return;
      }
      this.createTagLoading = true;
      this.$post("api/b/createTag", { name: _this.createTagVal.trim() }).then(
        res => {
          console.log(res);
          if (res.code == 200) {
            _this.$message.success("创建成功！");
            _this.createTagVal = "";
            _this.getTagList();
          }
          this.createTagPopVisible = false;
          this.createTagLoading = false;
        }
      );
    },
    showCreateTagPop() {
      this.createTagPopVisible = true;
    },
    handleCancelCreateTag() {
      this.createTagPopVisible = false;
    },
    selectTags(i) {
      let _this = this;
      _this.tagArr.forEach((item, index) => {
        if (index === i) {
          if (item.actived === false) {
            //判断当前已选标签数是否小于等于4
            if (_this.formData.tags_group.length <= 2) {
              _this.formData.tags_group.push(item.id);
              _this.$set(_this.tagArr[i], "actived", !item.actived);
            } else {
              _this.$message.success("最多仅支持选择3个标签！");
            }
          } else {
            _this.formData.tags_group.splice(
              _this.formData.tags_group.indexOf(item.id),
              1
            );
            _this.$set(_this.tagArr[i], "actived", !item.actived);
          }
        }
      });
      //   console.log(_this.formData.tags_group)
    },
    getTagList() {
      this.tagArr = [];
      this.$get("api/b/tagList").then(res => {
        if (res.code == 200) {
          res.data.forEach(item => {
            this.tagArr.push({ ...item, actived: false });
          });
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.article_create {
  .btn_group {
    .btn_caogao {
      margin-left: 4px;
    }
  }
  .form {
    .form_wrap {
      margin-bottom: 16px;
    }
    .cate_btn_group {
      width: 420px;
      .cate_btn {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
}
#markdown_container {
  .v-note-wrapper {
    width: 100%;
    height: 600px;
  }
}
</style>
