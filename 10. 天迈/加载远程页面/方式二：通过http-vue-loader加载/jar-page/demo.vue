<template>
  <div class="app-container">
    hello , i am jar page
    {{name}}
    <!-- <user /> -->
  </div>
</template>

<script>
// import User from "ve-framework/views/sys/user";
import Add from "./es6.js";
let name = 'js xdj'
module.exports = {
  name: "sys-user",
  // components: {
  //   User
  // },
  data() {
    return {
      name,
      num:Add(1,2)
    }
  },
};
</script>
