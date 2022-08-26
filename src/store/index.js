import Vue from 'vue'
import Vuex from 'vuex'
import products from '../mock/products.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    storeCart: [],
    storeView:[],
  },

  getters: {
    products: (state) => state.products,
    storeCart: (state) => state.storeCart,
    storeView: (state) => state.storeView,
    // searchResult: (state) => state.products
  },

  actions: {
    getProducts({ commit }) {
      commit("getProductData")
    },

    // ---Cart start--- //
    // +thêm 
    addToCart({ commit }, item) {
      commit("addItemToCart", item)
    },

    // thêm số lượng
    addQty({ commit }, id) {
      commit("addQty", id)
    },

    // xóa số lượng
    reduceQty({ commit }, id) {
      commit("reduceQty", id)
    },

    // xóa giỏ hàng
    removeItem({ commit }, id) {
      commit("removeItem", id)
    },
    // ---- end cart----//


    
    //  --- view Model-detail start---//
    // thêm view
    viewModel({commit}, id){
      commit("addToView", id)
    },

    // xóa view
    removeView({commit}, id){
      commit("removeModel", id)
    },
    
    addQtyPopup({commit}, id){
      commit("qtyPopup", id)
    },

    removeQty({commit}, id) {
      commit("removeQtyPopup", id)
    },

    // ---view Model-detail end---//

    // button show cart queries 900px
    showCart({commit}) {
      commit("ButtonShowCart");
    }
  },

  mutations: {

    getProductData(state) {
      state.products = products;
    },

    // POPUP DETAIL
    //  + thêm view 
    addToView(state, item){
      const popUp = state.storeView.find((products) => products.id === item.id)
      if(!popUp > 1) {
        state.storeView.push({ ...item, qty: 1});
        popUp.qty++;
      }else {
        state.storeView.push({ ...item, qty: 1})
        popUp.qty++;
      }
    },

    // xóa view
    removeModel(state, id){
      state.storeView = state.storeView.filter(product => product.id !== id)
    },

    // thêm số lượng > Popup
    qtyPopup(state, id){
      const qtyPopup = state.storeView.find((products) => products.id === id)
      qtyPopup.qty++
    },

    // Xóa số lượng > Popup
    removeQtyPopup(state, id) {
      const qtyPopup = state.storeView.find((products) => products.id === id)
      if (qtyPopup.qty > 1) {
        qtyPopup.qty--;
      } else {
        state.storeView = state.storeView.filter(products => products.id !== id)
      }
    },

    // --------------------------------//

    // CART
    // thêm giỏ hàng
    addItemToCart(state, item) {
      const addedItem = state.storeCart.find((products) => products.id === item.id)
      if (!addedItem) {
        state.storeCart.push({ ...item, qty: 1 });
      } else {
        addedItem.qty++;
      }
    },

    // xóa giỏ hàng
    removeItem(state, id) {
      state.storeCart = state.storeCart.filter(product => product.id !== id)
    },

    // thêm số lượng 
    addQty(state, id) {
      const currentItem = state.storeCart.find((product) => product.id === id)
      currentItem.qty++;
    },

    // xóa số lượng
    reduceQty(state, id) {
      const currentItem = state.storeCart.find((product) => product.id === id)
      if (currentItem.qty > 1) {
        currentItem.qty--;
      } else {
        state.storeCart = state.storeCart.filter(product => product.id !== id)
      }
    },

    // ----------------------------//
    ButtonShowCart() {
      const cart = document.querySelector('.cart');
      cart.classList.toggle('active')
    }
  },

  modules: {
  }
})
