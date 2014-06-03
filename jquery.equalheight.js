/**
 * jQuery equal height boxes
 *
 * This plugin sets equal heights on multiple boxes.
 *
 * Automated usage; elements will get grouped by attribute value (no value equals zero/0):
 *
 *   Set all elements with attribute 'data-equal-height' to equal height:
 *   jQuery( document ).ready( function( $ ) {
 *       $.equalHeight();
 *   } );
 *
 *   Set all elements with attribute 'title' to equal height:
 *   jQuery( document ).ready( function( $ ) {
 *       $.equalHeight( { 'attribute' : 'title' } );
 *   } );
 *
 * Direct usage:
 *
 *   Set all elements in set to equal height:
 *   $( '.some-boxes, #another-box' ).equalHeight();
 *
 * @author Thomas Heuer <thomas.heuer@intermatix.de>
 * @copyright 2012 Intermatix GmbH
 * @requires jQuery 1.7
 */

(function( $ ) {
	/**
	 * equal height for all elements in the current set
	 */
	$.fn.equalHeight = function() {
		var tallest = 0;
		this.each( function() {
			$this = $( this );
			$height = $this.outerHeight();
			$orignalHeight = $this.attr( 'data-original-height' );
			if( !$orignalHeight ) {
				$this.attr( 'data-original-height', $height );
			}
			var thisHeight = $orignalHeight || $height;
			if( thisHeight > tallest ) {
				tallest = thisHeight;
			}
		} );
		this.height(tallest);
		return this;
	};

	/* global plugin function */
	$.equalHeight = function( options ) {

		options = $.extend( {
			'attribute': 'data-equal-height'
		}, options );

		/* get boxes with attribute 'options.attribute', grouped by value */
		var equalHeightBoxGroups = [];
		$( '[' + options.attribute + ']' ).each( function() {
			var thisEqualHeightAttributeValue = $( this ).attr( options.attribute ) || 0;
			if( !equalHeightBoxGroups[thisEqualHeightAttributeValue] ) {
				equalHeightBoxGroups[thisEqualHeightAttributeValue] = $( [] );
			}
			equalHeightBoxGroups[thisEqualHeightAttributeValue] = equalHeightBoxGroups[thisEqualHeightAttributeValue].add( this );
		} );

		/* aplly to each group of boxes */
		$( equalHeightBoxGroups ).each( function( index, elementArray ) {
			if( elementArray ) {
				elementArray.equalHeight();
			}
		} );

		/* re-run on resize */
		$( window ).on( 'resize.equalheight', function( event ) {
			clearTimeout( this.waitForResizeFinish );
			this.waitForResizeFinish = setTimeout( function() {
				$.equalHeight( options );
			}, 100 );
		} );

		return this;
	};
})( jQuery );
