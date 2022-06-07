import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import { content, newCard } from "../assets/data";

// 創建一個 routes 陣列，定義所有 route 路徑
const routes = [
  { path: "/", component: HelloWorld },
  {
    path: "/teenage-is-wrong",
    component: HelloWorld,
    props: { content: content },
    meta: { title: "果青故事卡" },
  },
  {
    path: "/my-story",
    component: HelloWorld,
    props: { content: newCard },
    meta: { title: "我的故事卡" },
  },
];

// 創建一個router，
const router = createRouter({
  history: createWebHashHistory(),
  routes, // 導入使用上方 routes 所定義的路徑
});

const DEFAULT_TITLE = "故事卡產生器";
router.beforeEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

// 將 router 物件導出成一個 module
export default router;
