<script setup>
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <RouterLink to="/">
      <Icon icon="ion:arrow-back" width="34" color="black" />
    </RouterLink>
    <h1>Detail</h1>
  </div>
  <p>To-do list : <!-- {{ todo.todo }} --> </p>
  <p>Category : <!-- {{ todo.category}} --> </p>
  <p>Deadline : <!-- {{ todo.deadline}} --> </p>
</template>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: row;
        margin-top: 100px;

        h1 {
            flex: 1;
            text-align: center;
        }

        icon {
            flex: 1;
        }
    }

    p {
        margin-top: 50px;
        text-align: center;
    }
</style>