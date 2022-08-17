<template>
  <section class="checkout">
    <h2 class="heading">Nhập thông tin khách hàng</h2>

    <div class="box-container">
      <form action="">
        <div class="inputBox">
          <!-- <span>Nhập họ </span> -->
          <input type="text" name="" placeholder="Nhập họ..."/>
        </div>

        <div class="inputBox">
          <input type="text" name="" placeholder="Nhập tên..."/>
        </div>

        <div class="inputBox">
          <input type="email" name="" placeholder="Nhập email..."/>
        </div>

        <div class="inputBox">
          <input type="text" name="" placeholder="Nhập địa chỉ..."/>
        </div>

        <div class="inputBox">
          <input type="number" placeholder="Số điện thoại..."/>
        </div>

        <div class="inputBox">
          <input type="number" placeholder="Nhập"/>
        </div>

        <div class="inputBox">
          <textarea name="address" cols="30" rows="10" placeholder="Thêm chú thích"></textarea>
        </div>
      </form>

      <div class="checkout-summary">
        <h3 class="title">Đơn hàng của bạn</h3>

        <div class="check-list">
          <!-- show name products & price product -->
            <div class="list-title">
                <div class="check-products">
                    <h3>Sản phẩm</h3>
                </div>

                <div class="check-total">
                    <h3>Thành tiền</h3>
                </div>
            </div>

        <!-- value(state, getters, actions): box-show: name & price -->
              <div class="list-box">

                <div v-for="item in storeCart" 
                  :key="item.id" 
                  :class="item.cls"
                  >
                    <div class="name-products">
                      <img :src="item.img" alt="">
                      <span> {{item.name}} </span> 
                    </div>

                    <div class="total-products">
                      <span>  {{item.qty}} </span> 
                    </div>

                    <div class="price-list">
                      <span> {{item.price_new}}đ </span> 
                    </div>
                </div>
              </div>

              <div class="list-sum">
                <div class="title">
                  <span>Tổng: </span>
                </div>
                <div class="sum">
                  <span> {{checkPrice}} </span>
                </div>
              </div>
        </div>

        <button @click="showAlert" class="checkout-payment">
          Thanh toán
        </button>
      </div>
    </div>
  </section>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "comp-checkout",

  computed:{
     ...mapGetters(["storeCart"]),
      checkQuantity() {
        return this.storeCart.reduce((a, b) => a + b.qty, 0);
      },

      checkPrice() { return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.storeCart.reduce((a, b) => a + b.qty * b.price_new, 0));
      },
      
  },

  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal.fire({
        icon: 'success',
        title: 'Thanh toán thành công 😉',
        // text: "Sản phẩm được thêm vào giỏ hàng 😉",
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  background: url(../components/images/background/bg-checkout2.webp) no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 0;

  .heading {
    text-align: left;
    font-size: 3rem;
    font-weight: 550;
    text-transform: none;
    font-family: "Nunito";
  }

  .box-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;

    form {
      flex: 1 1 50rem;
      height: 100%;
      min-height: 5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      border-radius: 1rem;
      padding: 2rem 1.5rem;

      .inputBox {
        flex: 1 1 20rem;
        position: relative;
        width: 100%;
        border-radius: 0.5rem;
        border: none;
       
        input,
        textarea {
          width: 100%;
          padding: 0;
          border-radius: .5rem;
          height: auto;
          border: 0.1rem solid #dcdcdc;
          outline: none;
          padding: 1rem 0 1rem 1rem;
          background:none;

          &:focus{
            transition: .2s linear;
            border-color: #6a5af9;
          }

          &::placeholder{
            padding-left: 0;
          }
        }
      }
    }

    .checkout-summary {
      flex: 1 1 30rem;
      width: 100%;
      height: 100%;
      max-height: auto;
      padding: 2rem;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);

      .title {
        text-transform: none;
        font-size: 2.3rem;
        font-weight: 600;
        font-family: "Nunito";
      }

        .check-list{

            .list-title{
                display: flex;
                justify-content: space-between;
                border-bottom: .1rem solid #d5d5d5;
                margin-bottom: 2rem;//cos thể fic khi co thuộc tính bên dưới
                
                .check-products {
                  display: flex;
                  align-items: center;

                  h3{
                      color: #333;
                      font-size: 1.2rem;
                      font-weight: 600;
                      text-transform: uppercase;
                  }
                }

                .check-total {
                  display: flex;
                  align-items: center;

                  h3{
                    font-size: 1.2rem;
                    font-weight: 400;
                    text-transform: uppercase;
                    color: #333;
                    font-weight: 600;
                  }
                }
            }

           .list-box {
            padding: 0 .5rem 0 0;
            margin: 1rem 0 3rem 0;
            height: auto;
            max-height: 20rem;
            overflow: auto;

            &::-webkit-scrollbar{
              width: .3rem;
            }
            
            &::-webkit-scrollbar-thumb{
              background: #888;
              border-radius: 5rem;
            }

            &::-webkit-scrollbar-track{
              background: #fff;
            }

             .box{
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: .7rem 0;
              padding: .3rem 1rem;
              background: #f5f5f5;
              border: .1rem solid #d5d5d5;
              border-radius: 5rem;
              overflow: auto;

              span{
                font-family: "Nunito";
                font-size: 1.5rem;
                font-weight: 550;
                text-transform: none;
              }

              .name-products{
                display: flex;
                align-items: center;
                
                img{
                  margin-right: .5rem;
                  width: 5rem;
                }
              }

              .total-products{
                text-align: center;
              }
            }
           }

           .list-sum {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;

            .sum{
              font-weight: bolder;
              font-size: 1.7rem;
            }
           }
        }
      

      .checkout-payment {
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
