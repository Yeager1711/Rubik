<template>
    <section class="admin-manager">
        <h3>Quản lý Sản phẩm</h3>

        <div class="controller">
            <div class="add-product">
                <a href="/admin/manager/add-products">Thêm sản phẩm</a>
            </div>

            <div class="box-search">
                <input v-model="searchQuery" type="text" class="input-box" placeholder="Tìm kiếm sản phẩm ..." />
                <button @click="searchProducts">Tìm kiếm</button>
            </div>
        </div>

        <div class="listProducts-container">
            <table>
                <thead>
                    <tr class="tr-title">
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Ảnh</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Loại</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="index">
                        <td>{{ product.Product_Id }}</td>
                        <td style="font-weight: 550; text-transform: capitalize;">{{ product.name_product }}</td>
                        <td>
                            <img :src="getImageUrl(product.image_product)" :alt="product.name_product" width="150rem"
                                @error="handleImageError" />
                        </td>
                        <td style="font-weight: 550; color: #bd632e;">{{ convertToVND(product.price) }}</td>
                        <td>{{ product.total_product }}</td>
                        <td>{{ getCategoryName(product.category_id) }}</td>

                        <td>
                            <router-link :to="'/admin/manager/edit/' + product.Product_Id">
                                <button class="btn-edit">
                                    <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                                </button>
                            </router-link>



                            <button class="btn-delete" @click="deleteProduct(product.Product_Id)">
                                <i class="fa-solid fa-trash"></i> Delete
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "comp-adminManager",

    data() {
        return {
            products: [],
            categories: [],
            searchQuery: "",
        };
    },

    mounted() {
        this.fetchProducts();
        this.fetchCategory();
    },

    methods: {
        fetchProducts() {
            axios
                .get('http://localhost:3005/api/products')
                .then((response) => {
                    this.products = response.data;
                    console.log(this.products);
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy sản phẩm:', error);
                });
        },

        fetchCategory() {
            axios.get('http://localhost:3006/api/category')
                .then((response) => {
                    this.categories = response.data;
                    console.log(this.categories);
                }).catch((error) => {
                    console.error('Lỗi khi lấy loại sản phẩm:', error);
                });
        },

        getCategoryName(Category_Id) {
            const category = this.categories.find(c => c.Category_Id === Category_Id);
            return category ? category.name : 'Unknown';
        },

        getImageUrl(base64Image) {
            console.log(base64Image);
            return 'data:image/png;base64,' + base64Image;
        },

        handleImageError(event) {
            console.error('Lỗi khi tải ảnh:', event);
        },

        deleteProduct(Product_Id) {
            console.log(`Try to delete product with Product_Id ${Product_Id}`)
            const confirmed = window.confirm('Bạn có chắc muốn xóa sản phẩm này ?');

            if (confirmed) {
                axios.delete(`http://localhost:3005/api/products/${Product_Id}`)
                    .then((response) => {
                        if (response && response.data) {  // Thêm điều kiện kiểm tra response
                            Swal.fire({
                                icon: 'success',
                                title: 'Xóa thành công',
                                text: 'Sản phẩm đã được xóa khỏi danh sách'
                            });
                            this.fetchProducts();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Xóa thất bại',
                                text: 'Có lỗi khi xóa sản phẩm khỏi danh sách'
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Xóa thất bại',
                            text: 'Có lỗi khi xóa sản phẩm khỏi danh sách !'
                        });

                        console.error('Lỗi trong quá trình xóa sản phẩm', error)
                    });
            }
        },

        searchProducts() {
            const searchValue = this.searchQuery.toLowerCase();

            if(searchValue === "") {
                this.filteredProducts();
                return;
            }

            const filteredProducts = this.products.filter(
                (product) =>
                    product.name_product.toLowerCase().includes(searchValue) ||
                    this.getCategoryName(product.category_id).toLowerCase().includes(searchValue)
            )

            if (filteredProducts.length > 0) {
                this.products = filteredProducts;
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Không tìm thấy sản phẩm',
                    text: 'Sản phẩm chưa có trong danh sách !',
                });
            }
        },

        convertToVND(price) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND"
            }).format(price);
        }
    },
};
</script>
  
<style lang="scss" scoped>
.admin-manager {
    padding: 2rem 3%;

    h3 {
        font-size: 2.5rem;
    }

    .controller {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .add-product {
            display: inline-block;
            align-items: center;
            padding: .5rem 3rem;
            background: #51cc8a;
            border-radius: 5rem;
            padding: .8rem 2.5rem;
            box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .2);
            font-size: 1.3rem;

            &:hover {
                box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .4);
                transform: scale(.95);
                transition: .3s ease-in-out;
            }

            a {
                text-transform: uppercase;
                font-size: 1.5rem;
                color: #fff;
            }
        }

        .box-search {
            display: inline-block;
            border: .1rem solid #dbdbdb;
            border-radius: 5rem;
            overflow: hidden;
            padding: .6rem 1.5rem;
            background: #fff;
            position: relative;

            .input-box {
                width: 40rem;
                max-width: 80%;
                border: none;
                outline: none;
                font-size: 16px;

                &::placeholder {
                    font-size: 1.4rem;
                }
            }

            button {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                outline: none;
                border: none;
                background: #0866ff;
                padding: 0 1.5rem;
                color: #fff;
            }
        }
    }

    .listProducts-container {
        margin: 3rem 0;
        display: flex;
        height: 52rem;
        overflow: auto;

        &::-webkit-scrollbar {
            width: .8rem;
            border-top-right-radius: 10rem;
            border-bottom-right-radius: 10rem;
            background-color: #dbdbdb;
            overflow: auto;
        }

        &::-webkit-scrollbar-thumb {
            border-top-right-radius: 5rem;
            border-bottom-right-radius: 5rem;
            background-color: #333;
        }

        table {
            border: .1rem solid #dbdbdb;
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
            width: 100%;
            padding: 1rem 2rem;
            text-align: center;
            font-size: 1.4rem;


            thead {
                .tr-title {
                    border: .1rem solid #333;
                }
            }

            tbody {
                .btn-delete {
                    padding: .5rem 1.5rem;
                    margin-left: .5rem;
                    background: #ea2f2f;
                    color: #fff;
                    border-radius: .5rem;
                }

                .btn-edit {
                    padding: .5rem 1.5rem;
                    margin-right: .5rem;
                    background: #1e3050;
                    color: #fff;
                    border-radius: .5rem;
                }
            }
        }
    }
}
</style>
  