<template>
  <section class="checkout">

    <div class="title-text">
      <img src="./images/logo.png" alt="">
      <span>Thanh toán</span>
    </div>

    <div class="location-saved">
      <h3>
        <i class="fa-solid fa-location-dot"></i>
        Địa chỉ nhận hàng
      </h3>

      <div class="container-saved">
        <div class="contact-info">
          <h3>{{ userInfo.full_name }} (+84)</h3>
          <span>{{ userInfo.phone_number }}</span>
        </div>

        <div class="contact-local">
<<<<<<< HEAD
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <h3 style="margin-bottom: .5rem; 
            margin-top: 0;">
              Địa chỉ
              <span style="text-transform: none; 
                color: #e93b3b; 
                border: .1rem dashed #e93b3b; 
                font-size: 1.2rem; 
                padding: .3rem 1rem; 
                border-radius: .3rem; 
                margin-left: .5rem;">Mặc định</span>
            </h3>
          </div>
          <p>{{ displayAddress }}</p>
        </div>
        <div class="btn-changesLocal" @click="showModelListAddress">
=======
          <p>{{ userInfo.address }}</p>
        </div>
        <div class="btn-changesLocal">
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
          Thay đổi
        </div>
      </div>


      <div class="ordersItem-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orderItem, index) in cartItems" :key="index">
<<<<<<< HEAD
              <td>{{ orderItem.product ? orderItem.product.name_product : 'Tên sản phẩm không có' }}</td>
              <td style="font-weight: 550;">
                {{ orderItem.product ? formattedCurrency(orderItem.product.price) : 'Giá không có' }}
              </td>
