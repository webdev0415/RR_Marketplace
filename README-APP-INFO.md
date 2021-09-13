# Marketplace App Info


### CARS and GASSTATIONS TABLE - Marketplace Related Fields

**saleStatus** (smallint) - (1) For Sale, (2) Sale Pending, (3) Transfer Pending, (4) Payment Pending, (5) Not for Sale 
- For Sale - asset is available to purchase 
- Sale Pending - asset is on hold for a certain user, waiting for payment 
- Transfer Pending - payment received, waiting for NFT to be sent to the user on the blockchain 
- Payment Pending - payment sent from the buyer, waiting for the confirmation from the alchemy through webhook
- Not for Sale - asset is not available to purchase 

### TRANSACTIONS TABLE

**transactionId** - unique transaction Id that maps to saleCurrentTransactionId in the cars / gasstations table IF this transaction is the current transaction. Otherwise this will act as a record of a past transaction.

**saleType** (smallint) - (1) Public Sale, (2) Private Sale 

**saleStart** (time date in UTC) - when to allow the asset to be for sale, this will be very important for our drops, when we will allow the public to start buying at a certain time/day 

**saleEnd** (time date in UTC)  

**saleStartTimeStamp** - used when a sale is pending 

**saleBuyerEthAddress** - buyer in process 

**privateSaleBuyerEthAddress** - the ethAddress of the ONLY person allowed to buy an asset when the saleType is (2) Private Sale  

**saleLastCurrency** - ETH / RIOT 

**saleLastPrice** - amount 

**saleLastDate** - date of last sale 

### GLOBAL SETTINGS TABLE

**settingNumber** - in seconds for the settingName: "timeToCompletePayment"
