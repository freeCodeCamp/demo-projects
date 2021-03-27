var stockData = {};

/////////// socket connection ////////////
// const socket = io.connect('http://localhost:50035'); // local
const socket = io.connect('https://chart-the-stock-market.freecodecamp.rocks/'); // .rocks

//////////// query DOM ////////////
const symbolInput = document.getElementById('symbolInput'),
  getStockBtn = document.getElementById('getStockBtn'),
  stockCanvas = document.getElementById('stockCanvas'),
  allElements = document.getElementsByTagName('*');

let loading = true;
startLoading();

//////////// local functions ////////////
function startLoading() {
  loading = true;

  for(var i=0; i<allElements.length; i++) {
    allElements[i].classList.add('wait');
  }
}

function doneLoading() {
  for(var i=0; i<allElements.length; i++) {
    allElements[i].classList.remove('wait');
  }
  loading = false;
}

function emitNewStock() {
  if(!loading) {
    startLoading();

    socket.emit('newStock', {
      symbol: symbolInput.value.toUpperCase()
    });
  }
}

function deleteStock(symbol) {
  if(!loading) {
    startLoading();
    socket.emit('deleteStock', {
      symbol: symbol
    });
  }
}

getStockBtn.addEventListener('click', emitNewStock);
symbolInput.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) {
    emitNewStock();
   }
});

//////////// chart ////////////
var myChart = new Chart(document.getElementById("stockCanvas"), {
  type: 'line',
  data: {},
    options: {
    scales:{
      xAxes:[{
        gridLines:{
          color:'#999' 
        },
        ticks:{
          fontColor: 'black' 
        }
      }],
      yAxes:[{
        gridLines:{
          color: '#999'
        },
        ticks:{
          fontColor:'black'
        },
        scaleLabel: {
          display: true,
          labelString: 'Price (USD)'
        }
      }],
    },
    responsive: false,
    legend: {
      display: true,
        'onClick': function (evt, item) {
        deleteStock(item.text);
      },
      'onHover': function() {
        stockCanvas.style.cursor = 'pointer';
      },
      labels: {
        fontColor: 'black'
      },
    },
    hover: {
      onHover: function() {
        stockCanvas.style.cursor = 'default';
      }
    }
  }
});

//////////// from server ////////////
socket.on('stopLoading', doneLoading);

//see this link for example response data
//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo
socket.on('updateStockData', function(newStockData) {
  stockData = JSON.parse(newStockData);
  let datasets = [];
  const stockSymbols = Object.keys(stockData);
  const colors = ['white','black','#666'];
  let stockDays;

  if (Object.keys(stockSymbols).length === 0) {
    myChart.data.datasets = {};
    myChart.update();
    doneLoading();
  } else {
    stockSymbols.forEach((symbol, i) => {
      // create array of days
      stockDays = Object.keys(stockData[symbol]);
      let stockValues = [];

      // create array of prices
      stockDays.forEach(day => {
        stockValues.push(stockData[symbol][day]["4. close"]);
      });

      //create object to push to datasets - to use in the chart
      let tempDataset = {};
      tempDataset.data = stockValues.reverse();
      tempDataset.label = symbol;
      tempDataset.borderColor = colors[i];
      tempDataset.fill = false;
      datasets.push(tempDataset);
    });

    //send data to chart
    myChart.data.labels = stockDays.reverse();
    myChart.data.datasets = datasets;
    myChart.update();

    doneLoading();
  }
});
