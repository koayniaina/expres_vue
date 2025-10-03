<template>
  <div>
    <h1>Welcome, {{ user.username }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import API from "../services/api.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const user = ref({});
    const toast = useToast();
    const router = useRouter();

    const fetchUser = async () => {
      try {
        const res = await API.get("/me");
        user.value = res.data;
      } catch (err) {
        toast.error("Unauthorized, please login again.");
        router.push("/login");
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      router.push("/login");
    };

    onMounted(() => {
      fetchUser();
    });

    return { user, logout };
  },
};
</script>
