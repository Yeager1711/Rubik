<template>
  <div class="row">
    <!-- tìm kiếm và danh mục sản phẩm -->
    <section class="search-products">
      <form action="" class="form">
        <div class="box-search">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Tìm kiếm sản phẩm..."
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </form>

      <div class="box-container-products">
        <h3>Số lượng sản phẩm hiện có: {{resultQuery.length}}</h3>

        <div class="products-box">
          <div
            v-for="(item, index) in resultQuery"
            :key="`item-${index}`"
            :class="item.cls"
          >
            <div class="image">
              <img :src="item.img" alt="" />
            </div>

            <div class="content">
              <div class="evalute">
                <div class="name">{{ item.name }}</div>

                <div class="start">
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                </div>
              </div>

              <div class="shopping">
                <div class="price">
                  <span class="price-old">
                    {{ totalPrice(item?.price_old) }}
                  </span>
                  <span class="price-new">
                    {{ totalPrice(item?.price_new) }}
                  </span>
                </div>
              </div>

              <button class="shopping-cart" @click="viewModel(item)">
                <!-- <ThemifyIcon icon="shopping-cart" /> -->
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- popup detail view -->
        <div v-for="item in storeView" :key="item.id" :class="item.clss">
          <div class="detail-container">
            <div
              id="btn-closeDetail"
              class="fa-solid fa-xmark"
              @click="removeView(item.id)"
            ></div>

            <div class="detail-image">
              <img :src="item.img" alt="" />
            </div>

            <div class="detail-content">
              <div class="list-name">
                <h3>{{ item.name }}</h3>
              </div>
              <div class="list-evaluate">
                <div class="start">
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                  <i :class="item.icon"></i>
                </div>

                <div class="review">
                  <a href="/">(đánh giá khách hàng)</a>
                </div>
              </div>

              <div class="list-price">
                <span class="list-priceNew">
                  {{ totalPrice(item?.price_new) }}
                </span>
                <span class="list-priceOld">{{
                  totalPrice(item.price_old)
                }}</span>
              </div>

              <div class="list-desc">
                <p>{{ item.describe }}</p>
              </div>

              <div class="switch-add">
                <div class="add-button" @click="addToCart(item) == showAlert()">
                  <button>Thêm vào giỏ hàng</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Giỏ hàng và thanh toán -->
    <comp-cart />
  </div>
</template>

<script>
// import ThemifyIcon from "vue-themify-icons";
import { mapGetters, mapActions } from "vuex";
import CompCart from "./CompCart.vue";

