NODEMOTI
========
**A node server which analyse the data received from [moti](https://github.com/WeAreLeka/moti).**

Install
-------
First of all you will need
* [Node](http://nodejs.org/)
* [Npm](https://npmjs.org/)
* [One of the moti robot](https://github.com/WeAreLeka/moti)

Then clone the `nodemoti` git where you want and do `npm install` in your shell, this will install all the modules you need.

Finaly run `node app.js` and go to `http://localhost:8080`.

Known issues
------------
You will probably need to change the serialport in the `app.js` page line 27. By default this is `/dev/ttyACM0`



