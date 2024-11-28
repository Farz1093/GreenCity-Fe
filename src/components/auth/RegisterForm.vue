<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="flex flex-center q-pa-md"
        style="height: 100vh; background-color: #f5f5f5"
      >
        <q-card
          class="q-pa-lg rounded shadow-2"
          style="width: 100%; max-width: 500px"
        >
          <!-- encabezado -->
          <q-card-section class="text-center">
            <q-avatar size="80px" class="bg-green text-white">
              <q-icon name="person_add" size="40px" />
            </q-avatar>
            <h4 class="q-mb-xs">Create an Account</h4>
            <p class="text-subtitle2 text-grey">
              Join GreenCity and get started
            </p>
          </q-card-section>

          <!-- formulario de registro -->
          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="">
              <q-input
                outlined
                v-model="Namevalue"
                label="Name*"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill out this field',
                ]"
                class=""
              />

              <q-input
                outlined
                v-model="Emailvalue"
                label="Email*"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill out this field',
                  (val) => {
                    const emailPattern =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return (
                      emailPattern.test(val) || 'Please enter a valid email'
                    );
                  },
                ]"
                class=""
              />

              <q-input
                outlined
                v-model="Passwordvalue"
                label="Password*"
                type="password"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill out this field',
                ]"
                class=""
              />

              <q-input
                outlined
                v-model="Phonevalue"
                label="Phone*"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill out this field',
                ]"
                class=""
              />

              <q-input
                outlined
                v-model="Addressvalue"
                label="Address*"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill out this field',
                ]"
                class=""
              />

              <!-- botones -->
              <div class="text-center">
                <q-btn
                  label="Register"
                  type="submit"
                  color="green"
                  unelevated
                  class="full-width q-mb-sm"
                  @click="registroUsuario"
                />
                <q-btn
                  label="Clear"
                  type="reset"
                  color="grey"
                  flat
                  class="full-width"
                  @click="limpiarFormulario"
                />
              </div>
            </q-form>
          </q-card-section>

          <!-- pie de pagina -->
          <q-card-section class="text-center text-grey">
            <p>
              Already have an account?
              <q-btn label="Login here" flat dense color="green" to="/login" />
            </p>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      Namevalue: "",
      Emailvalue: "",
      Passwordvalue: "",
      Phonevalue: "",
      Addressvalue: "",
    };
  },
  methods: {
    registroUsuario() {
      console.log("Click en el botón de registro de usuario");
      console.log("Nombre: " + this.Namevalue);
      console.log("Correo electrónico: " + this.Emailvalue);
      console.log("Teléfono: " + this.Phonevalue);
      console.log("Dirección: " + this.Addressvalue);

      let endpointSignUp = "/api/Usuarios/SignUp";
      let newUser = {
        nombre: this.Namevalue,
        correo: this.Emailvalue,
        contraseña: this.Passwordvalue,
        telefono: this.Phonevalue,
        direccion: this.Addressvalue,
      };

      this.$api
        .post(endpointSignUp, newUser)
        .then((response) => {
          console.log("Registro exitoso: " + JSON.stringify(response));
          this.$q.notify({
            message: "Registro exitoso. Bienvenido a GreenCity APP",
            color: "positive",
            position: "bottom",
            timeout: 5000,
          });
          this.$router.push("/login");
        })
        .catch((error) => {
          this.$q.notify({
            message: "Ocurrió un error al registrarse",
            color: "negative",
            position: "top",
            timeout: 5000,
          });
          console.log("Error en el registro: " + error);
        });
    },
    limpiarFormulario() {
      this.Namevalue = "";
      this.Emailvalue = "";
      this.Passwordvalue = "";
      this.Phonevalue = "";
      this.Addressvalue = "";
      console.log("Formulario limpiado");
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