export default {
  name: "comp-product",
  components: {
    CompCart,
  },

  data() {
    return {
      searchQuery: "",
    };
  },

  computed: {
    ...mapGetters(["products", "storeView"]),

    // lọc danh sách tìm kiếm thông qua data từ products
    resultQuery() {
      if (this.searchQuery) {
        return this.products.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split("")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    },
  },

  methods: {
    ...mapActions([
      "",
      "getProducts",
      "viewModel",
      "removeView",
      "addQtyPopup",
      "removeQty",
      "addToCart",
    ]),

    showAlert() {
      // Use sweetalert2
      this.$swal.fire({
        icon: "success",
        title: "Sản phẩm được thêm vào giỏ hàng 😉",
        // text: "Sản phẩm được thêm vào giỏ hàng 😉",
      });
    },

    totalPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },

  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  width: 100%;
  padding: 0 1rem;
  
  .search-products {
    min-width: 71.5%;

    form {
      padding: 1rem 0;
      border-bottom: 0.1rem solid #e8ebed;
      display: flex;
      align-items: center;
      justify-content: center;

      &.active {
        top: 0;
      }

      .box-search {
        max-width: 50rem;
        width: 100%;
        border: 0.18rem solid #dbdbdb;
        padding: 1rem;
        border-radius: 5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          border: none;
          width: 100%;
          background: #f5f5f5;
          outline: none;
          font-size: 16px;

          &::placeholder{
            font-size: 1.4rem;
          }
        }

        i {
          font-size: 1.5rem;
          margin-right: 0.5rem;
          padding: 0.3rem;
          color: #7c7c7c;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .box-container-products {
      margin-top: 2rem;

      h3{
        font-size: 1.5rem;
        text-transform: none;
      }

      .products-box {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
        gap: 1rem;

        .box {
          background: #fff;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
          padding: 1rem 0 0.5rem 0;
          position: relative;
          overflow: hidden;
          display: flex;

          &::before,
          &::after {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            -webkit-transition: all 0.35s ease;
            transition: all 0.35s ease;
            background-color: rgba(0, 0, 0, 0.2);
            border-left: 3px solid #fff;
            border-right: 3px solid #fff;
            content: "";
            opacity: 0.9;
            z-index: 1;
          }

          &::before {
            transform: skew(45deg) translateX(-155%);
          }

          &::after {
            transform: skew(45deg) translateX(155%);
          }

          .image {
            overflow: hidden;
            display: block;
            width: 13rem;
            height: 13rem;

            img {
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0.5rem;
              width: 100%;
            }
          }

          .content {
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            padding: 1rem;

            .evalute {
              display: block;
              justify-content: space-between;
              margin-bottom: 3rem;

              .name {
                font-weight: 600;
                font-size: 1.4rem;
                margin-bottom: 0.5rem;
              }

              .start {
                margin-top: 0.5rem;
                color: #fbb710;
              }
            }

            .shopping {
              display: flex;
              justify-content: space-between;
              margin-top: 0.7rem;

              .price {
                margin-top: 1rem;
                
                .price-old {
                  font-size: 1.3rem;
                  margin-right: 0.5rem;
                  text-decoration: line-through;
                }

                .price-new {
                  color: #eb2f5b;
                  font-weight: bolder;
                  font-size: 1.6rem;
                }
              }
            }

            .shopping-cart {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) scale(1.3);
              z-index: 3;
              text-align: center;
              align-items: center;
              visibility: hidden;
              background: #fbb710;
              color: #fff;
              z-index: 2;
              font-size: 1.4rem;
              padding: 1.5rem;
              border-radius: 50%;
              border: 0.1rem solid #dbdbdb;
            }
          }

          &:hover {
            cursor: pointer;

            &::before {
              transform: skew(45deg) translateX(-53%);
            }

            &::after {
              transform: skew(45deg) translateX(53%);
            }

            .shopping-cart {
              transform: translate(-50%, -50%) scale(1);
              visibility: visible;
              transition: 0.6s ease;
            }
          }
        }
      }

      .box-detail {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;

        .detail-container {
          position: relative;
          z-index: 99999;
          margin: auto;
          background: #f5f5f5;
          border-radius: 0.5rem;
          padding: 2rem;
          width: 85%;
          max-width: 70rem;
          display: flex;
          animation: fadeIn 0.3s ease;

          #btn-closeDetail {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            font-size: 2rem;
            padding: 0.5rem;

            &:hover {
              cursor: pointer;
            }
          }

          .detail-image {
            flex: 1 1 20rem;
            text-align: center;

            img {
              max-width: 25rem;
              width: 100%;
            }
          }

          .detail-content {
            flex: 1 1 40rem;

            .list-name {
              h3 {
                display: block;
                font-size: 2.5rem;
              }
            }

            .list-evaluate {
              display: flex;

              .start {
                display: inline-block;
                margin-right: 0.7rem;
                color: #fbb710;

                i {
                  font-size: 1.4rem;
                }
              }

              .review {
                display: inline-block;

                a {
                  color: #333;
                  font-size: 1.2rem;
                  text-transform: none;
                }
              }
            }

            .list-price {
              margin: 1.5rem 0;

              .list-priceNew {
                font-weight: 700;
                color: #79a206;
                font-size: 2rem;
                margin-right: 1rem;
              }

              .list-priceOld {
                text-decoration: line-through;
                font-size: 1.5rem;
              }
            }

            .list-desc {
              p {
                color: #333;
                font-family: "Nunito";
                text-transform: none;
                font-size: 1.4rem;
              }
            }

            .switch-add {
              margin-top: 3rem;
              display: flex;
              align-items: center;

              .switch-quantity {
                display: inline-block;
                border: 0.1rem solid #333;
                overflow: hidden;
                border-radius: 5rem;
                font-size: 1.35rem;

                button {
                  line-height: 1.3;
                  padding: 0 1.3rem;
                  font-size: 2rem;
                  margin: 0 0.4rem;
                  background: #f5f5f5;
                }
              }

              .add-button {
                margin-left: 1rem;

                button {
                  padding: 0.7rem 2rem;
                  background: #79a206;
                  color: #fff;
                  border-radius: 5rem;
                  font-size: 1.4rem;
                  box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
                  transition: 0.4s ease-out;

                  &:hover {
                    box-shadow: 0.5rem 0.3rem rgba(0, 0, 0, 0.3);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
