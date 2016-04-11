
June 2011

Note:
2011 June 04, a Chilean Puyehue volcano makes eruptuion 

--

![](imgs/20110604.jpg)

--

![](imgs/20110613.jpg)

Note:
The plume arrive to buenos aires caisng all types of unpredicted consecuences.
I start working on an interactive peace about the ButterflyEffect at global scale. Esentially a simulation of an ecosystem on a sanbox.

--

![](imgs/20110614.jpg)

--

![](imgs/20111010.png)

--

<!-- .slide: data-background="#FFFFFF" -->
![](imgs/efectomariposa.png)

[**Efecto Mariposa** (Butterfly effect)](http://patriciogonzalezvivo.com/2011/efectomariposa/)

--

<!-- .slide: data-background="#FFFFFF" -->
![](imgs/20111210.png)

--

January 2012

--

![](imgs/20120103.jpg)

--



Note:
Because is a low level language is very powerfull... but it was a very minimal API. 
For example there is no random. So in order to make this patterns I use this functions...

---

<!-- .slide: data-background="#FFFFFF" -->
```glsl
float pseudo_random = fract(sin(time) * 43758.5453123);
```

Note:
It's a pseudo random function constructed with the fractional part of a Sine function multiply by a big number.

---

**~1700** stations  <!-- {_class="fragment"} -->
**x** **40** days  <!-- {_class="fragment"} -->
(**960** hs)  <!-- {_class="fragment"} -->
**=** **1,536,000** samples  <!-- {_class="fragment"} -->

Note:
I have been collecting NOAA METAR's for all US weather stations the last weeks.

Every day I have a raspberrypi fetching the last 24 cycles of 1700 stations that report around every hour.
The raspberry pi download the METAR text files from NOAA FTP server and parse it into JSON that store for each day.
Then with another script enconde all those JSON files for each day into a single image.

That's arround a millon an a half samples.

--

* temperature <!-- {_class="fragment"} -->
(RED) <!-- {_class="fragment"} -->

* wind speed <!-- {_class="fragment"} -->
(GREEN) <!-- {_class="fragment"} -->

* wind direction <!-- {_class="fragment"} --> 
(BLUE) <!-- {_class="fragment"} -->

Note:
For each record I'm storing the temperature, Wind speed and wind direction in the RED, GREEN and BLUE channels of a picture.

--

![](https://rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png)

Note:
This is how the image looks

--

<!-- .slide: data-background="#A8B3B1" -->
<iframe class='fit' width="100%" height="100%" style='min-height: 600px; height: 100%;' data-src="http://tangrams.github.io/WeatherOverTime/"></iframe>

--

<canvas class='sandbox fit' data-fragment-url='shaders/datastream-texture.frag' data-textures='https://cdn.rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png' width='800px' height='600px' ></canvas>

Temperature and Wind Data

--

<canvas class='sandbox fit' data-fragment-url='shaders/10print.frag' data-textures='https://cdn.rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png' width='800px' height='600px' ></canvas>

10 Print (pseudo random)

--

<canvas class='sandbox fit' data-fragment-url='shaders/10print-wind_dir.frag' data-textures='https://cdn.rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png' width='800px' height='600px' ></canvas>

10 Print (wind direction)

--

<canvas class='sandbox fit' data-fragment-url='shaders/10print-wind_speed.frag' data-textures='https://cdn.rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png' width='800px' height='600px' ></canvas>

10 Print (wind speed)

--

<canvas class='sandbox fit' data-fragment-url='shaders/10print-wind_speed.frag' data-textures='https://cdn.rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png' width='800px' height='600px' ></canvas>

10 Print (temperature)

--

<!-- .slide: data-background="#FFFFFF" -->
<canvas class='sandbox fit' data-fragment-url='shaders/iching-texture.frag' data-textures='https://cdn.rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png' width='500px' height='500px' ></canvas> 

Wind I Ching 

---

<!-- .slide: data-background="#FFFFFF" -->
<canvas class='sandbox fit' data-fragment-url='shaders/iching-texture.frag' data-textures='https://cdn.rawgit.com/tangrams/WeatherOverTime/gh-pages/data/data.png' width='300px' height='300px' ></canvas>

## Thank you

[patricio.io](http://patricio.io) | [@patriciogv](https://twitter.com/patriciogv)
