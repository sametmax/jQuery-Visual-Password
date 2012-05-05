/**
  jQuery Visual Password plugin.

  A jquery plugin to create visual hash of the value of a password field as it
  is typed.

  This help to visualize password mistyping without displaying the password.

  It uses canvas and dataUri, but degrade gracefully if a browser doesn't
  support one of them.

  Project page: https://github.com/sametmax/jQuery-Visual-Password

  USAGE:

  In your header, add:

    <script src="libs/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="libs/vizhash.min.js" type="text/javascript" ></script>
    <script src="jquery-visual-password.js" type="text/javascript" ></script>

  Then:

    $(function(){
      $('input[type=password]').visualPassword();
    });

  Or:

    $(function(){
      $('input[type=password]').visualPassword({option1: value, option: value});
    });

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

*/

(function($) {

  /** check if the browser supports dtaUri */
  var dataUriSupport = function(callback){
    var data = new Image();
    data.onload = data.onerror = function(){
      callback(this.width + this.height == 2);
    }
    data.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  };

  $.fn.visualPassword = function(options) {

    var main = this;

    dataUriSupport(function(supportDataUri){

      if (!vizhash) {
        throw "This script requires VizHash.js. Get it: http://is.gd/IJaMRG";
      }

      var supportCanvas = vizhash.supportCanvas();

      // Get options
      options = $.extend({}, $.fn.visualPassword.defaultOptions, options);

      // If Metadata plugin exists, it should override options
      if ($.metadata) {
          options = $.extend({}, main.options, element.metadata());
      }

      // attach a classes and event handler to each password field
      return main.each(function(i, elem) {

        var $input = $(elem);
        $input.addClass(options.passwordFieldClass);
        $input.addClass(options.passwordFieldClass + '-' + i);

        if (supportCanvas && supportDataUri) {

          var classes = [options.canvasClass, options.canvasClass + '-' + i];

          $input.bind('keyup', function(e){
            console.log('bin')
            var $canvas = options.createCanvas($input, classes, options);
            console.log('bin')
            options.onKeyUp(e, $input, $canvas, options);
          });

          $input.bind('resize', function(e){
            var $canvas = options.createCanvas($input, classes, options);
            options.onResize(e, $input, $canvas, options);
          });

          $input.bind('change', function(e){
            var $canvas = options.createCanvas($input, classes, options);
            options.onChange(e, $input, $canvas, options);
          });


        } else {
          option.noSupport($input, supportCanvas, supportDataUri, options);
        }

        var $canvas = options.createCanvas($input, classes, options)
        options.init($input, $canvas, options);

      });

      return main;

    });

  };

  $.fn.visualPassword.defaultOptions = {
    passwordFieldClass: 'hashed-password',
    canvasClass: 'password-hash',
    height:null,
    width:null,
    offset:0.1,
    onChange: function(){},
    onKeyUp: function(event, $input, $canvas, options) {
      // calculate the distance between the field border and the canvas
      // then add the canvas as a background image
      var height = Math.floor($input.innerHeight());
      var offset = height * options.offset;
      var dataURL = $canvas[0].toDataURL("image/png");
      var bg = ('transparent url(' + dataURL + ') no-repeat '
                                   + offset + 'px ' + offset + 'px');
      $input.css('background', bg);
      $input.css('padding-left', height + offset);
      $canvas.remove();
      $canvas = null;
    },
    onResize: function(event, $input, $canvas, options) {
         var $canvas = createCanvas(input, [canvas.class()],
                                    options.width, option.height);
         options.onKeyUp(event, $input, $canvas, options);
    },
    createCanvas: function($input, classes, options) {
      // create a canvas object of the proper size, attache classes and event
      // handlers then return it wrapped in a jQuery objects
      var size = options.getSize($input, classes, options);
      var vhash = vizhash.canvasHash($input.val(), size.width, size.height);
      var $canvas = $(vhash.canvas);

      $.each(classes, function(i, klass){$canvas.addClass(klass)});
      $canvas.click(function(e){
        options.onClickCanvas(e, $input, $canvas, options);
      });
      // unbind previous handler to avoid firing the event multiple times
      // then rebind new handlers with the proper closure
      // the mouse over is just a way to have a mousemouve on the password
      // fields
      $input.unbind('click').unbind('hover')
            .click(function(e){
                options.onClickPassword(e, $input, $canvas, options);
            }).hover(function(e){
                $input.mousemove(function(e){
                  options.onHoverPassword(e, 'enter', $input, $canvas, options);
                });
            }, function(e){
               $input.unbind('mousemove');
               options.onHoverPassword(e, 'leave', $input, $canvas, options);
            });
      return $canvas;
    },
    noSupport: function(){},
    init: function($input, $canvas, options){
      options.onKeyUp(null, $input, $canvas, options);
    },
    getSize: function($input, classes, options){
      // set size from options, of size by default calculated as
      // being the password field height minus a % (offset) of the field size.
      var size = Math.ceil($input.innerHeight() * (1 - options.offset * 2));
      return {width: options.width || size, height: options.height || size}
    },
    onClickPassword: function(event, $input, $canvas, options) {
      var input_offset = $input.offset();
      var size = options.getSize($input, [], options);
      var margin = $input.innerHeight() * options.offset;
      if (event.offsetX + margin <  size.width
         && event.offsetY + margin < size.height) {
        options.onClickCanvas(event, $input, $canvas, options);
      }
    },
    onClickCanvas: function(event, $input, $canvas, options){
      if(confirm("This picture let you check if you typed your password" +
                 " correctly without displaying it. \n\n Do you " +
                 "want to know more about this plugin?")){
        window.open("http://is.gd/L1apus", "_blank");
      }
    },
    onHoverPassword: function(event, action, $input, $canvas, options) {
      var input_offset = $input.offset();
      var size = options.getSize($input, [], options);
      var margin = $input.innerHeight() * options.offset / 2;
      if (event.offsetX + margin <  size.width
         && event.offsetY + margin < size.height) {
        options.onHoverCanvas(event, 'enter', $input, $canvas, options);
      } else {
        options.onHoverCanvas(event, 'leave', $input, $canvas, options);
      }
    },
    onHoverCanvas: function(event, action, $input, $canvas, options) {
      if (action=='enter'){
        $input.css('cursor', 'pointer');
      } else {
        $input.css('cursor', 'text');
      }
    },

  };

})(jQuery);