<template>
  <div id="app">
    <h2 class="title">Contact Us</h2>
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from "./components/ContactForm.vue";
export default {
  name: "App",
  components: {
    ContactForm,
  },
};
</script>

<style>
#app {
  max-width: 50%;
  margin: 0 auto;
  margin-top: 2rem;
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
}

@media screen and (max-width: 600px) {
  #app {
    max-width: 90%;
  }
}

input,
textarea {
  outline: none;
  box-shadow: none !important;
  border: 1px solid #ccc !important;
}
</style>
