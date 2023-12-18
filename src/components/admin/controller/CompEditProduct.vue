<template>
    <section class="edit-product">
        <h3>This is a page Edit Product</h3>
        <router-link to="/admin/manager" class="back-to-page">
            <i class="fa-solid fa-chevron-left"></i> Trở lại
        </router-link>

        <div class="edit-container">
            <form @submit.prevent="updateProduct" enctype="multipart/form-data">
                <div class="box-image">
                    <img :src="tempProductImage || productImage" :key="tempProductImage" width="250px" alt="Product Image">

                    <div class="icon-changeImage">
                        <input type="file" id="fileImage" @change="handleImageChange" hidden>
                        <label class="fa-solid fa-camera" title="Chọn ảnh" for="fileImage"></label>
                    </div>
                </div>

                <div class="wrap-info">
                    <div class="box">
                        <span>ID Sản phẩm</span>
                        <input v-model="productId" type="text" name="productId" disabled>
                    </div>

                    <div class="box">
                        <span>Tên sản phẩm</span>
                        <input v-model="productName" type="text" name="productName">
                    </div>

                    <div class="box">
                        <span>Loại</span>
                        <select v-model="selectedCategoryId">
                            <option v-for="category in categories" :key="category.Category_Id"
                                :value="category.Category_Id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <div class="box">
                        <span>Giá</span>
                        <input v-model="productPrice" type="text" name="productPrice" value="convertToVND(productPrice)">
                    </div>

                    <div class="box">
                        <span>Số lượng</span>
                        <input v-model="productTotalCurrent" type="text" name="productTotalCurrent">
                    </div>

                    <div class="box">
                        <span>Mô tả</span>
                        <textarea v-model="productDescription" name="productDescription"></textarea>
                    </div>

                    <button type="submit" class="btn-edit">Cập nhật sản phẩm</button>
                </div>


            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    name: "comp-editproduct",
    data() {
        return {
            productId: "",
            productName: "",
            productPrice: "",
            productTotalCurrent: "",
            productDescription: "",
            productImage: "",
            categories: [],
            selectedCategoryId: "",

            tempProductImage: "", //ảnh tạm thời
            displayImage: "",
            productImageUpdated: false,
        };
    },

    mounted() {
        // Lấy ID từ đường dẫn
        this.productId = this.$route.params.id;
        this.fetchProduct();
        this.fetchCategories();
    },

    methods: {

        fetchProduct() {
            axios.get(`http://localhost:3005/api/products/${this.productId}`)
                .then((response) => {
                    const product = response.data;
                    this.productName = product.name_product;
                    this.productPrice = product.price;
                    this.productTotalCurrent = product.total_product;
                    this.productDescription = product.description;
                    this.productImage = "data:image/png;base64," + product.image_product;
                    this.selectedCategoryId = product.category_id;
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        Swal.fire({
                            icon: "info",
                            title: 'Không tìm thấy sản phẩm',
                            text: 'Sản phẩm không tồn tại trong hệ thống !'
                        });
                        setTimeout(() => { }, 1300);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: 'Lỗi',
                            text: 'Lỗi hiển thị thông tin sản phẩm !'
                        });
                        setTimeout(() => { }, 1300);
                        console.error('Lỗi khi hiển thị thông tin sản phẩm', error);
                    }
                });
        },

        fetchCategories() {
            axios.get('http://localhost:3006/api/category')
                .then(response => {
                    this.categories = response.data;
                    if (this.categories.length > 0) {
                        this.selectedCategoryId = this.categories[0].Category_Id;
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy danh sách category', error);
                });
        },

        handleImageChange(event) {
            console.log("handleImageChange called", event);
            const tempFile = event.target.files[0];
            if (tempFile) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.$set(this, 'tempProductImage', reader.result);
                    this.$set(this, 'displayImage', this.tempProductImage);
                    this.$forceUpdate(); // Buộc làm mới

                    // Ghi log giá trị để kiểm tra
                    console.log('tempProductImage:', this.tempProductImage);
                    console.log('displayImage:', this.displayImage);
                };
                reader.readAsDataURL(tempFile);
            }
        },

        refreshImage() {
            this.displayImage = this.tempProductImage;
            this.$forceUpdate(); // Buộc làm mới
            if (this.productImageUpdated) {
                this.productImage = this.tempProductImage;
                this.productImageUpdated = false;
            }
        },


        // Trong phương thức gửi dữ liệu từ frontend
updateProduct() {
    const updatedProduct = new FormData();
    updatedProduct.append('name_product', this.productName);
    updatedProduct.append('price', this.productPrice);
    updatedProduct.append('total_product', this.productTotalCurrent);
    updatedProduct.append('description', this.productDescription);
    updatedProduct.append('category_id', this.selectedCategoryId);

    // Kiểm tra nếu có ảnh mới
    if (this.tempProductImage) {
        updatedProduct.append('image_product', this.dataURItoBlob(this.tempProductImage));
    }

    axios.put(`http://localhost:3005/api/products/${this.productId}`, updatedProduct)
        .then(response => {
            console.log(response);
            Swal.fire({
                icon: "success",
                title: 'Cập nhật thành công',
            });
            
            // Đặt lại tempProductImage và displayImage sau khi cập nhật
            this.refreshImage();
            this.productImageUpdated = true;
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: 'Lỗi',
                text: 'Lỗi khi cập nhật thông tin sản phẩm!'
            });
            console.error('Lỗi khi cập nhật sản phẩm', error);
            setTimeout(() => {}, 1300);
        });
},

// Thêm hàm chuyển đổi Data URI sang Blob
dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
},


    },
};
</script>
  
<style lang="scss" scoped>
.edit-product {
    padding: 1rem 2%;

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
            box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
        }
    }

    .edit-container {
        display: flex;
        margin-top: 2rem;

        form {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            margin: auto;
            width: 100%;

            .box-image {
                flex: 1 1 42rem;
                border: .1rem solid #dbdbdb;
                border-radius: 1rem;
                display: flex;
                align-items: center;
                width: 100%;
                height: 100%;
                position: relative;

                img {
                    margin: auto;
                    width: 100%;
                    border-radius: 1rem;
                }

                .icon-changeImage {
                    position: absolute;
                    bottom: .5rem;
                    right: .5rem;

                    label {
                        font-size: 1.8rem;
                        cursor: pointer;
                        padding: 1rem 3.5rem;
                        background: #888;
                        color: #fff;
                        border-radius: 1rem;
                        cursor: pointer;
                    }
                }
            }

            .wrap-info {
                flex: 1 1 42rem;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
                gap: 2rem;

                .box {
                    span {
                        display: block;
                        font-size: 1.4rem;
                        margin-bottom: .5rem
                    }

                    input,
                    select {
                        width: auto;
                        padding: .5rem 1.5rem;
                        border: .1rem solid #dbdbdb;
                        border-radius: .5rem;
                    }

                    textarea {
                        max-width: 58rem;
                        width: 100%;
                        height: 15rem;
                        padding: 1rem 1.5rem;
                        line-height: 1.8rem;
                        border: .1rem solid #dbdbdb;
                        border-radius: .5rem;
                    }
                }
            }

            .btn-edit {
                display: block;
                max-width: auto;
                width: 100%;
                padding: .8rem 3rem;
                background: #3bb858;
                color: #fff;
                border-radius: .5rem;
                text-align: center;
                font-size: 1.5rem;

                &:hover {
                    transform: scale(0.99);
                    transition: 0.3s ease-in-out;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
                }
            }
        }
    }
}
</style>
  