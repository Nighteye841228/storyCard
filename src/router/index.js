import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from '../components/HelloWorld.vue';
import { content } from "../assets/data";

// 創建一個 routes 陣列，定義所有 route 路徑
const routes = [
  { path: "/", component: HelloWorld },
  {
    path: "/teenage-is-wrong",
    component: HelloWorld,
    props: { content: content },
  },
];

// 創建一個router，
const router = createRouter({
  history: createWebHashHistory(), // 這邊我使用 # 路徑模式
  routes, // 導入使用上方 routes 所定義的路徑
});

// 將 router 物件導出成一個 module
export default router;
