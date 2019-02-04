<template>
  <v-list>

    <v-list-tile exact to="/account">
      <v-list-tile-action>
        <v-icon>mdi-account</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile exact to="/account/security">
      <v-list-tile-action>
        <v-icon>mdi-shield-check</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Security</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile exact to="/account/devices">
      <v-list-tile-action>
        <v-icon>mdi-cellphone-link</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Devices</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile exact to="/account/audit">
      <v-list-tile-action>
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Audit log</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

  </v-list>
</template>
