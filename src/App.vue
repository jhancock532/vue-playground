<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/tic-tac-toe">Tic Tac Toe</router-link> |
      <router-link to="/wordle">Wordle</router-link>
    </nav>
  </header>

  <router-view />
</template>

<style lang="scss">
#app {
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  margin-top: 60px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $text-color;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s ease;

    &:hover {
      color: $primary-color;
    }

    &.router-link-exact-active {
      color: $primary-color;
    }
  }
}
</style> 