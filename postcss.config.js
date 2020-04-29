module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-pxtorem")({
      rootValue: 75,
      propList:['*'],
      minPixelValue: 1,
      selectorBlackList:["weui"],
      exclude: /node_modules/i
    })
  ]
};