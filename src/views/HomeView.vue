<script setup>
import { ref } from 'vue'

const buttonPreference = ref('none')

const handleClick = (variant) => {
  buttonPreference.value = variant
}
</script>

<template>
  <div class="home">
    <h1>Welcome to the Vue Playground</h1>
    <p>A learning experiment for developing with Vue.js</p>

    <p class="buttonPreferenceStatus" v-bind:class="buttonPreference">Last button clicked: {{ buttonPreference }}</p>

    <div class="buttonContainer">
      <Button variant="primary" @click="handleClick('primary')">Primary</Button>
      <Button variant="secondary" @click="handleClick('secondary')">Secondary</Button>
      <Button variant="danger" @click="handleClick('danger')">Danger</Button>
    </div>

    <p class="explainer">The above uses a ref to track the button variant state and a child button component that accepts varient values as props, using an emitter to update the parent state.</p>
  </div>
</template>


<style lang="scss" scoped>

.explainer {
  padding-top: 2rem;
  width: 500px;
  text-align: center;
  margin: 0 auto;
}

.buttonContainer {
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.buttonPreferenceStatus {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  width: fit-content;
  text-align: center; 
  margin: 1rem auto;
  color: white !important;
}

.none {
  background-color: black;
}

.primary {
  background-color: $primary-color;
}

.secondary {
  background-color: $secondary-color;
}

.danger {
  background-color: $error-color;
}

.home {
  padding: 20px;
  
  h1 {
    color: $primary-color;
    margin-bottom: 1rem;
  }
  
  p {
    color: $text-color;
    margin-bottom: 2rem;
  }
  
  button {
    margin: 0 0.5rem;
  }
}
</style> 