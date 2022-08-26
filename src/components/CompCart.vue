<template>
  <section class="cart">
    <h2 class="heading">
      Đơn hàng của tôi
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
            <span class="name"> {{ item.name }} </span>
            <span class="price"><p>giá:</p> {{ ConvertPrice(item.price_new)}}</span>
          </div>

          <div class="quantity">
            <button @click="addQty(item.id)">+</button>
            {{ item.qty }}
            <button @click="reduceQty(item.id)">-</button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h3 class="title">Hóa đơn giỏ hàng</h3>

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

        <div @click="showAlert()" class="checkout"> Thanh toán</div>
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

    ConvertPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },

    showAlert() {
      // Use sweetalert2
      this.$swal.fire({
        icon: 'error',
        title: 'Đường dẫn chưa được liên kết đến "Payment"',
        // text: "Sản phẩm được thêm vào giỏ hàng 😉",
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.cart {
  background: #eeeeee;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 24.5%;
  overflow: auto;

  .heading {
    text-align: left;
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    font-family: "Nunito";
    display: flex;
    margin-top: 2rem;

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
    justify-content: space-between;
    gap: 1rem;

    .table-cart {
      padding: 0 1rem 1rem 0;
      width: 100%;
      height: 27rem;
      border-radius: 1rem;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0.5rem;
      }

      &::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 5rem;
      }

      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.2);
      }

      .box {
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 1rem;
        padding: .5rem;
        margin: 1rem 0;
        position: relative;

        &:hover {
          transition: 0.2s linear;
          transform: scale(0.98);
        }

        .btn-remove {
          position: absolute;
          top: -1.5rem;
          right: .5rem;
          transform: rotate(90deg);
          font-size: 1.7rem;
          padding: 0.7rem;
          color: #333;

          &:hover {
            cursor: pointer;
          }
        }

        .list-image{
          max-width: 7rem;

          img{
            width: 100%;
          }
        }

        .list-name {
    
          .name {
            display: inline-block;
            
            font-family: "Nunito";
            font-weight: 750;
            font-size: 1.5rem;
          }

          .price{
            color: #eb2f5b;
            font-family: "Nunito";            
            font-weight: 650;
            font-size: 1.5rem;
            display: flex;
            align-items: center;

            p{
              text-transform: none;
              color: #333;
              margin-right: .3rem;
              font-size: 1.4rem;
            }
          }
        }

        .quantity {
          border: .1rem solid #aaa;
          border-radius: 5rem;
          margin: 0 .5rem;
          display: flex;
          align-items: center;
          font-size: 1.6rem;

          button {
            background: #f5f5f5;
            border: none;
            font-size: 2rem;
            border-radius: 0.5rem;
            margin: 0 .5rem;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }

    .cart-summary {
      border: .1rem dashed #333 ;
      max-width: 100%;
      height: 100%;
      max-height: 40rem;
      padding: 2rem;
      border-radius: .5rem;

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

@media (max-width: 1200px) {
  html {
    font-size: 55%;
  }
}

@media (max-width: 991px) {
  section {
    padding: 2rem;
  }

  .cart{
        position: fixed;
        top: 0;
        right: -100%;
        bottom: 0;
        transition: .3s ease;
        width: 32rem;

      &.active{
        z-index: 99998 !important;
        transition: .3s ease;
        right: 1rem;
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.3);
      }
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
