![Beverly](./src/logo.png?raw=true "Beverly")

Beverly is a dynamic, real-time sentiment analysis tool that links the Twitter world's emotions with current events. Any keyword can be analyzed and visualized upon a map of the United States to gain insight into how the population is feeling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

First we need the stdlib CLI. This can be installed by:

```
$ npm install lib.cli -g
```

Clone the git repository and navigate to new directory:

```
$ git clone https://github.com/VictoryShoe/hackprinceton-app.git
$ cd hackprinceton-app
```
You will need your own API keys if you want to run any of the backend functionality. These can be placed in
an environment variables file in ./stdlib/lberkley/twitter-map/env.json. The structure of env.json would be as follows:

```
{
  "local": {
    "TWITTER_CONSUMER_KEY": "your key",
    "TWITTER_CONSUMER_SECRET": "your key",
    "TWITTER_ACCESS_TOKEN_KEY": "your key",
    "TWITTER_ACCESS_TOKEN_SECRET": "your key",
    "AZURE_ACCESS_KEY": "your key",
    "AZURE_ACCESS_KEY_NEWS": "your key",
    "STDLIB_LIBRARY_TOKEN": "your key",
    "MAPS_ACCESS_TOKEN": "your key"
  },
  "dev": {
    "TWITTER_CONSUMER_KEY": "your key",
    "TWITTER_CONSUMER_SECRET": "your key9",
    "TWITTER_ACCESS_TOKEN_KEY": "your key",
    "TWITTER_ACCESS_TOKEN_SECRET": "your key",
    "AZURE_ACCESS_KEY": "your key",
    "AZURE_ACCESS_KEY_NEWS": "your key",
    "STDLIB_LIBRARY_TOKEN": "your key",
    "MAPS_ACCESS_TOKEN": "your key"
  },
  "release": {
    "key": "value"
  }
}
```
In the same folder, install node modules:

```
$ npm install
```


## Running Beverly

To run Beverly, open two terminals. In the first:

```
$ cd frontend/project
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev
```

In the second:

```
$ cd stdlib/lberkley/twtter-map

# serve with hot reload at localhost:8170
$ lib up dev
```

You should be able to navigate to localhost:8000 and run Beverly... :)

## Built With

* [stdlib](https://stdlib.com/) - The 'serverless' web functions we built
* [Vue](https://vuejs.org/) - Front-end framework
* [Bing News Search API](https://azure.microsoft.com/en-us/services/cognitive-services/bing-news-search-api/) - Finding relevant current events
* [Azure Text Analytics API](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) - Sentiment analysis of all text
* [Twitter API](https://developer.twitter.com/en/docs) - Gathering relevant tweets from the US
* [Bulma](https://bulma.io/) - CSS styling framework

## Authors

Developed for [HackPrinceton Fall 2017](https://hackprinceton-fall17.devpost.com/) by:

* **Andrew McCann** - *Back-end development and ideation*
* **Justin Koh** - *Front-end development and design*
* **Lincoln Berkley** - *Back-end development and API hacker*
* **Victor Shi** - *Front-end development and middleware connection*

## Acknowledgments

* Debugging and support from Jacob at stdlib
* Microsoft for tossing us an extra $50 Azure cred
