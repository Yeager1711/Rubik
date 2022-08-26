<template>
  <div id="app">
      <div class="wrapper">
          <comp-header />

          <router-view />
      </div>
      <comp-queries />
      <comp-new-letter />
  </div>
</template>

<script>
import CompHeader from './components/CompHeader.vue'
import CompNewLetter from './components/CompNew_Letter.vue'
import CompQueries from './components/CompQueries.vue';

export default {
  name: 'App',
  components: { CompHeader, CompNewLetter, CompQueries}
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;1,400;1,500&family=Nunito:wght@200;300;400;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,500;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700&family=Poppins:wght@100;300;400;500;600&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  padding: 0;
  margin: 0;
  border: none;
  box-sizing: border-box;
  list-style: none;
  outline: none;
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.2s;
  background: #f5f5f5;
}

.wrapper{
    display: flex;
    overflow: hidden;
}

html {
  font-size: 62.5%;
  overflow-x: none;
  scroll-behavior: smooth;
  scroll-padding-top: 6rem;
  transition: all .2s;

    &::-webkit-scrollbar {
       display: none;
    }
}

.owl-theme {
  .owl-nav {
    display: none;
  }
}


.owl-theme{
    .owl-dots{
      display: none;
        position: absolute;
        bottom: 0;
    }
} 

// swalalert2
.swal2-container.swal2-center.swal2-backdrop-show {
    z-index: 111111111111111;
}

div#swal2-html-container {
    font-size: 1.5rem;
}

h2#swal2-title {
  font-family: "Nunito";
  font-size: 1.5rem;
}

section {
  padding: 2rem 1rem;
  width: 100%;
}

body{
  margin:0;
}

.heading {
  text-align: center;
  font-size: 2rem;
  color: #333;
  padding-bottom: 1rem;
  span {
    color: #3cb815;
  }
}

a{
  list-style: none;
  text-decoration: none;
}

button {
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
}

@media (max-width: 1200px) {
  html {
    font-size: 55%;
  }
}

@media (max-width: 991px) {
  section {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
}

@media (max-width: 450px) {
  html {
    font-size: 50%;
  }
}
</style>
