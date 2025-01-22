<template>
  <button 
    class="button"
    :class="variant"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  }
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: $font-family-base;
  font-size: $font-size-base;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
  
  &.primary {
    background-color: $primary-color;
    color: $background-color;
  }
  
  &.secondary {
    background-color: $secondary-color;
    color: $background-color;
  }
  
  &.danger {
    background-color: $error-color;
    color: $background-color;
  }
}
</style>