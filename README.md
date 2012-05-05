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

    <script src="libs/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="libs/vizhash.min.js" type="text/javascript" ></script>
    <script src="jquery-visual-password.min.js" type="text/javascript" ></script>

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

    Function to call when the change event if fired on a password field.

    Arguments passed:
      - event: the jQuery event object.
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default does nothing.

  onKeyUp:

    Function to call when the onKeyUp event if fired on a password field.

    Arguments passed:
      - event: the jQuery event object.
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default insert the canvas at the begining of the password field as
    background image then DELETE the canvas object.

  onResize:

    Function to call when the onResize event if fired on a password field.

    Arguments passed:
      - event: the jQuery event object.
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default calls the same callback as for the onKeyUp event.

  onClickPassword

    Function to call when the password field receives a click.

    Arguments passed:
      - event: the jQuery event object.
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default calls onClickCanvas if the click is
    on the place where the canvas is displayed.

  onClickCanvas

    Function to call when the canvas receives a click.

    Arguments passed:
      - event: the jQuery event object.
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default open a pop up to the plugin Github page.

  onHoverPassWord

    Function to call when the cursor enter or leave the area where
    the password field is.

    Arguments passed:
      - event: the jQuery event object.
      - action: "enter" or "leave"
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default calls onHoverCanvas if the hovering is
    on the place where the canvas is displayed.

  onHoverCanvas

    Function to call when the cursor enter or leave the area where
    the canvas is.

    Arguments passed:
      - event: the jQuery event object.
      - action: "enter" or "leave"
      - $input: the jQuery wrapped password field the event fired on.
      - $canvas: the jQuery wrapped canvas freshly created.
      - options: the plugin dictionary options.

    Default open a dialog with a short explanation and ask if the user
    want to learn more about the plugin. If yes, open the project github page.

  createCanvas:

    The function creating the canvas when an event triggers.

    Arguments passed:
      - $input: the jQuery wrapped password field the event fired on.
      - classes: A list of classes to apply to the canvas.
      - options: the plugin dictionary options.

    It returns a canva wrapped in a jquery object with all event handlers
    attache to it. Be careful if you override this one, you probably
    want read the source code first.

  noSupport:

    The Function called when the plugin detect that the browser doesn't
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

