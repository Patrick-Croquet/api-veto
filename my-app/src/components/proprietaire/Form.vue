<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="proprietaire_nomProprietaire"
        class="form-control-label">nomProprietaire</label>
        <input
          id="proprietaire_nomProprietaire"
          v-model="item.nomProprietaire"
          :class="['form-control', !isValid('nomProprietaire') ? 'is-invalid' : 'is-valid']"
          type="text"
          placeholder="">
      <div
        v-if="!isValid('nomProprietaire')"
        class="invalid-feedback">{{ violations.nomProprietaire }}</div>
    </div>
    <div class="form-group">
      <label
        for="proprietaire_prenomProprietaire"
        class="form-control-label">prenomProprietaire</label>
        <input
          id="proprietaire_prenomProprietaire"
          v-model="item.prenomProprietaire"
          :class="['form-control', !isValid('prenomProprietaire') ? 'is-invalid' : 'is-valid']"
          type="text"
          placeholder="">
      <div
        v-if="!isValid('prenomProprietaire')"
        class="invalid-feedback">{{ violations.prenomProprietaire }}</div>
    </div>

    <button
      type="submit"
      class="btn btn-success">Submit</button>
  </form>
</template>

<script>
  import { find, get, isUndefined } from 'lodash';
  import { mapActions } from 'vuex';

  export default {
  props: {
    handleSubmit: {
      type: Function,
      required: true,
    },

    values: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      default: () => {},
    },

    initialValues: {
      type: Object,
      default: () => {},
    }
  },

  mounted() {
  },

  computed: {

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    violations() {
      return this.errors || {};
    },
  },

  methods: {
    ...mapActions({
    }),

    isSelected(collection, id) {
      return find(this.item[collection], ['@id', id]) !== undefined;
    },

    isValid(key) {
      return isUndefined(get(this.violations, key));
    },
  },
};
</script>
