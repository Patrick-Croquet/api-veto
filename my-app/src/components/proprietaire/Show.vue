<template>
  <div>
    <h1>Show Book {{ item && item['@id'] }}</h1>

    <div
      v-if="isLoading"
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
    <div
      v-if="item"
      class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">nomProprietaire</th>
            <td>{{ item['nomProprietaire'] }}</td>
          </tr>
          <tr>
            <th scope="row">prenomProprietaire</th>
            <td>{{ item['prenomProprietaire'] }}</td>
          </tr>
          <tr>
            <th scope="row">animals</th>
            <td>{{ item['animals'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link
      :to="{ name: 'ProprietaireList' }"
      class="btn btn-primary">
      Back to list
    </router-link>
    <router-link
      v-if="item"
      :to="{ name: 'ProprietaireUpdate', params: { id: item['@id'] } }"
      class="btn btn-warning">
      Edit
    </router-link>
    <button
      class="btn btn-danger"
      @click="del">Delete</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import ItemWatcher from '../../mixins/ItemWatcher';
import * as types from '../../store/modules/proprietaire/show/mutation_types';
import * as delTypes from '../../store/modules/proprietaire/delete/mutation_types';

export default {
  mixins: [ItemWatcher],
  computed: {
    ...mapFields('proprietaire/del', {
      deleteError: 'error',
      deleted: 'deleted',
      mercureDeleted: 'mercureDeleted',
    }),
    ...mapFields('proprietaire/show', {
      error: 'error',
      isLoading: 'isLoading',
      item: 'retrieved',
      hubUrl: 'hubUrl',
    }),
    itemUpdateMutation: () =>`proprietaire/show/${types.PROPRIETAIRE_SHOW_SET_RETRIEVED}`,
    itemMercureDeletedMutation: () => `proprietaire/del/${delTypes.PROPRIETAIRE_DELETE_MERCURE_SET_DELETED}`,
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function(deleted) {
      if (!deleted) {
        return;
      }

      this.$router.push({ name: 'ProprietaireList' });
    },
    // eslint-disable-next-line object-shorthand,func-names
    mercureDeleted: function(deleted) {
      if (!deleted) {
        return;
      }

      this.$router.push({ name: 'ProprietaireList' });
    },
  },

  beforeDestroy () {
    this.reset();
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id));
  },

  methods: {
    ...mapActions({
      deleteItem: 'proprietaire/del/del',
      reset: 'proprietaire/show/reset',
      retrieve: 'proprietaire/show/retrieve',
    }),

    del() {
      if (window.confirm('Are you sure you want to delete this proprietaire?')) {
        this.deleteItem(this.item);
      }
    },
  },
};
</script>
