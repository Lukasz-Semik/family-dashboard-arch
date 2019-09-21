module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/styles/_base";
          `,
      },
    },
  },
  devServer: {
    port: 8000,
  },
};

// @import "~@/styles/_colors";
//           @import "~@/styles/_base";
//           @import "~@/styles/_mixins";
