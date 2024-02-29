import pycoingecko # wrapper around the CoinGecko API

api_client = pycoingecko.CoinGeckoAPI()

assets = ['bitcoin', 'ethereum', 'solana', 'cardano', 'binancecoin']

prices = api_client.get_price(
    # list of criptocurrencies
    ids=assets,
    # return the usd value for each of the cryptocurrencies listed above
    vs_currencies='usd',
)

# show prices on usd for each of the cryptocurrency list
#print(prices)

avarage = 0

for asset in assets:
    # return name cryptocurrenci and only usd(on type double) value by curren cryptocurrenci
    #print(asset, prices[asset]['usd'])
    avarage += prices[asset]['usd']
    
    
print("Avarage:", avarage/len(assets))

# Waigted avarage 
# (cryptocurrenci price) * (percentage of this cryptocurrency in your wallet where 1% - 0.1, 100% - 1)