<template>
  <section class="cart">
    <h2 class="heading">
      Giỏ hàng của tôi
      <div class="image-heading">
        <img src="./images/cart-img.png" alt="" />
        <span> {{ orders.length }} </span>
      </div>
    </h2>

    <div class="box-container">
      <div class="table-cart">
        <div v-if="orders.length === 0" style="position: relative;display: flex;">
          <div style="margin: auto; 
                text-align: center; 
                font-size: 13px; 
                color: #999; 
                text-transform: none;">
            <img src="./images/cart-empty.png" alt="" style="width: 20rem; margin: auto;">
            <p>Không có đơn hàng nào</p>
          </div>
        </div>

        <div v-else>
          <div v-for="item in orders" :key="item.product_id" class="order-container">
            <div class="list-image">
              <img :src="deccoImage(item.product.image_product)" alt="">
            </div>
            <div class="list-name">
              <span class="name">{{ item.product ? item.product.name_product : 'Sản phẩm không xác định' }}</span>

              <div class="quantity">
                <button class="decrease" @click="decreaseQuantity(item)"> - </button>
                <span class="value">{{ item.quantity }}</span>
                <button class="increase" @click="increaseQuantity(item)"> + </button>
              </div>
            </div>


            <div class="totalItem-amount">
              <span>{{ totalPrice(item?.amount) }}</span>
            </div>

            <div class="fa-solid fa-xmark btn-removeItem" @click="confirmRemoveItem(item)"></div>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h3 class="title">Tổng giỏ hàng</h3>

        <div class="subtotal">
          <span>Số lượng: </span>
          <span class="list-value"> {{ totalQuantity }} </span>
        </div>

        <div class="delivery">
          <span>Giao hàng: </span>
          <span class="list-value"> miễn phí</span>
        </div>

        <div class="total">
          <span>Tổng thanh toán: </span>
          <span class="list-value" style="color: #ee4d2d;"> {{ totalAmount }} </span>
        </div>

        <a class="checkout" v-if="orders.length > 0" @click.prevent="confirmOrder">
          Xác nhận đơn hàng
        </a>
        <div v-else style="background: #999;" class="checkout">
          Xác nhận đơn hàng
        </div>

      </div>
    </div>

  </section>
</template>


<script>
import axios from "axios";
import Swal from 'sweetalert2';
import { mapActions } from "vuex";
import Cookies from 'js-cookie';
import store from '@/store';