=======
              <td>{{ orderItem.product.name_product }}</td>
              <td style="font-weight: 550;">{{ formattedCurrency(orderItem.product.price) }}</td>
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
              <td>{{ orderItem.quantity }}</td>
              <td style="font-weight: 550;">{{ formattedCurrency(orderItem.amount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container-totalAmount">
        <div class="heading">
          <h3>Phương thức thanh toán</h3>

          <form action="">
            <p>Thanh toán khi nhận hàng</p>
            <button type="submit">Đổi</button>
          </form>
        </div>

        <div class="wrap-total">
          <p>
            <span style="font-weight: 550;">
              Tổng tiền hàng: {{ formattedCurrency(totalOrderAmount - shippingFee) }}
            </span>
          </p>

          <p>
            Phí vận chuyển:
            <span :style="{ 'font-weight': shippingFee === 0 ? 550 : 'normal' }">
              {{ shippingFee === 0 ? 'Miễn phí' : formattedCurrency(shippingFee) }}
            </span>
          </p>

          <h3 style="margin-bottom: .5rem;">Tổng thanh toán: <p style="color: #ee4d2d; font-size: 2rem;"> {{
            formattedCurrency(totalOrderAmount) }}</p>
          </h3>
        </div>

        <button class="orderButton" @click="placeOrder"> Đặt hàng </button>
      </div>
    </div>
<<<<<<< HEAD

    <div class="model-address">
      <div class="wrapper-model">
        <i class="fa-solid fa-xmark" @click="closeModel"></i>

        <div style="display: flex; align-items: center;">
          <i style="font-size: 1.7rem; margin-right:1rem; color: #5519fa;" class="fa-solid fa-location-dot"></i>
          <h3>Chọn địa chỉ giao hàng</h3>
        </div>

        <div class="address-container">
          <div class="box" v-for="(addr, index) in addresses" :key="index">
            <span>{{ addr.name }}</span>
            <label>
              <input type="checkbox" v-model="selectedAddresses[index]" @change="setAsDefault(addr)">
              <i class="fa-solid fa-check" v-if="isDefaultAddress(addr)"></i>
            </label>
          </div>
        </div>

      </div>
    </div>
=======
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
  </section>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default {
  name: "comp-checkout",
  data() {
    return {
      cartItems: [],
      userInfo: {
        full_name: '',
<<<<<<< HEAD
        phone_number: '',
        default_address_checked: null,
      },

      addresses: [],
      selectedAddresses: [],

    }

=======
        address: '',
        phone_number: ''
      },
    }
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
  },

  mounted() {
    this.fetchCartItems();
    this.fetchUserInfo();
<<<<<<< HEAD
    // this.fetchAddresses();

    // Lấy giá trị từ localStorage
    const localStorageAddress = localStorage.getItem('default_address_checked');

    // Kiểm tra xem giá trị có tồn tại không
    if (localStorageAddress !== null) {
      // Gán giá trị cho this.userInfo.default_address_checked
      this.userInfo.default_address_checked = localStorageAddress;
    }
  },

  async created() {
    const userId = Cookies.get('user_id');
    if (!userId) {
      console.error('Không tìm thấy user_id trong cookies.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3008/api/address/${userId}`);
      this.addresses = response.data;
      this.selectedAddresses = new Array(this.addresses.length).fill(false);
    } catch (error) {
      console.error('Lỗi khi lấy địa chỉ từ API.', error);
    }

=======
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
  },

  methods: {
    async fetchCartItems() {
      try {
        const userId = Cookies.get('user_id');
        const response = await axios.get(`http://localhost:4000/api/carts/${userId}`);
<<<<<<< HEAD
        // console.log("API Cart:", response.data);
=======
        console.log("API Cart:", response.data);
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
        this.cartItems = response.data;

        if (this.cartItems.length > 0) {
          await this.fetchUserInfo(userId);
        }

        if (this.cartItems.length > 0) {
          await this.fetchAndUpdateProductsInCart();
<<<<<<< HEAD

=======
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
        }
      } catch (error) {
        console.log('Lỗi khi lấy thông tin giỏ hàng', error);
      }
    },

<<<<<<< HEAD
    async fetchUserInfo() {
      try {
        const userId = Cookies.get('user_id');
        const response = await axios.get(`http://localhost:3007/api/user/${userId}`);
        // console.log("User details:", response.data);
=======
    async fetchUserInfo(userId) {
      console.log("Fetching details user in cart...");
      try {
        const response = await axios.get(`http://localhost:3007/api/user/${userId}`);
        console.log("User details:", response.data);
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
        this.userInfo = response.data;
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    },

    async fetchAndUpdateProductsInCart() {
<<<<<<< HEAD
      this.totalAmount = 0;

      const promises = this.cartItems.map(async (cartItem) => {
        if (this.isValidCartItem(cartItem)) {
          // console.log("Processing cart item: ", cartItem)
          try {
            const productId = cartItem.product_id;
            const response = await axios.get("http://localhost:3005/api/products/" + productId);
            // console.log("API Response for product details:", response.data);

            if (this.isValidProductResponse(response)) {
              // console.log("Product details:", response.data);

=======
      console.log("Fetching and updating product details for cart items...");

      const promises = this.cartItems.map(async (cartItem) => {
        if (this.isValidCartItem(cartItem)) {
          console.log("Processing cart item: ", cartItem)
          try {
            const productId = cartItem.product_id;
            const response = await axios.get("http://localhost:3005/api/products/" + productId);
            console.log("API Response for product details:", response.data);

            if (this.isValidProductResponse(response)) {
              console.log("Product details:", response.data);
              // Update the product array for each cart item
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
              this.$set(cartItem, 'product', response.data);
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
        this.calculateTotalAmount();
      } catch (error) {
        console.error("Error while fetching and updating:", error);
      }
    },

    calculateTotalAmount() {
      this.totalAmount = this.cartItems.reduce((total, cartItem) => {
        return total + cartItem.amount;
      }, 0);
    },

    isValidCartItem(cartItem) {
      return cartItem && cartItem.orderDetail_id;
    },

    isValidProductResponse(response) {
      return response && response.data;
    },

    async placeOrder() {
      try {
        const userId = Cookies.get('user_id');
        const shippingTax = this.shippingFee; // Access the computed property without parentheses
        const totalAmountWithShipping = this.totalOrderAmount + shippingTax;

        // Gửi yêu cầu đặt hàng và truyền totalAmountWithShipping để lưu vào database
        const response = await axios.post(`http://localhost:4000/api/placeOrder/${userId}`, {
          shippingTax: shippingTax,
          totalAmountWithShipping: totalAmountWithShipping,
        });

        if (response.data.success) {
          // Hiển thị SweetAlert khi đặt hàng thành công
          await Swal.fire({
            icon: 'success',
            title: 'Đặt hàng thành công!',
            showConfirmButton: false,
            timer: 1300,
          });

          // Reload trang sau khi đặt hàng thành công
          setTimeout(() => {
            location.reload();
          }, 300);
        } else {
          // Hiển thị SweetAlert khi có lỗi
          await Swal.fire({
            icon: 'error',
            title: 'Lỗi khi đặt hàng',
            text: response.data.message,
          });
        }
      } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
      }
    },

<<<<<<< HEAD
    async setAsDefault(address) {
      const confirmResult = await Swal.fire({
        title: 'Xác nhận',
        text: 'Đặt vị trí làm vị trí mặc định ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
      });

      if (confirmResult.isConfirmed) {
        try {
          const userId = Cookies.get('user_id');
          const responseSetDefaultAddress = await axios.post(`http://localhost:3008/api/user/set-default-address/${userId}`, {
            default_address_checked: address.address_Id,
          });

          if (responseSetDefaultAddress.status === 200) {
            // Cập nhật giá trị trong localStorage khi người dùng chọn địa chỉ mặc định
            localStorage.setItem('default_check_address', address.address_Id);

            await Swal.fire({
              icon: 'success',
              title: 'Thành công',
              timer: 1200,
            });

            location.reload();
          } else {
            console.error('Lỗi khi cập nhật địa chỉ mặc định');
            await Swal.fire({
              icon: 'error',
              title: 'Cập nhật thất bại !',
              confirmButtonText: 'OK',
              timer: 1200,
            });
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật địa chỉ mặc định:', error);
          this.showSwal('error', 'Có lỗi khi cập nhật địa chỉ mặc định', 'Vui lòng thử lại sau');
        }
      }
    },

    isDefaultAddress(address) {
      const localStorageAddress = localStorage.getItem('default_address_checked');
      return address.address_Id === parseInt(localStorageAddress);
    },

    //control address
    showModelListAddress() {
      const model = document.querySelector('.model-address');
      model.classList.add('active')
    },

    closeModel() {
      const model = document.querySelector('.model-address');
      model.classList.remove('active')
    },

    // async setDe
=======
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
  },

  computed: {
    formattedCurrency() {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });

      return (value) => formatter.format(value);
    },

    totalOrderAmount() {
      const subtotal = this.cartItems.reduce((total, orderItem) => {
        return total + orderItem.amount;
      }, 0);

      // Tổng thanh toán (Tổng tiền hàng + Phí vận chuyển)
      return subtotal + this.shippingFee;
    },


    shippingFee() {
      // Tạo một mảng chứa các giá trị phí vận chuyển có thể
      const possibleShippingFees = [0, 10000, 12000, 15000, 18000, 20000, 22000];

      // Lấy ngẫu nhiên một giá trị từ mảng để hiển thị
      const randomShippingFee = possibleShippingFees[Math.floor(Math.random() * possibleShippingFees.length)];

      // Nếu có đơn hàng trong giỏ hàng, trả về phí vận chuyển ngẫu nhiên, ngược lại là 0
      return this.cartItems.length > 0 ? randomShippingFee : 0;
    },
<<<<<<< HEAD

    displayAddress() {
      const localStorageAddress = localStorage.getItem('default_check_address');

      // Nếu có địa chỉ được chọn từ local storage
      if (localStorageAddress) {
        const selectedAddresses = this.addresses.find(addr => addr.address_Id === parseInt(localStorageAddress));
        return selectedAddresses ? selectedAddresses.name : null;
      }

      // Nếu không có địa chỉ được chọn từ local storage, kiểm tra xem có địa chỉ mặc định từ API không
      const defaultAddress = this.addresses.find(addr => addr.check_default === "1");

      // Cập nhật giá trị trong localStorage nếu có địa chỉ mặc định
      if (defaultAddress) {
        localStorage.setItem('default_check_address', defaultAddress.address_Id);
        return defaultAddress.name;
      }

      return null;
    },
  }
=======
  },

>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
}
</script>

<style lang="scss" scoped>
.checkout {
<<<<<<< HEAD
  position: relative;
=======
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
  padding: 3rem;

  .title-text {
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      width: 9rem;
    }

    span {
      font-size: 2.5rem;
      font-weight: 550;
      color: #ee4d2d;
      position: relative;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        content: "";
        width: 1px;
        height: 100%;
      }
    }
  }

  .location-saved {

    h3 {
      font-size: 1.5rem;
    }

    .container-saved {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
      background: #fff;
      border-radius: 1rem;

      .contact-info {
        flex: 1 -1 2rem;


        h3 {
          font-size: 1.5rem;
          color: #183153;
          margin: 0;
          margin-bottom: .7rem;

          i {
            margin-right: .5rem;
          }
        }

        span {
          font-size: 1.3rem;
          font-weight: 550;
        }
      }

      .contact-local {
        flex: 1 1 42rem;

        p {
          margin: auto;
          font-size: 1.4rem;
          text-transform: none;
        }
      }

      .btn-changesLocal {
        padding: .5rem 2rem;
        color: #fff;
        border-radius: .5rem;
        background: #1e3050;
        cursor: pointer;
        font-size: 1.3rem;
        text-transform: none;
      }
    }

    .ordersItem-container {
      width: 100%;
      margin-top: 1rem;

      table {
        width: 100%;
        background: #fff;
        padding: 1rem;
        border-radius: 1rem;

        thead {
          tr {
            th {
              font-size: 1.3rem;
              padding: 1rem;
            }
          }
        }

        tbody {
          tr {
            td {
              padding: 1rem;
              text-align: center;
              font-size: 1.3rem;
            }
          }
        }
      }
    }

    .container-totalAmount {
      margin-top: 1rem;
      background: #fff;
      border-radius: 1rem;
      padding: 2rem;

      .heading {
        display: flex;
        align-items: center;
        justify-content: space-between;

        form {
          display: flex;
          align-items: center;

          p {
            font-size: 1.5rem;
            margin-right: .7rem;
          }

          button {
            margin-left: .7rem;
            font-size: 1.4rem;
            padding: 0 2rem;
            height: 2.5rem;
            border-radius: 1rem;
            color: #fff;
            background: #183153;
          }
        }
      }

      .wrap-total {
        p {
          font-size: 1.4rem;
          text-transform: none;
        }


      }

      .orderButton {
        font-size: 1.4rem;
        padding: 1rem 4rem;
        text-transform: capitalize;
        border-radius: 1rem;
        color: #fff;
        background: #ee4d2d;

        &:hover {
          transition: .3s linear;
          transform: scale(.98);
        }
      }
    }
  }
<<<<<<< HEAD

  @keyframes toggleListAddress {
    from {
      transform: scale(0);
      opacity: 0;
    }

    to {
      transform: scale(10rem);
      opacity: 1;
    }
  }

  .model-address {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    display: none;
    opacity: 0;

    &.active {
      display: flex;
      opacity: 1;

      .wrapper-model {
        animation: toggleListAddress ease-in-out .34s;
      }
    }

    .wrapper-model {
      position: relative;
      margin: auto;
      background: #fff;
      border-radius: 1rem;
      padding: 2rem;
      max-width: 65rem;
      width: 85%;

      .fa-xmark {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: .7rem;
        font-size: 1.9rem;
        cursor: pointer;
      }

      h3 {
        font-size: 1.8rem;
        text-transform: none;
      }

      .box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem;
        margin: 1.3rem 0;

        span {
          font-size: 1.3rem;
          text-transform: none;
        }

        label {
          position: relative;

          input {
            padding: 1rem;
            cursor: pointer;
          }

          input[type="checkbox"] {
            position: relative;
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 1rem;
          }

          i.fa-check {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #32e032;
            background: #fff;
            font-size: 1.7rem;
            font-weight: 600;
            padding: 1rem;
            z-index: 1;
          }
        }
      }
    }
  }
=======
>>>>>>> f9bdcb07ef995e8f9d3b2c0671ed4e72f4a82cd5
}
</style>
