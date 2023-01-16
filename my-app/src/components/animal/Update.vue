<template>
  <div>
    <h1>Edit Book {{ item && item['@id'] }}</h1>

    <div
      v-if="created"
      class="alert alert-success"
      role="status">{{ created['@id'] }} created.</div>
    <div
      v-if="updated"
      class="alert alert-success"
      role="status">{{ updated['@id'] }} updated.</div>
    <div
      v-if="isLoading || deleteLoading"
      class="alert alert-info"
      role="status">Loading...</div>
    <div
      v-if="error"
      class="alert alert-danger"
      role="alert">
      <span
        class="fa fa-exclamation-triangle"
        aria-hidden="true">{{ error }}</span>
    </div>
    <div
      v-if="deleteError"
      class="alert alert-danger"
      role="alert">
      <span
        class="fa fa-exclamation-triangle"
        aria-hidden="true">{{ deleteError }}</span>
    </div>

    <AnimalForm
      v-if="item"
      :handle-submit="onSendForm"
      :values="item"
      :errors="violations"
      :initial-values="item" />

    <router-link
      v-if="item"
      :to="{ name: 'AnimalList' }"
      class="btn btn-primary">Back to list</router-link>
    <button
      class="btn btn-danger"
      @click="del">Delete</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import ItemWatcher from '../../mixins/ItemWatcher';
import AnimalForm from './Form.vue';
import * as types from '../../store/modules/animal/update/mutation_types';
import * as delTypes from '../../store/modules/animal/delete/mutation_types';

export default {
  mixins: [ItemWatcher],
  components: {
    AnimalForm,
  },

  computed: {
    ...mapFields('animal/del', {
      deleteError: 'error',
      deleteLoading: 'isLoading',
      deleted: 'deleted',
      mercureDeleted: 'mercureDeleted',
    }),
    ...mapFields('animal/create', {
      created: 'created',
    }),
    ...mapFields('animal/update', {
      isLoading: 'isLoading',
      error: 'error',
      item: 'retrieved',
      hubUrl: 'hubUrl',
      updated: 'updated',
      violations: 'violations',
    }),
    itemUpdateMutation: () => `animal/update/${types.SET_RETRIEVED}`,
    itemMercureDeletedMutation: () => `animal/del/${delTypes.ANIMAL_DELETE_MERCURE_SET_DELETED}`,
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function(deleted) {
      if (!deleted) {
        return;
      }

      this.$router.push({ name: 'AnimalList' });
    },
    // eslint-disable-next-line object-shorthand,func-names
    mercureDeleted: function(deleted) {
      if (!deleted) {
        return;
      }

      this.$router.push({ name: 'AnimalList' });
    },
  },

  beforeDestroy() {
    this.reset();
  },

  created() {
    this.retrieve(decodeURIComponent(this.$route.params.id));
  },

  methods: {
    ...mapActions({
      createReset: 'animal/create/reset',
      deleteItem: 'animal/del/del',
      delReset: 'animal/del/reset',
      retrieve: 'animal/update/retrieve',
      updateReset: 'animal/update/reset',
      update: 'animal/update/update',
      updateRetrieved: 'animal/update/updateRetrieved',
    }),

    del() {
      if (window.confirm('Are you sure you want to delete this animal?')) {
        this.deleteItem(this.item);
      }
    },

    reset() {
      this.updateReset();
      this.createReset();
    },

    onSendForm() {
      this.update(this.item);
    },
  },
};
</script>
