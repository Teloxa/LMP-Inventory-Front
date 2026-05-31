<template>

  <div class="dashboard-analytics">

    <div v-if="!dataLoaded" class="loader" role="status" aria-live="polite">

      <span class="loader-spinner" aria-hidden="true"></span>

      <p>Loading analytics…</p>

    </div>

    <div v-else class="pro-dashboard">

      <div class="pro-kpi-row">

        <div class="pro-kpi-card">

          <span class="pro-kpi-label">Total Products</span>

          <span class="pro-kpi-value">{{ products.length }}</span>

          <span class="pro-kpi-meta pro-kpi-meta--muted">In catalog</span>

        </div>

        <div class="pro-kpi-card">

          <span class="pro-kpi-label">Products purchase value</span>

          <span class="pro-kpi-value">${{ totalProductPurchaseValue }}</span>

          <span class="pro-kpi-meta pro-kpi-meta--muted">Buying price total</span>

        </div>

        <div

          class="pro-kpi-card"

          :class="{ 'pro-kpi-card--alert': bestSellingProducts.length > 0 }"

        >

          <span class="pro-kpi-label">Stock alerts</span>

          <span class="pro-kpi-value">{{ bestSellingProducts.length }}</span>

          <span

            class="pro-kpi-meta"

            :class="

              bestSellingProducts.length > 0

                ? 'pro-kpi-meta--critical'

                : 'pro-kpi-meta--muted'

            "

          >

            {{ bestSellingProducts.length > 0 ? "Critical" : "Normal" }}

          </span>

        </div>

        <div class="pro-kpi-card">

          <span class="pro-kpi-label">Orders value</span>

          <span class="pro-kpi-value">${{ totalOrdersValue }}</span>

          <span class="pro-kpi-meta pro-kpi-meta--muted">Profit: ${{ profit }}</span>

        </div>

      </div>



      <div class="dashboard-main-row">

        <section class="pro-card recent-orders">

          <div class="pro-card-header">

            <h2>Recent orders</h2>

          </div>

          <div v-if="orders.length" class="pro-table-wrap">

            <table class="pro-table">

              <thead>

                <tr>

                  <th>Delivery</th>

                  <th>Product</th>

                  <th>Category</th>

                  <th>Qty</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                <tr v-for="order in orders.slice(0, 8)" :key="order.id">

                  <td>{{ order.deliveryDate || "—" }}</td>

                  <td>{{ order.productName }}</td>

                  <td>{{ order.category }}</td>

                  <td

                    :class="{

                      'qty-negative': Number(order.quantity) < 0,

                    }"

                  >

                    {{ order.quantity }}

                  </td>

                  <td>

                    <span

                      class="pro-badge"

                      :class="orderBadgeClass(order.status)"

                    >

                      {{ order.status || "Pending" }}

                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          <p v-else class="empty-hint">No orders yet.</p>

        </section>



        <aside class="pro-alert-panel critical-alerts">

          <div class="pro-alert-panel-header">

            <h2>Critical alerts</h2>

            <span class="pro-alert-count"

              >{{ bestSellingProducts.length }} ITEMS</span

            >

          </div>

          <ul v-if="bestSellingProducts.length" class="pro-alert-list">

            <li

              v-for="product in bestSellingProducts"

              :key="product.id"

              class="pro-alert-item"

            >

              <span class="pro-alert-sku">{{ product.category }}</span>

              <span class="pro-alert-name">{{ product.productName }}</span>

              <p class="pro-alert-stats">

                Current: <strong>{{ product.quantity }}</strong> units ·

                Threshold: {{ product.thresholdValue }} units

              </p>

            </li>

          </ul>

          <p v-else class="empty-hint empty-hint--panel">No low stock items.</p>

        </aside>

      </div>



      <div class="dashboard-bottom-row">

        <section class="pro-card chart-panel">

          <div class="pro-card-header">

            <h2>Profit &amp; revenue</h2>

          </div>

          <div class="pro-card-body--padded chart-wrap">

            <line-chart v-if="chartData" :chart-data="chartData" />

            <p v-else class="empty-hint">Not enough dated data for the chart.</p>

          </div>

        </section>



        <section class="pro-card categories-panel">

          <div class="pro-card-header">

            <h2>Top categories (by threshold)</h2>

          </div>

          <ul v-if="bestSellingCategories.length" class="category-list">

            <li

              v-for="(product, index) in bestSellingCategories"

              :key="product.id"

              class="category-item"

            >

              <span class="category-rank">{{ index + 1 }}</span>

              <span class="category-info">

                <span class="category-name">{{ product.category }}</span>

                <span class="category-meta"

                  >Threshold: {{ product.thresholdValue }}</span

                >

              </span>

            </li>

          </ul>

          <p v-else class="empty-hint">No product data yet.</p>

        </section>

      </div>

    </div>

  </div>

</template>



<script>

import axios from "axios";

import LineChart from "@/components/LineChart.vue";

import { mapProductFromApi, mapOrderFromApi } from "@/utils/apiMappers";



