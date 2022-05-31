<script setup>
import { ref, onMounted, computed } from "vue";
import CardList from "./CardList.vue";
import { data } from "../assets/data";

const cardLists = computed(() => {
  return data.match(/##([^#]+\n)+/g);
});
</script>

<template>
    <div class="columns has-text-left">
        <CardList v-for="cardList in cardLists" :cardList="cardList"></CardList>
    </div>
</template>

<style scoped>
.columns {
  overflow: scroll;
}
</style>
