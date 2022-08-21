// @ts-check
const vivliostyleConfig = {
  entry: [
    // 目次の生成テスト
    // { rel: 'contents', theme: '20_genkou/_css/main.css' },
    // mdを指定するとMDBPの独自仕様部分と画像類が外れる
    'formattest_chap1.html',
    // 'formattest_chap2.html'
  ], 
  // toc: 'toc.html',
  // tocTitle: '目次',
  output: [
    '30_pdf/merged_output.pdf',
  ],
};

module.exports = vivliostyleConfig;

