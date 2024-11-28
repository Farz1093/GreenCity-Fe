<template>
  <div style="text-align: center; position: relative">
    <!-- Título -->
    <h2 style="color: darkgreen; margin-bottom: 10px">
      Bienvenidos a Green City
    </h2>

    <!-- Contenedor de la página -->
    <q-page
      class="flex flex-center"
      style="margin: 0; padding: 0; flex-direction: column"
    >
      <!-- Imagen -->
      <img
        alt="Green City Logo"
        src="https://aixstock.com/files/preview/1280x856/11695460405q27vqs5gvda21pgf7hegwuwwhkxntqlcexgbfilwq1wtvxadgpqqde3nlyrngstvttdwan7cqgc1iivj7v10jdwqapwnoqwbzzbb.jpg?type=free"
        style="
          width: 400px;
          height: 300px;
          margin-bottom: 20px;
          border-radius: 12px;
        "
      />

      <!-- Botones en la misma fila -->
      <div class="button-group">
        <q-btn label="Login" color="green" to="/login" class="btn-login" />
        <q-btn label="Register" to="/register" class="btn-register" />
      </div>
    </q-page>
  </div>
</template>
<style scoped>
.button-group {
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
}

.btn-login {
  background-color: #4caf50;
  color: white;
  display: flex;
  align-items: center;
}

.btn-register {
  background-color: #e0e0e0;
  color: #4caf50;
}
</style>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {},
});
</script>
