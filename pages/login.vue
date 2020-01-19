<template>
  <section>
    <div id="login">
      <div class="container pb-5">
        <div id="login-row" class="row justify-content-center align-items-center">
          <div id="login-column" class="col-lg-10">
            <div class="row no-gutters">
              <div id="login-box" class="col-lg-7 p-5">
                <h3 class="text-center text-info mb-3">Login</h3>
                <div id="login-div" class="form-row">
                  <b-input-group class="border shadow-sm my-2">
                    <b-input-group-prepend>
                      <b-input-group-text class="border-0 bg-info">
                        <v-icon name="envelope" class="text-white" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="email"
                      name="email"
                      class="form-control form-control-md form-control-borderless"
                      placeholder="Email"
                    ></b-form-input>
                  </b-input-group>
                  <b-input-group class="border shadow-sm my-2">
                    <b-input-group-prepend>
                      <b-input-group-text class="border-0 bg-info">
                        <v-icon name="lock" class="text-white" />
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="password"
                      name="password"
                      type="password"
                      class="form-control form-control-md form-control-borderless"
                      placeholder="Password"
                    ></b-form-input>
                  </b-input-group>
                </div>
                <div class="text-center my-4">
                  <b-button variant="info" class="w-50" @click="login">
                    <span
                      v-if="loadingLogin"
                      class="d-flex justify-content-around align-items-center"
                    >
                      <h5>Please Wait...</h5>
                      <b-spinner variant="light" small></b-spinner>
                    </span>
                    <span v-else>
                      <h5 class="font-weight-bold">Login</h5>
                    </span>
                  </b-button>
                </div>
              </div>
              <div id="login-box" class="col-lg-5 p-5">
                <h4 class="text-info mb-3">Don't have account yet?</h4>
                <h6 class="text-info mb-3">From your account you can:</h6>
                <ul v-for="index in items" :key="index" class="px-3 my-2">
                  <li>
                    <h6 class="m-0 p-0">{{ index }}</h6>
                  </li>
                </ul>
                <div class="my-4">
                  <b-badge href="/registration" class="btn-purple w-100 py-2 pointer">
                    <h5 class="font-weight-bold">
                      Create an account
                      <v-icon name="play" scale="1.2" class="text-white ml-3" />
                    </h5>
                  </b-badge>
                </div>
              </div>
            </div>

            <span>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-2"
                :show="errs.email"
              >{{ errs.email }}</b-alert>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-2"
                :show="errs.password"
              >{{ errs.password }}</b-alert>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      email: "",
      password: "",
      errs: "",

      items: ["Login to App", "Get free access", "View your profile"],

      loadingLogin: false
    };
  },
  methods: {
    async login() {
      this.loadingLogin = true;
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.$router.push("/");
      } catch (error) {
        this.loadingLogin = false;
        this.errs = error.response.data.errors;
      }
    }
  }
};
</script>