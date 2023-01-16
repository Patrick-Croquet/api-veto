<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="animal_nomAnimal"
        class="form-control-label">nomAnimal</label>
        <input
          id="animal_nomAnimal"
          v-model="item.nomAnimal"
          :class="['form-control', !isValid('nomAnimal') ? 'is-invalid' : 'is-valid']"
          type="text"
          placeholder="">
      <div
        v-if="!isValid('nomAnimal')"
        class="invalid-feedback">{{ violations.nomAnimal }}</div>
    </div>
    <div class="form-group">
      <label
        for="animal_proprietaire"
        class="form-control-label">proprietaire</label>
        <select
          v-model="item.proprietaire"
          id="animal_proprietaire"
          class="form-control"
        >
          <option v-for="selectItem in proprietaireSelectItems"
                  :key="selectItem['@id']"
                  :value="selectItem['@id']"
                  :selected="isSelected('proprietaire', selectItem['@id'])">{{ selectItem.name }}
          </option>
        </select>
      <div
        v-if="!isValid('proprietaire')"
        class="invalid-feedback">{{ violations.proprietaire }}</div>
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
    this.proprietaireGetSelectItems();
  },

  computed: {
    ...mapFields('proprietaire/list', {
      'proprietaireSelectItems': 'selectItems',
    }),

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
        proprietaireGetSelectItems: 'proprietaire/list/getSelectItems',
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
