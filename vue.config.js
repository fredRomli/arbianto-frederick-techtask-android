module.exports = {
  devServer: {
    proxy: {
      "/ingredients": {
        target: "https://a61d556b-57ca-423f-8706-2e8dec75d714.mock.pstmn.io"
      },
      "/recipes": {
        target: "https://a61d556b-57ca-423f-8706-2e8dec75d714.mock.pstmn.io"
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