export default {

  name: "DashboardAnalytics",

  components: { LineChart },

  data() {

    return {

      dataLoaded: false,

      products: [],

      orders: [],

      totalProductPurchaseValue: 0,

      totalOrdersValue: 0,

      profit: 0,

      bestSellingCategories: [],

      chartData: null,

      bestSellingProducts: [],

    };

  },

  async created() {

    await this.fetchData();

    this.calculateOverview();

    this.getBestSellingCategories();

    this.getBestSellingProducts();

    this.prepareChartData();

    this.dataLoaded = true;

  },

  methods: {

    async fetchData() {

      try {

        const [productsResponse, ordersResponse] = await Promise.all([

          axios.get("products"),

          axios.get("orders/list"),

        ]);

        this.products = productsResponse.data.map((p) => mapProductFromApi(p));

        this.orders = ordersResponse.data.map((o) => mapOrderFromApi(o));

      } catch (error) {

        console.error("Error fetching dashboard data:", error);

      }

    },

    calculateOverview() {

      this.totalProductPurchaseValue = this.products.reduce(

        (sum, product) => sum + (Number(product.purchasePrice) || 0),

        0

      );

      this.totalOrdersValue = this.orders.reduce(

        (sum, order) => sum + (Number(order.orderValue) || 0),

        0

      );

      this.profit = this.totalOrdersValue - this.totalProductPurchaseValue;

    },

    getBestSellingCategories() {

      this.bestSellingCategories = [...this.products]

        .sort((a, b) => (b.thresholdValue || 0) - (a.thresholdValue || 0))

        .slice(0, 3);

    },

    getBestSellingProducts() {

      this.bestSellingProducts = [...this.products]

        .sort((a, b) => (a.quantity || 0) - (b.quantity || 0))

        .slice(0, 5);

    },

    orderBadgeClass(status) {

      const s = String(status || "").toLowerCase();

      if (s.includes("dispatch") || s.includes("ship")) {

        return "pro-badge--dispatched";

      }

      if (s.includes("receiv") || s.includes("deliver") || s.includes("complet")) {

        return "pro-badge--received";

      }

      return "pro-badge--pending";

    },

    parseDate(dateStr) {

      if (!dateStr) return null;

      const parts = dateStr.split("-");

      if (parts.length === 3 && parts[0].length <= 2) {

        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

      }

      return new Date(dateStr);

    },

    prepareChartData() {

      const productData = this.products

        .filter((p) => p.saleDate && p.purchasePrice)

        .map((p) => ({ date: p.saleDate, value: p.purchasePrice }));



      const orderData = this.orders

        .filter((o) => o.deliveryDate && o.orderValue)

        .map((o) => ({ date: o.deliveryDate, value: o.orderValue }));



      const sortByDate = (a, b) => this.parseDate(a.date) - this.parseDate(b.date);

      const sortedProductData = productData.sort(sortByDate);

      const sortedOrderData = orderData.sort(sortByDate);



      const labels = [

        ...new Set([

          ...sortedProductData.map((d) => d.date),

          ...sortedOrderData.map((d) => d.date),

        ]),

      ].sort((a, b) => this.parseDate(a) - this.parseDate(b));



      if (!labels.length) {

        this.chartData = null;

        return;

      }



      this.chartData = {

        labels,

        datasets: [

          {

            label: "Products (buying price)",

            data: labels.map((date) => {

              const row = sortedProductData.find((d) => d.date === date);

              return row ? row.value : null;

            }),

            borderColor: "#1f2937",

            backgroundColor: "rgba(31, 41, 55, 0.08)",

            fill: true,

            tension: 0.3,

          },

          {

            label: "Orders (order value)",

            data: labels.map((date) => {

              const row = sortedOrderData.find((d) => d.date === date);

              return row ? row.value : null;

            }),

            borderColor: "#d32f2f",

            backgroundColor: "rgba(211, 47, 47, 0.06)",

            fill: true,

            tension: 0.3,

          },

        ],

      };

    },

  },

};

</script>



<style scoped>

.dashboard-analytics {

  width: 100%;

}



.loader {

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 16px;

  padding: 80px 24px;

  color: var(--pro-text-secondary);

}



.loader-spinner {

  width: 40px;

  height: 40px;

  border: 3px solid #e5e5e5;

  border-top-color: var(--pro-accent);

  border-radius: 50%;

  animation: spin 0.75s linear infinite;

}



@keyframes spin {

  to {

    transform: rotate(360deg);

  }

}



.pro-dashboard {

  display: flex;

  flex-direction: column;

  gap: 20px;

}



.dashboard-main-row {

  display: grid;

  grid-template-columns: 1fr 340px;

  gap: 20px;

  align-items: stretch;

}



.dashboard-bottom-row {

  display: grid;

  grid-template-columns: 1.4fr 1fr;

  gap: 20px;

}



.chart-wrap {

  min-height: 280px;

}



.qty-negative {

  color: var(--pro-danger);

  font-weight: 600;

}



.category-list {

  list-style: none;

  margin: 0;

  padding: 8px 0;

}



.category-item {

  display: flex;

  align-items: center;

  gap: 14px;

  padding: 14px 22px;

  border-bottom: 1px solid #f0f0f0;

}



.category-item:last-child {

  border-bottom: none;

}



.category-rank {

  width: 28px;

  height: 28px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 0.75rem;

  font-weight: 700;

  background: #f3f4f6;

  border-radius: 6px;

  color: var(--pro-text-secondary);

}



.category-info {

  display: flex;

  flex-direction: column;

  gap: 2px;

  min-width: 0;

}



.category-name {

  font-size: 0.875rem;

  font-weight: 600;

  color: var(--pro-text);

}



.category-meta {

  font-size: 0.8125rem;

  color: var(--pro-text-secondary);

}



.empty-hint {

  color: var(--pro-text-muted);

  font-size: 0.875rem;

  margin: 0;

  padding: 24px 22px;

  text-align: center;

}



.empty-hint--panel {

  padding: 20px 18px;

}



@media (max-width: 1100px) {

  .dashboard-main-row,

  .dashboard-bottom-row {

    grid-template-columns: 1fr;

  }

}

</style>

