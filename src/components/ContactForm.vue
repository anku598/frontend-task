<template>
  <div>
    <div
      class="alert alert-success text-center"
      role="alert"
      v-if="success === true"
    >
      <h4 class="alert-heading">Well done!</h4>
      <p>
        Aww yeah, you are successfully submitted your message. We will contact
        you soon
      </p>
    </div>

    <div
      class="alert alert-danger text-center"
      role="alert"
      v-if="error === true"
    >
      <h4 class="alert-heading">Oops!</h4>
      <p>
        404 Server Error
      </p>
    </div>

    <!-- <div >Error Showing Div</div> -->
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form
        class="contact-form"
        action=""
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div class="mb-4">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:5|max:50"
            name="Name"
          >
            <div>
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                v-model="contactForm.name"
                class="form-control"
                id="name"
                placeholder="Name"
                :class="{ 'is-danger': errors[0] }"
              />
              <span
                :class="{ 'color-danger': errors[0] }"
                v-if="errors.length > 0"
                class="error"
              >
                {{ errors[0] }}</span
              >
            </div>
          </ValidationProvider>
        </div>

        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" rules="required|email">
            <div>
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="contactForm.email"
                :class="{ 'is-danger': errors[0] }"
                placeholder="name@example.com"
              />
            </div>
            <span
              :class="{ 'color-danger': errors[0] }"
              v-if="errors.length > 0"
              class="error"
            >
              {{ errors[0] }}</span
            >
          </ValidationProvider>
        </div>

        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" rules="max:100">
            <div>
              <label for="subject" class="form-label">Subject (Optional)</label>
              <textarea
                class="form-control"
                id="subject"
                v-model="contactForm.subject"
                rows="1"
                placeholder="Place your Subject"
              ></textarea>
              <span
                :class="{ 'color-danger': errors[0] }"
                v-if="errors.length > 0"
                class="error"
              >
                {{ errors[0] }}</span
              >
            </div>
          </ValidationProvider>
        </div>

        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" rules="required|max:500">
            <div>
              <label for="message" class="form-label">Mesaage</label>
              <textarea
                class="form-control"
                id="message"
                v-model="contactForm.message"
                rows="5"
                :class="{ 'is-danger': errors[0] }"
              ></textarea>
              <span
                :class="{ 'color-danger': errors[0] }"
                v-if="errors.length > 0"
                class="error"
              >
                {{ errors[0] }}</span
              >
            </div>
          </ValidationProvider>
        </div>

        <button type="submit" class="btn btn-dark btn-lg">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { API_URL } from "../global";
import axios from "axios";
const DEFAULT_FORM_DATA = {
  name: "",
  email: "",
  message: "",
  subject: "",
};
@Component({
  name: "ContactForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class ContactForm extends Vue {
  success = false;
  error = false;
  contactForm = JSON.parse(JSON.stringify(DEFAULT_FORM_DATA));

  onSubmit() {
    this.$refs.form
      .validate()
      .then((success) => {
        if (!success) {
          return;
        }
        axios
          .post(`${API_URL}/message`, this.contactForm)
          .then(({ data }) => {
            this.success = true;
            this.contactForm = JSON.parse(JSON.stringify(DEFAULT_FORM_DATA));
            this.$nextTick(() => {
              this.$refs.form.reset();
            });
          })
          .catch((e) => {
            if (e) {
              this.error = true;
            }
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
</script>

<style scoped>
.is-danger {
  border-color: red !important;
}

.color-danger {
  color: red;
}
</style>
