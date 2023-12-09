<template>
  <div class="home" id="home">
    <carousel
      :autoplay="true"
      :autoHeight="true"
      :nav="false"
      :responsive="responsive"
    >
      <div
        v-for="(banner, index) in homeItems"
        :key="`banner-${index}`"
        class="box-slide"
      >
        <div class="image">
          <img :src="banner.image" alt="" />
        </div>

        <div class="content">
          <span data-aos="fade-up" data-aos-deplay="250">{{
            banner.text1
          }}</span>
          <h1 data-aos="fade-right" data-aos-deplay="250">
            <span>
              {{ banner.span_title }}
            </span>
            {{ banner.title }}
          </h1>
          <p data-aos="fade-right" data-aos-deplay="250">{{ banner.text2 }}</p>

          <router-link :to="banner.href" class="btn">Cửa hàng </router-link>
        </div>
      </div>
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
export default {
  name: "comp-home",

  data() {
    return {
      responsive: {
        0: { items: 1, nav: false },
        600: { items: 1, nav: true },
        900: { items: 1, nav: true },
      },

      homeItems: [
        {
          image: require("./images/homeSlide1.webp"),
          text1: "TUYỆT VỜI TỪ RUBIK",
          span_title: "TRANG TRÍ ",
          title: "CÂY XƯƠNG RỒNG",
          text2: "ƯU ĐÃI GIẢM 20% CHO ĐƠN HÀNG ĐẦU TIÊN",
          href: "/products",
        },

        {
          image: require("./images/homeSlide2.webp"),
          text1: "TUYỆT VỜI TỪ RUBIK",
          span_title: "CÂY TRỒNG",
          title: "TRANG TRÍ TRONG NHÀ",
          text2: "ƯU ĐÃI GIẢM 20% CHO ĐƠN HÀNG ĐẦU TIÊN",
          href: "/products",
        },

        {
          image: require("./images/homeSlide3.webp"),
          text1: "TUYỆT VỜI TỪ RUBIK",
          span_title: "SEN ĐÁ",
          title: "CÂY LÁ XANH",
          text2: "ƯU ĐÃI GIẢM 20% CHO ĐƠN HÀNG ĐẦU TIÊN",
          href: "/products",
        },
      ],
    };
  },

  components: {
    carousel,
  },
};
</script>

<style lang="scss" scoped>
.home {
  transition: 0.3s linear;
  min-width: 100%;

  .box-slide {
    .image {
      position: relative;
    }

    .content {
      position: absolute;
      top: 15%;
      left: 5%;
      max-width: 65rem;

      span {
        font-size: 1.5rem;
        font-weight: 600;
      }

      h1 {
        span {
          font-family: "Montserrat";
          display: block;
          text-transform: uppercase;
          font-weight: lighter;
          font-size: 2.5vw;
        }

        font-family: "Nunito";
        text-transform: uppercase;
        font-weight: bolder;
        font-size: 3.5vw;
      }

      p {
        font-size: 1.4rem;
        font-weight: 550;
      }

      .btn {
        display: inline-block;
        padding: 1.7rem 4rem;
        border-radius: 5rem;
        margin-top: 1rem;
        background: #333;
        color: #fff;
        font-size: 1.5rem;
        box-shadow: 0 0.5rem 1rem rgab(0, 0, 0, 0.5);

        &:hover {
          transform: scale(0.98);
          background: #79a206;
          transition: 0.2s linear;
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

  .home{
    .box-slide{

        
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
