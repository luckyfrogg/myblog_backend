<template>
  <a-layout-content
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px','border-radius':'4px' }"
  >
    <div class="article_create">
      <a-row type="flex" justify="space-between" align="middle" style="margin-bottom:18px;">
        <a-col>创建文章</a-col>
        <a-col>
          <a-row type="flex" justify="end" align="middle" class="btn_group">
            <a-button type="primary">发布</a-button>
            <a-button class="btn_caogao">另存为草稿</a-button>
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
                @click="checkCate(index)"
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
      <a-input placeholder="分类名称" v-model="cateName" />
    </a-modal>
  </a-layout-content>
</template>

<script>
export default {
  name: "article-create",
  props: {},
  data() {
    return {
      formData: {
        title: "",
        content: "",
        cate_id: "",
        tags_group: ""
      },
      cateArr: [],
      createCateVal: "",
      createCatePopVisible: false,
      createCateLoading: false,
      cateName: ""
    };
  },
  computed: {},
  created() {
    this.getCateList();
  },
  mounted() {
    //   this.createCate()
  },
  methods: {
    handleCreateCate() {
      let _this = this;
      if(!!!_this.cateName.trim()){
          return;
      }
      this.createCateLoading = true;
      this.$post("api/b/createCate", { name: _this.cateName.trim() }).then(res => {
        console.log(res);
        if (res.code == 200) {
          _this.$message.success("创建成功！");
          _this.cateName = "";
          _this.getCateList();
        }
        this.createCatePopVisible = false;
        this.createCateLoading = false;
      });
    },
    showCreateCatePop() {
      this.createCatePopVisible = true;
    },
    handleCancelCreateCate() {
      this.createCatePopVisible = false;
    },
    checkCate(index) {
      let _this = this;
      this.cateArr = this.cateArr.map((item, i) => {
        if (index == i) {
          _this.$set(_this.cateArr[i], "actived", !item.actived);
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
    createCate() {
      let _this = this;
      this.$post("api/b/createCate", { name: _this.createCateVal.trim() }).then(
        res => {
          if (res)
            // console.log(res.data)
            this.getCateList();
        }
      );
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
</style>
