<template>
  <section class="profile">
    <div class="wrapper-title">

      <div style="display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <h3>Hồ Sơ Của Tôi</h3>

        <button class="btn-logout" style=";
        padding: .7rem 3rem;
        font-size: 1.4rem;
        background: #5c78d3;
        color: #fff; 
        border-radius: 1rem;
        " @click="logoutUser">
          Đăng xuất
        </button>
      </div>


      <form action="">
        <div class="info-headding">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div class="image-profile">
              <img v-if="base64Avatar" :src="base64Avatar" alt="Avatar">
            </div>

            <div class="heading-title">
              <div class="box">
                <span>Họ và tên:</span>
                <input v-model="user.full_name" type="text">

              </div>
              <div class="box">
                <span>Username:</span>
                <input v-model="user.username" type="text" disabled style="background: #fff;">

              </div>
            </div>
          </div>

          <div class="controll-addAddress" style="margin-top: 3rem;">
            <div class="btnAddress" @click="showAddaddress" style="margin-right: 2rem;
              padding: 1rem 3rem;
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

            <div class="scroll-listAddress">
              <div v-for="address in user.addresses" :key="address.address_Id">
                <div class="box" style="display: flex; align-items: center; padding: 1rem;">
                  <label :for="'address_' + address.address_Id" style="font-size: 1.3rem; margin-left: .5rem;">
                    {{ address.name }}
                    <span v-if="displayedAddress && isDefaultAddress(parseInt(displayedAddress))">
                      (Địa chỉ Mặc Định) - {{ displayedAddress }}
                    </span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="profile-container">
          <div class="box">
            Số điện thoại:
            <input v-model="user.phone_number" type="text">
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

          <button class="send-gmail" style="padding: .8rem 3rem;
          background: #54ae8a; color: #fff; border-radius: 1rem;">Gởi email đổi mật khẩu</button>

        </div>
      </form>
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
        default_address_checked: null,
      },
      selectedAddress: [],
      base64Avatar: null,
      checkboxStates: {},
      checkboxHidden: false,
    }
  },
  async created() {
    const avatarBase64 = sessionStorage.getItem('avatar');
    const userId = Cookies.get('user_id');


    // console.log('this.user.addresses', this.user.addresses);
    // console.log('default_address_checked', this.user.default_address_checked);
    try {
      const responseAddress = await axios.get(`http://localhost:3008/api/address/${userId}`);
      this.user.addresses = responseAddress.data;

      // Check if all check_default values are '0'
      const allCheckDefaultsZero = this.user.addresses.every(address => address.check_default === '0');

      if (allCheckDefaultsZero) {
        // Clear local storage
        localStorage.removeItem('default_address_checked')
      }

      // Kiểm tra và cập nhật default_address_checked
      const storedDefaultAddressId = this.user.default_address_checked;
      if (storedDefaultAddressId !== null) {
        this.user.default_address_checked = parseInt(storedDefaultAddressId);

        // Kiểm tra và cập nhật check_default của địa chỉ mặc định
        this.user.addresses.forEach(address => {
          address.check_default = address.address_Id === this.user.default_address_checked;
        });
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách địa chỉ:', error);
    }


    if (avatarBase64) {
      this.base64Avatar = 'data:image/jpeg;base64,' + avatarBase64;
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

    const storedDefaultAddressId = localStorage.getItem('default_address_checked');
    if (storedDefaultAddressId !== null) {
      this.user.default_address_checked = parseInt(storedDefaultAddressId);

      // Kiểm tra và cập nhật check_default của địa chỉ mặc định
      this.user.addresses.forEach(address => {
        address.check_default = address.address_Id === this.user.default_address_checked;
      });
    }

    if (this.user.default_address_checked === null) {
      this.displayedAddress = this.user.address;
    }
  },

  computed: {
    displayedAddress() {
      if (this.user.default_address_checked !== null) {
        // Nếu có default_address_checked, tìm địa chỉ mặc định theo address_Id
        const defaultAddress = this.user.addresses.find(address => address.address_Id === this.user.default_address_checked);
        return defaultAddress ? defaultAddress.name : this.user.address;
      } else {
        // Nếu không có default_address_checked, hoặc nếu không tìm thấy địa chỉ mặc định, trả về địa chỉ của người dùng
        return this.user.address;
      }
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

    isDefaultAddress(addressId) {
      const defaultAddress = this.user.addresses.find(address => address.address_Id === parseInt(addressId) && address.check_default === '1');
      console.log('Default Address:', defaultAddress);
      return defaultAddress !== undefined;
    }

  },
}
</script>

<style lang="scss" scoped>
.profile {
  position: relative;
  display: flex;

  .wrapper-title {
    padding: 2rem;
    border-radius: 1rem;
    max-width: 120rem;
    width: 95%;
    background: #fff;
    margin: auto;

    h3 {
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    .info-headding {
      flex: 1 1 32rem;
      display: block;
      align-items: center;
      gap: 1.5rem;

      .image-profile {
        max-width: 12rem;
        min-height: 12rem;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          overflow: hidden;
          transform: scale(1.5);
        }
      }

      .heading-title {
        width: 100%;

        .box {
          display: flex;
          align-items: center;
          width: 100%;

          span {
            width: 30%;
            font-size: 1.5rem;
            text-decoration: none;
            color: #64646d;
          }

          &:nth-child(1) {
            padding-bottom: 1rem;
          }

          &:nth-child(2) {
            padding-top: 1rem;
          }

          input {
            font-size: 1.4rem;
            padding: .8rem 0;
            outline: none;
            border: none;
            width: 100%;
            border-bottom: .1rem dashed #dbdbdb;
          }
        }
      }
    }

    .controll-addAddress {
      .scroll-listAddress {
        min-height: 20rem;
        overflow: scroll;

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
      }
    }

    .profile-container {
      flex: 1 1 32rem;

      .box {
        font-size: 1.5rem;
        font-weight: 550;
        padding: 1rem;
        margin-bottom: 2rem;
        // border-bottom: .1rem dashed #dbdbdb;

        span {
          i {
            margin-right: .5rem;
          }
        }


        p {
          font-size: 1.4rem;
        }
      }

      input {
        font-size: 1.4rem;
        border: none;
        padding: .5rem 0 1rem 1rem;
        margin-left: 1rem;
        width: 100%;
        outline: none;
        margin-top: .5rem;
        border-bottom: .1rem dashed #dbdbdb;
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


