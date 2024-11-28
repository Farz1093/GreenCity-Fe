<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <!-- header -->
    <q-header elevated class="header">
      <q-toolbar>
        <!-- hamburger btn -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="menu-btn"
        />

        <!-- header title -->
        <q-toolbar-title> GreenCity App </q-toolbar-title>

        <!-- version -->
        <div class="version-info">GreenCity v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- sidebar -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="drawer">
      <q-list>
        <q-item-label header class="links-header">
          Essential Links
        </q-item-label>
        <!-- rssential links -->
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- main content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.main-layout {
  background: #f7f9fc;
}

.header {
  background-color: #4caf50;
  color: white;
}

.menu-btn {
  color: white;
}

.version-info {
  font-size: 14px;
  color: #e0f2f1;
}

.drawer {
  background-color: #ffffff;
}

.links-header {
  font-weight: bold;
  font-size: 16px;
  color: #4caf50;
}
</style>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>
