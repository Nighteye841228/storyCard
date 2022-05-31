<script setup>
import { ref, onMounted, computed } from "vue";
import CardList from "./CardList.vue";

const inputWord = ref("");
const data = ref("");
const isOpenInputText = ref(false);

const cardLists = computed(() => {
  return data.value.split("##").filter((x) => x);
});

function updateWord() {
  data.value = inputWord.value;
  isOpenInputText.value = false;
}
</script>

<template>
  <div class="columns has-text-left">
    <CardList v-for="cardList in cardLists" :cardList="cardList"></CardList>
  </div>
  <button
    class="is-light is-link button update-data"
    @click="isOpenInputText = true"
  >
    上傳｜更新資料
  </button>
  <div class="modal" :class="{ 'is-active': isOpenInputText }">
    <div class="modal-background" @click="isOpenInputText = false"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-left">
        <p class="modal-card-title">輸入卡片</p>
        <span>（以##開頭為每個清單標題，每一行字為一張卡片）</span>
        <button
          class="delete"
          aria-label="close"
          @click="isOpenInputText = false"
        ></button>
      </header>
      <section class="modal-card-body">
        <textarea
          :placeholder="`##示範第一章\n第一張卡片\n第二張卡片\n第三張卡片\n##第二張卡片`"
          class="textarea"
          rows="10"
          v-model="inputWord"
        ></textarea>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="updateWord">
          Save changes
        </button>
        <button class="button" @click="isOpenInputText = false">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.columns {
  overflow: scroll;
}
.update-data {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 3;
}
</style>
