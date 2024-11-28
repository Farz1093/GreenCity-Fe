<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="flex flex-center q-pa-md"
        style="height: 100vh; background-color: #f5f5f5"
      >
        <q-card
          class="q-pa-lg rounded shadow-2"
          style="width: 100%; max-width: 400px"
        >
          <!-- header parte de arriba -->
          <q-card-section class="text-center">
            <!-- logo -->
            <q-avatar size="80px" class="bg-green text-white q-mb-md">
              <q-icon name="eco" size="40px" />
            </q-avatar>
            <!-- logo -->
            <h4 class="q-mb-xs">Welcome Back!</h4>
            <p class="text-subtitle2 text-grey">Log in to access GreenCity</p>
          </q-card-section>

          <!-- formulario login  -->
          <q-card-section>
            <q-input
              v-model="emailValue"
              standout=""
              label="Email"
              outlined
              dense
              class="q-mb-md"
            />
            <q-input
              v-model="pwdValue"
              outlined
              dense
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              class="q-mb-md"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer text-grey"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <!-- botones login y registro -->
          <q-card-section class="text-center q-pt-none">
            <q-btn
              label="Login"
              color="green"
              unelevated
              class="full-width q-mb-sm"
              @click="inicioSesion"
            />
            <q-btn
              label="Register"
              color="grey"
              flat
              class="full-width"
              to="/register"
            />
          </q-card-section>

          <!-- el pie de pagina -->
          <q-card-section class="text-center text-grey q-mt-md">
            <p>
              Forgot your password?
              <q-btn
                label="Reset here"
                flat
                dense
                color="green"
                to="/forgot-password"
              />
            </p>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      emailValue: "",
      pwdValue: "",
      isPwd: true,
    };
  },
  methods: {
    inicioSesion() {
      console.log("Click en el botón de inicio de sesión");
      console.log("Valor del email: " + this.emailValue);

      let endpointLogin = "/api/Usuarios/SignIn";
      let user = { correo: this.emailValue, contraseña: this.pwdValue };

      this.$api
        .post(endpointLogin, user)
        .then((response) => {
          console.log("Respuesta completa:", response);

          // Accede a los datos directamente desde response.data
          const token = response.data.token; // Correcto
          const userId = response.data.idUsuario; // Correcto

          // Valida que los campos existan
          if (!token || !userId) {
            throw new Error(
              "El token o el ID del usuario no están presentes en la respuesta."
            );
          }

          // Guardar token e ID en localStorage
          localStorage.setItem("authToken", token);
          localStorage.setItem("userId", userId);

          console.log("Token guardado:", token);
          console.log("ID Usuario guardado:", userId);

          // Notificación y redirección
          this.$q.notify({
            message: "Bienvenido a GreenCity APP",
            color: "positive",
            position: "bottom",
            timeout: 5000,
          });
          this.$router.push("/reports"); // Redirige a la página de reportes
        })
        .catch((error) => {
          console.error("Detalles del error completo:", error);

          // Manejo de errores
          if (error.response) {
            this.$q.notify({
              message:
                error.response.data.message ||
                "Error desconocido en el servidor.",
              color: "negative",
              position: "top",
              timeout: 5000,
            });
          } else if (error.request) {
            this.$q.notify({
              message: "No se pudo conectar al servidor.",
              color: "negative",
              position: "top",
              timeout: 5000,
            });
          } else {
            this.$q.notify({
              message: `Error inesperado: ${error.message}`,
              color: "negative",
              position: "top",
              timeout: 5000,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
