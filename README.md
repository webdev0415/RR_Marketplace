### Riot Racer Marketplace OVERVIEW Document

**Problem:** We have done two drops with OpenSea (the most popular NFT marketplace) and both had extensive problems. We attemped to fix 
Drop #2 by allowing people to sign up with a Google form to get on a whitelist drop. The people that made it on to the whitelist 
where told to go bid on the car they got on OpenSea and then we would accept their bid. But OpenSea had problems with their bid acceptance 
system for Matic assets and gave the wrong person the car when we clicked accept. Bottom line - we cannot use or rely on OpenSea anymore for 
drops or car distributions.

**Solution:** We need to build our own marketplace, something similar to Ticketmaster, that allows people to temporarily hold their "place in line" 
until the payment is completed.

**Summary:** We will build our own marketplace that will start out with the minimum set of features and then expand. The biggest issue that we face 
is when the drop starts there are thousands of people trying to buy 500 cars for example - and the matic blockchain cannot handle that much volume yet. 
Se we need to create a way for people to buy and then have X amount of time, say 15 mins, to pay, before the car goes back to the available pool to be 
purchased. And we need to allow them to pay ~~on matic/polygon and~~ on ETH mainnet. To solve this problem users will select a car, click BUY NOW, and we 
will hold that car for X mins while the user completes the payment. We will then detect that they have paid, and add them to the list of cars 
that needs to be transferred.

The main concern in building this is to make sure that it can handle thousands, and eventually tens of thousands, of users trying to buy a limited number 
of items.

**BROWSE** 

1. Ability for users to browse what cars are for sale, filter by Factory Model, Price (low to high, and high to low)
- source data for this should be the cars db, with internal flags allowing us to set what car numbers are for sale and when (what day/time).
- button near the image of the car for "BUY NOW" that will reserve in the database that car for them, placing the car in their "shopping cart".
Example car listing on OpenSea's marketplace: https://opensea.io/assets/matic/0x82bbf7be0eb9a6024b7a641ba179e00812bdae53/524

**BUY** 

2. Users will click BUY NOW on a specific car. That car will then be placed "on hold" (in their "shopping cart" for that specific user, and will 
be marked "Sale Pending" and show the timer countdown. The user will then have 15 mins to complete payment for that car. If they do not complete it, 
the car will go back to being available to buy. If the user completes the payment within the 15 mins, the car will then be placed in a 
"Transfer Pending" state. 

NOTE: The time given for people to pay needs to be a setting that we can increase or decrease. For example, during Asset Drops we may increase this 
time period to 60 mins to accomodate for network slowness/congestion. 

We will add a section in Marketplace (from the left side menu) called "Pending Sales". When a user clicks here they will be show the assets that 
they need to complete the purchase for. It is here that they will be able to click "PAY" and process the crypto payment for the asset.

We will add a webhook listener that will report payments that are received. And when we see a payment has come in, we will update the asset to 
"Payment Received. Transfer Pending".

**SEND** 

3. After the car(s) have been marked as ready to be transferred, we need a process to complete the transfer of these cars to the buyers.
- the manual process to complete is to create a transaction that calls the NFT contract of the cars, and calls the SafeTransfer method that 
transfers the car NFT from the RR wallet to the users wallet address.
- Create a simple stand alone Node JS CLI app that takes an argument of the public and private key for the RR blockchain wallet, queries the db for the list that needs to be transferred, and moves through them one by one. With each one that needs to be transferred a matic/polygon blockchain transaction is created and then submited to the matic/polygon blockchain using Infura.io as the network connection. Jared has written Node JS code to do this before, so he can help.
