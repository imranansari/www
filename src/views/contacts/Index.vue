<template>
  <blm-contacts-contacts v-if="$store.state.session" />
  <blm-landing-contacts v-else />
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Index extends Vue {
  // props
  // data
  // computed
  // lifecycle
  // watch
  // methods
}
</script>


<style scoped lang="scss">
</style>
