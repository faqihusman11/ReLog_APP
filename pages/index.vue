<template>
  <section>
    <div class="container">
      <div class="card rounded my-3">
        <div class="card-header bg-dark border shadow-sm">
          <h3 class="font-weight-bold text-white">
            <v-icon name="user" scale="1.8" class="mr-4" />Employee Profile
          </h3>
        </div>
        <div class="card-body border shadow-sm p-4">
          <div class="row no-gutters my-2">
            <div class="col-3">
              <h5 class="card-title font-weight-bold">First Name</h5>
            </div>
            <div class="col-9">
              <h6 class="card-text">{{ firstName }}</h6>
            </div>
          </div>
          <div class="row no-gutters my-2">
            <div class="col-3">
              <h5 class="card-title font-weight-bold">Last Name</h5>
            </div>
            <div class="col-9">
              <h6 class="card-text">{{ lastName }}</h6>
            </div>
          </div>
          <div class="row no-gutters my-2">
            <div class="col-3">
              <h5 class="card-title font-weight-bold">Birth of Date</h5>
            </div>
            <div class="col-9">
              <h6 class="card-text">{{ formatDate(dateOfBirth) }}</h6>
            </div>
          </div>
          <div class="row no-gutters my-2">
            <div class="col-3">
              <h5 class="card-title font-weight-bold">Gender</h5>
            </div>
            <div class="col-9">
              <h6 class="card-text">{{ gender }}</h6>
            </div>
          </div>
          <div class="row no-gutters my-2">
            <div class="col-3">
              <h5 class="card-title font-weight-bold">Email</h5>
            </div>
            <div class="col-9">
              <h6 class="card-text">{{ email }}</h6>
            </div>
          </div>
          <div class="row no-gutters my-2">
            <div class="col-3">
              <h5 class="card-title font-weight-bold">Phone Number</h5>
            </div>
            <div class="col-9">
              <h6 class="card-text">{{ phone }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      firstName: this.$auth.user.first_name,
      lastName: this.$auth.user.last_name,
      dateOfBirth: this.$auth.user.date_of_birth,
      gender: this.$auth.user.gender,
      email: this.$auth.user.email,
      phone: this.$auth.user.phone
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    }
  }
};
</script>