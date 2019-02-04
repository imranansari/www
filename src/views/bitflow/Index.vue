<template>
  <blm-bitflow-downloads v-if="$store.state.session" />
  <blm-landing-bitflow v-else/>
</template>
