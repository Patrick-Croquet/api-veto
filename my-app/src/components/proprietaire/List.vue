<template>
  <div>
    <h1>Proprietaire List</h1>

    <div
      v-if="isLoading"
      class="alert alert-info">Loading...</div>
    <div
      v-if="deletedItem"
      class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div>
    <div
      v-if="mercureDeletedItem"
      class="alert alert-success">{{ mercureDeletedItem['@id'] }} deleted by another user.</div>
    <div
      v-if="error"
      class="alert alert-danger">{{ error }}</div>

    <p>
      <router-link
        :to="{ name: 'ProprietaireCreate' }"
        class="btn btn-primary">Create</router-link>
    </p>

    <table class="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>nomProprietaire</th>
          <th>prenomProprietaire</th>
          <th>animals</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item['@id']">
          <th scope="row">
            <router-link
              v-if="item"
              :to="{name: 'ProprietaireShow', params: { id: item['@id'] }}">
              {{ item['@id'] }}
            </router-link>
          </th>
        <td>
            {{ item['nomProprietaire'] }}
        </td>
        <td>
            {{ item['prenomProprietaire'] }}
        </td>
        <td>
            <template>
              <div
                v-if="Array.isArray(item['animals'])">
                <router-link
                  v-for="link in item['animals']"
                  :key="link['@id']"
                  :to="{ name: 'AnimalShow', params: { id: link['@id'] } }">
                  {{ link['@id'] }}
                </router-link>
              </div>
              <router-link
                v-else
                :to="{ name: 'AnimalShow', params: { id: item['animals'] } }">
                {{ item['animals'] }}
              </router-link>
            </template>
        </td>
          <td>
            <router-link
              :to="{name: 'ProprietaireShow', params: { id: item['@id'] }}">
              <span
                class="fa fa-search"
                aria-hidden="true"></span>
              <span class="sr-only">Show</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'ProprietaireUpdate', params: { id: item['@id'] }}">
              <span
                class="fa fa-pencil"
                aria-hidden="true"></span>
              <span class="sr-only">Edit</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation" v-if="view">
      <router-link
        :to="view['hydra:first'] ? view['hydra:first'] : 'ProprietaireContactList'"
        :class="{ disabled: !view['hydra:previous'] }"
        class="btn btn-primary"
        aria-label="First page">
        <span aria-hidden="true">&lArr;</span> First
      </router-link>
      &nbsp;
      <router-link
        :to="!view['hydra:previous'] || view['hydra:previous'] === view['hydra:first'] ? 'ProprietaireList' : view['hydra:previous']"
        :class="{ disabled: !view['hydra:previous'] }"
        class="btn btn-primary"
        aria-label="Previous page">
        <span aria-hidden="true">&larr;</span> Previous
      </router-link>

      <router-link
        :to="view['hydra:next'] ? view['hydra:next'] : '#'"
        :class="{ disabled: !view['hydra:next'] }"
        class="btn btn-primary"
        aria-label="Next page">
        Next <span aria-hidden="true">&rarr;</span>
      </router-link>

      <router-link
        :to="view['hydra:last'] ? view['hydra:last'] : '#'"
        :class="{ disabled: !view['hydra:next'] }"
        class="btn btn-primary"
        aria-label="Last page">
        Last <span aria-hidden="true">&rArr;</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import ListWatcher from '../../mixins/ListWatcher';
import * as types from '../../store/modules/proprietaire/list/mutation_types'
import * as delTypes from '../../store/modules/proprietaire/delete/mutation_types';

export default {
  mixins: [ListWatcher],
  computed: {
      ...mapFields('proprietaire/del', {
          deletedItem: 'deleted',
          mercureDeletedItem: 'mercureDeleted',
      }),
      ...mapFields('proprietaire/list', {
          error: 'error',
          items: 'items',
          hubUrl: 'hubUrl',
          isLoading: 'isLoading',
          view: 'view',
      }),
      itemUpdateMutation: () => `proprietaire/list/${types.UPDATE_ITEM}`,
      itemDeleteMutation: () => `proprietaire/list/${types.DELETE_ITEM}`,
      itemMercureDeletedMutation: () => `proprietaire/del/${delTypes.PROPRIETAIRE_DELETE_MERCURE_SET_DELETED}`,
  },

  mounted() {
    this.getPage();
  },

  methods: {
    ...mapActions({
      getPage: 'proprietaire/list/default',
    }),
  },
};
</script>
