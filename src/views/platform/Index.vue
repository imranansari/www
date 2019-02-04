<template>
  <blm-platform-dashboard v-if="$store.state.session" />
  <blm-landing-platform v-else />
</template>
