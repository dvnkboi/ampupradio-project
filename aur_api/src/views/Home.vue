<template>
  <div class="h-full w-full z-50">
    <MainBody class="transition duration-500" />
  </div>
</template>

<script>
  import MainBody from '../components/MainBody';

  export default {
    name: 'Home',
    components: {
      MainBody,
    },
  };
</script>
