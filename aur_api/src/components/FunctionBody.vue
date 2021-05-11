<template>
  <div class="flex py-14 w-full h-full justify-between overflow-hidden select-none">
    <div class="bg-light w-2/5 flex justify-start items-start flex-col overflow-auto h-full">
      <!-- directory list -->
      <div class="cursor-pointer pb-5 pt-3 pl-4 shadow-sm w-full transition duration-300 origin-left flex justify-start items-center" @click="act(value)" :key="index" v-for="(value, index) in Object.keys(actions)">
        <h1 :class="{ 'translate-x-4': action == value }" class="text-deep text-5xl flex-none max-w-full break-words transform transition duration-300">{{ value }}</h1>
        <transition name="fade-left" appear>
          <div v-if="action == value" class="w-8 h-8 flex justify-center items-center ml-4 transition duration-500">
            <box-icon class="w-8 h-8 fill-current text-deep" size="cssSize" type="solid" name="chevron-right" v-pre></box-icon>
          </div>
        </transition>
      </div>
    </div>

    <div class="bg-light w-3/5 max-w-5xl flex-none h-full overflow-y-auto overflow-x-hidden flex justify-center items-center flex-col">
      <h1 :key="progress" class="text-deep text-9xl transition duration-75 absolute mb-28">{{ (progress * 100).toFixed(2) }}%</h1>
      <transition name="fade-up" appear mode="out-in">
        <h1 :key="computedProgress" class="text-deep text-9xl transition duration-300 absolute mt-28">{{ computedProgress }}</h1>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FunctionBody',
    data() {
      return {
        actions: {
          'Update Metadata': `https://api.ampupradio.com:3000/v2?apikey=${process.env.VUE_APP_API_KEY}&action=update_meta`,
          'Update Artwork': `https://api.ampupradio.com:3000/v2?apikey=${process.env.VUE_APP_API_KEY}&action=update_artwork`,
        },
        action: '',
        progress: 0,
        statusUrl:`https://api.ampupradio.com:3000/v2?apikey=${process.env.VUE_APP_API_KEY}&action=get_status`
      };
    },
    computed: {
      computedProgress() {
        if (this.progress >= 0.99) return 'done';
        else if (this.progress > 0.95) return 'so close';
        else if (this.progress > 0.9) return 'almost there';
        else if (this.progress > 0.2) return 'going smooth';
        else if (this.progress > 0.01) return 'started';
        else return 'waiting';
      },
    },
    methods: {
      act(action){
        this.action = '';
        this.action = action;
      },
      async reqStack() {
        if (!this.axios) {
          this.axios = await import(/* webpackChunkName: "axios" */ 'axios');
          this.axios = this.axios.default;
          this.axios = this.axios.create({
            timeout: 8000,
          });
        }
      },
      async runAction() {
        this.$emit('loading');
        let action = this.action;
        try {
          if (Object.keys(this.actions).includes(action)) {
            await this.axios.get(this.actions[action], {
              responseType: 'json',
            });
            this.updateStatus();
            this.$emit('loaded');
          } else {
            return null;
          }
        } catch (e) {
          console.error(e);
          this.$emit('axiosError');
          return null;
        }
      },
      async updateStatus(){
         try {
          let res = await this.axios.get(this.statusUrl, {
            responseType: 'json',
          });

          this.progress = res.data.response.current / res.data.response.total;

          if(this.progress < 1) {
            setTimeout(this.updateStatus,500);
          }
          else{
            res = await this.axios.get(this.statusUrl, {
              responseType: 'json',
            });
            this.progress = res.data.response.current / res.data.response.total;
          }
          console.log(res);
        } catch (e) {
          console.error(e);
          this.$emit('axiosError');
          return null;
        }
      }
    },
    watch: {
      action: function(){
        this.runAction();
      }
    },
    async created() {
      await this.reqStack();
    },
    async mounted() {},
  };
</script>

<style scoped>
  .contentOptim {
    content-visibility: auto;
    contain-intrinsic-size: 1rem 12rem;
  }
</style>
