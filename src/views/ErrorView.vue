<template>
 <div class="error">
    
    <div class="box-container">
        <div class="image-err">
            <img src="../components/images/404err.png" alt="error">
        </div>

        <div class="content-err">
            <h1>TRANG KHÔNG ĐƯỢC TÌM THẤY <img src="../components/images/sad-icon.png" alt="" width="25px"></h1>
            <span>Xin lỗi nhưng trang bạn đang tìm kiếm không tồn tại, đã từng
            bị xóa, tên đã thay đổi hoặc tạm thời không có sẵn. 
            </span>
            <a  href="/" class="return"> Trở lại ! <ThemifyIcon class="return-icon" icon="hand-point-left" /> </a>
        </div>
    </div>
  </div>
</template>

<script>
import ThemifyIcon from "vue-themify-icons";
// import ThemifyIcon from "../../node_modules/vue-themify-icons/ThemifyIcon.vue";
export default {
    components: {
    ThemifyIcon
}
}
</script>

<style lang="scss" scoped>
.error{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999 !important;
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
    display: flex;

    .box-container{
        margin: auto;
        padding: 2rem;

        .image-err{
            display: flex;
            img{
                margin: auto;
                max-width: 50rem;
                width: 90%;
            }
        }

        .content-err{
             text-align: center;
             font-family: "Nunito", sans-serif;
                max-width: 50rem;
                width: 100%;
            h1{
                text-transform: uppercase;
                font-size: 2.5rem;
                font-weight: 600;
            }

            span{
                text-transform: none;
                font-size: 1.5rem;
                font-weight: bolder;
            }

            .return{
                display: block;
                font-size: 1.7rem;
                text-decoration: underline;
                color: #333;
                font-family: "Nunito", sans-serif;
                font-weight: 600;
                
                .return-icon{
                    font-size: 2rem;
                    animation: Rotate .7s linear infinite;
                }
            }
        }
    }
}

@keyframes Rotate{
    0%{
        padding-left: 0;
    }

    100%{
        padding-left: 1rem;
    }
}
</style>
