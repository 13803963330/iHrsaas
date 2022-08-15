<template>
  <UploadImg @onSuccess="onSuccess1"></UploadImg>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {},
  methods: {
    onSuccess1({ url }) {
      console.log(url)
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
