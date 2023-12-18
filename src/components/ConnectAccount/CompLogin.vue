<template>
    <div class="login">
        <div class="wraper">
            <div class="image-banner">
                <img src="./image/bg_login.jpg" alt="">
            </div>
            <div class="box-container">

                <div class="wrap-title">
                    <div class="title"> </div>
                    <span>Đăng nhập</span>
                </div>

                <h2 class="title-big" style="color: #c29e75;text-transform: none; font-weight: 400;">Bằng cách Đăng nhập tài
                    khoản hoặc <a href="./register" style="color: red; cursor: pointer;">Đăng ký</a> để bắt đầu.</h2>

                <form action="" @submit.prevent="loginUser">

                    <div class="box">
                        <span>Tên đăng nhập</span>
                        <input type="text" id="username" name="username" placeholder="Nhập tên tài khoản"
                            v-model="username">
                    </div>

                    <div class="box">
                        <span>Mật khẩu</span>
                        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" v-model="password">
                    </div>

                    <button type="submit" class="btn-login">Đăng nhập</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';
import VueCookies from 'vue-cookies';

export default {
    name: "comp-login",

    data() {
        return {
            username: "",
            password: ""
        };
    },

    methods: {
        loginUser() {
            //Lưu trữ dữu liệu
            const data = {
                username: this.username,
                password: this.password,
            };

            axios.post('http://localhost:3001/api/login', data)
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        VueCookies.set('user_id', response.data.user_id);
                        VueCookies.set('full_name', response.data.full_name);
                        VueCookies.set('phone_number', response.data.phone_number);
                        VueCookies.set('address', response.data.address);
                        VueCookies.set('email', response.data.email);
                        VueCookies.set('dateOfBirth', response.data.dateOfBirth);
                        VueCookies.set('gender', response.data.gender);
                        VueCookies.set('role_id', response.data.role_id);
                        VueCookies.set('username', data.username);
                        sessionStorage.setItem('avatar', response.data.avatar);

                        this.showAlert('Đăng nhập thành công', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);

                        if(response.data.role_id == 1) {
                            router.push('/admin/home');
                        } else {
                            router.push('/');

                            // Console.log property userData
                            console.log(response.data);  // Đây là thông tin userData
                        }
                    } else {
                        this.showAlert('Tài khoản hoặc mật khẩu không chính xác!', 'error');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.showAlert('Tài khoản hoặc mật khẩu không chính xác.', 'error');
                });
        },

        showAlert(message, type) {
            Swal.fire({
                icon: type,
                title: message,
                showConfirmButton: false,
                timer: 1200,
            });
        }
    }
}
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
            top: 50%;
            right: 0%;
            transform: translate(-10%, -50%);
            width: 45rem;
            background: rgba(0, 0, 0, .4);
            box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .4);
            padding: 2rem;
            border-radius: 1rem;



            form {
                display: block;
                flex-wrap: wrap;
                gap: 2rem;

                .box {
                    flex: 1 1 28rem;
                    width: 100%;
                    border-radius: 1rem;
                    margin-top: 2rem;

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
                        width: 93%;
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
                    margin-top: 3rem;
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