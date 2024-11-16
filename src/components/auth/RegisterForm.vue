<template>
  <h4>Registro</h4>
  <h5>GreenCity</h5>

  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="Namevalue"
        label="Nombre*"
        hint="Nombre"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, llenar este campo',
        ]"
      />

      <q-input
        filled
        v-model="Emailvalue"
        label="Correo electrónico*"
        hint="email"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, llenar este campo',
          (val) => {
            const emailPattern =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return (
              emailPattern.test(val) || 'Por favor, ingresa un correo válido'
            );
          },
        ]"
      />

      <q-input
        filled
        v-model="Passwordvalue"
        label="Contraseña*"
        hint="Contraseña"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, llenar este campo',
        ]"
      />

      <q-input
        filled
        v-model="Phonevalue"
        label="Telefono*"
        hint="Telefono"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, llenar este campo',
        ]"
      />

      <q-input
        filled
        v-model="Addressvalue"
        label="Dirección*"
        hint="Dirección"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, llenar este campo',
        ]"
      />

      <div>
        <q-btn
          label="Registrar"
          type="submit"
          color="green"
          @click="registroUsuario"
        />
        <q-btn
          label="Limpiar"
          type="reset"
          color="green"
          flat
          class="q-ml-sm"
          @click="limpiarFormulario"
        />
      </div>
    </q-form>
  </div>
</template>

<style></style>

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
          // Respuesta exitosa
          console.log("Registro exitoso: " + JSON.stringify(response));
          this.$q.notify({
            message: "Registro exitoso. Bienvenido a GreenCity APP",
            color: "positive",
            position: "bottom",
            timeout: 5000,
          });

          // Redirigir a la página de inicio de sesión o a otra página
          this.$router.push("/login");
        })
        .catch((error) => {
          // Ocurrió un error en el registro
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
      // Restablecer todos los campos del formulario a valores vacíos
      (this.Namevalue = ""),
        (this.Emailvalue = ""),
        (this.Passwordvalue = ""),
        (this.Phonevalue = ""),
        (this.Addressvalue = ""),
        console.log("Formulario limpiado");
    },
  },
};
</script>
