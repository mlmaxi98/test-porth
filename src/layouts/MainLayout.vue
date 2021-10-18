<template>
  <div class="WAL position-relative bg-grey-4">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" style="">
      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
.WAL {
  width: 100%;
  min-height: 100vh;

  &:before {
    content: "";
    height: 127px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #009688;
  }

  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    width: 90%;
    max-width: 950px;
    border-radius: 5px;
  }

  &__field.q-field--outlined .q-field__control:before {
    border: none;
  }

  .q-drawer--standard {
    .WAL__drawer-close {
      display: none;
    }
  }
}

@media (max-width: 850px) {
  .WAL {
    padding: 0;
    &__layout {
      width: 100%;
      border-radius: 0;
    }
  }
}
@media (min-width: 691px) {
  .WAL {
    &__drawer-open {
      display: none;
    }
  }
}

.conversation__summary {
  margin-top: 4px;
}

.conversation__more {
  margin-top: 0 !important;
  font-size: 1.4rem;
}
</style>