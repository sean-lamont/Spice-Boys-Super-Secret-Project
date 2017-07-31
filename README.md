# CBRstatbot by spiceboys.space

[spice-boys.space](http://spice-boys.space)

CBRstatbot is a data visualisation web app which aims to provide statistics on the livability of an area. It does so by using many of the open-data sources supplied by the Australian Bureau of Statistics, such as suburb populations, crime statistics, parks, school and bus stop locations, median household rent and incomes and unemployment rates per suburb. CBRstatbot compares these statistics to the state averages, and we aggregate these results to provide a holistic livab ility rating for each suburb. The core of the application is an adaptive 3D map over which the statistics are visualised.

## Properties

CBRstatbot makes use of natural language processing bot to provide a more intuitive way to search for the information you want. For example, you can ask "How many schools are there in Deakin?". This also gives the user an easy way to compare suburbs. For example, “How does Woden compare to Belconnen in terms of livability”.

We use simple machine learning via linear regression to predict future statistics. The model parameters are computed using historical data, and then stored on the web server. This approach allows for quick predictions at runtime, as there is no need to retrain the model. This also facilitates the addition of more complicated models in the future, as we can simply train and store the parameters without compromising the speed of the web page. This currently works for predicting crime rates per suburb. Though currently a proof of concept, this would easily extend to any other suburb statistic given more time. 


## The Project

CBRstatbot is written in JavaScript, making use of the React library for the front end. The map is generated by MapBox, and the chatbox uses the wit.ai library to properly parse the user’s requests. We have made use of the Elastic stack to store and query a range of data types.

### Example Queries for Graph Visualisation

Some example queries to have fun visualising

```
show me transport data
graph the unemployment data
```

The chatbot understands some synonyms, so both of the following work

```
graph education information
show me data about schools
```

Other fun examples
```
show me how fun the suburbs are
show me predictions for crimes in 2018
```

You can even graph statistics for specific suburbs.
```
Show me population in Acton and O'Connor
```

### Chatbot for directly comparing suburb statistics
Getting complicated queries is still a work in progress. 
For now the following work:
```
What's the population of Kingston?
What's the crime rate in Turner?
What's the education rate in Monash?
How many schools are in Red Hill?
```

### Demonstrations

![alt text](https://github.com/Spice-Boys/Spice-Boys-Super-Secret-Project/blob/master/demo_gif.gif "Gif")

Watch Our Youtube Video

[![Watch the video](http://img.youtube.com/vi/xv7wLiRRj1w/0.jpg)](https://youtu.be/xv7wLiRRj1w)

## Built With

* [React](https://facebook.github.io/react/) - The web framework used
* [Mapbox](https://www.mapbox.com/) - Map based data visualisation framework
* [Wit.ai](https://wit.ai/) - Natural Language framework for chatbox
* [Elastic Stack](https://www.elastic.co/products) - Data storage and search on the cloud

## Authors

* **Noah Imgham** - ()
* **Jaz Gulati** - ()
* **Lachlan Stevens** - ()
* **Matt Brown** - ()
* **James Parker** - ()
* **Reilly Francis** - ()
* **Sean Lamont** - ()
* **Chamin Hewa Koneputugodage** - ()

## License


## Acknowledgments

* Thanks to GovHack 2017 for hosting this fun event
* etc

