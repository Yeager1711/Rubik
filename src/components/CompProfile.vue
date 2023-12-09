<template>
  <section class="profile">
    <div style="display: flex;
    align-items: center;
    justify-content: space-between;
    ">
      <div>
        <h3>Thông tin khách hàng</h3>
      </div>

      <button class="btn-logout" style=";
        padding: .7rem 3rem;
        font-size: 1.4rem;
        background: #5c78d3;
        color: #fff; 
        margin-right: 2rem;
        border-radius: 1rem;
        " @click="logoutUser">
        Đăng xuất
      </button>
    </div>

    <form action="">
      <div class="image-profile">
        <img v-if="base64Avatar" :src="base64Avatar" alt="Avatar">
      </div>

      <div class="profile-container">

        <div class="box">
          Username:
          <input v-model="user.username" type="text">
        </div>

        <div class="box">
          Họ và tên:
          <input v-model="user.full_name" type="text">
        </div>

        <div class="box">
          Số điện thoại:
          <input v-model="user.phone_number" type="text">
        </div>

        <div class="box">
          Địa chỉ:
          <span style="text-transform: none; 
                color: #e93b3b; 
                border: .1rem solid #e93b3b; 
                font-size: 1.2rem;
                padding: .3rem; border-radius: .3rem;
                margin-left: 2rem;">
            Mặc định
          </span>
          <input v-model="user.address" type="text" disabled style="border: none; width: 100%;">
        </div>

        <div class="box">
          Email:
          <input v-model="user.email" type="text">
        </div>

        <div class="box">
          Ngày sinh:
          <span> {{ user.dateOfBirth }}</span>
          <input type="date" v-model="user.dateOfBirth">
        </div>

        <div class="box">
          Giới tính:
          <!-- <span> {{ user.genderText }}</span> -->
          <select v-model="selectedGender" style="padding: .5rem .8rem; border-radius: 1rem;">
            <option value="1">Nam</option>
            <option value="2">Nữ</option>
            <option value="3">Khác</option>
          </select>

        </div>

      </div>
    </form>

    <div class="btnAddress" @click="showAddaddress" style="margin-right: 2rem;
      padding: 2rem 3rem;
     border: .1rem dashed #5469ae;
      color: #333;
      border-radius: 1rem;
      font-size: 1.2rem;
      cursor: pointer;
      text-align: center; 
      margin-bottom: 1rem;
    ">
      Thêm địa chỉ
    </div>

    <div v-for="address in user.addresses" :key="address.address_Id" class="box"
      style="display: flex; align-items: center; padding: 1rem;">
      <input type="checkbox" @click="setAsDefault(address.address_Id)" :id="'address_' + address.address_Id"
        v-model="selectedAddresses" :value="address.address_Id">
      <label :for="'address_' + address.address_Id" style="font-size: 1.3rem; margin-left: .5rem;">{{ address.name
      }}</label>
    </div>

    <!-- model add location -->
    <div class="model">
      <div class="model-address">
        <i class="fa-solid fa-x btn-closeModel" @click="closeModel"></i>

        <h3>Thêm vị trí</h3>

        <form @submit.prevent="addAddress">
          <input type="text" v-model="user.address" placeholder="Thêm vị trí">
          <button class="btn-address" type="submit">Thêm</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export default {
  name: "comp-header",
  data() {
    return {
      user: {
        full_name: '',
        phone_number: '',
        address: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        username: '',
        genderText: '',
        addresses: [],
        default_address_id: null,
      },
      selectedAddress: [],
      base64Avatar: null,
    }
  },
  async created() {
    const avatarBase64 = sessionStorage.getItem('avatar');
    const userId = Cookies.get('user_id');

    try {
      const responeAddress = await axios.get(`http://localhost:3008/api/address/${userId}`);
      this.user.addresses = responeAddress.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách địa chỉ:', error);
    }

    if (avatarBase64) {
      this.base64Avatar = 'data:image/jpeg;base64,' + avatarBase64
    }

    this.user.full_name = VueCookies.get('full_name');
    this.user.phone_number = VueCookies.get('phone_number');
    this.user.address = VueCookies.get('address');
    this.user.email = VueCookies.get('email');
    this.user.dateOfBirth = VueCookies.get('dateOfBirth');
    this.user.gender = VueCookies.get('gender');

    if (this.user.gender == 1) {
      this.user.genderText = "Nam";
    } else if (this.user.gender == 2) {
      this.user.genderText = "Nữ";
    } else {
      this.user.genderText = "Khác";
    }

    this.user.username = VueCookies.get('username');

    this.showAddaddress();
    this.closeModel();
  },

  computed: {
    shouldCheckAddress() {
      return (addressName) => addressName === this.user.address;
    },
  },
  methods: {
    logoutUser() {
      VueCookies.remove('user_id');
      VueCookies.remove('full_name');
      VueCookies.remove('phone_number');
      VueCookies.remove('address');
      VueCookies.remove('email');
      VueCookies.remove('dateOfBirth');
      VueCookies.remove('gender');
      VueCookies.remove('role_id');
      sessionStorage.removeItem('avatar');

      this.user = {};
      router.push('/login');
    },

    showAddaddress() {
      const model = document.querySelector('.model');
      model.classList.toggle('active');
    },

    closeModel() {
      const model = document.querySelector('.model');
      model.classList.remove('active');
    },
    async addAddress() {
      try {
        const response = await axios.post('http://localhost:3008/api/address', {
          name: this.user.address,
          user_id: VueCookies.get('user_id'),
        });

        this.showSwal('success', 'Đã thêm địa chỉ thành công');
        console.log(response.data);
      } catch (error) {
        console.error('Lỗi khi thêm địa chỉ:', error);
        this.showSwal('error', 'Có lỗi khi thêm địa chỉ', 'Vui lòng thử lại sau');
      }
    },

    showSwal(icon, title, text = '') {
      Swal.fire({
        icon,
        title,
        text,
        showConfirmButton: false,
        timer: 1500,
      });

    },

    async setAsDefault(addressId) {
      const confirmResult = await Swal.fire({
        title: 'Xác nhận',
        text: 'Bạn có muốn đặt địa chỉ này làm mặc định không?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
      });

      if (confirmResult.isConfirmed) {
        try {
          const userId = Cookies.get('user_id');
          const response = await axios.post(`http://localhost:3008/api/user/set-default-address/${userId}`, {
            default_address_id: addressId,
          });

          // Check if the API request was successful
          if (response.status === 200) {
            this.showSwal('success', 'Đã cập nhật địa chỉ mặc định thành công');
            console.log(response.data);

            // Đặt lại mảng selectedAddresses với một phần tử duy nhất
            this.selectedAddresses = [addressId];
          } else {
            // Handle other status codes or errors
            this.showSwal('error', 'Có lỗi khi cập nhật địa chỉ mặc định', 'Vui lòng thử lại sau');
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật địa chỉ mặc định:', error);
          this.showSwal('error', 'Có lỗi khi cập nhật địa chỉ mặc định', 'Vui lòng thử lại sau');
        }
      }
    }

  },
}
</script>

<style lang="scss" scoped>
.profile {
  position: relative;

  h3 {
    font-size: 3rem;
    padding-left: 2rem;
  }

  .image-profile {
    margin: 0 2rem;
    max-width: 15rem;
    height: 15rem;
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .profile-container {
    margin-top: 2rem;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(42rem, 1fr));
    gap: 2rem;

    .box {
      font-weight: 550;
      font-size: 1.5rem;

      input {
        border: .1rem solid #dbdbdb;
        padding: .8rem .8rem;
        border-radius: 1rem;
        font-weight: 450;
        font-size: 1.4rem;
        margin-left: .5rem;
      }
    }
  }

  .list-addressContainer {
    width: 100%;

    .box {
      display: flex;
      align-items: center;
      padding: 1.5rem;

      input {
        margin-right: 1rem;
      }

      label {
        text-transform: none;
        font-size: 1.5rem;
      }
    }
  }



  .model {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background: rgba(0, 0, 0, .7);
    display: none;


    &.active {
      display: flex;

      .model-address {
        animation: listUp ease .3s;
      }
    }

    .model-address {
      position: relative;
      margin: auto;
      max-width: 40rem;
      width: 95%;
      padding: 2rem;
      background: #fff;
      align-items: center;
      border-radius: .5rem;

      i {
        z-index: 999;
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: .8rem;
        cursor: pointer;
        font-size: 1.7rem;
      }

      h3 {
        margin: 1rem 0;
        padding: 0;
        font-size: 1.8rem;
      }

      form {
        margin-top: 1rem;

        input {
          padding: .7rem 1.5rem;
          display: block;
          width: 92%;
          border: .1rem solid #dbdbdb;
          border-radius: 1rem;
          margin-bottom: 1rem;
          outline: none;
        }

        .btn-address {
          padding: .5rem 4rem;
          margin-top: 1rem;
          background: #7474d5;
          border-radius: 1rem;
          font-size: 1.5rem;
          color: #fff;
          float: right;

          &:hover {
            transform: scale(.98);
            transition: .3s ease;
            box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .3);
          }
        }
      }
    }
  }

  @keyframes listUp {
    from {
      transform: translateY(5rem);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>
