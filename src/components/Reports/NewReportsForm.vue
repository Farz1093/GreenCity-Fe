<template>
  <q-page>
    <h3 class="text-center text-bold text-green">Nuevo Reporte</h3>

    <q-card class="q-pa-lg" style="max-width: 600px; margin: auto">
      <q-form @submit="enviarFormulario" ref="form">
        <!-- Categoría -->
        <q-input
          v-model="formData.categoria"
          :options="categoria"
          label="Categoría: Ambiental o Delictivo"
          filled
          required
        />

        <!-- Subcategoría -->
        <q-input
          v-model="formData.subcategoria"
          label="Subcategoría"
          filled
          required
        />

        <!-- Descripción -->
        <q-input
          v-model="formData.descripcion"
          label="Descripción"
          type="textarea"
          filled
          required
        />

        <!-- Botones -->
        <div class="q-mt-md text-center">
          <q-btn label="Enviar" color="green" unelevated type="submit" />
          <q-btn
            label="Cancelar"
            flat
            color="negative"
            @click="cancelarFormulario"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { SessionStorage } from "quasar";

export default {
  data() {
    return {
      formData: {
        idUsuario: null,
        categoria: "",
        subcategoria: "",
        descripcion: "",
        fechaCreacion: new Date().toISOString(),
      },
    };
  },
  methods: {
    // Decodificar JWT para obtener el ID del usuario
    obtenerIdUsuarioDesdeToken() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token no encontrado. El usuario no está autenticado.");
        return null;
      }

      try {
        // Decodifica el payload (segunda parte del JWT)
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Payload del token:", payload);
        return payload.UserId || payload.idUsuario; // Cambia a la clave que contiene el ID en tu JWT
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
      }
    },

    async enviarFormulario() {
      this.formData = {
        idUsuario: this.obtenerIdUsuarioDesdeToken(),
        categoria: this.formData.categoria, // Asegúrate de que sea válido
        subcategoria: this.formData.subcategoria?.trim(), // Validar que no esté vacío
        descripcion: this.formData.descripcion?.trim(), // Validar que no esté vacío
        fechaCreacion: new Date().toISOString(), // Formato ISO
      };

      console.log("Datos enviados al servidor:", this.formData);

      try {
        const response = await fetch(
          "http://localhost:5286/api/Reportes/Reportar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.formData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error del servidor:", errorData);
          throw new Error(errorData.title || "Error al enviar el formulario.");
        }

        this.$q.notify({
          type: "positive",
          message: "Reporte enviado con éxito",
        });

        this.$router.push("/reports");
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        this.$q.notify({
          type: "negative",
          message: error.message || "Error inesperado al enviar el formulario.",
        });
      }
    },

    cancelarFormulario() {
      this.$router.push("/reports");
    },
  },
  mounted() {
    // Asignar el ID del usuario cuando el componente se monta
    this.formData.idUsuario = this.obtenerIdUsuarioDesdeToken();
  },
};
</script>
