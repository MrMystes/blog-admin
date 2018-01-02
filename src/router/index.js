import Vue from 'vue'
import Router from 'vue-router'
import Edit from '../components/main_content/edit/Edit.vue'
import PostManage from '../components/main_content/post_manage/PostManage.vue'
import CommentsManage from  '../components/main_content/comments_manage/CommentsManage.vue'
import Settings from  '../components/main_content/settings/Seetings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Edit',
      component: Edit
    }, {
      path: '/manage-posts',
      name: 'ManagePosts',
      component: PostManage
    }, {
      path: '/manage-comments',
      name: 'ManageComments',
      component: CommentsManage
    }, {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
  ]
})
