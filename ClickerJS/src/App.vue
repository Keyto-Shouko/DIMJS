<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  methods: {
    emitEvent() {
      this.eventBus.emit('test', 'Welcome to MNP!')
    },
}
}
</script>

<template>
  <header>
    
     <!-- <nav>
        <RouterLink to="/clicker" >Clicker</RouterLink>
        <RouterLink to="/shop" v-on:click="emitEvent">Shop</RouterLink>
      </nav>!-->
  </header>
  <!--<RouterView v-slot="{ Component }">
  <KeepAlive>
    <component :is="Component" />
  </KeepAlive>
</RouterView>!-->
<RouterView/>
</template>

<style>

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin-bottom: 2%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
