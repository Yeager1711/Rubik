<template>
  <header class="header">
    <a href="/" class="logo">
      <img src="./images/logo.png" alt="" />
    </a>

    <nav class="navbar">
      <div v-for="(navItem, index) in filteredNavItems" :key="index">
        <router-link :to="navItem.href" :active-class="navItem.active" tag="a" exact>
          <div class="link-container" :class="navItem.class">
            <i :class="navItem.icon"></i>
            {{ getNavItemText(navItem) }}
          </div>
        </router-link>
      </div>

      <div v-if="loggedInUser">
        <router-link to="/profile" active-class="active" tag="a" exact>
          <div class="link-container" style="display: flex; align-items: center;">
            <i><img v-if="base64Image" :src="base64Image" alt="Avatar" width="35" height="35"
                style="border-radius: 5rem;" /></i>
            <span class="data-name">{{ loggedInUser }}</span>
          </div>
        </router-link>
      </div>

      <div v-else>
        <router-link to="/login" tag="a">
          <div class="link-container">
            <i class="fa-solid fa-user" style="visibility: hidden;"></i>
            <span style="visibility: hidden;">Đăng nhập</span>
          </div>
        </router-link>
      </div>

    </nav>

    <div class="icon">
      <div id="btn-arrow" class="fa-solid fa-angles-left" @click="slideBar()"></div>
    </div>
  </header>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: "comp-header",

  data() {
    return {
      loggedInUser: undefined,
      base64Image: null,
      roleID: Cookies.get('role_id'),

      navItems: [
        {
          list: "Trang chủ",
          href: this.roleID === '1' ? "/admin/home" : "/",
          active: "active",
          tag: "a",
          icon: "fa-solid fa-house",
        },
        {
          list: "Giới thiệu",
          href: "/about",
          active: "active",
          tag: "a",
          icon: "fa-solid fa-blog",
        },
        {
          list: "Danh mục",
          href: "/products",
          active: "active",
          tag: "a",
          icon: "fa-solid fa-box-open",
        },
        {
          enable: 'enable-control',
          list: "Giỏ hàng",
          href: "/cart",
          img: require('../components/images/cart-img.png'),
          active: "active",
          tag: "a",
          icon: "fa-solid fa-cart-shopping",
        },
        {
          enable: 'enable-control',
          list: "Thanh toán",
          href: "/checkout",
          active: "active",
          tag: "a",
          icon: "fa-brands fa-paypal",
        },
        {
          enable: 'enable-control',
          disable: 'disableLogin',
          list: "Đăng nhập",
          href: "/login",
          active: "active",
          tag: "a",
          icon: "fa-solid fa-user",
        }
      ],
    };
  },

  computed: {
    filteredNavItems() {
      if (this.loggedInUser !== undefined && this.roleID === '1') {
        return this.navItems.filter(item => item.enable !== 'enable-control');
      } else {
        if (this.loggedInUser !== undefined && this.roleID === '2') {
          return this.navItems.filter(item => item.disable !== 'disableLogin')
        } else {
          return this.navItems;
        }
      }
    }
  },

  created() {
    const fullname = Cookies.get('full_name');
    const base64Data = sessionStorage.getItem('avatar');

    if (fullname !== undefined) {
      this.loggedInUser = fullname;

      if (base64Data) {
        this.base64Image = 'data:image/jpeg;base64,' + base64Data;
      }
    }

    // Cập nhật href dựa trên roleID ban đầu
    this.updateNavItemsHref(this.roleID);
  },

  watch: {
    roleID(newRoleID) {
      // Cập nhật href dựa trên roleID khi roleID thay đổi
      this.updateNavItemsHref(newRoleID);
    }
  },

  methods: {
    slideBar() {
      const headerSlider = document.querySelector(".header");
      headerSlider.classList.toggle('active');
    },

    getNavItemText(navItem) {
      if (this.roleID === '1') {
        switch (navItem.list) {
          case "Trang chủ":
            return "Trang chủ";
          case "Giới thiệu":
            return "Quản lý";
          case "Danh mục":
            return "Đơn hàng";
          default:
            return navItem.list;
        }
      } else {
        return navItem.list;
      }
    },


    updateNavItemsHref(roleID) {
      this.navItems.forEach(item => {
        if (roleID === '1') {
          switch (item.list) {
            case "Trang chủ":
              item.href = "/admin/home";
              break;

            case "Giới thiệu":
              item.href = "/admin/manager";
              break;

            case "Danh mục":
              item.href = "/admin/orders";
              break;

            default:
              item.href = "";
              break;
          }
        } else {
          item.href = "";
        }
      })
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
  min-width: 23rem;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .3);
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
      a {
        .link-container {
          opacity: 1;
          transition: .2s linear;
          visibility: visible;
          font-size: 0;
          margin: auto;

          i {
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

    .icon {
      #btn-arrow {
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
      &.active {
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

        i {
          font-size: 1.7rem;
          margin: auto;
          margin-right: .7rem;

          img {
            object-fit: cover;
          }
        }
      }
    }
  }

  .icon {
    #btn-arrow {
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

@media (max-width: 1200px) {
  html {
    font-size: 55%;
  }
}

@media (max-width: 991px) {
  section {
    padding: 2rem;
  }

  .header {
    display: none;
  }
}

@media (max-width: 768px) {}

@media (max-width: 450px) {
  html {
    font-size: 50%;
  }
}
</style>
