<template>
  <div>
    <core-code-editor v-model="codeText" :lang="codeLanguage"></core-code-editor>
    <core-input-text
      required
      popover="This is the poper"
      label="Full name"
      placeholder="Insert your full name"
      :description="'input text: ' + fullname"
      min="3"
      v-model="fullname"
    ></core-input-text>

    <core-select-one
      label="Type of component"
      v-model="componenteSelected"
      :options="tipoComponentsValues"
      :description="'selected:' + componenteSelected"
    ></core-select-one>

    <core-input-tags label="Types of components" v-model="tags" :description="'tags:' + tags"></core-input-tags>

    selected icon: {{ iconSelected }}
    <core-icon-picker label="Select icon" v-model="iconSelected"></core-icon-picker>

    <header class="bx-header-title">
      <h3>{{ $t('showcase.card-list.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <core-card-list :items="items"></core-card-list>

    <header class="bx-header-title">
      <h3>{{ $t('showcase.modal.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <b-button class="mr-3" @click="showModal('simpleConfirmModal')" variant="outline-primary">
      {{ $t('showcase.modal.show', { name: 'simpleConfirmModal' }) }}
    </b-button>
    <b-button @click="showModal('confirmWithMessageModal')" variant="outline-primary">
      {{ $t('showcase.modal.show', { name: 'confirmWithMessageModal' }) }}
    </b-button>
    <p v-if="modalResult" :class="modalResult === 'canceled' ? 'text-warning' : 'text-primary'">{{ modalResult }}</p>
    <p v-if="modalResultComment">{{ modalResultComment }}</p>
    <core-confirmation-modal ref="simpleConfirmModal" @confirmed="confirmedHandler" @canceled="canceledHandler" />
    <core-confirmation-modal
      ref="confirmWithMessageModal"
      :addComentario="true"
      :check="true"
      @confirmed="confirmedHandler"
      @canceled="canceledHandler"
    />

    <header class="bx-header-title">
      <h3>{{ $t('showcase.empty-content.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <core-empty-content></core-empty-content>

    <header class="bx-header-title">
      <h3>{{ $t('showcase.empty-content.title') }}</h3>
      <div class="header-title-line"></div>
    </header>
    <core-flow></core-flow>
  </div>
</template>

<script lang="ts" src="./showcase.component.ts"></script>
