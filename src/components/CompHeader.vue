<template>
  <header class="header">
    <a href="/" class="logo">
        <img src="./images/logo.png" alt="" />
    </a>

    <nav class="navbar">
        <router-link
            :to="item.href"
            v-for="(item, index) in navItems"
            :key="`nav-${index}`"
            :active-class="item.active"
            :tag="item.tag"
            exact
        >
          <div :class="item.class">
           <i :class="item.icon"></i>
              {{ item.list }}
          </div>
        </router-link>
    </nav>

    <div class="icon">
      <div id="btn-arrow" class="fa-solid fa-angles-left" @click="slideBar()"></div>
    </div>
  </header>
</template>

<script>

export default {
  name: "comp-header",

  data() {
    return {
      navItems: [
        {
          list: "Trang chủ",
          href: "/",
          active:"active",
          tag:"a",
          class:"link-container",
          icon:"fa-solid fa-house",
        },

        {
          list: "Giới thiệu",
          href: "/about",
          active:"active",
          tag:"a",
          class:"link-container",
          icon:"fa-solid fa-blog",
          
        },

        {
          list: "Danh mục",
          href: "/products",
          active:"active",
          tag:"a",
          class:"link-container",
          icon:"fa-solid fa-box-open",
        },

        {
          list: "Giỏ hàng",
          href: "/cart",
          img:require('../components/images/cart-img.png'),
          active:"active",
          tag:"a",
          class:"link-container",
          icon:"fa-solid fa-cart-shopping",
        },

        {
          list: "Thanh toán",
          href: "/checkout",
          active:"active",
          tag:"a",
          class:"link-container",
          icon:"fa-brands fa-paypal",
        },
      ],
    };
  },

  methods:{
    slideBar() {
      const headerSlider = document.querySelector(".header")
      headerSlider.classList.toggle('active')
    }
  },
  
};
</script>

<style lang="scss" scoped>
a {
  list-style: none;
  text-decoration: none;
}

.header {
  position: relative;
  top: 0;
  left: 0;
  min-width: 20rem;
  box-shadow: 0 .5rem 1rem rgba(0,0,0, .3);
  display: flex;
  flex-direction: column;
  z-index: 999 !important;
  padding: 5% 0;
  background: #fff;
  transition: .3s ease;
  overflow: auto;

// active slide header
  &.active {
    transition: .3s ease;
    min-width: 5rem;

    .navbar {
      a{
        .link-container{
          opacity: 1;
          transition: .2s linear;
          visibility: visible;
          font-size: 0;
          margin: auto;

          i{
            margin: auto;
          }
        }
      }
    }

    .logo {
      display: flex;

      img {
        margin: auto;
        max-width: 4.5rem;
        margin-bottom: 5rem;
        // width: 100%;
      }
    }

    .icon{
      #btn-arrow{
        transform: rotate(180deg);
      }
    }
  }
// end active

  .logo {
    display: flex;

    img {
      margin: auto;
      max-width: 8rem;
      margin-bottom: 5rem;
      // width: 100%;
    }
  }

  .navbar {
    margin-top: 2rem;
    text-align: center;
      width: 100%;

    a {
      font-family: "Nunito";
      text-transform: none;
      color: #333;
      font-weight: 600;
      font-size: 1.5rem;
      padding: 1rem 0;
      margin-bottom: 2rem;
      display: flex;
      z-index: 999;

      // active navbar
      &.active{
        background: #ccc;
        color: #333;
      }

      &:hover {
        transition: all 0.2s;
        color: teal;
      }

      .link-container {
        font-size: 1.5rem;
        margin-left: 5rem;          
        transition: .2s linear;

        i{
          font-size: 1.7rem;
          margin: auto;
          margin-right: .7rem;
        }
      }


    }
  }

  .icon {
    #btn-arrow{
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      font-size: 1.7rem;
      padding: 1rem 0;
      color: #333;
      line-height: 1;

      img {
        width: 2rem;
        padding-right: 0.7rem;
      }

      &:hover {
        cursor: pointer;
        color: teal;
      }
    }
  }
}


</style>
