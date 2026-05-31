<template>
  <main class="signup-page">
    <div class="signup-container">
      <!-- Left side panel: brand & image banner -->
      <section class="brand-panel">
        <div class="brand-content">
          <h1 class="app-title">InventoryPro</h1>
          <p class="brand-description">
            Precision logistics and enterprise-grade inventory intelligence. Designed for high-stakes industrial operations where every unit counts.
          </p>
          <div class="brand-badges">
            <div class="badge-item">
              <span class="material-symbols-outlined font-icon">verified</span>
              <span class="badge-text">ISO 27001 Certified</span>
            </div>
            <div class="badge-item">
              <span class="material-symbols-outlined font-icon">security</span>
              <span class="badge-text">Encrypted Data Sourcing</span>
            </div>
          </div>
        </div>
        <img
          class="brand-bg-image"
          alt="Industrial warehouse interior"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsEeiCwrbaRpMSPk5nKyte42EYoywsGNPQaLXYexvKOh-HqQVXCM0GS9pIachyOCXFhvB4bicQDxavjVKCT6hxAG1Hzb2GZH4GbSp0_v9r5AJU8o64cvcUS_koi11FKd8v3fmXSUPAm9wTxx_TiPwiGeLS2JTE4o7J_TKG-Qf9iDzPQJR-I5X64zP9sn0PhzzMRLcfLSjHhybCcL1fEqYrUwFnL8VE-p-5YKjXS_uCu223yY_dEhEzcwmO18Nh4EI0Z-Z2Vwve"
        />
        <div class="brand-overlay"></div>
      </section>

      <!-- Right side panel: the form -->
      <section class="form-panel">
        <div class="form-wrapper">
          <header class="form-header">
            <h2 class="form-title">Create Enterprise Account</h2>
            <p class="form-subtitle">Register your organization to begin managing industrial inventory with precision.</p>
          </header>

          <form @submit.prevent="handleSignup" class="signup-form">
            <!-- Alert messages -->
            <div v-if="errorMessage" class="alert-message error-alert">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert-message success-alert">
              {{ successMessage }}
            </div>

            <div class="fields-grid">
              <!-- First Name -->
              <div class="form-group">
                <label for="firstName">First Name</label>
                <div class="input-container">
                  <span class="material-symbols-outlined field-icon">person</span>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    placeholder="David"
                    required
                    autocomplete="given-name"
                  />
                </div>
              </div>

              <!-- Last Name -->
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <div class="input-container">
                  <span class="material-symbols-outlined field-icon">person</span>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    placeholder="Morales"
                    required
                    autocomplete="family-name"
                  />
                </div>
              </div>

              <!-- Middle Name -->
              <div class="form-group">
                <label for="maternalLastName">Middle Name</label>
                <div class="input-container">
                  <span class="material-symbols-outlined field-icon">person</span>
                  <input
                    id="maternalLastName"
                    v-model="form.maternalLastName"
                    type="text"
                    placeholder="Teloxa"
                    required
                    autocomplete="additional-name"
                  />
                </div>
              </div>

              <!-- Username -->
              <div class="form-group">
                <label for="username">Username</label>
                <div class="input-container">
                  <span class="material-symbols-outlined field-icon">badge</span>
                  <input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="d.morales"
                    required
                    autocomplete="username"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email">Work Email</label>
                <div class="input-container">
                  <span class="material-symbols-outlined field-icon">mail</span>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="d.morales@company.com"
                    required
                    autocomplete="email"
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="form-group password-group">
                <label for="password">Password</label>
                <div class="input-container">
                  <span class="material-symbols-outlined field-icon">lock</span>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="••••••••••••"
                    required
                    autocomplete="new-password"
                  />
                </div>
                <p class="field-hint">Must contain at least 12 characters and one technical symbol.</p>
              </div>
            </div>

            <!-- Terms -->
            <div class="terms-container">
              <input id="terms" type="checkbox" required class="terms-checkbox" />
              <label for="terms" class="terms-label">
                I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" class="submit-button">
              Complete Registration
            </button>
          </form>

          <footer class="form-footer">
            <p class="footer-text">Already have an account?</p>
            <router-link to="/" class="login-button">
              Log In with your account 
            </router-link>
          </footer>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        maternalLastName: "",
        username: "",
        email: "",
        password: "",
      },
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        const payload = {
          name: this.form.firstName,
          lastName: this.form.lastName,
          middleName: this.form.maternalLastName,
          user: this.form.username,
          email: this.form.email,
          password: this.form.password,
        };

        const response = await axios.post("user/add", payload);

        this.successMessage = "User registered successfully.";
        this.errorMessage = "";
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = "An unexpected error occurred.";
        }
        this.successMessage = "";
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400;500&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

