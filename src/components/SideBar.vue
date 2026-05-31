<template>

  <aside class="sidebar">

    <div class="sidebar-brand">

      <span class="logo-text">InventoryPro</span>

      <span class="logo-sub">Inventory Console</span>

    </div>



    <nav class="sidebar-nav">

      <ul>

        <li>

          <router-link to="/dashboard">

            <span class="nav-icon" aria-hidden="true">▣</span>

            Dashboard

          </router-link>

        </li>

        <li>

          <router-link to="/inventory">

            <span class="nav-icon" aria-hidden="true">▤</span>

            Inventory

          </router-link>

        </li>

        <li>

          <router-link to="/reports">

            <span class="nav-icon" aria-hidden="true">◫</span>

            Reports

          </router-link>

        </li>

        <li>

          <router-link to="/suppliers">

            <span class="nav-icon" aria-hidden="true">◇</span>

            Suppliers

          </router-link>

        </li>

        <li>

          <router-link to="/orders">

            <span class="nav-icon" aria-hidden="true">☰</span>

            Orders

          </router-link>

        </li>

        <li>

          <router-link to="/stores">

            <span class="nav-icon" aria-hidden="true">⌂</span>

            Manage Store

          </router-link>

        </li>

      </ul>

    </nav>



    <div class="sidebar-footer">

      <button type="button" class="logout-btn" @click="logout">

        <span class="nav-icon" aria-hidden="true">↪</span>

        Log Out

      </button>

    </div>

  </aside>

</template>



<script>

export default {

  name: "SideBar",

  methods: {

    logout() {

      localStorage.clear();

      this.$router.push("/");

    },

  },

};

</script>



<style scoped>

.sidebar {

  width: var(--pro-sidebar-width);

  height: 100vh;

  background: var(--pro-sidebar-bg);

  border-right: 1px solid var(--pro-border);

  padding: 20px 12px;

  position: fixed;

  top: 0;

  left: 0;

  z-index: 100;

  display: flex;

  flex-direction: column;

  box-sizing: border-box;

}



.sidebar-brand {

  padding: 8px 12px 24px;

  border-bottom: 1px solid var(--pro-border);

  margin-bottom: 16px;

}



.logo-text {

  display: block;

  font-size: 1.25rem;

  font-weight: 700;

  color: var(--pro-text);

  letter-spacing: -0.03em;

}



.logo-sub {

  display: block;

  font-size: 0.6875rem;

  font-weight: 500;

  color: var(--pro-text-muted);

  margin-top: 4px;

  letter-spacing: 0.02em;

}



.sidebar-nav {

  flex: 1;

  overflow-y: auto;

}



.sidebar-nav ul {

  list-style: none;

  padding: 0;

  margin: 0;

}



.sidebar-nav li {

  margin: 2px 0;

}



.sidebar-nav a {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 11px 14px;

  text-decoration: none;

  color: var(--pro-text-secondary);

  font-size: 0.875rem;

  font-weight: 500;

  border-radius: var(--pro-radius);

  transition: background 0.15s ease, color 0.15s ease;

}



.nav-icon {

  width: 18px;

  text-align: center;

  font-size: 0.875rem;

  opacity: 0.85;

}



.sidebar-nav a:hover {

  background: #f3f4f6;

  color: var(--pro-text);

}



.sidebar-nav a.router-link-active {

  background: var(--pro-sidebar-active);

  color: var(--pro-sidebar-active-text);

}



.sidebar-nav a.router-link-active .nav-icon {

  opacity: 1;

}



.sidebar-footer {

  padding-top: 12px;

  border-top: 1px solid var(--pro-border);

}



.logout-btn {

  width: 100%;

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 11px 14px;

  border: none;

  background: none;

  color: var(--pro-text-secondary);

  font-size: 0.875rem;

  font-weight: 500;

  cursor: pointer;

  border-radius: var(--pro-radius);

  transition: background 0.15s ease, color 0.15s ease;

}



.logout-btn:hover {

  background: #fef2f2;

  color: var(--pro-danger);

}

</style>

