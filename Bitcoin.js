$(function() {
  $( '#now_date' ).html( new Date() );
  var data_Coincheck = {};
  var data_bitFlyer;
  var data_Zaif;
  var data_BtcBox;
  var data_Quoinex;
  var data_bitbank;
  $.ajaxSetup({ async: false });
  $.getJSON('https://coincheck.com/api/ticker', function(Coincheck) {
    data_Coincheck = Coincheck;
    $( '#bid_Coincheck' ).html( Coincheck.bid );
    $( '#ask_Coincheck' ).html( Coincheck.ask );
    $( '#spread_Coincheck' ).html( Math.floor( Coincheck.ask - Coincheck.bid )  );
  });
  console.log(data_Coincheck);
  $.getJSON('https://api.bitflyer.jp/v1/ticker', function(bitFlyer) {
    data_bitFlyer = bitFlyer;
    $( '#bid_bitFlyer' ).html( bitFlyer.best_bid );
    $( '#ask_bitFlyer' ).html( bitFlyer.best_ask );
    $( '#spread_bitFlyer' ).html( Math.floor( bitFlyer.best_ask - bitFlyer.best_bid )  );
  });
  $.getJSON('https://api.zaif.jp/api/1/ticker/btc_jpy', function(Zaif) {
    data_Zaif = Zaif;
    $( '#bid_Zaif' ).html( Zaif.bid );
    $( '#ask_Zaif' ).html( Zaif.ask );
    $( '#spread_Zaif' ).html( Math.floor( Zaif.ask - Zaif.bid )  );
  });
  $.getJSON('https://www.btcbox.co.jp/api/v1/ticker/', function(BtcBox) {
    data_BtcBox = BtcBox;
    $( '#bid_BtcBox' ).html( BtcBox.buy );
    $( '#ask_BtcBox' ).html( BtcBox.sell );
    $( '#spread_BtcBox' ).html( Math.floor( BtcBox.sell - BtcBox.buy )  );
  });
  $.getJSON('https://api.quoine.com/products/5', function(Quoinex) {
    data_Quoinex = Quoinex;
    $( '#bid_Quoinex' ).html( Quoinex.market_bid );
    $( '#ask_Quoinex' ).html( Quoinex.market_ask );
    $( '#spread_Quoinex' ).html( Math.floor( Quoinex.market_ask - Quoinex.market_bid )  );
  });
  $.getJSON('https://public.bitbank.cc/btc_jpy/ticker', function(bitbank) {
    data_bitbank = bitbank;
    $( '#bid_bitbank' ).html( bitbank.data.buy );
    $( '#ask_bitbank' ).html( bitbank.data.sell );
    $( '#spread_bitbank' ).html( Math.floor( bitbank.data.sell - bitbank.data.buy )  );
  });

  // 取引所のオブジェクトを作る
  const exchanges = [
    { name: 'Coincheck', bid: data_Coincheck.bid, ask: data_Coincheck.ask },
    { name: 'bitFlyer', bid: data_bitFlyer.best_bid, ask: data_bitFlyer.best_ask },
    { name: 'Zaif', bid: data_Zaif.bid, ask: data_Zaif.ask },
    { name: 'BtcBox', bid: data_BtcBox.buy, ask: data_BtcBox.sell },
    { name: 'Quoinex', bid: data_Quoinex.market_bid, ask: data_Quoinex.market_ask },
    { name: 'bitbank', bid: data_bitbank.data.buy, ask: data_bitbank.data.sell }
  ];

  // 一番高く売れる取引所を探す
  exchanges.sort(function(value1, value2) {
    return value2.bid - value1.bid;
  });
  var topBid = exchanges[0];

  // 一番安く買える取引所を探す
  exchanges.sort(function(value1, value2) {
    return value1.ask- value2.ask;
  });
  var topAsk = exchanges[0];


  $( '#top_AskName' ).html( topAsk.name );
  $( '#top_BidName' ).html( topBid.name );

  $( '#top_ask' ).html( Math.floor(topAsk.ask) );
  $( '#top_bid' ).html( Math.floor(topBid.bid) );
  $( '#difference' ).html( Math.floor(topBid.bid - topAsk.ask) );


});
