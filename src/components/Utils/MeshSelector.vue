<template>
  <div class="px-4 pb-4">
    <div v-if="items">
      <h3 class="menu-title uppercase">
        Filter by Mesh:
      </h3>
      <select
        id="mesh-selector"
        class="mesh-selector"
        name="mesh-selector"
        @change="changeMesh"
      >
        <option
          value="all"
          :selected="'all' === selectedMesh"
        >
          All Meshes
        </option>
        <option
          v-for="item in items.items"
          :key="item.name"
          :value="item.name"
          :selected="item.name === selectedMesh"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <KAlert
      v-else
      appearance="danger"
      alert-message="No meshes found!"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MeshSelector',
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      selectedMesh: (state) => state.selectedMesh,
    }),
  },
  methods: {
    changeMesh(event) {
      const val = event.target.value

      // update the selected mesh in the store
      this.$store.dispatch('updateSelectedMesh', val)

      // push the update mesh param to the route
      // explanation of hack https://github.com/vuejs/vue-router/issues/2872
      this.$router
        .push({
          params: {
            mesh: val,
          },
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.mesh-selector {
  display: block;
  width: 100%;
  color: var(--MeshSelectorInputTextColor);
  border-color: var(--MeshSelectorInputBorderColor);
  outline: none;

  &:focus,
  &:active {
    border-color: var(--MeshSelectorInputBorderColorFocus);
  }
}

.menu-title {
  display: block;
  font-size: var(--type-sm);
  font-weight: 500;
  color: var(--MeshSelectorTitleColor);
  margin: 0 0 5px 0;
}
</style>
