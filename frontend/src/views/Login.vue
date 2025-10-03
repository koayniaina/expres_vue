<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import API from "../services/api.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const toast = useToast();
    const router = useRouter();

    const login = async () => {
      try {
        const res = await API.post("/login", { email: email.value, password: password.value });
        localStorage.setItem("token", res.data.token);
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    };

    return { email, password, login };
  },
};
</script>
