<template>
  <div class="container">
    <div>
      <logo />
      <h2 class="subtitle">
        EOS card game with Nuxtjs
      </h2>
      <div class="field">
  <p class="control has-icons-left has-icons-right">
    <input class="input" type="text" placeholder="Username" v-model="user.name">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </p>
</div>
<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="text" placeholder="Public Key" v-model="user.key">
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>
      <div class="links">
       <button @click="login()"
       class="btn is-primary">
         submit
         </button> 
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import apiService from '~/services/ApiService'
export default {
  components: {
    Logo
  },
  data() {
    return {
      user: {
        name: "",
        key: ""
      }
    }
  },
  methods: {
    login() {
      console.log("logging in")
      return apiService.login(this.user)
      .then(() => {
        console.log("dispatching: ", {name:this.user.name, key:this.user.key})
        this.$store.dispatch('userStats', {name:this.user.name, key:this.user.key})
      })
      .catch(error => {
        this.$store.commit('errorState', error.toString())
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
