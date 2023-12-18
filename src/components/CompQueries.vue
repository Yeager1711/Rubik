<template>
  <section class="header-queries">
    <nav class="navbar">
        <div class="buttonBar" @click="removeNav">
            <router-link to="/"> <i class="fa-solid fa-home"></i> Trang Chủ </router-link>
        </div>

        <div class="buttonBar" @click="removeNav"> 
            <router-link to="about">  <i class="fa-solid fa-blog"></i> Giới thiệu </router-link>
        </div>

        <div class="buttonBar" @click="removeNav"> 
            <router-link to="products">  <i class="fa-solid fa-link"></i> Danh mục </router-link>
        </div>

      <div class="buttonBar" id="btn-cart" @click="showCart"> <i class="fa-solid fa-cart-shopping"></i> Giỏ hàng</div>
    </nav>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "comp-queries",
  data() {
    return {
      queriesItems: [
        {
          element: "buttonBar",
          icon: "fa-solid fa-home",
          href: "/",
          name: "Trang chủ",
          open: "active",
          tag: "a",
        },

        {
          element: "buttonBar",
          icon: "fa-solid fa-link",
          href: "products",
          name: "Danh mục",
          open: "active",
          tag: "a",
        },

        {
          element: "buttonBar",
          cls: "btn-setting",
          icon: "fa-solid fa-gear",
          href: "",
          name: "Chuyển đổi",
          open: "active",
          tag: "a",
        },

        {
          element: "buttonBar",
          cls: "btn-menu",
          icon: "fa-solid fa-bars",
          href: "",
          name: "Menu",
          open: "active",
          tag: "a",
        },
      ],
    };
  },

  methods:{
    ...mapActions(["showCart", "removeNav", "convert"])
  }
};
</script>

<style lang="scss">
.header-queries {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: none;
  align-items: center;
  justify-content: space-between;
  background:#fff;
  box-shadow: 0 .5rem 1rem rgba(0,0,0, .3);
  z-index: 99999 !important;
  padding: 1rem;

  .navbar {
    margin: auto;
    .buttonBar {
      display: inline-block;
      text-align: center;
      padding: 0.5rem;
      font-size: 1.2rem;
      margin: 0 1rem;
      color:#333;
      cursor: pointer;

      a {
        color:#333;

        i {
          display: block;
          font-size: 2rem;
        }
      }

      i {
        display: block;
        font-size: 2rem;
      }
    }
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

  .header-queries {
    display: flex;
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
