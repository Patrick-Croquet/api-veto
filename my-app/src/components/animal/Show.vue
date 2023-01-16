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
            <th scope="row">nomAnimal</th>
            <td>{{ item['nomAnimal'] }}</td>
          </tr>
          <tr>
            <th scope="row">proprietaire</th>
            <td>{{ item['proprietaire'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link
      :to="{ name: 'AnimalList' }"
      class="btn btn-primary">
      Back to list
    </router-link>
    <router-link
      v-if="item"
      :to="{ name: 'AnimalUpdate', params: { id: item['@id'] } }"
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
import * as types from '../../store/modules/animal/show/mutation_types';
import * as delTypes from '../../store/modules/animal/delete/mutation_types';

export default {
  mixins: [ItemWatcher],
  computed: {
    ...mapFields('animal/del', {
      deleteError: 'error',
      deleted: 'deleted',
      mercureDeleted: 'mercureDeleted',
    }),
    ...mapFields('animal/show', {
      error: 'error',
      isLoading: 'isLoading',
      item: 'retrieved',
      hubUrl: 'hubUrl',
    }),
    itemUpdateMutation: () =>`animal/show/${types.ANIMAL_SHOW_SET_RETRIEVED}`,
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

  beforeDestroy () {
    this.reset();
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id));
  },

  methods: {
    ...mapActions({
      deleteItem: 'animal/del/del',
      reset: 'animal/show/reset',
      retrieve: 'animal/show/retrieve',
    }),

    del() {
      if (window.confirm('Are you sure you want to delete this animal?')) {
        this.deleteItem(this.item);
      }
    },
  },
};
</script>
