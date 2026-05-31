<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-layout stores-page">
    <!-- Barra lateral -->
    <SideBar />

    <!-- Contenido principal -->
    <div class="main-content">
      <header class="app-topbar">
        <div class="app-topbar-search buscador">
          <input
            type="text"
            placeholder="Search stores…"
            class="input-buscador"
            v-model="searchTerm"
          />
        </div>
        <div class="app-topbar-actions">
          <Userbar />
        </div>
      </header>

      <div class="page-body">
      <div class="store-management">
        <div class="page-header-row store-page-header">
          <div>
            <h1 class="page-title">Manage Store</h1>
            <p class="page-subtitle">Warehouse and retail locations</p>
          </div>
          <button type="button" class="pro-btn-primary" @click="toggleAddStoreDialog">
            + Add Store
          </button>
        </div>

        <div class="stores-container">
          <div
            v-for="store in filteredStores"
            :key="store.id"
            class="store-card"
          >
            <div class="store-image">
              <div class="placeholder-image"></div>
            </div>

            <div class="store-details">
              <h3 class="store-title">{{ store.name }}</h3>
              <div class="store-info">
                <p><span class="info-label">Manager</span> {{ store.manager }}</p>
                <p>
                  <span class="info-label">City</span>
                  {{ store.city }} — {{ store.municipality }}
                </p>
                <p><span class="info-label">Address</span> {{ store.address }}</p>
                <p><span class="info-label">Phone</span> {{ store.phoneNumber }}</p>
              </div>
            </div>

            <div class="store-actions">
              <button class="edit-btn" @click="editStore(store)">Edit</button>
              <button class="delete-btn" @click="deleteStore(store.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Modal para agregar nueva tienda -->
    <div v-if="showAddStoreDialog" class="modal-overlay">
      <div class="modal">
        <h2>Add New Store</h2>
        <form @submit.prevent="submitNewStore">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newStore.name" required />
          </div>
          <div>
            <label for="phoneNumber">Number:</label>
            <input type="text" id="phoneNumber" v-model="newStore.phoneNumber" required />
          </div>
          <div>
            <label for="city">City:</label>
            <input type="text" id="city" v-model="newStore.city" required />
          </div>
          <div>
            <label for="municipality">Municipality:</label>
            <input type="text" id="municipality" v-model="newStore.municipality" required />
          </div>
          <div>
            <label for="address">Address:</label>
            <input type="text" id="address" v-model="newStore.address" required />
          </div>
          <div>
            <label for="manager">Manager:</label>
            <input type="text" id="manager" v-model="newStore.manager" required />
          </div>
          <div class="modal-actions">
            <button type="submit">Add Store</button>
            <button type="button" @click="toggleAddStoreDialog">Cancel</button>
          </div>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </div>
    </div>

    <!-- Modal para editar tienda -->
    <div v-if="showEditStoreDialog" class="modal-overlay">
      <div class="modal">
        <h2>Edit Store</h2>
        <form @submit.prevent="submitEditStore">
          <div>
            <label for="edit-name">Name:</label>
            <input type="text" id="edit-name" v-model="editStoreData.name" required />
          </div>
          <div>
            <label for="edit-phoneNumber">Number:</label>
            <input type="text" id="edit-phoneNumber" v-model="editStoreData.phoneNumber" required />
          </div>
          <div>
            <label for="edit-city">City:</label>
            <input type="text" id="edit-city" v-model="editStoreData.city" required />
          </div>
          <div>
            <label for="edit-municipality">Municipality:</label>
            <input type="text" id="edit-municipality" v-model="editStoreData.municipality" required />
          </div>
          <div>
            <label for="edit-address">Address:</label>
            <input type="text" id="edit-address" v-model="editStoreData.address" required />
          </div>
          <div>
            <label for="edit-manager">Manager:</label>
            <input type="text" id="edit-manager" v-model="editStoreData.manager" required />
          </div>
          <div class="modal-actions">
            <button type="submit">Save Changes</button>
            <button type="button" @click="toggleEditStoreDialog">Cancel</button>
          </div>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SideBar from "../components/SideBar.vue";
import Userbar from "@/components/Userbar.vue";
import { mapStoreFromApi, mapStoreToApi } from "@/utils/apiMappers";

