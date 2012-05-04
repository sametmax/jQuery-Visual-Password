Jquery Visual Password: create a visual hash of the password as it is typed
============================================================================

<a href="http://jsfiddle.net/TANLB/embedded/result/">Online demo</a>

A jquery plugin to create visual hash of the value of a password field as it
is typed.

This help to visualize password mistyping without displaying the password.

It uses canvas and dataUri, but <strong>should</strong> degrade gracefully if
a browser doesn't support one of them.

It is based on <a href="http://is.gd/IJaMRG">VizHash.js</a>.

Jquery Visual Password is distributed under the <a href="http://www.opensource.org/licenses/zlib-license.php">zlib/libpng licence</a>.


Usage
======

In your header, add:

<pre>
  <script src="libs/jquery-1.7.2.min.js" type="text/javascript"></script>
  <script src="libs/vizhash.min.js" type="text/javascript" ></script>
  <script src="jquery-visual-password.min.js" type="text/javascript" ></script>
</pre>

Then:

<pre>
  $(function(){
    $('input[type=password]').visualPassword();
  });
</pre>

Or:

<pre>
  $(function(){
    $('input[type=password]').visualPassword({option1: value, option: value});
  });
</pre>

By default, the hash will be put in the password field. But you can override
this by settings callbacks in the options.

Options:

  passwordFieldClass:

    The class each processed password field will get when initiating the
    plugin. Default is 'hashed-password'.

    They will also get a className-index class. E.G: hashed-password-0

  canvasClass:

    The class each created hash canvas will get at creation.
    Default is 'password-hash'.

    They will also get a className-index class. E.G: password-hash-0
    The index will match the one of the related password field.

  height:

    The height of each created hash canvas. If null, it will be set in
    proportion of the password field size and the 'offset' option.

  width:

    The width of each created hash canvas. If null, it will be set in
    proportion of the password field size and the 'offset' option.

  offset:

    Percentage of password field height to set the hash canvas size if no
    height or width is passed. If it is used, it will try to make the canvas
    fit into the password field with a margin or offset * field height

  change:

    Fonction to call when the change event if fired on a password field.

    Arguments passed:
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default does nothing.

  keyup:

    Fonction to call when the keyup event if fired on a password field.

    Arguments passed:
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default insert the canvas at the begining of the password field.

  resize:

    Fonction to call when the resize event if fired on a password field.

    Arguments passed:
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default calls the same callback as for the keyup event.

  createCanvas:

    The function creating the canvas when an event triggers.

    Arguments passed:
      - $input: the jQuery wrapped password field the event fired on.
      - classes: A list of classes to apply to the canvas.
      - options: the plugin dictionary options.

  noSupport:

    The fonction called when the plugin detect that the browser doesn't
    support canvas of data URI.

    Arguments passed:
      - $input: the jQuery wrapped password field the event fired on.
      - supportCanvas: true if the browser supports canvas.
      - supportDataUri: true if the browser supports data URI.
      - options: the plugin dictionary options.

  init:

    The function called when the plugin finished to init. This is called
    only once.

    Arguments passed:
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default calls the same callback as for the keyup event.

  getSize:

    The function called at each canvas hash creation to calculate the width
    and the height of the DOM element. It should return a mapping like
    {width: integer, height: integer}, where integer is a value in pixel.

    Default uses the offset parameter.


What you should know
=====================

* There is no unitests yet. It should work, but you know the drill...
  And as Unix dev, we hadn't the opportunity to try it under IE.


Donate
=======

Bitcoin always appreciated :-)

JfymvUm9y2Z47puGfnsrGewDDCBPaYFj

