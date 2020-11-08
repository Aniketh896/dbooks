# **dbooks**

> An experimental deployed version is available [here](https://dbooks.netlify.app/)

![DBOOKS](https://ipfs.io/ipfs/QmbT7AkgMLkffSYY4V4TvLD6UoTXJnEw4n5SvTDfgpuooZ/dbooks-landing.jpeg)

## Table of Contents

* [About the Project](#about-the-project)
* [Project structure](#project-structure)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Project contributors](#project-contributors)

## About The Project

dbooks is a blockchain based Decentralized EBooks marketplace. This provides an unrestricted and uncensored place for people to buy and sell ebooks. All the transactions are done using p2p network with no central moderator or mediater, this provides the authors better margin on sales as well as allows the readers to purchase the books for cheap due to next-to-none additional charges. 

Also since the whole process like the wallet creation and uploading is in-built along with Ebooks Reader, piracy can be curbed as the books cannot be downloaded externally or shared with others.

## Project Structure

```
.
├── client                  # The create-react-app 
├── contracts               # Smart contracts
├── migrations              # Migrations of the smart contracts
├── test                    # Tests for smart contracts
├── LICENSE
└── README.md
└── truffle-config.js
```

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
- npm
```sh
npm install npm@latest -g
```
- truffle
```sh
npm install truffle -g
```

### Installation

- Clone the repo
```sh
git clone github.com/Aniketh896/dbooks.git
```

- Install NPM packages for the smart contracts
```sh
npm install
```

- Install NPM packages for the react-app
```sh
cd client && npm install
```

## Usage

The smart contracts are located in the contracts folder, deployed on `matic` mumbai testnet but can also be deployed on a local testnet network using `truffle`
If you wish to run a local ganache node and test the dapp locally using a private network -
- use `truffle develop` to run a local ganache node 
- run `test` in the `truffle` console
- `migrate --reset` to deploy the smart contracts on the private network

The smart contracts ABI will be located in `client/contracts` folder for the react app to interact with
> note: you will also need to import the mnemonic phrase provided by ganache local node in order to run a private test network using `portis` as well as send transactions from the newly imported account if you wish to run it locally 

run the react app from the `client` folder by running :
```sh
npm start
```



## License

Distributed under the MIT License.<br>
You can find the license [here.](https://github.com/Aniketh896/dbooks/blob/main/LICENSE)

## Project contributors
- [Aniketh Hotagi](https://github.com/Aniketh896)
- [Abdul Mateen](https://github.com/theabdulmateen)
- [Adarsh A Nair](https://github.com/Adarshxinferno)
- [Abhishek Kumar Singh](https://github.com/abhishek-99ks)

