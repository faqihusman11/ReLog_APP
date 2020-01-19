<template>
  <section>
    <Navbar />
    <nuxt />
    <Footer />
  </section>
</template>

<script>
export default {
  components: {
    Navbar: () => import("@/components/Navbar"),
    Footer: () => import("@/components/Footer")
  },
  middleware: "auth"
};
</script>