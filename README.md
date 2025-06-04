<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0" width="400"></a></p>

## Basic Web3 App

<p align="left">Sample web app for connecting to your metamask and list ETH data by user address using react. Completed with the ff:</p>
<b><p>Frontend:</p></b>
<ul>
    <li>Container and execution button</li>
    <li>Table of last 10 transactions</li>
    <li>Fetched data including address, balance, gas price and block number</li>
    <li>Error and Success alert</li>
    <li>Fetch functionality to interact with the Etherscan API </li>
    <li>Env file for data security</li>
</ul>

<b><p>Backend:</p></b>

<ul>
    <li>Installation of packages (express, dotenv, cors, mongoose, redis)</li>
    <li>Database connections</li>
    <li>Caching</li>
    <li>Models and Controllers for Schemas.</li>
    <li>Env file for data security</li>
</ul>

## Installation

1. Clone the repository
2. After cloning, open `bash` to the file root directory.
3. Open the file in your code editor (vs code, sublime, etc.). Open the terminal in your editor and run `npm install`

## Run Application

1. Navigate to client and server folder individually.
2. Open code editor terminal of each folder then run `npm run dev`
3. Open `localhost:3000` on your browser to view.

## Test Redis CLI

1. For testing redis, open new bash and type "redis-cli"
2. Go to server/services/ethServices.js to get the key needed for testing (Ex. gas_price, balance_<address> and block_number)
3. Make sure to run the app and click the "ETH Data" button first to get the response according to its key.