/* Style for Material Symbols Outlined */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.signup-page {
  /* Color Palette matching tailwind config */
  --surface-bright: #fcf8f8;
  --surface-container-lowest: #ffffff;
  --outline-variant: #c5c6ca;
  --primary: #101519;
  --on-primary: #ffffff;
  --on-primary-container: #8b9096;
  --on-primary-fixed-variant: #42474d;
  --secondary: #565f69;
  --outline: #75777b;
  --on-surface-variant: #44474a;
  --surface-container: #f0eded;
  --error: #ba1a1a;
  --error-container: #ffdad6;
  --on-error-container: #93000a;
  --success: #067647;
  --success-container: #edfcf2;

  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: var(--surface-bright);
  font-family: 'Inter', sans-serif;
  color: #1c1b1c;
  box-sizing: border-box;
}

.signup-page * {
  box-sizing: border-box;
}

.signup-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  background-color: var(--surface-container-lowest);
  border: 1px solid var(--outline-variant);
  overflow: hidden;
}

/* Left Panel - Brand Banner */
.brand-panel {
  display: flex;
  width: 50%;
  position: relative;
  min-height: 600px;
  background-color: var(--primary);
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.brand-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--on-primary);
}

.app-title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--on-primary);
}

.brand-description {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: var(--on-primary-container);
  max-width: 448px;
  margin: 0;
}

.brand-badges {
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--on-primary-fixed-variant);
}

.font-icon {
  font-size: 18px !important;
}

.badge-text {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-transform: uppercase;
}

.brand-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.40;
  filter: grayscale(100%);
  mix-blend-mode: overlay;
}

.brand-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, var(--primary), transparent, transparent);
  opacity: 0.80;
}

/* Right Panel - Form */
.form-panel {
  width: 50%;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-wrapper {
  max-width: 448px;
  width: 100%;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 40px;
}

.form-title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--primary);
  margin: 0 0 8px 0;
}

.form-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: var(--on-surface-variant);
  margin: 0;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Fields Grid for multi-column inputs */
.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Password stretches full width */
.password-group {
  grid-column: span 2;
}

.form-group label {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: var(--secondary);
  text-transform: uppercase;
}

.input-container {
  position: relative;
}

.input-container .field-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--outline);
  transition: color 0.2s;
  pointer-events: none;
}

.input-container:focus-within .field-icon {
  color: var(--primary);
}

.input-container input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  background-color: #ffffff;
  border: 1px solid var(--outline-variant);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: #1c1b1c;
  outline: none;
  transition: all 0.2s;
}

.input-container input:focus {
  border-color: var(--primary);
}

.field-hint {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  line-height: 1.4;
  color: var(--on-surface-variant);
  font-style: italic;
  margin: 0;
}

.terms-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.terms-checkbox {
  width: 16px;
  height: 16px;
  border-radius: 0;
  border: 1px solid var(--outline-variant);
  accent-color: var(--primary);
  cursor: pointer;
}

.terms-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--on-surface-variant);
  cursor: pointer;
}

.terms-link {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.submit-button {
  width: 100%;
  background-color: var(--primary);
  color: var(--on-primary);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-transform: uppercase;
  padding: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.15em;
}

.submit-button:hover {
  background-color: var(--on-surface);
}

.submit-button:active {
  transform: scale(0.98);
}

.form-footer {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--outline-variant);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.footer-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--on-surface-variant);
  margin: 0;
}

.login-button {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--primary);
  border: 1px solid var(--outline-variant);
  padding: 8px 12px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--surface-container);
}

/* Alert messages style */
.alert-message {
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 20px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.error-alert {
  background-color: var(--error-container);
  color: var(--on-error-container);
  border: 1px solid var(--error);
}

.success-alert {
  background-color: var(--success-container);
  color: var(--success);
  border: 1px solid var(--success);
}

/* Responsive adjustments */
@media (max-width: 980px) {
  .signup-container {
    flex-direction: column;
    max-width: 600px;
  }

  .brand-panel,
  .form-panel {
    width: 100%;
  }

  .brand-panel {
    min-height: 300px;
    padding: 32px;
  }

  .form-panel {
    padding: 32px;
  }
}

@media (max-width: 640px) {
  .signup-page {
    padding: 16px;
  }

  .fields-grid {
    grid-template-columns: 1fr;
  }

  .password-group {
    grid-column: span 1;
  }
}
</style>