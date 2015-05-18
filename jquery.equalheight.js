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
 * @author    Thomas Heuer <thomas.heuer@votum.de>
 * @copyright Copyright (c) 2015 VOTUM media GmbH
 * @link      https://github.com/votum/jquery.equalheight
 * @requires  jQuery 1.7
 */

(function ($) {
    /**
     * equal height for all elements in the current set
     */
    $.fn.equalHeight = function () {
        var tallest = 0,
            self = this,
            elemCount = this.length,
            container = $('[data-equalheight-wrapper]');

        /* reset height to auto, before computing the uccrent new height */
        this.css('height', 'auto');

        this.each(function (index) {

            $this = $(this);
            $height = $this.height();
            if ($height > tallest) {
                tallest = $height;
            }

            if (index + 1 === elemCount) {
                self.height(tallest);
                if (container) {
                    container.addClass('heights-loaded');
                }
            }

        });

        /* re-run on resize */
        $(window).on('resize.equalheight', function (event) {
            /* us a little timeput, since some browsers fire the resize event for each pixel */
            clearTimeout(this.waitForResizeFinish);
            this.waitForResizeFinish = setTimeout(function () {
                self.equalHeight();
            }, 100);
        });

        return this;
    };

    /* global plugin function */
    $.equalHeight = function (options) {

        options = $.extend({
            'attribute': 'data-equal-height'
        }, options);

        /* get boxes with attribute 'options.attribute', grouped by value */
        var equalHeightBoxGroups = [];
        $('[' + options.attribute + ']').each(function () {
            var thisEqualHeightAttributeValue = $(this).attr(options.attribute) || 0;
            if (!equalHeightBoxGroups[thisEqualHeightAttributeValue]) {
                equalHeightBoxGroups[thisEqualHeightAttributeValue] = $([]);
            }
            equalHeightBoxGroups[thisEqualHeightAttributeValue] = equalHeightBoxGroups[thisEqualHeightAttributeValue].add(this);
        });

        /* aplly to each group of boxes */
        $(equalHeightBoxGroups).each(function (index, elementArray) {
            if (elementArray) {
                elementArray.equalHeight();
            }
        });

        return this;
    };
})(jQuery);
