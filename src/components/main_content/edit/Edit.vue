<template>
  <div class="wrapper">
    <div class="header">
      撰写文章
    </div>
    <div class="main">
      <div class="left">
        <header class="post-info">
          文章信息
        </header>
        <div class="post-info-wrapper">
          <div class="input-group">
            <div>标题</div>
            <input type="text" id="post-title" placeholder="请输入文章标题" v-model="article.title" required>
          </div>
          <div class="input-group">
            <div>标签</div>
            <input type="text" id="post-tag" placeholder="标签以空格分开，最多3个" v-model="article.tag" required>
          </div>
          <div class="input-group input-description">
            <div>描述</div>
            <textarea type="text" placeholder="文章描述" v-model="article.description" required></textarea>
          </div>
          <div class="buttons">
            <el-button class='button' type="primary" @click.stop="submit">提交</el-button>
            <el-button class='button' type="info" @click.stop="reset">重置</el-button>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- TODO post markdown -->
        <div class="mdContent markdown-body" v-html="article.content" v-if="!showUpload"></div>
        <el-upload class="upload" v-else drag action="http://106.14.205.89:8080/posts/md2html" multiple :on-error="handleError" :on-success="handleSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将mark down文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import 'github-markdown-css';

  export default {
    data() {
      return {
        showUpload: true,
        article: {
          content: '',
          title: '测试',
          description: '这是一篇测试功能的文章',
          tag: '测试'
        },

      }
    },

    methods: {
      handleError(err, file, fileList) {
        console.log(err)
      },
      handleSuccess(res, file, fileList) {
        this.showUpload = false
        this.article.content = res
      },
      submit() {
        let msgCopy = new this.$utils.Message(this.$utils.deepCopy(this.article))
        console.log(msgCopy)
        this.$http({
          method: 'post',
          url: '/posts/',
          data: msgCopy
        }).then(res=>{
          console.log(res)
          if(res.status === 200){
            this.$message.success(res.statusText)
          }
        }).catch(err=>{
          this.$message.warning(err)
        })
      }
    },
    mounted() {

    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/css/constants";

  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      font-size: 2rem;
      padding: 1rem 0 0 2rem;
      font-weight: bolder;
      flex-grow: 0;
      color: white;
    }
    .main {
      flex-grow: 1;
      display: flex;
      .left {
        width: 40rem;
        margin: 1rem 2rem;
        display: flex;
        flex-direction: column;
        .post-info {
          text-align: center;
          font-size: 2rem;
          color: white;
          font-weight: bold;
          padding-top: 1rem;
          height: 4rem;
          background: $dark-black;
        }
        .post-info-wrapper {
          flex-grow: 1;
          background: $admin-light-panel-bg;
          display: flex;
          flex-direction: column;
          .input-group {
            margin: 2rem 1rem 0;
            div {
              width: 100%;
              text-align: left;
              color: white;
              font-weight: bold;
              font-size: 1.4rem;
            }
            input {
              margin-top: 1rem;
            }
            .select-category {
              margin-top: 1rem;
            }
          } //最后一个input-group，也就是输入文章描述的
          .input-description {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
            flex-grow: .5;
            textarea {
              flex-grow: .5;
              margin-top: 1rem;
              padding: .5rem;
            }
          }
          .buttons {
            display: flex;
            justify-content: center;
            align-items: center;

            &>.button:nth-child(2) {
              margin-left: 3rem;
            }
          }
        }
      }
      .right {
        width: 100%;
        font-size: 1.4rem;
        background: white;
        margin: 2rem 2rem 2rem 0;
        display: flex;
        justify-content: center;
        .upload {
          align-self: center;
        }
        .mdContent {
          overflow-y: scroll;
          padding: 10px;
        }
      }
    }
  }

</style>
