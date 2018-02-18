<template lang="pug">
  .container
    p // Ressourcenverwaltung 
    p
    p - Ordendlichere Darstellung
    p - Ressourcen CRUD
    p - Ressourcentyp CRUD
    p - Personen CRUD
    p - Personentyp CRUD

    table.table
      thead
        th Typ
        th Name
      tr(v-for='resource in resources')
        td {{ resource.type.name }}
        td {{ resource.name }}
</template>

<script>

export default {
  computed: {
    resources() {
      return this.$store.getters.allResources
    }
  }
}
</script>

<style>

</style>
