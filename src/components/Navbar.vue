<template>
  <q-toolbar
    class="
      bg-grey-9
      text-black
      fit
      row
      wrap
      justify-between
      items-center
      content-start
      navbar
    "
  >
    <q-btn round flat>
      <q-avatar>
        <img :src="user?.photoURL || userDefault" />
      </q-avatar>
    </q-btn>
    <span class="q-subtitle-1 q-pl-md text-white">
      {{ user ? `Hola, ${user.displayName}!` : "PORTH Messages" }}
    </span>
    <q-btn v-if="isLogin" @click="logOut" label="Salir" color="negative" />
    <q-btn
      v-else
      @click="
        simulateProgress();
        logIn();
      "
      label="Ingresar"
      color="secondary"
      :loading="loading"
    />
  </q-toolbar>
</template>

<script>
import { ref } from "vue";
import { useAuth } from "../firebase";

export default {
  setup() {
    const { user, isLogin, logOut, logIn } = useAuth();
    const userDefault = "https://cdn.quasar.dev/logo-v2/svg/logo.svg";

    const loading = ref(false);

    const simulateProgress = () => {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
      }, 2000);
    };

    return {
      user,
      isLogin,
      logOut,
      logIn,
      userDefault,
      loading,
      simulateProgress,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>