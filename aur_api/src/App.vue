<template>
  <div class="h-screen grid grid-rows-8">
    <div class="row-start-1 row-end-2 flex justify-end items-center px-20 py-8 text-3xl space-x-10 z-10">
      <router-link to="/">Search Directory</router-link>
      <router-link to="/functions">Server Functions</router-link>
    </div>
    <router-view class="row-start-2 row-end-9 z-50 transition duration-300" />
    <div class="h-screen w-screen absolute z-0">
      <div class="relative w-full h-full">
        <div class="w-128 h-128 bg-gradient-to-br from-pink-light to-purple-light rounded-full absolute top-16 -left-24"></div>
        <div class="w-128 h-128 bg-gradient-to-b from-pink-light to-purple-light rounded-full absolute -bottom-128 right-24 transform scale-150"></div>
      </div>
    </div>
  </div>
</template>
