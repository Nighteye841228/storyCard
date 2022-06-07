<script setup>
import { ref, computed, onMounted, watch, inject } from "vue";
import draggable from "vuedraggable";

const updateInput = inject("updateInput");
const props = defineProps(["cardList", "updateInput"]);
const headline = computed(() => {
  return props.cardList[0];
});
const cards = ref(undefined);
const exportWord = computed(() => {
  return `##${headline.value}\n${cards.value
    .map((x) => x.name.replace(/\n/g, "<br>"))
    .join("\n")}`;
});

defineExpose({ headline, exportWord });

const createCard = (card) => {
  return card
    .slice(1)
    .filter((x) => x)
    .map((x, index) => {
      return {
        id: `${index}${headline.value}`,
        name: x.replace(/<br>/, "\n"),
      };
    });
};
// onMounted(() => {
//   cards.value = createCard(props.cardList);
// });

watch(
  () => props.cardList,
  (newValue) => {
    cards.value = createCard(newValue);
  },
  { immediate: true, deeper: true }
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
      @change="updateInput"
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
