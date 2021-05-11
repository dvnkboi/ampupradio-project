<template>
  <div class="flex py-14 w-full h-full justify-between overflow-hidden select-none">
    <div class="bg-light w-2/5 flex justify-start items-start flex-col overflow-auto h-full">
      <!-- directory list -->
      <transition-group name="fade-left" tag="ul" class="w-full flex-grow">
        <div @click="entity = value" class="cursor-pointer pb-5 pt-3 pl-4 shadow-sm w-full transition duration-300 origin-left flex-grow flex justify-start items-center" :key="index" v-for="(value, index) in Object.keys(entities)">
          <h1 :class="{ 'translate-x-4': entity == value }" class="text-deep text-5xl flex-none max-w-full break-words transform transition duration-300">{{ value }}</h1>
          <transition name="fade-left" appear>
            <div v-if="entity == value" class="w-8 h-8 flex justify-center items-center ml-4 transition duration-500">
              <box-icon class="w-8 h-8 fill-current text-deep" size="cssSize" type="solid" name="chevron-right" v-pre></box-icon>
            </div>
          </transition>
        </div>
      </transition-group>
    </div>
    <div class="bg-light w-3/5 max-w-5xl flex-none h-full overflow-y-auto overflow-x-hidden">
      <!-- search -->
      <div class="h-20 shadow-md flex justify-between items-center w-full relative">
        <input class="outline-none focus:outline-none bg-transparent text-deep w-full h-full text-5xl pl-4" type="text" v-model="searchString" />
        <box-icon class="w-12 h-12 fill-current text-deep float-right mr-4" size="cssSize" name="search" v-pre></box-icon>
      </div>

      <!-- song list -->
      <div v-if="resultSet != [] && resultSet[0]?.artist" class="flex justify-start items-start flex-col overflow-x-hidden w-full">
        <transition-group name="fade-left" tag="ul" class="w-full overflow-hidden">
          <div class="contentOptim h-48 pb-5 pt-3 pl-4 flex justify-center items-start flex-col shadow-sm w-full transition duration-300 origin-left relative capitalize" :key="index" v-for="(value, index) in resultSet">
            <span class="flex justify-start items-center">
              <transition name="fade-left" appear mode="out-in">
                <div v-if="value.artist" :key="value.artist" class="flex justify-start items-center transition duration-300">
                  <box-icon class="w-8 h-8 fill-current text-pink-light" size="cssSize" type="solid" name="user" v-pre></box-icon>
                  <div>
                    <h1 class="text-deep text-4xl flex-none max-w-full break-words pl-2">{{ value.artist }}</h1>
                  </div>
                </div>
              </transition>
            </span>
            <span class="flex-none">
              <span class="w-full flex justify-start items-center">
                <span class="flex justify-start items-center">
                  <transition name="fade-left" appear mode="out-in">
                    <div v-if="value.title" :key="value.title" class="flex justify-start items-center transition duration-300">
                      <box-icon class="w-8 h-8 fill-current text-pink-light" size="cssSize" type="solid" name="music" v-pre></box-icon>
                      <div>
                        <h1 class="text-deep text-4xl max-w-full break-words pl-2">{{ value.title }}</h1>
                      </div>
                    </div>
                  </transition>
                </span>
              </span>
              <span class="flex justify-start items-center">
                <transition name="fade-left" appear mode="out-in">
                  <div v-if="value.album" :key="value.album" class="flex justify-start items-center transition duration-300">
                    <box-icon class="w-8 h-8 fill-current text-pink-light" size="cssSize" type="solid" name="disc" v-pre></box-icon>
                    <div>
                      <h1 class="text-deep text-4xl max-w-full break-words pl-2">{{ value.album }}</h1>
                    </div>
                  </div>
                </transition>
              </span>
            </span>
            <div class="absolute right-2 bottom-2 flex justify-center items-center">
              <transition name="fade-up" appear mode="out-in">
                <h1 v-if="value.duration" :key="value.duration" class="text-deep text-xl max-w-full break-words transition duration-300">duration {{ Math.floor(value.duration / 60) }}min {{ Math.floor(value.duration - Math.floor(value.duration / 60) * 60) }}sec</h1>
              </transition>
              <transition name="fade-up" appear mode="out-in">
                <h1 v-show="value.date_played" :key="value.date_played" class="px-4 text-deep transition duration-300">-</h1>
              </transition>
              <transition name="fade-up" appear mode="out-in">
                <h1 v-show="value.date_played" :key="value.date_played" class="text-deep text-xl max-w-full break-words transition duration-300">played on {{ value.date_played?.replace('T', ' - ').split('.')[0] }}</h1>
              </transition>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- pagination -->
      <div class="w-full overflow-hidden flex justify-center items-center text-3xl capitalize relative">
        <div class="absolute h-full w-full pointer-events-none flex justify-start items-center">
          <h1 class="text-deep px-4">items/page</h1>
          <input class=" pointer-events-auto outline-none focus:outline-none bg-transparent text-deep w-14 h-14 text-center bg-light shadow-lg" type="number" v-model="currentLimit" />
        </div>
        <div :class="[page - 1 < 0 ? ['opacity-0', 'pointer-events-none'] : '']" @click="currentPage--" class="cursor-pointer h-14 w-14 flex justify-center items-center shadow-lg my-6 mx-3 bg-light transition duration-300">
          <box-icon class="w-8 h-8 fill-current text-pink-light" size="cssSize" type="solid" name="chevron-left" v-pre></box-icon>
        </div>
        <div class="cursor-pointer appearance-none h-14 w-40 flex justify-center space-x-4 items-center  transition duration-300">
          <input class="outline-none focus:outline-none bg-transparent text-deep w-14 h-14 text-center bg-light shadow-lg" type="number" v-model="currentPage" />
          <h1 class="text-pink-light opacity-70">/</h1>
          <h1 class="text-deep opacity-70">{{ maxPage }}</h1>
        </div>
        <div :class="[page + 1 > Math.floor(totalRes / limit) ? ['opacity-0', 'pointer-events-none'] : '']" @click="currentPage++" class="cursor-pointer h-14 w-14 flex justify-center items-center shadow-lg my-6 mx-3 bg-light transition duration-300">
          <box-icon class="w-8 h-8 fill-current text-pink-light" size="cssSize" type="solid" name="chevron-right" v-pre></box-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MainBody',
    data() {
      return {
        resultSet: [],
        searchString: '',
        valueTimeout: null,
        totalRes: 1,
        currentCount: 1,
        axios: null,
        currentPage: 1,
        page: 0,
        pageTimeout: null,
        currentLimit: 20,
        limit: 20,
        limitTimeout: null,
        entity: '',
        discoveryUrl: `https://api.ampupradio.com:3000/v2?apikey=${process.env.VUE_APP_API_KEY}&action=get`,
        entities: {
          queuelist: `https://api.ampupradio.com:3000/v2?apikey=${process.env.VUE_APP_API_KEY}&action=get&entity=queuelist&sortref=ID&sortdir=desc`,
          songs: `https://api.ampupradio.com:3000/v2?apikey=${process.env.VUE_APP_API_KEY}&action=get&entity=songs&sortref=ID&sortdir=desc`,
          history: `https://api.ampupradio.com:3000/v2?apikey=${process.env.VUE_APP_API_KEY}&action=get&entity=history&sortref=ID&sortdir=desc`,
        },
        tries: 3,
        internal_tries: 3,
      };
    },
    computed: {},
    methods: {
      async getEntity() {
        let entity = this.entity;
        let limit = '&limit=' + this.limit;
        let page = '&page=' + this.page;
        this.$emit('loading');
        try {
          if (Object.keys(this.entities).includes(entity)) {
            let res = await this.axios.get(this.entities[entity] + limit + page, {
              responseType: 'json',
            });
            this.resultSet = res.data.response.resultSet;
            this.totalRes = res.data.found;
            this.currentCount = res.data.response.numOfRows;
            this.maxPage = Math.ceil(res.data.found / this.limit);
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
      async search() {
        if (this.searchString != '') {
          let limit = '&limit=' + this.limit;
          let page = '&page=' + this.page;
          let entity = this.entity;
          this.$emit('loading');
          try {
            if (Object.keys(this.entities).includes(entity)) {
              let artists = await this.axios.get(this.entities[entity] + '&identifier=artist' + '&refs=' + this.searchString + limit + page, {
                responseType: 'json',
              });
              let songs = await this.axios.get(this.entities[entity] + '&identifier=title' + '&refs=' + this.searchString + limit + page, {
                responseType: 'json',
              });
              let albums = await this.axios.get(this.entities[entity] + '&identifier=album' + '&refs=' + this.searchString + limit + page, {
                responseType: 'json',
              });
              if (!artists || !songs || !albums) {
                if (this.tries) {
                  this.tries--;
                  this.search();
                }
              } else {
                this.resultSet = [...artists.data.response[0].resultSet, ...songs.data.response[0].resultSet, ...albums.data.response[0].resultSet].filter((thing, index, self) => index === self.findIndex((t) => typeof t == 'object' && t.artist === thing.artist && t.title === thing.title && t.album === thing.album));
                this.totalRes = this.currentCount = this.resultSet.length;
                this.$emit('loaded');
              }
            } else {
              return null;
            }
          } catch (e) {
            console.error(e);
            this.$emit('axiosError');
            return null;
          }
        } else {
          this.getEntity();
        }
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
    },
    watch: {
      entity: async function() {
        this.currentPage = 1;
        if (this.searchString != '') await this.search();
        else await this.getEntity();
      },
      page: function() {
        this.getEntity();
      },
      limit: function() {
        this.getEntity();
      },
      searchString: function() {
        if (this.valueTimeout) clearTimeout(this.valueTimeout);
        this.valueTimeout = null;
        this.valueTimeout = setTimeout(this.search, 250);
      },
      currentPage: function(val) {
        if (this.pageTimeout) clearTimeout(this.pageTimeout);
        this.pageTimeout = null;
        this.pageTimeout = setTimeout(() => {
          if (val != '') this.page = val - 1;
          else this.page = 0;
        }, 250);
      },
      currentLimit: function(val) {
        if (this.limitTimeout) clearTimeout(this.limitTimeout);
        this.limitTimeout = null;
        this.limitTimeout = setTimeout(() => {
          if (val != '') this.limit = val;
          else this.limit = 20;
        }, 250);
      },
    },
    async created() {
      await this.reqStack();
      this.entity = 'history';
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
