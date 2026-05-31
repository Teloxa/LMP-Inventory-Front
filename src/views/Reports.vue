<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-layout">
    <SideBar />
    <div class="main-content">
      <header class="app-topbar">
        <div class="app-topbar-search">
          <input
            type="text"
            class="input-buscador"
            placeholder="Search reports…"
            disabled
            aria-label="Search"
          />
        </div>
        <div class="app-topbar-actions">
          <Userbar />
        </div>
      </header>

      <div class="page-body">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Reports</h1>
            <p class="page-subtitle">Analytics and performance insights</p>
          </div>
        </div>
        <DashboardAnalytics />
      </div>
    </div>
  </div>
</template>

<script>
import Userbar from "@/components/Userbar.vue";
import SideBar from "@/components/SideBar.vue";
import DashboardAnalytics from "@/components/DashboardAnalytics.vue";

export default {
  components: {
    Userbar,
    SideBar,
    DashboardAnalytics,
  },
};
</script>
