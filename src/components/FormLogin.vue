<template>
  <main class="login-container">
    <section class="content-wrapper" aria-label="Login access panel">
      <header class="brand-panel">
        <div class="brand-mark" aria-hidden="true">
          <span class="brand-mark__device"></span>
        </div>
        <h1 class="app-title">InventoryPro</h1>
        <p class="brand-copy">ENTERPRISE LOGISTICS GATEWAY</p>
      </header>

      <section class="login-form-container" aria-labelledby="login-title">
        <div class="card-accent" aria-hidden="true"></div>
        <div class="card-header">
          <h2 id="login-title">System Access</h2>
          <p>Authenticated sessions only. Please provide credentials.</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">User</label>
            <div class="input-shell">
              <span class="input-icon" aria-hidden="true"></span>
              <input
                id="username"
                v-model="form.username"
                autocomplete="username"
                placeholder="username"
                required
                type="text"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-shell">
              <span class="input-icon " aria-hidden="true"></span>
              <input
                id="password"
                v-model="form.password"
                autocomplete="current-password"
                placeholder="••••••••••••"
                required
                type="password"
              />
            </div>
          </div>

          <div class="form-options">
            <label class="remember-option">
              <input type="checkbox" />
              <span>Remember device</span>
            </label>
            <a class="forgot-password" href="#">FORGOT TOKEN?</a>
          </div>

          <button type="submit" class="btn-primary">
            LOGIN 
            <span class="button-icon" aria-hidden="true">⇥</span>
          </button>

          <p class="signup-text">
            New warehouse operator?
            <router-link to="/signup" class="signup-link">Sign Up</router-link>
          </p>
        </form>

        <p v-if="errorMessage" class="error-message" aria-live="polite">
          {{ errorMessage }}
        </p>
      </section>
    </section>
  </main>
</template>
  
<script>
import axios from "axios";
  
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("user/login", {
          username: this.form.username,
          password: this.form.password,
        });
        
        const { token } = response.data;
        const username = response.data.user.usuario || response.data.user.user || response.data.user.username;
        const id = response.data.user.id;
        
        localStorage.setItem("token", token);
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem("id", JSON.stringify(id));
        
        this.$router.push("/dashboard"); 
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = "An unexpected error occurred.";
        }
      }
    }, 
  },
};
</script>
  
<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 24px;
  background-color: #fbf9f7;
  background-image: linear-gradient(rgba(177, 170, 164, 0.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(177, 170, 164, 0.22) 1px, transparent 1px);
  background-size: 40px 40px;
  color: #111827;
}

.content-wrapper {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.brand-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  margin-bottom: 4px;
}

.brand-mark {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  background: #111111;
  color: #ffffff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.08);
}

.brand-mark__symbol {
  display: none;
}

.brand-mark__device {
  position: relative;
  width: 18px;
  height: 18px;
}

.brand-mark__device::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid #ffffff;
  border-top-width: 5px;
  border-radius: 2px;
}

.brand-mark__device::after {
  content: "";
  position: absolute;
  left: 3px;
  right: 3px;
  top: 6px;
  height: 2px;
  background: #ffffff;
  box-shadow: 0 5px 0 #ffffff;
}

.app-title {
  margin: 0;
  font-size: 2.2rem;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #111111;
}

.brand-copy {
  margin: 0;
  color: #52606d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.login-form-container {
  position: relative;
  width: 100%;
  max-width: 460px;
  overflow: hidden;
  border: 1px solid #c7ced7;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0 10px 24px rgba(17, 24, 39, 0.06);
  padding: 30px 32px 28px;
}

.card-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  border-top: 4px solid #111111;
  border-right: 4px solid #111111;
  transform: translate(8px, 8px) rotate(45deg);
  pointer-events: none;
}

.card-header {
  position: relative;
  z-index: 1;
  margin-bottom: 24px;
}

h2 {
  margin: 0 0 6px;
  font-size: 1.45rem;
  line-height: 1.2;
  font-weight: 700;
  color: #111111;
}

p {
  margin: 0;
  font-size: 0.98rem;
  color: #334155;
  line-height: 1.45;
}

.login-form {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111111;
}

.input-shell {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1.2rem;
  pointer-events: none;
  z-index: 1;
}

.input-icon--lock {
  width: 12px;
  height: 12px;
}

.input-icon--lock::before {
  content: "";
  position: absolute;
  left: 1px;
  top: 5px;
  width: 10px;
  height: 7px;
  border: 2px solid #6b7280;
  border-radius: 2px;
}

.input-icon--lock::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 0;
  width: 6px;
  height: 6px;
  border: 2px solid #6b7280;
  border-bottom: 0;
  border-radius: 6px 6px 0 0;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #bfc6cf;
  border-radius: 0;
  background-color: #ffffff;
  color: #111827;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-shell input {
  padding-left: 42px;
}

input::placeholder {
  color: #a8b0ba;
}

input:focus {
  outline: none;
  border-color: #111111;
  box-shadow: 0 0 0 1px #111111;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 6px 0 20px;
  font-size: 0.84rem;
}

.remember-option {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: #334155;
  font-size: 0.95rem;
  letter-spacing: 0;
  text-transform: none;
  font-weight: 400;
}

.remember-option input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #111111;
}

.forgot-password {
  color: #111111;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.btn-primary {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 16px;
  border: none;
  border-radius: 0;
  background: #111111;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0;
  box-shadow: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

.button-icon {
  font-size: 1rem;
  line-height: 1;
}

.signup-text {
  margin-top: 26px;
  padding-top: 16px;
  border-top: 1px solid #d7dce2;
  text-align: center;
  color: #334155;
  font-size: 0.95rem;
}

.signup-link {
  color: #111111;
  font-weight: 700;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.error-message {
  margin-top: 16px;
  color: #b42318;
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
    gap: 14px;
  }

  .login-form-container {
    max-width: 100%;
  }
}

@media (max-width: 540px) {
  .login-container {
    padding: 16px;
  }

  .login-form-container {
    padding: 24px 18px 22px;
  }

  .brand-mark {
    width: 48px;
    height: 48px;
  }

  .app-title {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.35rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .forgot-password {
    align-self: flex-end;
  }
}
</style>