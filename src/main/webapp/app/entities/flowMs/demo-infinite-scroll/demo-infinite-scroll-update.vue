<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="appGwApp.flowMsDemoInfiniteScroll.home.createOrEditLabel"
          data-cy="DemoInfiniteScrollCreateUpdateHeading"
          v-text="t$('appGwApp.flowMsDemoInfiniteScroll.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="demoInfiniteScroll.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="demoInfiniteScroll.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoInfiniteScroll.name')" for="demo-infinite-scroll-name"></label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="demo-infinite-scroll-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
              required
            />
            <div v-if="v$.name.$anyDirty && v$.name.$invalid">
              <small class="form-text text-danger" v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./demo-infinite-scroll-update.component.ts"></script>
