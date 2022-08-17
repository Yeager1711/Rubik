<template>
  <section class="cart">
    <h2 class="heading">
      Giỏ Hàng
      <div class="image-heading">
        <img src="./images/cart-img.png" alt="" />

        <span> {{ totalQuantity }} </span>
      </div>
    </h2>

    <div class="box-container">
      <div class="table-cart">
        <div v-for="item in storeCart" 
        :key="item.id" 
        :class="item.cls"
        >
          <div class="btn-remove" 
            @click="removeItem(item.id)"
          > 
            <i class="fa-solid fa-xmark"></i> 
          </div>

          <div class="list-image">
            <img :src="item.img" alt="" />
          </div>

          <div class="list-name">
            <span> {{ item.name }} </span>
          </div>

          <div class="list-price">
            <span>{{ item.price_new }}đ</span>
          </div>

          <div class="quantity">
            <button @click="reduceQty(item.id)">-</button>
            {{ item.qty }}
            <button @click="addQty(item.id)">+</button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h3 class="title">Tổng số giỏ hàng</h3>

        <div class="subtotal">
          <span>Số lượng: </span>
          <span class="list-value"> {{ totalQuantity }} </span>
        </div>

        <div class="delivery">
          <span>Giao hàng: </span>
          <span class="list-value"> Free</span>
        </div>

        <div class="total">
          <span>Tổng thanh toán: </span>
          <span class="list-value"> {{ totalPrice }} </span>
        </div>

        <router-link to="/checkout" class="checkout"> Thanh toán</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "comp-cart",
  "types": [
    "vue-sweetalert2"
  ],
  computed: {
    ...mapGetters(["storeCart", "storeView"]),
    totalQuantity() {
      return this.storeCart.reduce((a, b) => a + b.qty, 0);
    },

    totalPrice() {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.storeCart.reduce((a, b) => a + b.qty * b.price_new, 0));
    },
  },

  methods: {
    ...mapActions(["addQty", "reduceQty", "removeItem"]),
  },
};
</script>

<style lang="scss" scoped>

.cart {
  background: url(../components/images/background/bg-checkout.webp) no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }

  .heading {
    text-align: left;
    font-size: 3rem;
    font-weight: 600;
    color: #fff;
    font-family: "Nunito";
    display: flex;
    margin: auto;

    .image-heading {
      position: relative;

      img {
        margin-left: 0.3rem;
        width: 2.5rem;
      }

      span {
        position: absolute;
        background: #f4b301;
        color: #fff;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.1rem;
        border-radius: 100%;
        right: -0.9rem;
        top: 0;
        z-index: 2;
      }
    }
  }

  .box-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;

    .table-cart {
      flex: 1 1 40rem;
      padding: 0 1rem;
      width: 100%;
      height: 35rem;
      border-radius: 1rem;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0.5rem;
      }

      &::-webkit-scrollbar-thumb {
        background: #fafafc;
        border-radius: 5rem;
      }

      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.2);
      }

      .box {
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        background: #f5f5f5;
        border: .1rem solid #dbdbdb;
        border-radius: 1rem;
        padding: 0.1rem 2rem;
        margin: 1rem 0;
        position: relative;

        &:hover {
          transition: 0.2s linear;
          transform: scale(0.98);
        }

        .btn-remove {
          position: absolute;
          top: 0;
          right: 1rem;
          font-size: 1.7rem;
          padding: 0.7rem;
          color: #333;

          &:hover {
            cursor: pointer;
          }
        }

        .list-image {
          width: 7rem;
          height: auto;
          overflow: hidden;
          border-radius: 1rem;
          img {
            max-width: 100%;
          }
        }

        .list-name {
          span {
            font-family: "Nunito";
            font-weight: 550;
            font-size: 1.7rem;
          }
        }

        .list-price {
          span {
            font-family: "Nunito";            
            font-weight: 550;
            font-size: 1.5rem;
          }
        }

        .quantity {
          padding: 2rem;
          font-size: 1.6rem;

          button {
            background: #f5f5f5;
            border: none;
            font-size: 2rem;
            border-radius: 0.5rem;
            margin: 0 1rem;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }

    .cart-summary {
      flex: 1 1 10rem;
      width: 100%;
      height: 100%;
      max-height: 40rem;
      padding: 2rem;
      border-radius: .5rem;
      // background: #f5f7fa;
        background: rgba(255, 255, 255, 0.9);
      // box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.4);
      box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.2);

      .title {
        text-transform: none;
        font-size: 2.3rem;
        font-weight: 600;
        font-family: "Nunito";
      }

      .subtotal,
      .delivery,
      .total {
        display: flex;
        justify-content: space-between;

        span {
          text-transform: none;
          font-family: "Montserrat";
          margin-bottom: 1rem;
          padding: 1rem 0;
          font-size: 1.3rem;
          font-weight: 550;
        }

        .list-value{
          text-transform: none;
          font-family: "Montserrat";
          margin-bottom: 1rem;
          padding: 1rem 0;
          font-size: 1.3rem;
          font-weight: bolder;
        }
      }

      .checkout {
        text-transform: none;
        display: inline-block;
        padding: 0.8rem 0;
        border-radius: 0.5rem;
        font-size: 1.5rem;
        color: #fff;
        background: #fbb710;
        width: 100%;
        text-align: center;
        text-decoration: none;

        &:hover {
          cursor: pointer;
          letter-spacing: 0.1rem;
          transition: 0.2s linear;
        }
      }
    }
  }
}
</style>
