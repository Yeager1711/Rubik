<template>
  <section class="add-product">
    <div class="title-control">
      <h3>Thêm sản phẩm</h3>

      <a
        href="./add-products/add-category"
        style="display: inline-block; padding: .5rem 2rem; background: #5858c8; color: #fff; font-size: 1.3rem; border-radius: 1rem; text-transform: none;"
        >Thêm loại</a
      >
    </div>

    <div class="box-container" style="margin-top: 4rem;">
      <form @submit.prevent="addProduct">
        <div class="wrap-form">
          
          <div class="box-input">
            <span>Tên sản phẩm</span>
            <input v-model="productData.name_product" type="text" name="name_product" placeholder="Nhập tên sản phẩm" />
          </div>

          <div class="box-input">
            <span>Chọn loại sản phẩm</span>
            <select v-model="productData.category_id" name="category_id">
              <option value="">Chọn loại sản phẩm</option>
              <option v-for="category in categories" :value="category.Category_Id" :key="category.Category_Id">{{ category.name }}</option>
            </select>
          </div>

          <div class="box-input">
            <span>Giá</span>
            <input v-model="productData.price" type="number" name="price" placeholder="Nhập giá" />
          </div>

          <div class="box-input">
            <span>Số lượng</span>
            <input v-model="productData.total_product" type="number" name="total_product" placeholder="Nhập số lượng" />
          </div>

          <div class="box-input">
            <span>Chọn ảnh sản phẩm</span>
            <input type="file" @change="onImageChange" name="image_product" />
          </div>

          <div class="box-input">
            <span>Mô tả</span>
            <textarea v-model="productData.description" name="description" cols="30" rows="10"></textarea>
          </div>
        </div>

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      productData: {
        name_product: "",
        price: "",
        total_product: "",
        description: "",
        image_product: null,
        category_id: "",
      },
      categories: [],
    };
  },
  created() {
    // Lấy danh sách các loại sản phẩm khi tải trang
    this.fetchCategories();
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.productData.image_product = file;
      }
    },
    fetchCategories() {
      axios
        .get("http://localhost:3006/api/category")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Có lỗi xảy ra khi tải danh sách loại sản phẩm.",
          });
        });
    },
    addProduct() {
      if (!this.productData.name_product) {
        Swal.fire({
          icon: "warning",
          title: "Cảnh báo",
          text: "Vui lòng thêm tên sản phẩm !",
        });
        return;
      } else if (!this.productData.price || this.productData.price <=999) {
        Swal.fire({
          icon: "warning",
          title: "Cảnh báo",
          text: "Giá sản phẩm phải lớn hơn 1000đ !",
        });
        return;
      }else if (!this.productData.image_product) {
        Swal.fire({
          icon: "warning",
          title: "Cảnh báo",
          text: "Vui lòng chọn ảnh sản phẩm !",
        });
        return;
      }else if (!this.productData.category_id) {
        Swal.fire({
          icon: "warning",
          title: "Cảnh báo",
          text: "Vui lòng chọn loại sản phẩm !",
        });
        return;
      }else if (!this.productData.total_product || this.productData.total_product <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Cảnh báo",
          text: "Số lượng sản phẩm phải lớn hơn 0 !",
        });
        return;
      } else if (!this.productData.description) {
        Swal.fire({
          icon: "warning",
          title: "Cảnh báo",
          text: "Vui lòng thêm mô tả sản phẩm !",
        });
        return;
      } 

      const formData = new FormData();
      formData.append("name_product", this.productData.name_product);
      formData.append("price", this.productData.price);
      formData.append("total_product", this.productData.total_product);
      formData.append("description", this.productData.description);
      formData.append("image_product", this.productData.image_product);
      formData.append("category_id", this.productData.category_id);

      axios
        .post("http://localhost:3005/api/addproduct", formData)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Sản phẩm đã được thêm thành công.",
          });

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Có lỗi xảy ra khi thêm sản phẩm.",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-product {
  padding: 1rem 2%;

  h3 {
    font-size: 2rem;
  }

  .box-container {
    form {
      .wrap-form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(42rem, 1fr));
        gap: 2rem;

        .box-input {
          span {
            display: block;
            font-size: 1.5rem;
            text-transform: none;
            font-weight: 500;
            margin-bottom: 0.5rem;
          }

          input,
          textarea {
            width: 50rem;
            max-width: 100%;
            padding: 0.9rem 1.5rem;
            border: 0.1rem solid #dbdbdb;
            border-radius: 0.5rem;
            font-size: 1.5rem;

            &::placeholder {
              font-size: 1.4rem;
            }
          }

          select {
            width: 20rem;
            max-width: 100%;
            padding: 0.9rem 1.5rem;
            border: 0.1rem solid #dbdbdb;
            border-radius: 0.5rem;

            option {
              font-size: 1.5rem;
            }
          }
        }
      }

      button {
        margin: 2rem auto 1rem auto;
        width: 100%;
        padding: 1rem 3rem;
        background: #0073ff;
        color: #fff;
        border-radius: 1rem;
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
