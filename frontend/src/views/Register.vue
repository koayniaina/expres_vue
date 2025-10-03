<template>
  <form @submit.prevent="register">
    <input v-model="username" placeholder="Username" />
    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
</template>

<script>
import API from "../services/api.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { ref } from "vue"; 

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();

    // Reactive data
    const username = ref("");
    const email = ref("");
    const password = ref("");

    const register = async () => {
      try {
        const res = await API.post("/register", { username: username.value, email: email.value, password: password.value });

        // Save JWT
        localStorage.setItem("token", res.data.token);

        // Show toast
        toast.success("Registered successfully!");

        // Redirect to login page
        router.push("/login");
      } catch (err) {
        toast.error(err.response?.data?.message || "Register failed");
      }
    };

    return { username, email, password, register };
  },
};
</script>
