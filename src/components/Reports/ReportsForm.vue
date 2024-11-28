<template>
  <q-page>
    <!-- Título centrado -->
    <h3 class="text-center text-bold text-green">GreenCity Reportes</h3>

    <!-- Botón Publicar Reporte -->
    <div class="text-center q-mb-md">
      <q-btn
        label="Publicar Reporte"
        color="green"
        unelevated
        class="q-mb-sm"
        style="max-width: 250px"
        @click="irAPublicarReporte"
      />
    </div>
    <!-- Botón para Administradores -->
    <div v-if="esAdmin" class="text-center q-mb-md">
      <q-card-section class="text-center q-pt-none">
        <q-btn
          label="Generar Informe"
          color="green"
          unelevated
          class="q-mb-sm"
          style="max-width: 250px"
          @click="generarInforme"
        />

        <q-btn
          label="Ver Informe"
          color="green"
          unelevated
          class="q-mb-sm"
          style="max-width: 250px"
          @click="verInforme"
        />
      </q-card-section>
    </div>
    <q-btn
      label="Limpiar filtros"
      color="secondary"
      flat
      size="sm"
      @click="limpiarFiltros"
    />

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
          label="Buscar reportes"
          style="max-width: 300px"
        />
        <q-select
          filled
          v-model="categoriaSeleccionada"
          :options="categorias"
          label="Filtrar por categoría"
          style="max-width: 300px"
          @input="(val) => console.log('Categoría seleccionada:', val)"
        />
      </div>
    </q-card>

    <!-- Tabla de reportes -->
    <q-card class="q-pa-md">
      <q-table
        :rows="reportesFiltrados"
        :columns="columns"
        row-key="idReporte"
        no-data-label="No hay reportes disponibles"
      >
        <template v-slot:body-cell-acciones="props">
          <q-btn
            label="Comentarios"
            color="primary"
            flat
            size="sm"
            @click="verComentario(props.row.idReporte)"
          />
        </template>
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
      reportes: [], // Lista de reportes obtenida desde la API
      columns: [
        // Definición de las columnas de la tabla
        {
          name: "idReporte",
          label: "ID",
          align: "left",
          field: "idReporte",
          sortable: true,
        },
        {
          name: "categoria",
          label: "Categoría",
          align: "left",
          field: "categoria",
          sortable: true,
        },
        {
          name: "descripcion",
          label: "Descripción",
          align: "left",
          field: "descripcion",
        },
        {
          name: "fechaCreacion",
          label: "Fecha de Creación",
          align: "left",
          field: "fechaCreacion",
          format: (val) => new Date(val).toLocaleDateString(),
        },
        { name: "estado", label: "Estado", align: "left", field: "estado" },
        { name: "comentarios", label: "Comentarios", align: "center" },
      ],
      esAdmin: false,
    };
  },
  watch: {
    searchTerm(newVal) {
      console.log("Búsqueda:", newVal);
    },
    categoriaSeleccionada(newVal) {
      console.log("Categoría seleccionada:", newVal);
    },
  },

  computed: {
    reportesFiltrados() {
      if (!this.reportes || this.reportes.length === 0) {
        return [];
      }
      return this.reportes.filter((reporte) => {
        const matchesSearch = this.searchTerm
          ? reporte.descripcion
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          : true;

        const matchesCategory = this.categoriaSeleccionada
          ? reporte.categoria === this.categoriaSeleccionada
          : true;

        return matchesSearch && matchesCategory;
      });
    },
  },

  methods: {
    async fetchReportes() {
      try {
        const response = await fetch("http://localhost:5286/api/Reportes");
        this.reportes = await response.json();
        console.log("Reportes cargados:", this.reportes);
      } catch (error) {
        console.error("Error al obtener los reportes:", error);
      }
    },
    irAPublicarReporte() {
      this.$router.push("/reports/new");
    },
    generarInforme() {
      this.$router.push("/informes/new");
    },
    verInforme() {
      this.$router.push("/informes");
    },
    verComentario(idReporte) {
      this.$router.push(`/reports/${idReporte}`);
    },
    limpiarFiltros() {
      this.searchTerm = "";
      this.categoriaSeleccionada = null;
    },
  },
  mounted() {
    this.fetchReportes();
    const userRole = localStorage.getItem("userRole");
    this.esAdmin = userRole === "ADM";
  },
};
</script>
