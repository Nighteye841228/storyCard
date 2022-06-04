<script setup>
import { ref, onMounted, computed, provide } from "vue";
import CardList from "./CardList.vue";

const props = defineProps(['content']);
console.log(props.content)

// const data = ref(route.params.content);
const data = ref("");
data.value = props.content || "";
const isOpenInputText = ref(false);

const cardLists = computed(() => {
  return data.value.split("##").filter((x) => x);
});

function updateWord() {
  isOpenInputText.value = false;
}

const full = ref(null);

function updateInput() {
  data.value = full.value.map((x) => x.exportWord).join("\n");
}

provide('updateInput',updateInput);
</script>

<template>
  <div class="columns has-text-left">
    <CardList
      ref="full"
      v-for="cardList in cardLists"
      :cardList="cardList.split('\n')"
    ></CardList>
  </div>
  <button
    class="is-light is-link button upload-data"
    @click="isOpenInputText = true"
  >
    上傳資料
  </button>
  <button class="is-light is-link button update-data" @click="updateInput">
    更新資料
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
          v-model.lazy="data"
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

.upload-data {
  position: fixed;
  bottom: 10px;
  right: 120px;
  z-index: 3;
}
</style>
