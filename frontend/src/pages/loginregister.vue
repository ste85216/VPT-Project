<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">登入/註冊</h1>
      </v-col>
      <v-col cols="12">
        <v-form>
          <v-text-field
          label="帳號"
          variant="outlined"
          minLength="4" maxlength="20" counter
          ></v-text-field>
          <v-text-field
          label="密碼"
          type="password"
          variant="outlined"
          minLength="4" maxlength="20" counter
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.v-col {
  
}
</style>