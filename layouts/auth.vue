<template>
  <section>
    <nuxt />
    <Footer />
  </section>
</template>

<script>
export default {
  components: {
    Footer: () => import("@/components/Footer")
  },
  middleware: "guest"
};
</script>