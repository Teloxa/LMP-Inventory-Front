<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-layout">
    <!-- Barra lateral -->
    <SideBar />
    
    <!-- Contenido principal -->
    <div class="main-content">
      <header class="app-topbar">
        <div class="app-topbar-search buscador">
          <input
            type="text"
            placeholder="Search orders…"
            class="input-buscador"
            v-model="searchTerm"
            @input="filterOrders"
          />
        </div>
        <div class="app-topbar-actions">
          <Userbar />
        </div>
      </header>

      <div class="page-body">
      <!-- Overview Section -->
      <section class="overview">
        <div class="overview-card">
          <h2>Overall Orders</h2>
          <div class="overview-info">
            <div class="info">
              <h3>Total Orders</h3>
              <p>{{ filteredOrders.length }}</p>
              <span>Last 7 days</span>
            </div>
            <div class="info">
              <h4>Total Received</h4>
              <p>${{ totalReceived }}</p>
              <span>Last 7 days</span>
            </div>
            <div class="info">
              <h5>Total Returned</h5>
              <p>{{ totalReturned }}</p>
              <span>Last 7 days</span>
            </div>
            <div class="info">
              <h6>On the way</h6>
              <p>${{ onTheWay }}</p>
              <span>Last 7 days</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Orders Table -->
      <section class="orders">
        <div class="orders-card">
          <div class="orders-card2">
            <h2>Orders</h2>
            <div class="actions">
              <button class="add-btn" @click="showModal = true">Add Order</button>
              <button class="history-btn" @click="viewOrderHistory">Order History</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Order Value</th>
                <th>Quantity</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td>{{ order.productName }}</td>
                <td>{{ order.category }}</td>
                <td>{{ order.orderValue }}</td>
                <td>{{ order.quantity }}</td>
                <td>{{ order.deliveryDate }}</td>
                <td>
                  <span
                    class="pro-badge"
                    :class="orderBadgeClass(order.status)"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button class="delete-btn" @click="confirmDelete(order.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      </div>

      <!-- Modal para agregar nueva orden -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <header class="modal-header">
            <h2>New Order</h2>
            <button class="close-btn" @click="closeModal">×</button>
          </header>
          <form class="modal-body" @submit.prevent="submitForm">
            <div class="form-group" v-for="field in fields" :key="field.id">
              <label :for="field.id">{{ field.label }}</label>
              <input
                :type="field.type"
                :id="field.id"
                v-model="form[field.model]"
                :placeholder="field.placeholder"
                :min="field.min"
              />
            </div>
            <div class="form-group">
              <input type="checkbox" id="notify" v-model="form.notify" />
              <label for="notify">Notify on delivery date</label>
            </div>
            <div class="modal-footer">
              <button class="discard-btn" type="button" @click="closeModal">Discard</button>
              <button class="add-btn" type="submit">Add Order</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Userbar from "@/components/Userbar.vue";
import SideBar from "@/components/SideBar.vue";
import { mapOrderFromApi, mapOrderToApi } from "@/utils/apiMappers";

