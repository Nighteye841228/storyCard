<script setup>
import { ref, computed, onMounted, watch } from "vue";
import draggable from "vuedraggable";

const props = defineProps(["cardList"]);
const temp = computed(() => {
  return props.cardList.split("\n");
});
const headline = computed(() => {
  return temp.value[0];
});
const cards = ref(undefined);
onMounted(() => {
  cards.value = temp.value
    .slice(1)
    .filter((x) => x)
    .map((x, index) => {
      return {
        id: index,
        name: x.replace(/<br>/, "\n"),
      };
    });
});

watch(
  () => temp.value,
  (newValue) => {
    cards.value = newValue
      .slice(1)
      .filter((x) => x)
      .map((x, index) => {
        return {
          id: index,
          name: x.replace(/<br>/, "\n"),
        };
      });
  },
  { deeper: true },
);
</script>

<template>
  <div class="column is-three-quarters-mobile is-2">
    <p class="subtitle">{{ headline }}</p>
    <draggable
      v-model="cards"
      group="description"
      animation="200"
      ghost-class="ghost"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="box">
          <div class="content">
            <p style="white-space: pre-wrap">
              {{ element.name }}
            </p>
          </div>
        </div>
      </template>
    </draggable>
    <!-- <div class="box" v-for="card in cards">
      <div class="content">
        <p>{{ card }}</p>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.column {
  width: 20em !important;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
  margin: 1em;
  min-height: 100vh;
}
.box {
  width: inherit-2em;
}
</style>
