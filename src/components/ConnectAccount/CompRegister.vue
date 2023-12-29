<template>
  <div class="login">
      <div class="wraper">
          <div class="image-banner">
              <img src="./image/bg_register.jpg" alt="">
          </div>
          <div class="box-container">
              <div class="wrap-title">
                  <div class="title"></div>
                  <span>Đăng ký</span>
              </div>
              <h2 class="title-big" style="color: #dbdbdb;text-transform: none; font-weight: 400;">
                  Bằng cách Đăng ký tài khoản hoặc <router-link to="/login" style="color: red">Đăng nhập</router-link> để
                  bắt đầu.
              </h2>
              <form @submit.prevent="register">
                  <div class="box">
                      <span>Họ và tên</span>
                      <input type="text" id="full_name" name="full_name" placeholder="Nhập họ và tên"
                          v-model="formData.full_name">
                  </div>
                  <div class="box">
                      <span>Số điện thoại</span>
                      <input type="number" id="phone_number" name="phone_number" placeholder="Nhập số điện thoại"
                          v-model="formData.phone_number">
                  </div>
                  <!-- <div class="box">
                      <span>Địa chỉ</span>
                      <input type="text" id="address" name="address" placeholder="Nhập địa chỉ"
                          v-model="formData.address">
                  </div> -->
                  <div class="box">
                      <span>Email</span>
                      <input type="text" id="email" name="email" placeholder="Nhập email" v-model="formData.email">
                  </div>
                  <div class="box">
                      <span>Ngày sinh</span>
                      <input type="date" id="dateOfBirth" name="dateOfBirth" v-model="formData.dateOfBirth">
                  </div>
                  <div class="box">
                      <span>Tên đăng nhập</span>
                      <input type="text" id="username" name="username" placeholder="Nhập tên tài khoản"
                          v-model="formData.username">
                  </div>
                  <div class="box">
                      <span>Mật khẩu</span>
                      <input type="password" id="password" name="password" placeholder="Nhập mật khẩu"
                          v-model="formData.password">
                  </div>

                  <div class="box">
                      <span>Xác nhận mật khẩu</span>
                      <input type="password" id="confirm_password" name="confirm_password"
                          placeholder="Nhập xác nhận mật khẩu" v-model="formData.confirm_password">
                  </div>
                  <div class="box">
                      <span>Giới tính</span>
                      <select id="gender" name="gender" v-model="formData.gender">
                          <option v-for="(gender, genderIndex) in genderItem" :key="`sex-${genderIndex}`"
                              :value="gender.id">{{ gender.name }}</option>
                      </select>
                  </div>
                  <div class="box">
                      <span>Hình ảnh</span>
                      <input type="file" id="avatar" name="avatar" @change="handleFileChange" style="background: #fff;">
                  </div>
                  <button type="submit" class="btn-login">Đăng ký</button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
  name: "comp-regitser",
  data() {
      return {
          genderItem: [
              {
                  id: 1,
                  name: "Nam"
              },
              {
                  id: 2,
                  name: "Nữ"
              },
              {
                  id: 3,
                  name: "Khác"
              }
          ],
          formData: {
              full_name: '',
              phone_number: '',
              address: '',
              email: '',
              dateOfBirth: '',
              username: '',
              password: '',
              gender: 1,
              avatar: null,
          }
      }
  },


  methods: {
      handleFileChange(event) {
          const file = event.target.files[0];
          if (file) {
              if (file.size > 5 * 1024 * 1024) { //5MB
                  Swal.fire({
                      icon: 'warning',
                      title: 'Cảnh báo',
                      text: 'Kích thước ảnh quá lớn. Vui lòng chọn ảnh không quá 5MB !',
                  });

                  setTimeout(() => {
                      window.location.reload();
                  }, 2000);
              } else {
                  this.formData.avatar = file;
              }
          }
      },

      register() {
          if (this.formData.confirm_password !== this.formData.password) {
              Swal.fire({
                  icon: 'error',
                  title: 'Lỗi',
                  text: 'Mật khẩu xác nhận không khớp với mật khẩu.',
              });
              return;
          }


          const formData = new FormData();
          formData.append('full_name', this.formData.full_name);
          formData.append('phone_number', this.formData.phone_number);
          formData.append('address', this.formData.address);
          formData.append('email', this.formData.email);
          formData.append('dateOfBirth', this.formData.dateOfBirth);
          formData.append('username', this.formData.username);
          formData.append('password', this.formData.password);
          formData.append('confirm_password', this.formData.confirm_password);
          formData.append('gender', this.formData.gender);
          formData.append('avatar', this.formData.avatar);


          axios
              .post('http://localhost:3002/api/register', formData)
              .then(response => {
                  Swal.fire({
                      icon: "success",
                      title: "Đăng ký tài khoản thành công 😉",
                  });
                  this.formData = {
                      full_name: '',
                      phone_number: '',
                      address: '',
                      email: '',
                      dateOfBirth: '',
                      username: '',
                      password: '',
                      confirm_password: '',
                      gender: 1,
                      avatar: null
                  };
                  console.log(response);
                
              })
              .catch(error => {
                  console.error(error);
                  if (error.response && error.response.status === 400 && error.response.data.error === 'Tên đăng nhập đã tồn tại !') {
                      Swal.fire({
                          icon: 'error',
                          title: 'Lỗi',
                          text: 'Tài khoản đăng ký đã tồn tại!',
                      });
                  } else {
                      Swal.fire({
                          icon: "error",
                          title: "Đăng ký không thành công",
                          text: "Có lỗi xảy ra trong quá trình đăng ký.",
                      });
                  }
              });


      },

      // CompRegister.vue
      

  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;

  .wraper {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;

      .image-banner {
          flex: 1 1 45rem;
          height: 100vh;
          overflow: hidden;
          position: relative;

          img {
              width: 100%;
          }
      }

      .box-container {
          position: absolute;
          top: 10rem;
          right: 10rem;
          width: 60rem;
          background: rgba(0, 0, 0, .4);
          box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .4);
          padding: 2rem;
          border-radius: 1rem;



          form {
              display: flex;
              flex-wrap: wrap;
              gap: 2rem;

              .box {
                  flex: 1 1 28rem;
                  width: 100%;
                  border-radius: 1rem;
                  margin-top: 1rem;

                  span {
                      color: #ccc;
                      display: block;
                      font-size: 1.5rem;
                      text-transform: none;
                      margin-bottom: .4rem;
                  }

                  input,
                  select {
                      outline: none;
                      width: 90%;
                      border: .1rem solid #dbdbdbdb;
                      padding: .8rem 1.5rem;
                      border-radius: 1rem;
                      font-size: 16px;

                      &::placeholder {
                          font-size: 1.5rem;
                      }
                  }

                  select {
                      width: 10rem;
                      display: block;
                  }
              }

              .btn-login {
                  display: block;
                  margin-top: 1rem;
                  width: 100%;
                  padding: .8rem;
                  font-size: 1.7rem;
                  color: #fff;
                  background: #2b6fe5;
                  border-radius: 1rem;
              }
          }

          .wrap-title .title {
              height: .3rem;
              width: 6.2rem;
              margin: 2rem 1.7rem 0 0;
              background-color: #c29e75;
              float: left;
          }

          .wrap-title span {
              font-family: 'Pacifico', cursive;
              font-size: 4rem;
              line-height: 3.5rem;
              letter-spacing: 1.9px;
              color: #fff;
              margin: 0 0 .7rem;
          }
      }
  }
}
</style>