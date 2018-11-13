import Vue from 'vue';
// import iView from 'iview'
// 引入 vue-router.js 插件
import Router from 'vue-router';
// vue-cli 里面，组件的导入都使用 import 方法
// @ :指的是 src 的路径，相当于 path.resolve('src') + /components/HelloWorld
// import HelloWorld from '@/components/HelloWorld'
import ShouYe from '@/components/work/shouye';
import Login from '@/components/work/login';
import Forget from '@/components/work/forget';

// 这是一个全局注册的方法，如果把这个注释掉或者没有它，那么路由router将不会生效
//  在当前项目全局开启 vue-router
Vue.use(Router);

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      component: ShouYe,
    },
    {
      // 登录也
      path: '/login',
      component: Login
    },
    {
      // 重置密码
      path: '/forget',
      component: Forget
    },
    {
      path: '/city/:id',
      component: Forget
    }
  ]
})
