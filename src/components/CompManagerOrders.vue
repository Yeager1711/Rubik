<template>
    <section class="manager-orders">
        <h3>Quản lý đơn hàng</h3>

        <nav class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <a v-for="tab in tabs" :key="tab.id" :class="{ 'nav-item': true, 'nav-link': true, 'active': tab.active }"
                :id="tab.id + '-tab'" role="tab" @click="changeTab(tab.id)">
                {{ tab.label }}
            </a>
        </nav>

        <div class="boxes">
            <div v-for="tab in tabs" :key="tab.id" :class="{ 'box': true, 'active': tab.active }">
                <div v-if="tab.id === 'all-orders'">
                    <div v-for="order in tabData[tab.id]" :key="order.Order_Id" style="display: flex;" class="all-orders">
                        <div class="orderId">
                            <p>Mã đơn hàng:</p>
                            <p>{{ order.Order_Id }}</p>
                        </div>

                        <div class="dateOrder">
                            <p>Ngày đặt</p>
                            <p>{{ formatDateTime(order.date_ordered) }}</p>
                        </div>

                        <div class="total-itemAmount">
                            <p>Tổng số lượng sản phẩm</p>
                            <p>{{ order.total_item_amount }}</p>
                        </div>

                        <div class="shipping_tax">
                            <p>Phí giao hàng ngẫu nhiên</p>
                            <p>{{ order.shipping_tax }}</p>
                        </div>

                        <div class="total-amount">
                            <p>Tổng tiền</p>
                            <p>{{ formatCurrency(order.total_amount) }}</p>
                        </div>

                        <div class="button-control">
                            <button class="btn-details">Xem chi tiết</button>
                            <button class="btn-cancelled">Hủy đặt hàng</button>
                        </div>
                    </div>

                </div>
                <div v-else>
                    <!-- Lấy dữ liệu từ API và hiển thị -->
                    <div v-if="tab.id === 'pending-payment'">
                        <div v-for="cart in tabData[tab.id]" :key="cart.Order_Id" style="display: flex;" class="all-orders">
                            <div class="orderId">
                                <p>Mã đơn hàng:</p>
                                <p>{{ cart.Order_Id }}</p>
                            </div>

                            <div class="dateOrder">
                                <p>Ngày đặt</p>
                                <p>{{ formatDateTime(cart.date_ordered) }}</p>
                            </div>

                            <div class="total-itemAmount">
                                <p>Tổng số lượng sản phẩm</p>
                                <p>{{ cart.total_item_amount }}</p>
                            </div>

                            <div class="shipping_tax">
                                <p>Phí giao hàng ngẫu nhiên</p>
                                <p>{{ cart.shipping_tax }}</p>
                            </div>

                            <div class="total-amount">
                                <p>Tổng tiền</p>
                                <p>{{ formatCurrency(cart.total_amount) }}</p>
                            </div>

                            <div class="button-control">
                                <button class="btn-details">Xem chi tiết</button>
                                <button class="btn-cancelled">Hủy đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    name: "comp-managerorders",
    data() {
        return {
            tabs: [
                { id: 'all-orders', label: 'Tất cả đơn', active: true },
                { id: 'pending-payment', label: 'Đơn hàng chờ đặt', active: false },
                { id: 'processing&shipping', label: 'Đang xử lý & vận chuyển', active: false },
                { id: 'delivered', label: 'Đã giao', active: false },
                { id: 'cancelled', label: 'Đã huỷ', active: false },
            ],
            tabData: {
                'all-orders': [],  // Dữ liệu cho tab 'Tất cả đơn'
                'pending-payment': [],
                'processing&shipping': [],
                'delivered': [],
                'cancelled': [],
            },
        };
    },
    methods: {
        formatDateTime(datetimeString) {

            if (isNaN(new Date(datetimeString).getTime())) {
                return ("Chưa đặt hàng");
            }

            const date = new Date(datetimeString);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },

        formatCurrency(total_amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total_amount);
        },

        changeTab(tabId) {
            this.tabs.forEach(tab => {
                tab.active = tab.id === tabId;
            });

            // Nếu tab được chọn là 'all-orders', không gọi API
            if (tabId !== 'all-orders') {
                this.fetchDataAllOrders(tabId);
            }
        },
        fetchDataAllOrders(tabId) {
            if (tabId === 'all-orders') {
                const userId = Cookies.get('user_id');
                axios
                    .get(`http://localhost:4000/api/orders/${userId}`)
                    .then((response) => {
                        response.data.sort((a, b) => {
                            if (!a.date_ordered) return -1;
                            if (!b.date_ordered) return 1;
                            return new Date(a.date_ordered) - new Date(b.date_ordered);
                        });

                        this.tabData[tabId] = response.data;

                    }).catch(error => {
                        console.error('Error fetching data', error);
                    });
            }
        },

        fetchDataAllinCart(tabId) {
            if (tabId === 'pending-payment') {
                const userId = Cookies.get('user_id');
                axios.get(`http://localhost:4000/api/carts/${userId}`)
                    .then((response) => {
                        this.tabData[tabId] = response.data;
                    })
            }
        }
    },
    mounted() {
        // Mặc định khi component được mount, gọi API để lấy dữ liệu cho tab 'Tất cả đơn'
        this.fetchDataAllOrders('all-orders');
        this.fetchDataAllinCart('pending-payment')
    },
};
</script>
  
  
<style lang="scss" scoped>
.button-control {
    display: inline-block;

    .btn-cancelled {
        width: 100%;
        display: block;
        padding: .5rem 1.5rem;
        background: #ea2f2f;
        color: #fff;
        border-radius: .5rem;
        margin-top: .9rem;
    }

    .btn-details {
        width: 100%;
        display: block;
        padding: .5rem 1.5rem;
        background: #1e3050;
        color: #fff;
        border-radius: .5rem;
        margin-bottom: .9rem;
    }
}

.manager-orders {
    margin: 20px;
    overflow: hidden;

    h3 {
        font-weight: 550;
        font-size: 2.2rem;
    }

    .nav {
        background-color: #fff;
        white-space: nowrap;
        overflow-x: auto;
        font-size: 1.3rem;
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
    }

    .nav-link {
        color: #495057;
        cursor: pointer;
        display: inline-block;
        padding: 1.5rem;
        transition: color 0.3s;
        position: relative;
    }

    .nav-link.active {
        color: #282eda;
        font-weight: 550;
    }

    .boxes {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;

        .box {
            min-height: 68vh;
            flex: 1;
            padding: 1.5rem;
            border-radius: 4px;
            background-color: #fff;
            display: none;

            .all-orders {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 1.3rem;
                border-bottom: .1rem dashed #ddd;
                text-align: center;
                margin-bottom: 1.5rem;

                .orderId,
                .dateOrder,
                .total-itemAmount,
                .shipping_tax,
                .total-amount {
                    p {
                        font-size: 1.4rem;

                        &:nth-child(2) {
                            font-weight: 550;
                        }
                    }
                }
            }
        }

        .box.active {
            display: block;
        }
    }


}
</style>
  