export default {
  name: "comp-cart",
  data() {
    return {
      orders: [],
      quantityToUpdate: 0
    };
  },

  computed: {
    totalQuantity() {
      return this.orders.reduce((total, item) => total + item.quantity, 0);
    },

    totalAmount() {
      const total = this.orders.reduce((sum, item) => sum + item.amount, 0);
      return this.totalPrice(total)
    },

    deccoImage: function () {
      return function (base64) {
        return `data:image/png;base64,${base64}`
      }
    }
  },

  methods: {
    ...mapActions(["addQty", "reduceQty", "removeItem"]),

    async fetchCart() {
      try {
        // Đọc user_id từ cookies
        const userId = Cookies.get('user_id');

        // Gửi yêu cầu với user_id
        const response = await axios.get(`http://localhost:4000/api/carts/${userId}`);
        console.log("Phản hồi API giỏ hàng:", response.data);
        this.orders = response.data;

        if (this.orders.length > 0) {
          await this.fetchAndUpdateProducts();
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    },

    async fetchAndUpdateProducts() {
      console.log("Fetching and updating product details...");

      const promises = this.orders.map(async (order) => {
        if (this.isValidOrder(order)) {
          console.log("Processing order: ", order)
          try {
            const productId = order.product_id;
            const response = await axios.get("http://localhost:3005/api/products/" + productId);
            console.log("API Response for product details:", response.data);

            if (this.isValidProductResponse(response)) {
              console.log("Product details:", response.data);
              // Update the product array for each order
              this.$set(order, 'product', response.data);
            } else {
              console.error("Invalid product response:", response.data);
            }
          } catch (error) {
            console.error("Error fetching product details:", error);
          }
        }
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error("Error while fetching and updating:", error);
      }
    },

    isValidOrder(order) {
      return order && order.product_id;
    },

    isValidProductResponse(response) {
      return response && response.data;
    },

    totalPrice(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount)
    },

    increaseQuantity(item) {
      item.quantity += 1;
      this.updateTotalAmount(item);
      this.quantityToUpdate = item.quantity;
    },

    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        this.updateTotalAmount(item);
        this.quantityToUpdate = item.quantity;
      } else {
        Swal.fire({
          icon: 'warning',
          title: "Số lượng không nhỏ hơn 1"
        })
      }
    },

    updateTotalAmount(item) {
      const amount = item.quantity * item.product.price;
      this.$set(item, 'amount', amount);
    },

    async confirmRemoveItem(item) {
      const confirmation = await Swal.fire({
        title: 'Xác nhận xóa sản phẩm',
        text: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Không',
        confirmButtonText: 'Có',
      });

      if (confirmation.isConfirmed) {
        this.removeItemFromCart(item);
      }
    },

    //Xóa item product trong giỏ hàng
    async removeItemFromCart(item) {
      try {
        const responseRemoveitemCart = await axios.post('http://localhost:4000/api/removeItemFromCart', { orderId: item.order_id, productId: item.product_id });

        // Rest of your code
        if (responseRemoveitemCart.data.success) {
          this.fetchCart();
          Swal.fire({
            title: 'Đã xóa sản phẩm',
            icon: 'success',
          });
          this.fetchCart();

          // setTimeout(() => {
          //   location.reload();
          // }, 1000);
        } else {
          Swal.fire({
            title: 'Lỗi khi xóa sản phẩm',
            text: 'Đã có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    },

    //cập nhật value số lượng của từng product trong giỏ hàng
    async confirmOrder() {
      try {
        const confirmation = await Swal.fire({
          title: 'Xác nhận đơn hàng',
          text: 'Bạn có chắc chắn muốn xác nhận đơn hàng?',
          icon: 'question',
          showCancelButton: true,
          cancelButtonText: 'Không',
          confirmButtonText: 'Có',
        });

        if (confirmation.isConfirmed) {
          for (const item of this.orders) {
            await this.updateOrderDetails(item);
          }

          // After updating quantities, navigate to the checkout page
          this.$router.push('/checkout');
        }
      } catch (error) {
        console.error('Lỗi khi xử lý yêu cầu xác nhận đơn hàng:', error);
      }
    },

    async updateOrderDetails(item) {
      try {
        const orderData = {
          orderId: item.order_id,
          productId: item.product_id,
          newQuantity: item.quantity,
          newAmount: item.product.price * item.quantity,
          userId: Cookies.get('user_id')
        };

        // Call the endpoint to update the quantity for each item
        const responseUpdateOrderdetails = await axios.post('http://localhost:4000/api/updateOrderDetails', orderData);

        console.log('API Response:', responseUpdateOrderdetails.data);

        if (!responseUpdateOrderdetails.data.success) {
          console.error("Cập nhật số lượng thất bại cho sản phẩm:", item.product.name_product);
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
      }
    },
  },

  mounted() {
    // Lấy giá trị từ store khi component được tạo
    console.log("QuantityToUpdate on mount:", store.state.quantityToUpdate);
    this.quantityToUpdate = store.state.quantityToUpdate;
    this.fetchCart();
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
        top: -.7rem;
        z-index: 2;
      }
    }
  }

  .box-container {
    justify-content: space-between;
    gap: 1rem;
    margin: auto;

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


      .order-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .list-image {
          width: 15rem;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            scale: 1.1;
          }
        }

        .list-name {
          width: 90%;
          font-weight: 600;

          span {
            font-size: 1.3rem;
          }

          .quantity {
            display: flex;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            text-align: center;
            margin-top: .7rem;
            border: .1rem solid #999;
            border-radius: 5rem;
            width: 7rem;

            .increase,
            .decrease {
              font-size: 1.6rem;
              padding: 0 .7rem;
            }
          }

        }


        .totalItem-amount {
          span {
            font-size: 1.4rem;
            color: #ee4d2d;
            font-weight: 550;
          }
        }

        .btn-removeItem {
          padding: 1rem;
          margin-left: 2rem;
          cursor: pointer;
          font-size: 2rem;
        }
      }
    }

    .cart-summary {
      border: .1rem dashed #333;
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

        .list-value {
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

  .cart {
    position: fixed;
    top: 0;
    right: -100%;
    bottom: 0;
    transition: .3s ease;
    width: 32rem;

    &.active {
      z-index: 99998 !important;
      transition: .3s ease;
      right: 1rem;
      box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.3);
    }
  }
}

@media (max-width: 768px) {}

@media (max-width: 450px) {
  html {
    font-size: 50%;
  }
}
</style>
