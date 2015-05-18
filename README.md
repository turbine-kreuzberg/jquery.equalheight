# VOTUM jQuery equal height boxes

This jQuery plugin sets equal heights on multiple boxes.

## Usage

jQuery needs to be loaded and the DOM should be ready and wrap the elements inside a DIV with data-equalheight-wrapper. Include
the jquery.equalheight.css file in your HEAD.

### Automated usage

The plugin is controlled through HTML attributes on the target elements. Elements with the same attribute value will be set to the same height (no value equals zero/0).

Set all elements with attribute `data-equal-height` (default behavior) to equal height:

```html
<div data-equalheight-wrapper>
    <div data-equal-height="1">some content</div>
    <div data-equal-height="1">some content</div>
    <div data-equal-height="2">some content</div>
    <div data-equal-height="2">some content</div>
</div>
```

```javascript
jQuery.equalHeight();
```

Set all elements with attribute `lang` to equal height:

```html
<div data-equalheight-wrapper>
    <div lang="en">some content</div>
    <div lang="fr">some content</div>
    <div lang="de">some content</div>
    <div lang="it">some content</div>
</div>
```

```javascript
jQuery.equalHeight( { 'attribute' : 'lang' } );
```

### Direct usage:

Set all elements in the set to equal height:

```javascript
jQuery( '.some-boxes, #another-box' ).equalHeight();
```

## Further notes

Developed by [Thomas Heuer](mailto:thomas.heuer@votum.de) at [VOTUM](http://www.votum.de/) in Berlin, Germany.

### Version & Update notes

- v1.1; 18 May, 2015: plugin beautification - boxes are shown after heights are set to the elements
- v1.0; 04 Apr, 2014
- v0.2; 31 Oct, 2012: bugfix for window.resize event
- v0.1; September 2012
