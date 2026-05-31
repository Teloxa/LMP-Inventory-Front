<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="userbar-root">
    <div class="user-bar">
      <button type="button" class="icon-btn" aria-label="Notifications">
        <span class="bell-dot" aria-hidden="true"></span>
        🔔
      </button>
      <div class="user-profile">
        <div class="user-text">
          <span class="user-role">{{ username || "Admin" }}</span>
          <!-- <button type="button" class="logout-link" @click="logout">
            Logout
          </button> -->
        </div>
        <button
          type="button"
          class="avatar-btn"
          aria-label="User settings"
          @click="openUserDialog"
        >
          {{ userInitial }}
        </button>
      </div>
    </div>

    <!-- Diálogo de usuario -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>User Information</h3>
        <form @submit.prevent="updateUser">
          <!-- Show the current image if it exists -->
          <div v-if="editableUser.user.photoProfile">
            <label>Current profile photo:</label>
            <img :src="getFullImageUrl(editableUser.user.photoProfile)" alt="Profile image" class="profile-image-preview" />
          </div>
          <div>
            <label for="profileImage">Change profile photo:</label>
            <input type="file" id="profileImage" @change="onFileChange" />
          </div>
          <div>
            <label for="firstName">First name:</label>
            <input type="text" id="firstName" v-model="editableUser.user.name" />
          </div>
          <div>
            <label for="lastName">Last name:</label>
            <input type="text" id="lastName" v-model="editableUser.user.lastName" />
          </div>
          <div>
            <label for="secondLastName">Second last name:</label>
            <input type="text" id="secondLastName" v-model="editableUser.user.middleName" />
          </div>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="editableUser.user.user" />
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="editableUser.user.email" />
          </div>
          <div class="button-group">
            <button type="submit">Save changes</button>
            <button type="button" @click="closeUserDialog">Close</button>
            <!-- <button type="button" @click="deleteUser" class="delete-btn">
              Delete user
            </button> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showDialog: false,
      username: "",
      editableUser: {},
      profileImage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  computed: {
    userInitial() {
      const name = this.username || "A";
      return name.charAt(0).toUpperCase();
    },
  },
  created() {
    const storedUsername = localStorage.getItem("username");
    this.username = storedUsername ? storedUsername.replace(/^"|"$/g, '') : "";
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    onFileChange(event) {
      this.profileImage = event.target.files[0];
    },
    async openUserDialog() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id").replace(/^"|"$/g, '');
        
        const response = await axios.get(`user/getbyId/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const userData = response.data.usuario || response.data.user || response.data;
        this.editableUser = {
          user: {
            name: userData.name || userData.nombre || "",
            lastName: userData.lastName || userData.apellido_pat || "",
            middleName: userData.middleName || userData.apellido_mat || "",
            user: userData.user || userData.usuario || "",
            email: userData.email || "",
            photoProfile: userData.photoProfile || userData.profileImage || "",
          },
        };
        this.showDialog = true;
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Unable to load user data");
      }
    },
    closeUserDialog() {
      this.showDialog = false;
    },
    getFullImageUrl(imagePath) {
      return `${this.backendUrl}${imagePath}`;
    },
    async updateUser() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id").replace(/^"|"$/g, '');
        
        const formData = new FormData();
        formData.append('name', this.editableUser.user.name);
        formData.append('lastName', this.editableUser.user.lastName);
        formData.append('middleName', this.editableUser.user.middleName);
        formData.append('email', this.editableUser.user.email);
        formData.append('user', this.editableUser.user.user);
        
        if (this.profileImage) {
          formData.append('profileImage', this.profileImage);
        }

        await axios.put(`user/update/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Information updated successfully');
        this.closeUserDialog();
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Unable to update the information");
      }
    },
    async deleteUser() {
      if (confirm("Are you sure you want to delete your user account?")) {
        try {
          const userId = localStorage.getItem("id").replace(/^"|"$/g, '');
          const token = localStorage.getItem("token");
          await axios.delete(`user/delete/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          localStorage.clear();
          this.$router.push("/signup");
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Unable to delete the user");
        }
      }
    },
  },
};
</script>
  
<style scoped>
.userbar-root {
  display: contents;
}

.user-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid var(--pro-border);
  border-radius: var(--pro-radius);
  background: #fafafa;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bell-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 7px;
  height: 7px;
  background: var(--pro-danger);
  border-radius: 50%;
  border: 2px solid #fafafa;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 12px;
  border-left: 1px solid var(--pro-border);
}

.user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.user-role {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--pro-text);
}

.logout-link {
  font-size: 0.75rem;
  color: var(--pro-text-muted);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
}

.logout-link:hover {
  color: var(--pro-danger);
}

.avatar-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--pro-border);
  background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--pro-text);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.avatar-btn:hover {
  border-color: #9ca3af;
}

.dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 16px;
}

.dialog {
  background: white;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  animation: dialogFadeIn 0.25s ease-out;
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dialog h3 {
  margin: 0 0 20px;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.dialog form > div {
  margin-bottom: 16px;
}

.dialog label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--pro-text-secondary);
}

.dialog input[type="text"],
.dialog input[type="email"] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid var(--pro-border);
  border-radius: 8px;
  font-size: 14px;
}

.dialog input:focus {
  outline: none;
  border-color: #9ca3af;
}

.profile-image-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto 12px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}

.dialog button {
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.dialog button[type="submit"] {
  background: var(--pro-accent);
  color: white;
}

.dialog button[type="button"]:not(.delete-btn) {
  background: #f3f4f6;
  color: #374151;
}

.delete-btn {
  background: var(--pro-danger) !important;
  color: white !important;
}
</style>