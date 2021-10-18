<template>
  <q-page>
    <navbar />
    <chat />
  </q-page>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Chat from "../components/Chat.vue";
export default {
  components: { Chat, Navbar },
};
</script>
