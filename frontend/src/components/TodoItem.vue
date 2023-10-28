<script setup>
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from 'axios';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const categories = ref([]); // Menyimpan daftar kategori

// Mengambil daftar kategori dari API saat komponen dimuat
onMounted(() => {
  axios.get('http://localhost:3000/api/Category/')
    .then(response => {
      categories.value = response.data.docs;
    })
    .catch(error => {
      console.error("Error fetching categories:", error);
    });
});

defineEmits(["toggle-complete", "edit-todo", "update-todo", "delete-todo"]);
</script>

<template>
  <li>
    <input
      type="checkbox"
      :checked="todo.isCompleted"
      @input="$emit('toggle-complete', index)"
    />
    
    <div class="todo">
      <input
        v-if="todo.isEditing"
        type="text"
        :value="todo.todo"
        @input="$emit('update-todo', $event.target.value, index)"
      />
      <span v-else :class="{ 'todo-complete': todo.isCompleted }">
        <router-link :to="{ name: 'detail', params: { id: todo.id }, props: { todo: todo } }">
          {{ todo.todo }}
        </router-link>
      </span>
    </div>

    <div class="category">
      <select
        v-if="todo.isEditing"
        v-model="todo.category"
        @change="$emit('update-todo', todo.category, index)"
      >
        <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
      </select>
      <span v-else>{{ todo.category }}</span>
    </div>

    <div class="deadline">
      <input
        v-if="todo.isEditing"
        type="date"
        v-model="todo.deadline"
        @change="$emit('update-todo', todo.deadline, index)"
      />
      <span v-else>{{ todo.deadline }}</span>
    </div>

    <div class="todo-actions">
      <Icon
        v-if="todo.isEditing"
        class="icon"
        icon="ph:check-circle"
        color="#41b080"
        width="22"
        @click="$emit('edit-todo', index)"
      />
      <Icon
        v-else
        class="icon"
        icon="ph:pencil-fill"
        color="#41b080"
        width="22"
        @click="$emit('edit-todo', index)"
      />
      <Icon
        class="icon"
        icon="ph:trash"
        color="#f95e5e"
        width="22"
        @click="$emit('delete-todo', todo.id)"
      />
    </div>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 10px;
  background-color: #f1f1f1;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  &:hover {
    .todo-actions {
      opacity: 1;
    }
  }

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #41b080;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    &:checked {
      background-color: #41b080;
    }
  }

  .todo {
    flex: 1;
    a {
      text-decoration: none;
      color: #41b080;
    }
    span {
      font-size: 1.2rem;
    }
    .todo-complete {
      color: red;
      font-size: 1.1rem;
      text-decoration: line-through;
    }
    input[type="text"] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }
  .category {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 6px;
    select {
      width: auto;
      border: 1px solid #41b080;
      padding: 2px 4px;
      background-color: white;
    }
    span {
      font-size: 1.2rem;
      color: #41b080;
    }
  }

  .deadline {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 6px;
    input[type="date"] {
      width: auto;
      border: 1px solid #41b080;
      padding: 2px 4px;
      background-color: white;
    }
    span {
      font-size: 1.2rem;
      color: #41b080;
    }
  }
  .todo-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }
}
</style>
