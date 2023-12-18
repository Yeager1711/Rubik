<template>
    <section class="add-category">
        <h3>Hello this is a page add category</h3>
        <a class="back-to-page" href="/admin/manager/add-products" >
        <i class="fa-solid fa-chevron-left"></i>
            Trở lại
        </a>

        <div class="category-container">
            <h3>Thêm loại sản phẩm</h3>

            <form @submit.prevent="addCategory">
                <div class="input-category">
                    <input v-model="categoryData.name" type="text" name="name" placeholder="Nhập loại bạn muốn thêm...">
                </div>

                <button type="submit">Thêm sản phẩm</button>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'comp-addcategory',

    data() {
        return {
            categoryData: {
                name: '',
            }
        }
    },

    methods: {
        addCategory() {
            console.log(this.categoryData.name);

            if(!this.categoryData.name) {
                Swal.fire({
                    icon:'error',
                    title: 'Lỗi',
                    text: 'Vui lòng thêm đầy đủ sản phẩm ',
                });

                return;
            }

            const data = {
                name: this.categoryData.name,
            }


            axios.post('http://localhost:3006/api/category', data, {
                headers: {'Content-Type' :'application/json'},
            }).then((response) => {

                    // headers: { "Content-Type": "multipart/form-data" }

                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Loại sản phẩm:' + " " +  this.categoryData.name + " " + 'được thêm thành công.',
                    });

                    // Cập nhật trường nhập liệu thành giá trị ban đầu
                    this.categoryData.name = '';
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Có lỗi xảy ra khi thêm loại sản phẩm.',
                    });
                    // Xử lý lỗi nếu có
                });
        }
    }

}
</script>

<style lang="scss" scoped>
.add-category {
    position: relative;
    min-height: 100vh;

    h3 {
        font-size: 1.6rem;
    }

    .back-to-page {
        display: inline-block;
        padding: .5rem 1.5rem;
        background: #e2dfdf;
        border-radius: 1rem;
        font-size: 1.4rem;
        color: #333;

        &:hover {
            transform: scale(0.95);
            transition: 0.3s linear;
            box-shadow: 0 .5rem 1rem rgba(0,0,0, .1);
        }
    }

    .category-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        .input-category {
            input {
                width: 50rem;
                border: 0.1rem solid #dbdbdb;
                padding: 1rem 1.5rem;
                border-radius: 1rem;
                font-size: 16px;

                &::placeholder {
                    font-size: 1.4rem;
                }
            }

            input:focus {
                border-color: #0073ff;
            }
        }

        button {
            margin-top: 2rem;
            padding: .8rem 3rem;
            background: #0073ff;
            color: #fff;
            font-size: 1.5rem;
            border-radius: 5rem;

            &:hover {
                transform: scale(0.98);
                transition: 0.3s ease-in-out;
                box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.3);
            }
        }
    }
}
</style>
