<script setup>
defineProps(({ 
  enabled: {
    type: Boolean,
    default: true,
  },
  contents: {
    type: String,
    default: 'empty',
    validator: (value) => ['empty', 'x', 'o'].includes(value)
  }
}))

defineEmits(['click'])
</script>

<template>
  <div class="cell-container">
    <div v-if="contents === 'x'">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path 
          d="M20,20 C25,25 45,45 50,50 C55,55 75,75 80,80 M80,20 C75,25 55,45 50,50 C45,55 25,75 20,80" 
          stroke="#bb2222" 
          stroke-width="8" 
          stroke-linecap="round"
          fill="none"
        />
      </svg>
    </div>
    <div v-else-if="contents === 'o'">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="#2222bb"
          stroke-width="8"
          fill="none"
        />
      </svg>
    </div>
    <button v-else @click="$emit('click')" class="cell-button" :disabled="!enabled">
    </button>
  </div>
</template>

<style lang="scss" scoped>
.cell-container {
  width: 100px;
  height: 100px;
}

.cell-button {
  background-color: $background-color;
  border: none;
  width: 100px;
  height: 100px;
}
</style>