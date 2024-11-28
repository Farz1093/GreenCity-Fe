<template>
  <q-page>
    <h3 class="text-center text-bold text-green">Nuevo Informe</h3>

    <q-card class="q-pa-lg" style="max-width: 600px; margin: auto">
      <q-form @submit="enviarFormulario" ref="form">
        <!-- Tipo de Informe -->
        <q-input
          v-model="formData.tipo_informe"
          :options="tipoInformes"
          label="Tipo de Informe: Eventos Delictivos o Problemas Ambientales"
          filled
          required
        />

        <!-- Categoría -->
        <q-input
          v-model="formData.categoria"
          :options="categorias"
          label="Categoría: Delictivo o Ambiental"
          filled
          required
        />

        <!-- Ubicación -->
        <q-input
          v-model="formData.ubicacion"
          label="Ubicación"
          filled
          required
        />

        <!-- Detallado -->
        <q-input
          v-model="formData.detallado"
          label="Detallado"
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
export default {
  data() {
    return {
      formData: {
        id_usuario: null,
        tipo_informe: "",
        categoria: "",
        ubicacion: "",
        detallado: "",
        fecha_generacion: new Date().toISOString(),
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
        return payload.UserId || payload.id_usuario; // Cambia a la clave que contiene el ID en tu JWT
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
      }
    },

    async enviarFormulario() {
      // Ajusta los nombres de los campos para que coincidan con la API
      this.formData = {
        idUsuario: this.obtenerIdUsuarioDesdeToken(), // Cambiado a 'idUsuario'
        tipoInforme: this.formData.tipo_informe?.trim(), // Cambiado a 'tipoInforme'
        categoria: this.formData.categoria?.trim(),
        ubicacion: this.formData.ubicacion?.trim(),
        rutaArchivo: this.formData.detallado?.trim(), // Cambiado a 'rutaArchivo'
        fechaGeneracion: new Date().toISOString(), // Cambiado a 'fechaGeneracion'
      };

      console.log("Datos enviados al servidor:", this.formData);

      try {
        const response = await fetch(
          "http://localhost:5286/api/Informes/Informar",
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
          console.error("Error del servidor:", errorData); // Verifica el error específico
          throw new Error(errorData.title || "Error al enviar el formulario.");
        }

        this.$q.notify({
          type: "positive",
          message: "Informe enviado con éxito",
        });

        this.$router.push("/informes");
      } catch (error) {
        console.error("Error al enviar el formulario:", error); // Mensaje general de error
        this.$q.notify({
          type: "negative",
          message: error.message || "Error inesperado al enviar el formulario.",
        });
      }
    },

    cancelarFormulario() {
      this.$router.push("/informes");
    },
  },
  mounted() {
    // Asignar el ID del usuario cuando el componente se monta
    this.formData.id_usuario = this.obtenerIdUsuarioDesdeToken();
  },
};
</script>
