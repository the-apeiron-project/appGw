<template>
  <div>
    <b-dropdown-item to="/demo-paginate">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.flowMsDemoPaginate')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/demo-infinite-scroll">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.flowMsDemoInfiniteScroll')"></span>
    </b-dropdown-item>

    <b-dropdown-item to="/form">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.flowMsForms')"></span>
    </b-dropdown-item>

    <b-dropdown-item to="/solucion">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.flowMsSoluciones')"></span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
