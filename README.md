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
* asset module for flexible floating objects
* clearfix

## Installation

Use [Bower](http://bower.io/) to download it to your project:

```sh
$ bower install macx-sass-mixins --save
```

Now, set your personal configuration for the Grid and import the mixins as soon as possible in your main Sass file:

```scss
@charset 'UTF-8';

// Import or set here your Grid config:
@import 'config';

// macx-sass-mixin
// (set the path to bower vendors based on your config)
@import '[path-to]/macx-sass-mixins/src/sass-mixins';
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

### Media Query usage

If you want to change the color of a box regarding the width of the viewport, you have to use media-queries. Using the respond mixin, this is much more simpler:

```scss

.m-box {
  background: #f5f5f5;

  @include respond('medium') {
    // this will work from breakpoint 'medium' and above
    background: #f00;
  }

  @include respond('large') {
    // this will work from breakpoint 'large' and above
    background: #0f0;
  }
}

```