export default {
  components: {
    Userbar,
    SideBar,
  },
  data() {
    const currentYear = new Date().getFullYear();
    return {
      showModal: false,
      orders: [],
      filteredOrders: [], 
      searchTerm: "", 
      form: {
        productName: "",
        category: "",
        orderValue: 0,
        quantity: 0,
        unit: "",
        buyingPrice: 0,
        deliveryDate: "",
        status: "Pending", 
        notify: false, 
      },
      fields: [
        { label: "Product Name", id: "product-name", type: "text", model: "productName", placeholder: "Enter product name" },
        { label: "Category", id: "category", type: "text", model: "category", placeholder: "Enter category" },
        { label: "Order Value", id: "order-value", type: "number", model: "orderValue", placeholder: "Enter order value", min: 0 },
        { label: "Quantity", id: "quantity", type: "number", model: "quantity", placeholder: "Enter quantity", min: 0 },
        { label: "Unit", id: "unit", type: "text", model: "unit", placeholder: "Enter unit" },
        { label: "Buying Price", id: "buying-price", type: "number", model: "buyingPrice", placeholder: "Enter buying price", min: 0 },
        { label: "Delivery Date", id: "delivery-date", type: "date", model: "deliveryDate", placeholder: "", min: `${currentYear}-01-01` },
      ],
    };
  },
  computed: {
    totalReceived() {
      return this.orders.reduce((total, order) => total + (order.orderValue || 0), 0);
    },
    totalReturned() {
      return this.orders.filter((order) => order.status === "Returned").length;
    },
    onTheWay() {
      return this.orders.reduce(
        (total, order) => (order.status === "On the way" ? total + (order.orderValue || 0) : total),
        0
      );
    },
  },
  methods: {
    orderBadgeClass(status) {
      const s = String(status || "").toLowerCase();
      if (s.includes("dispatch") || s.includes("ship")) return "pro-badge--dispatched";
      if (s.includes("receiv") || s.includes("deliver") || s.includes("complet")) {
        return "pro-badge--received";
      }
      return "pro-badge--pending";
    },
    mapOrder(order) {
      return mapOrderFromApi(order);
    },
    // Fetch orders from the API
    async fetchOrders() {
      try {
        const response = await axios.get("orders/list");
        this.orders = response.data.map((order) => this.mapOrder(order));
        this.filteredOrders = this.orders; 
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      }
    },
    // Filter orders based on search input
    filterOrders() {
      const term = this.searchTerm.toLowerCase();
      this.filteredOrders = this.orders.filter(
        (order) =>
          order.productName.toLowerCase().includes(term) ||
          order.category.toLowerCase().includes(term) ||
          order.status.toLowerCase().includes(term)
      );
    },
    // Handle "Order History" button
    async viewOrderHistory() {
      alert("Order History clicked!");
    },
    // Submit new order to the API
    async submitForm() {
      try {
        const { productName, category, orderValue, quantity, unit, buyingPrice, deliveryDate } = this.form;

        if (!productName || !category || !orderValue || !quantity || !unit || !buyingPrice || !deliveryDate) {
          alert("Please fill out all required fields.");
          return;
        }

        if (Number(orderValue) < 0) {
          alert("Order Value cannot be negative.");
          return;
        }
        if (Number(quantity) < 0) {
          alert("Quantity cannot be negative.");
          return;
        }
        if (Number(buyingPrice) < 0) {
          alert("Buying Price cannot be negative.");
          return;
        }

        const currentYear = new Date().getFullYear();
        const deliveryYear = parseInt(deliveryDate.split("-")[0], 10);
        if (deliveryYear < currentYear) {
          alert("Delivery Date cannot be in a past year.");
          return;
        }

        const newOrder = mapOrderToApi(this.form);

        const response = await axios.post("orders/add", newOrder, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const mappedOrder = this.mapOrder(response.data);
        this.orders.push(mappedOrder);
        this.filteredOrders.push(mappedOrder); 
        this.resetForm();
        this.closeModal();
      } catch (error) {
        console.error("Error adding order:", error.response?.data || error.message);
        alert("Failed to add the order. Please check your input.");
      }
    },
    // Delete order from the API with confirmation
    async confirmDelete(orderId) {
      if (window.confirm("Are you sure you want to delete this order?")) {
        try {
          await axios.delete(`orders/delete/${orderId}`);
          this.orders = this.orders.filter((order) => order.id !== orderId);
          this.filteredOrders = this.filteredOrders.filter((order) => order.id !== orderId);
        } catch (error) {
          console.error("Error deleting order:", error.response?.data || error.message);
          alert("Failed to delete the order.");
        }
      }
    },
    resetForm() {
      this.form = {
        productName: "",
        category: "",
        orderValue: 0,
        quantity: 0,
        unit: "",
        buyingPrice: 0,
        deliveryDate: "",
        status: "Pending",
        notify: false,
      };
    },
    closeModal() {
      this.resetForm();
      this.showModal = false;
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
}

.modal {
background: #fff;
border-radius: 8px;
width: 500px;
max-width: 90%;
padding: 20px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
position: relative;
}

.modal-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
}

.modal-header h2 {
font-size: 18px;
font-weight: bold;
margin: 0;
font-family: 'Roboto', sans-serif;
}

.close-btn {
background: none;
border: none;
font-size: 20px;
cursor: pointer;
}

/* Form Styles */
.modal-body {
display: flex;
flex-direction: column;
gap: 15px;
}

.form-group {
display: flex;
align-items: center;
gap: 15px;
}

.form-group label {
flex: 0 0 120px; 
text-align: right;
font-size: 14px;
font-weight: bold;
color: #555;
font-family: 'Roboto', sans-serif;
}

.form-group input,
.form-group select {
flex: 1; 
padding: 10px;
font-size: 14px;
border: 1px solid #ddd;
border-radius: 5px;
}

.form-group input[type="checkbox"] {
flex: 0;
margin-right: 10px;
}

.modal-footer {
display: flex;
justify-content: flex-end;
gap: 10px;
margin-top: 20px;
}

.discard-btn,
.add-btn {
padding: 10px 15px;
border-radius: 5px;
border: none;
cursor: pointer;
font-size: 14px;
font-family: 'Roboto', sans-serif;
}

.discard-btn {
background: #f5f5f5;
color: #555;
}

.add-btn {
background: #007bff;
color: #fff;
}

.add-btn:hover {
background-color: #0056b3;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.history-btn {
  background-color: #f8f9fa;
  color: #555;
  border: 1px solid #ccc;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.history-btn:hover {
  border-color: #888;
  color: #333;
}
</style>