<template>
  <div class="wrapper">
    <div class="header">
      文章管理
    </div>
    <div class="posts-list" v-loading="postsLoading" element-loading-text="拼命加载中...">
      <el-table :data="posts" border height="250" :default-sort="{prop: 'createAt', order: 'descending'}" style="width: 100%">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column label="标题" width="220">
          <template scope="scope">
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建日期" width="200">
          <template scope="scope">
            <span>{{ new Date(parseInt(scope.row.createAt)).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改日期" width="200">
          <template scope="scope">
            <span>{{ new Date(parseInt(scope.row.lastUpdate)).toLocaleString() }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="80">
          <template scope="scope">
            <span>{{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column label="阅读量" sortable width="100">
          <template scope="scope">
            <span style="text-align: center">{{ scope.row.readCount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="标签" width="180">
          <template scope="scope">
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ scope.row.tag }}</span>
          </template>
        </el-table-column>

        <el-table-column label="描述">
          <template scope="scope">
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.uniqueId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :page-size='limit' layout="total, prev, pager, next, jumper" :total='postsCount'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        postsLoading: true,
        posts: [],
        postsCount: 0,
        currentPage: 1,
        limit: 13
      }
    },
    filters: {
      statusFilter(status) {
        return status == 0 ? '已发布' : (status == 1 ? '草稿' : '已删除');
      }
    },
    methods: {
      refresh() {
        let getPosts = () => {
          return this.$http.get(`/posts?offset=${this.currentPage - 1}&limit=${this.limit}&fields=title,createAt,lastUpdate,readCount,tag,status,description,uniqueId`);
        }
        let getPostsCount = () => {
          return this.$http.get('/posts/id')
        };
        Promise.all([getPosts(), getPostsCount()]).then((result => {
          // Both requests are now complete
          this.postsLoading = false;
          this.posts = result[0].data;
          this.postsCount = result[1].data.length;
        }), (error) => {
          this.postsLoading = false;
          this.$msgbox({
            title: "加载失败",
            message: "文章列表获取失败，请检查您的网络",
            type: 'error',
            showCancelButton: false
          })
        })
      },
      handleDelete(postId) {
        this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(
          () => {
            this.$http.delete(`/posts/id/${postId}`).then(res => {
                //刷新本页数据
                this.refresh();
                this.$message({
                  type: 'success',
                  message: res.statusText
                });
              }).catch(err=>{
                this.$message({
                  type: 'warning',
                  message: err.res.statusText
                });
              })
          },
          () => {
            this.$message({
              type: 'info',
              message: '已取消删除!'
            });
          }
        )
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.postsLoading = true;
        console.log('currentPage changed: ' + this.currentPage);
        this.$http.get(
            `/posts?offset=${(this.currentPage - 1)*this.limit}&limit=${this.limit}&fields=title,createAt,lastUpdate,readCount,tag,status,description`
          )
          .then(data => {
              console.log(`获取到第${this.currentPage}的数据，共${data.data.length}条`);
              this.postsLoading = false;
              this.posts = data.data;
            },
            (error) => {
              this.postsLoading = false;
              this.$msgbox({
                title: "加载失败",
                message: "文章列表获取失败，请检查您的网络",
                type: 'error',
                showCancelButton: false
              })
            }
          )
      }
    },
    mounted() {
      this.refresh();
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/css/constants";

  .wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    .header {
      font-size: 2rem;
      padding: 1rem 0 0 2rem;
      font-weight: bolder;
      flex-grow: 0;
      color: white;
    }
    .posts-list {
      display: flex;
      flex-grow: 1;
      margin: 1rem 2rem;
      flex-direction: column;
      background: white;
      .el-table {
        flex-grow: 1;
      }
      .el-pagination {
        background: white;
      }
    }
  }

</style>
