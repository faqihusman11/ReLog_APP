<template>
  <section>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <a class="navbar-brand" href="/">
        <v-icon name="home" class="text-white" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">My Profile</a>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" @click="logout">
          <nuxt-link to="/login" class="nav-link">Logout</nuxt-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>