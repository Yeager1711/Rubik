<template>
  <section class="about">
    <div class="image-slide">
      <img src="./images/about-banner.jpg" alt="">
    </div>
    <div class="about-title">
      <h1>Về chúng tôi & <span>bài viết</span> </h1>
    </div>

    <div class="blog-container">

      <div v-for="(about, index) in aboutItems" 
      :key="`about-${index}`"
      class="box"
      :class="about.class_name2" >
      <div class="image" data-aos="fade-right" data-aos-deplay="250">
        <img :src="about.img" alt="">
      </div>

      <div class="content" data-aos="fade-left" data-aos-deplay="250">
        <div class="title">
          <i :class="about.icon_about"></i>
          <h3> {{about.title_about}} </h3>
        </div>

        <div class="content-list">
          <p>{{about.content_about}}</p>
        </div>

        <router-link to="/error" class="btn-blog">{{about.button_about}}</router-link>
      </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
    name:"comp-about",
    data() {
      return {
        aboutItems: [
          {
            class_name:"box",
            img:require("./images/about-blog1.webp"),
            icon_about:"fa-solid fa-paper-plane",
            title_about:"Bài viết đăng lên",
            content_about:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt aspernatur fugiat minus enim ullam repudiandae sint sed magnam tenetur! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            button_about:"Đọc ngay",

          },

          {
            class_name:"box",
            class_name2:"second",
            img:require("./images/about-blog2.webp"),
            icon_about:"fa-solid fa-paper-plane",
            title_about:"Thư viện ảnh",
            content_about:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt aspernatur fugiat minus enim ullam repudiandae sint sed magnam tenetur! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            button_about:"Đọc ngay",

          },

          {
            class_name:"box",
            img:require("./images/about-blog3.webp"),
            icon_about:"fa-solid fa-paper-plane",
            title_about:"Thảo luận & phản hồi",
            content_about:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt aspernatur fugiat minus enim ullam repudiandae sint sed magnam tenetur! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            button_about:"Đọc ngay",

          },

          {
            class_name:"box",
            class_name2:"second",
            img:require("./images/about-blog4.webp"),
            icon_about:"fa-solid fa-paper-plane",
            title_about:"Đánh giá tích cực",
            content_about:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt aspernatur fugiat minus enim ullam repudiandae sint sed magnam tenetur! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            button_about:"Đọc ngay",

          },
        ]
      }
    },
}
</script>

<style lang="scss" scoped>
  .about{
    .image-slide{
      position: relative;

      img{
        width: 100%;
        background-size: cover;
      }
    }

    .about-title{
      position: absolute;
      top: 8%;
      left: 23%;
      width: 30rem;

      h1{
        font-weight: 550;
        font-size: 3vw;
        
        span{
          font-size: 3vw;
        }
      }
    }

    .blog-container{
      margin-top: 4rem;

      .box{
        display: flex;
        flex-wrap: wrap;

        &.second{
          flex-direction: row-reverse; 
        }
        
        gap: 1.5rem;
        margin-bottom: 3rem;
        justify-content: space-between;

        .image{
          overflow: hidden;
          border-radius: .7rem;
          img{
            width: 100%;

            &:hover {
              cursor: pointer;
              transition: .3s linear;
              transform: scale(1.03);
            }
          }
        }

        .content{
          .title{
            display: flex;
            align-items: center;

            i{
              color: #79a206;
              font-size: 2rem;
              margin-right: 1rem;
            }

            h3{
              font-size: 2.3rem;
            }
          }

          .content-list{
            font-family:"Nunito";
            text-transform: none;
            line-height: 1.4;
            font-size: 1.66rem;
          }

          .btn-blog{
            margin-top: 3rem;
            padding: .7rem 2rem;
            background: #79a206;
            box-shadow: 0 .5rem 1rem rgba(0,0,0, .5);
            color: #fff;
            font-size: 1.5rem;
            text-transform: none;
            border-radius: 5rem;

            &:hover {
              transition: .2s linear;
              letter-spacing: .1rem;
            }
          }
        }
      }
    }
  }

  
@media (max-width: 1200px) {
  html {
    font-size: 55%;
  }
}

@media (max-width: 991px) {
  section {
    padding: 2rem;
  }

  .about{
    .about-title{
      left: 5%;
    }
  }
}

@media (max-width: 768px) {
}

@media (max-width: 450px) {
  html {
    font-size: 50%;
  }
}
</style>