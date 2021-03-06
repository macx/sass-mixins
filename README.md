Mobile first Sass Mixins – based on simplicity 
===========

[![Build Status](https://travis-ci.org/macx/sass-mixins.svg?branch=master)](https://travis-ci.org/macx/sass-mixins) ![Mobile first](https://img.shields.io/badge/RWD-mobilefirst-lightgrey.svg?style=flat) ![Unicorn approved](http://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat)

There are a lot of Sass Mixins out there. Most of them are overdone,
because they want to fit for everyone – no matter if you prefer mobile first
or any other approach.

This Mixins from [David Maciejwski](https://plus.google.com/102458928073783517690?rel=author) and contributors is different.
It's mobile first and will only generate classes that are really needed
to do the trick.

[Feature](#features)

* Highly flexible [Grid](#grid) with push and pull methods based on your configuration
* Effective [Respond-Mixin](#media-query-usage) to set `@media triggers (from, to)
* font-smoothing Mixin for better font rendering on dark backgrounds
* [Flexible asset floating](#flexible-asset-floating)
* clearfix

## Installation

Use [npm](https://www.npmjs.com/) to download it to your project:

```sh
$ npm install macx-sass-mixins --save-dev
```

Now, set your personal configuration for the Grid and import the mixins as soon as possible in your main Sass file:

```scss
@charset 'UTF-8';

// Import or set here your Grid config:
@import 'config';

// macx-sass-mixin
@import 'node_modules/macx-sass-mixins/src/sass-mixins';
```

To find out the path to your Bower dependencies, type `bower list --paths` in your command line.

## Usage

### Grid

The Grid is simple as it could be but flexible as it should be. It's based on the following configuration. The default settings are the following:

```scss
// Maximal width of your layout
$layout-max-width: 1200px;

// Number of columns you want to use
$layout-max-columns: 12;

// Set gutter width and default spacing
// to the outer areas of your layout
$layout-gutter-width: percentage(20px/$layout-max-width);
$layout-spacing: 24px;

// Set the breakpoints and the names
// you want to use for later usage
$layout-breakpoints: (
  small: 480px,
  medium: 600px,
  large: 920px,
  xlarge: $layout-max-width
) !default;
```

Here is simple three column layout on desktop, two column layout on tablets and one column on mobile:

```html
<div class="l-constrained">
  <div class="l-units">
    <div class="l-u--12-12 l-u--medium-6-12 l-u--large-4-12">
      COLUMN 1
    </div>

    <div class="l-u--12-12 l-u--medium-6-12 l-u--large-4-12">
      COLUMN 2
    </div>
    
    <div class="l-u--12-12 l-u--medium-6-12 l-u--large-4-12">
      COLUMN 3
    </div>
  </div>
</div>
```

Remeber the following syntax to set a grid column class:

```scss
l-u--medium-6-12
│    │      │ └ max columns
│    │      └ number of columns you want to use (6/12)
│    └ name of the breakpoint
└ stands for: layout-unit

```

### Flexible asset floating

Don't write CSS for floated assets (images for example) for every size. Use this approach to align your media – no matter of assets size.

```html
<!-- Default usage -->
<div class="m-asset">
  <div class="m-asset__element">
    <img src="your-image.jpg" alt="">
  </div>

  <div class="m-asset__content">
    This Content will always stay beside the element.
  </div>
</div>

<!-- If you want to push the asset to the right -->
<div class="m-asset m-asset__pushed">
  ...
</div>
```
