<template>
  <div class="q-pa-md row justify-center chat">
    <template v-if="messagesReady">
      <div style="width: 100%" ref="bottom">
        <template
          v-for="{ id, text, userPhotoURL, userName, userId } in messages"
          :key="id"
        >
          <q-chat-message
            :avatar="userPhotoURL"
            :sent="userId === user?.uid"
            :name="userId === user?.uid ? 'Tú' : userName"
            :text="[text]"
            text-color="white"
            :bg-color="userId === user?.uid ? 'secondary' : 'grey-9'"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <div class="q-gutter-md row justify-center">
        <q-inner-loading showing>
          <q-spinner-bars size="5rem" color="secondary" />
        </q-inner-loading>
      </div>
    </template>
  </div>
  <q-toolbar class="bg-grey-5 text-black row sender">
    <q-input
      :disable="!isLogin"
      rounded
      outlined
      dense
      class="col-grow q-mr-sm"
      bg-color="white"
      v-model="message"
      placeholder="Escribe un mensaje aquí"
    />
    <q-btn :disable="!isLogin" round flat icon="send" @click="send" />
  </q-toolbar>
</template>

<script>
import { ref, watch, nextTick } from "vue";
import { useAuth, useChat } from "../firebase";
export default {
  setup() {
    const { user, isLogin } = useAuth();
    const { messages, sendMessage, messagesReady } = useChat();

    const message = ref("");
    const send = () => {
      if (message.value) {
        sendMessage(message.value);
        message.value = "";
      }
    };
    const bottom = ref(null);
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: "smooth", block: "end" });
        });
      },
      { deep: true }
    );

    return { user, send, isLogin, message, messages, bottom, messagesReady };
  },
};
</script>

<style lang="scss" scoped>
.chat {
  overflow-y: scroll;
  height: calc(100vh - 100px);
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>