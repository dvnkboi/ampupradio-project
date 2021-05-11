<template>
  <div class="h-full w-full z-50">
    <FunctionBody class="transition duration-500" />
  </div>
</template>

<script>
  import FunctionBody from '../components/FunctionBody';

  export default {
    name: 'Functions',
    components: {
      FunctionBody,
    },
  };
</script>
