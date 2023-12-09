import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    storeCart: [],
    storeView: [],
    selectedProductId: null,
    quantityToUpdate: 0,
  },
  getters: {
    products: (state) => state.products,
    storeCart: (state) => state.storeCart,
    storeView: (state) => state.storeView,
  },
  actions: {
    viewModel({ commit }, product) {
      commit('addToView', product);
    },

    addToCart({ commit }, product) {
      commit('addItemToCart', product);
    },

    addQty({ commit }, id) {
      commit('addQty', id);
    },
    reduceQty({ commit }, id) {
      commit('reduceQty', id);
    },
    removeItem({ commit }, id) {
      commit('removeItem', id);
    },

    removeView({ commit }, id) {
      commit('removeModel', id);
    },
    addQtyPopup({ commit }, id) {
      commit('qtyPopup', id);
    },
    removeQtyPopup({ commit }, id) {
      commit('removeQtyPopup', id);
    },
    showCart({ commit }) {
      commit('ButtonShowCart');
    },
  },
  mutations: {
    addToView(state, product) {
      const popUp = state.storeView.find((products) => products.id === product.id);
      if (popUp) {
        popUp.qty++;
      } else {
        state.storeView.push({ ...product, qty: 1 });
      }
    },

    addItemToCart(state, product) {
      const addedItem = state.storeCart.find((products) => products.id === product.id);
      if (addedItem) {
        addedItem.qty++;
      } else {
        state.storeCart.push({ ...product, qty: 1 });
      }
    },

    setCart(state, cart) {
      state.storeCart = cart;
      console.log("Updated storeCart in Vuex:", state.storeCart);
    },

    setQuantityToUpdate(state, value) {
      state.quantityToUpdate = value;
    },







    removeModel(state, id) {
      state.storeView = state.storeView.filter((product) => product.id !== id);
    },
    qtyPopup(state, id) {
      const qtyPopup = state.storeView.find((products) => products.id === id);
      qtyPopup.qty++;
    },
    removeQtyPopup(state, id) {
      const qtyPopup = state.storeView.find((products) => products.id === id);
      if (qtyPopup.qty > 1) {
        qtyPopup.qty--;
      } else {
        state.storeView = state.storeView.filter((product) => product.id !== id);
      }
    },

    removeItem(state, id) {
      state.storeCart = state.storeCart.filter((product) => product.id !== id);
    },
    addQty(state, id) {
      const currentItem = state.storeCart.find((product) => product.id === id);
      currentItem.qty++;
    },
    reduceQty(state, id) {
      const currentItem = state.storeCart.find((product) => product.id === id);
      if (currentItem.qty > 1) {
        currentItem.qty--;
      } else {
        state.storeCart = state.storeCart.filter((product) => product.id !== id);
      }
    },
    ButtonShowCart() {
      const cart = document.querySelector('.cart');
      cart.classList.toggle('active');
    },
  },
  modules: {},
});
