<template>
  <q-page>
    <!-- Título -->
    <h3 class="text-center text-bold text-green">GreenCity Informes</h3>

    <!-- Botón para Administradores -->
    <div v-if="esAdmin" class="text-center q-mb-md">
      <q-btn
        label="Generar Informe"
        color="green"
        unelevated
        class="q-mb-sm"
        style="max-width: 250px"
        @click="generarInforme"
      />
    </div>

    <!-- Buscar y Filtrar -->
    <q-card class="q-pa-md q-mb-md">
      <div
        class="q-gutter-md"
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        "
      >
        <q-input
          filled
          v-model="searchTerm"
          label="Buscar informes"
          style="max-width: 300px"
        />
        <q-select
          filled
          v-model="categoriaSeleccionada"
          :options="categorias"
          label="Filtrar por categoría"
          style="max-width: 300px"
        />
      </div>
    </q-card>

    <!-- Tabla de informes -->
    <q-card class="q-pa-md">
      <q-table
        :rows="informesFiltrados"
        :columns="columns"
        row-key="id_informe"
        no-data-label="No hay informes disponibles"
      >
        <!-- No se necesita plantilla para 'rutaArchivo', ya que se mostrará como texto directamente -->
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "", // Texto para búsqueda
      categoriaSeleccionada: null, // Categoría seleccionada
      categorias: [
        { label: "Ambiental", value: "Ambiental" },
        { label: "Delictivo", value: "Delictivo" },
      ],
      informes: [], // Lista de informes obtenida desde la API
      columns: [
        {
          name: "id_informe",
          label: "ID Informe",
          align: "left",
          field: "id_informe",
          sortable: true,
        },
        {
          name: "idUsuario",
          label: "Usuario",
          align: "left",
          field: "idUsuario",
          sortable: true,
        },
        {
          name: "tipoInforme",
          label: "Tipo de Informe",
          align: "left",
          field: "tipoInforme",
        },
        {
          name: "fechaGeneracion",
          label: "Fecha de Generación",
          align: "left",
          field: "fechaGeneracion",
          format: (val) => {
            if (!val) return "Sin fecha";
            const date = new Date(val); // Intenta convertir a Date
            return isNaN(date) ? "Fecha inválida" : date.toLocaleDateString();
          },
        },
        {
          name: "ubicacion",
          label: "Ubicación",
          align: "left",
          field: "ubicacion",
        },
        {
          name: "categoria",
          label: "Categoría",
          align: "left",
          field: "categoria",
        },
        {
          name: "rutaArchivo",
          label: "Detallado",
          align: "center",
          field: "rutaArchivo",
        },
      ],
      esAdmin: false, // Determina si el usuario es administrador
    };
  },
  computed: {
    informesFiltrados() {
      if (!this.informes || this.informes.length === 0) {
        return [];
      }
      return this.informes.filter((informe) => {
        const matchesSearch = this.searchTerm
          ? informe.tipoInforme
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          : true;

        const matchesCategory = this.categoriaSeleccionada
          ? informe.categoria === this.categoriaSeleccionada
          : true;

        return matchesSearch && matchesCategory;
      });
    },
  },
  methods: {
    async fetchInformes() {
      try {
        const response = await fetch("http://localhost:5286/api/Informes");
        const data = await response.json();

        // Agregar id_informe a los datos si no está en la API
        this.informes = data.map((informe, index) => ({
          id_informe: index + 1, // Generar un ID basado en el índice
          ...informe,
        }));

        console.log("Datos obtenidos de la API:", this.informes);
      } catch (error) {
        console.error("Error al obtener los informes:", error);
      }
    },
    generarInforme() {
      this.$router.push("/informes/new");
    },
  },
  mounted() {
    this.fetchInformes();
    const userRole = localStorage.getItem("userRole");
    this.esAdmin = userRole === "ADM";
  },
};
</script>
