<template>
  <section>
    <div id="login">
      <div class="container pb-5">
        <div id="login-row" class="d-flex justify-content-center align-items-center">
          <div id="login-column" class="col-lg-8">
            <span>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-1"
                :show="errors.has('collection.phone')"
              >{{ errors.first('collection.phone') }}</b-alert>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-1"
                :show="errors.has('collection.firstName')"
              >{{ errors.first('collection.firstName') }}</b-alert>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-1"
                :show="errors.has('collection.lastName')"
              >{{ errors.first('collection.lastName') }}</b-alert>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-1"
                :show="errors.has('collection.dateOfBirth')"
              >{{ errors.first('collection.dateOfBirth') }}</b-alert>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-1"
                :show="errors.has('collection.gender')"
              >{{ errors.first('collection.gender') }}</b-alert>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-1"
                :show="errors.has('collection.email')"
              >{{ errors.first('collection.email') }}</b-alert>
              <b-alert
                variant="danger"
                class="border shadow-sm w-100 mt-1"
                :show="errors.has('collection.password')"
              >{{ errors.first('collection.password') }}</b-alert>
            </span>
            <div
              id="login-box"
              :class="{'col-12 border shadow-sm p-5' : true, 'disabled-form' : disabledForm }"
            >
              <div id="login-div" class="form-row">
                <p class="h2 text-info mb-3">Registration</p>
                <b-form-group class="col-12 my-2">
                  <b-form-input
                    v-model="phone"
                    name="phone"
                    :state="errors.has('collection.phone') ? false : null"
                    data-vv-scope="collection"
                    v-validate="'required|min:10|max:15'"
                    placeholder="Mobile Number"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="col-12 my-2">
                  <b-form-input
                    v-model="firstName"
                    name="firstName"
                    :state="errors.has('collection.firstName') ? false : null"
                    data-vv-scope="collection"
                    v-validate="'required|min:3'"
                    placeholder="First Name"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="col-12 my-2">
                  <b-form-input
                    v-model="lastName"
                    name="lastName"
                    :state="errors.has('collection.lastName') ? false : null"
                    data-vv-scope="collection"
                    v-validate="'required|min:3'"
                    placeholder="First Name"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="col-12 my-2">
                  <flat-pickr
                    v-model="dateOfBirth"
                    name="dateOfBirth"
                    :class="{'form-control bg-white': true, 'border border-danger': errors.has('collection.dateOfBirth')}"
                    data-vv-scope="collection"
                    v-validate="'required|date_format:yyyy-MM-dd'"
                    placeholder="Date of Birth"
                  ></flat-pickr>
                </b-form-group>
                <b-form-group class="col-12 my-2">
                  <b-form-radio-group
                    v-model="gender"
                    :options="genderOptions"
                    size="md"
                    name="gender"
                    :state="errors.has('collection.gender') ? false : null"
                    data-vv-scope="collection"
                    v-validate="'required'"
                  ></b-form-radio-group>
                </b-form-group>
                <b-form-group class="col-12 my-2">
                  <b-form-input
                    v-model="email"
                    name="email"
                    :state="errors.has('collection.email') ? false : null"
                    data-vv-scope="collection"
                    v-validate="'required|email'"
                    placeholder="Email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="col-12 my-2">
                  <b-form-input
                    v-model="password"
                    name="password"
                    type="password"
                    :state="errors.has('collection.password') ? false : null"
                    data-vv-scope="collection"
                    v-validate="'required|min:6'"
                    placeholder="Password"
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="d-flex justify-content-center align-items-center mt-3">
                <b-button class="btn-purple w-100" @click="regisUser">
                  <h5 class="font-weight-bold">Register</h5>
                </b-button>
              </div>
            </div>
            <div v-if="disabledForm" class="d-flex justify-content-center align-items-center mt-3">
              <b-badge href="/login" class="btn-purple w-100 py-2 pointer">
                <h5 class="font-weight-bold">Go to Login Page</h5>
              </b-badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import "flatpickr/dist/flatpickr.css";

export default {
  layout: "auth",
  components: {
    flatPickr: () => import("vue-flatpickr-component")
  },
  data() {
    return {
      phone: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      genderOptions: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" }
      ],
      gender: "",
      email: "",
      password: "",

      disabledForm: false,
      showLoginButton: false
    };
  },
  methods: {
    regisUser() {
      this.$validator.validateAll("collection").then(async result => {
        if (!result) return;
        this.$axios
          .post(`register`, {
            phone: this.phone,
            first_name: this.firstName,
            last_name: this.firstName,
            date_of_birth: this.formatDate(this.dateOfBirth),
            gender: this.gender,
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (response.status == 200) {
              this.$swal({
                title: "Success!",
                text: "Register Success",
                type: "success",
                position: "top-end",
                showConfirmButton: false,
                timer: 1800
              });
            }
            this.clearForm();
          })
          .catch(e => {
            this.$swal({
              title: "Error!",
              type: "error"
            });
          });
      });
    },
    clearForm() {
      this.phone = "";
      this.firstName = "";
      this.lastName = "";
      this.dateOfBirth = "";
      this.gender = "";
      this.email = "";
      this.password = "";
      this.disabledForm = true;
      this.showLoginButton = true;
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  }
};
</script>
