### Marketplace BUY

This part of the Marketplace App takes over when the user clicks "BUY NOW" on an asset.

We will use MySQL’s Isolation Level of REPEATABLE READ (the default) combined with Row Level Locking with Transactions to solve 
our concurrency problem. When updates are performed using Transactions, MySQL automatically uses row level locking. This will allow 
us to place a "hold" on a specific car, for a specific user.

In order to ensure that MySQL transactions are being used, we will create a manual/raw query with Sequelize. Be sure parameterize the queries 
where possible to prevent sql injection. To be clear - do not use Sequelize Transactions for this part, use MySQL native transactions. 
https://sequelize.org/master/manual/raw-queries.html

Here is an example of a MySQL transaction query: 
```
START TRANSACTION; 
SELECT @A:=SUM(salary) FROM table1 WHERE type=1; 
UPDATE table2 SET summary=@A WHERE type=1; 
COMMIT; 
```

After the hold has been placed on the car, it will then show when the user clicks on the "My Pending Sales" on the left menu.

From this Pending Sales list, the user will click on "PAY NOW" and be prompted to complete a blockchain payment transaction using the 
MetaMask browser extension.

For this version of the app we will allow payments from the Ethereum Mainnet in ETH only. The reason for this is because the Matic/Polygon 
blockchain has recently proven to be unreliable for transactions that need to completed ASAP and the network can become slow and clogged.

We will also create a webhook using Alchemy (a blockchain service at www.alchemy.com) that will alert us when a payment is received. So we 
will need to create an endpoint to receive this and update the database.

**Preparation work:** 

1. Update Cars and Gas Stations Table https://trello.com/c/SJC83IVU
2. Create MarketplaceLog Table https://trello.com/c/B33bQ1sI
3. Create GlobalSettings Table https://trello.com/c/EbLrgvgt
4. Update Marketplace Endpoint to Return Correct Data https://trello.com/c/U3HIR7sZ
5. 

**PROCESS:** 

1. Buy Now endpoint is called when user clicks buy now on an asset (car / gas station), database is updated to "Sale Pending" and holds 
asset for user for GlobalSettings "timeToCompletePayment" settingNumber value in minutes. https://trello.com/c/IeO8LrH4

2. User clicks on "Pending Sales" in the left menu bar. User selects "PAY NOW" on item they are buying. Prompts blockchain transaction to send in payment. https://trello.com/c/vIzgaBQ8 

3. Every 10 seconds, MySQL Scheduled Event runs, checks for expired pending sale assets, sets them back to saleStatus=1 (available to purchase). https://trello.com/c/1w3TkzQv 

4. A webhook endpoint listens for completed payments, applies payments to the oldest purchased items at a time, based on the sale price (two items, 
same price, payment applied first to first item purchased). Update Cars / Gas Stations Table saleLastCurrency, saleLastPrice, saleLastDate. This is a 
backup in case the on page payment process does not register the payment complete. https://trello.com/c/nxNPC6HM 

5. After payment is made, saleStatus is updated to "Transfer Pending". Item is now in the queue to be transferred on the blockchain to the user. 

6. Stand alone CLI Node JS app runs that submits blockchain transaction to send asset to user. Update Cars / Gas Stations Table saleStatus = 4 (not for sale). 

**Note: MarketplaceLog updated at every step in the process.**