export default {
  components: {
    Userbar,
    SideBar,
  },
  data() {
    return {
      stores: [],
      showAddStoreDialog: false,
      showEditStoreDialog: false,
      searchTerm: "",
      newStore: {
        name: "",
        phoneNumber: "",
        city: "",
        municipality: "",
        address: "",
        manager: "",
      },
      editStoreData: null,
      errorMessage: "",
      successMessage: "",
    };
  },
  computed: {
    filteredStores() {
      const search = this.searchTerm.toLowerCase();

      return this.stores.filter((store) =>
        Object.values(store).some((value) =>
          String(value).toLowerCase().includes(search)
        )
      );
    },
  },
  methods: {
    async fetchStores() {
      try {
        const response = await axios.get("shops/list");
        this.stores = response.data.map((store) => mapStoreFromApi(store));
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    },
    toggleAddStoreDialog() {
      this.showAddStoreDialog = !this.showAddStoreDialog;
      this.errorMessage = "";
      this.successMessage = "";
    },
    toggleEditStoreDialog() {
      this.showEditStoreDialog = !this.showEditStoreDialog;
      this.errorMessage = "";
      this.successMessage = "";
    },
    editStore(store) {
      this.editStoreData = { ...store };
      this.showEditStoreDialog = true;
    },
    async submitEditStore() {
      try {
        const payload = mapStoreToApi(this.editStoreData);
        const response = await axios.put(`shops/update/${this.editStoreData.id}`, payload);
        const index = this.stores.findIndex((store) => store.id === this.editStoreData.id);
        if (index !== -1) {
          this.stores[index] = mapStoreFromApi(response.data);
        }
        this.successMessage = "Store updated successfully.";
        this.errorMessage = "";
        this.toggleEditStoreDialog();
      } catch (error) {
        if (error.response && error.response.data) {
            this.errorMessage = error.response.data.error;
          } else {
            this.errorMessage = "An unexpected error occurred.";
          }
          this.successMessage = "";
      }
    },
    async submitNewStore() {
      try {
        const payload = mapStoreToApi(this.newStore);
        const response = await axios.post("shops/add", payload);
        this.stores.push(mapStoreFromApi(response.data));
        this.toggleAddStoreDialog();
        this.newStore = {
          name: "",
          phoneNumber: "",
          city: "",
          municipality: "",
          address: "",
          manager: "",
        };
        this.successMessage = "Store created successfully.";
        this.errorMessage = "";
      } catch (error) {
        if (error.response && error.response.data) {
            this.errorMessage = error.response.data.error;
          } else {
            this.errorMessage = "An unexpected error occurred.";
          }
          this.successMessage = "";
      }
    },
    async deleteStore(storeId) {
      const confirmation = confirm("Are you sure you want to delete this store?");
      if (!confirmation) return;

      try {
        await axios.delete(`shops/delete/${storeId}`);
        this.stores = this.stores.filter((store) => store.id !== storeId);
      } catch (error) {
        console.error("Error deleting store:", error.response?.data || error.message);
        alert("There was an error trying to delete the store.");
      }
    },
  },
  mounted() {
    this.fetchStores();
  },
};
</script>

<style scoped>
/* Uses shared .page-layout from page-layout.css — no fixed width / margin overrides */

.store-management {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.store-page-header {
  margin-bottom: 20px;
}

.stores-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  padding-bottom: 32px;
}

.store-card {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr) auto;
  gap: 20px;
  align-items: start;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: var(--pro-surface);
  border: 1px solid var(--pro-border);
  border-radius: var(--pro-radius-lg);
  padding: 20px;
}

.store-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 10px;
}

.store-details {
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.store-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 12px;
  line-height: 1.3;
}

.store-info p {
  color: #475569;
  margin: 0 0 8px;
  font-size: 0.875rem;
  line-height: 1.5;
}

.store-info p:last-child {
  margin-bottom: 0;
}

.info-label {
  display: inline-block;
  min-width: 4.5rem;
  font-weight: 600;
  color: #64748b;
}

.store-actions {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 8px;
  align-items: stretch;
}

.edit-btn,
.delete-btn {
  padding: 8px 14px;
  font-size: 0.875rem;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.edit-btn {
  background-color: var(--pro-accent);
}

.edit-btn:hover {
  background-color: var(--pro-accent-hover);
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  margin-top: 10px;
}

.success-message {
  color: #16a34a;
  font-size: 14px;
  margin-top: 10px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 16px;
  box-sizing: border-box;
}

.modal {
  background: white;
  padding: 28px;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
}

.modal h2 {
  margin: 0 0 20px;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal form > div {
  margin-bottom: 14px;
}

.modal label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  color: #1a202c;
}

.modal input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}

.modal-actions button[type="submit"] {
  background-color: #0066ff;
  color: white;
  border: none;
}

.modal-actions button[type="button"] {
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

@media (max-width: 900px) {
  .store-card {
    grid-template-columns: 80px minmax(0, 1fr);
    grid-template-rows: auto auto;
  }

  .store-actions {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: flex-end;
  }

  .store-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 640px) {
  .store-card {
    grid-template-columns: 1fr;
  }

  .store-image {
    width: 100%;
    height: 120px;
    max-width: 200px;
  }

  .store-actions {
    flex-direction: row;
    width: 100%;
  }

  .edit-btn,
  .delete-btn {
    flex: 1;
  }
}
</style>