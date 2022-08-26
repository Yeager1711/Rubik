<template>
  <div class="newletter">
    <div class="box-container">
      <div class="content">
        <h3 class="title">Đăng kí để được <span>giảm giá 25%</span></h3>
        <p class="title-list">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          deserunt aspernatur fugiat minus enim ullam repudiandae sint sed
          magnam tenetur! Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </p>
      </div>

      <div class="Email">
          <div class="input-box">
            <input type="text" name="" id="" placeholder="Your E-mail">
          </div>
          <button class="send-input">Subscribe</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"comp-new-letter",
    data() {
        return {
            
        }
    },
};
</script>

<style lang="scss" scoped>
    .newletter {
      padding: 2% 6% 2% 6%;
      background: #333;
      margin-bottom: 5rem;
      

      .box-container{
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin: 5rem auto;

        .content {
          flex: 1 1 42rem;

          .title {
            font-weight: 400;
            font-size: 2.5rem;
            color: #fff;

            span {
              color: #fbb710;
            }
          }

          .title-list{
            text-transform: none;
            font-size: 1.4rem;
            color: #fff;
            line-height: 2;
          }
        }

        .Email{
          flex: 1 1 32rem;
          display: flex;
          margin: auto;
          line-height: 2;

          .input-box{
            width: 95%;
            max-width: 40rem;
            height: 5rem;
            background: #fff;

            input {
                width: 90%;
                height: 100%;
                outline: none;
                border: none;
                padding: 0 1.5rem;
                line-height: 3;
                color: #666;
                font-weight: bolder;

              &::placeholder {
                font-weight: lighter;
                color: #333;
              }
            }
          }
          
          .send-input{
            border: none;
            outline: none;
            padding: 1rem 1.5rem;
            background: #fbb710;
            color: #fff;
            font-size: 1.5rem;

            &:hover {
              transition: .2s linear;
              letter-spacing: .105rem;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
