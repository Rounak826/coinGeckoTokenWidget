const widgetContainerStyle = `
    
`;

//define  html template function which for reuse
const tokenDetailCell = (label, value) => {
  return `
            <div
            style="
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            flex: 1;
            padding: 1rem;
            border-radius: 0.5rem;
            background-color: white;
            
            "
        >
            <span style="font-weight: 700">${label}</span>
            <span style="font-size:1.2rem; color: gray; padding: 0 ; margin: 0;">${value}</span>
        </div>
    
    `;
};
const renderWidget = ({
  iconURL = "",
  tokenName = "Not Found",
  symbol = "--",
  market_cap_rank = "--",
  marketCap = "--",
  currentPrice = "--",
  volume24h = "--",
  high24h = "--",
  low24h = "--",
}) => {
  const widgetContainer = document.getElementById("coin-gecko-widget");
  widgetContainer.innerHTML = `
      <div
          style="
          font-family: Arial, Helvetica, sans-serif ;
          position: relative;
          display: flex;
          border-collapse: collapse;
          flex-direction: column;
          border: solid 1px #f7f8f9;
          border-radius: 1rem;
          padding: 1rem;
          max-width: 425px;
          gap: 1rem;
          background-color: #f7f8f9;"
        >
          <div
            style="
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              top: 10px;
              right: 10px;
              width: 2rem;
              height: 2rem;
              border-radius: 1rem;
              background-color: red;
            "
          >
            ${market_cap_rank}
          </div>
          <div
            style="
              width: full;
              display: flex;
              flex-direction: row;
              padding: 0 1rem;
              gap: 2rem;
            "
          >
            <div>
              <img
                src=${iconURL}
                alt="token icon"
              />
            </div>
            <div style="flex: 1">
              <h2 style="padding: 0; margin: 0">${tokenName} <span>(${symbol})</span></h2>
              <span>$ ${currentPrice}</span>
            </div>
          </div>
          <div
            style="
              width: full;
              display: flex;
              flex-wrap: wrap;
              justify-content: stretch;
              gap: 1rem;
              
            "
          >
            ${tokenDetailCell("Market Cap", "$ " + marketCap)}
            ${tokenDetailCell("Volume 24h", "$ " + volume24h)}
            ${tokenDetailCell("24h Highest", "$ " + high24h)}
            ${tokenDetailCell("24h Lowest", "$ " + low24h)}
  
          </div>
        </div>
            `;
};

// Define the function to load CoinGecko token data.
function loadCoinGeckoWidget(tokenName) {
  // Define the API endpoint URL.
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${tokenName.toLowerCase()}`;

  // Make an Fetch request to fetch the token details.
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract the necessary details from the response.
      const tokenName = data?.name;
      const symbol = data?.symbol;
      const market_cap_rank = data?.market_cap_rank;
      const marketCap = data?.market_data?.market_cap?.usd;
      const currentPrice = data.market_data.current_price.usd;
      const volume24h = data.market_data.total_volume.usd;
      const high24h = data.market_data.high_24h.usd;
      const low24h = data.market_data.low_24h.usd;
      const iconURL = data.image.small;
      // Render the data in the widget container.
      renderWidget({
        iconURL,
        tokenName,
        symbol,
        market_cap_rank,
        marketCap,
        currentPrice,
        volume24h,
        high24h,
        low24h,
      });
    })
    .catch((error) => {
      console.error("Error loading token data:", error);
      //render widget with placeholder data
      renderWidget({});
    });
}

//execute on window load
window.onload = function onWindowLoad() {
  //get widget container object
  const widget = document.getElementById("coin-gecko-widget");

  //extract token name from the custom data attribute
  const token = widget.getAttribute("data-token-name");

  //call function to fetch token details
  loadCoinGeckoWidget(token);
};
