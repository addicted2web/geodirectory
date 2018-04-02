/* global geodir_select2_params */
jQuery(function($) {
    function geodirSelect2FormatString() {
        return {
            'language': {
                errorLoading: function() {
                    // Workaround for https://github.com/select2/select2/issues/4355 instead of i18n_ajax_error.
                    return geodir_select2_params.i18n_searching;
                },
                inputTooLong: function(args) {
                    var overChars = args.input.length - args.maximum;
                    if (1 === overChars) {
                        return geodir_select2_params.i18n_input_too_long_1;
                    }
                    return geodir_select2_params.i18n_input_too_long_n.replace('%item%', overChars);
                },
                inputTooShort: function(args) {
                    var remainingChars = args.minimum - args.input.length;
                    if (1 === remainingChars) {
                        return geodir_select2_params.i18n_input_too_short_1;
                    }
                    return geodir_select2_params.i18n_input_too_short_n.replace('%item%', remainingChars);
                },
                loadingMore: function() {
                    return geodir_select2_params.i18n_load_more;
                },
                maximumSelected: function(args) {
                    if (args.maximum === 1) {
                        return geodir_select2_params.i18n_selection_too_long_1;
                    }
                    return geodir_select2_params.i18n_selection_too_long_n.replace('%item%', args.maximum);
                },
                noResults: function() {
                    return geodir_select2_params.i18n_no_matches;
                },
                searching: function() {
                    return geodir_select2_params.i18n_searching;
                }
            }
        };
    }
    try {
        $(document.body).on('geodir-select-init', function() {
            // Regular select boxes
            $(':input.geodir-select').filter(':not(.enhanced)').each(function() {
                var $this = $(this);
				var select2_args = $.extend({
                    minimumResultsForSearch: ($this.data('tags') ? 0 : (parseInt($this.data('min-results')) > 0 ? parseInt($this.data('min-results')) : 10)),
                    allowClear: $(this).data('allow_clear') ? true : false,
                    containerCssClass: 'gd-select2-selection',
                    dropdownCssClass: 'gd-select2-dropdown',
                    placeholder: $(this).data('placeholder'),
                    width: 'resolve',
                    dropdownAutoWidth : true,
                    templateSelection: function(data) {
						return geodirSelect2TemplateSelection($this, data);
					},
                }, geodirSelect2FormatString());
                var $select2 = $(this).select2(select2_args);
                $select2.addClass('enhanced');
                $select2.data('select2').$container.addClass('gd-select2-container');
                $select2.data('select2').$dropdown.addClass('gd-select2-container');
				if ($(this).data('sortable')) {
					var $select = $(this);
					var $list = $(this).next('.select2-container').find('ul.select2-selection__rendered');
					$list.sortable({
						placeholder: 'ui-state-highlight select2-selection__choice',
						forcePlaceholderSize: true,
						items: 'li:not(.select2-search__field)',
						tolerance: 'pointer',
						stop: function() {
							$($list.find('.select2-selection__choice').get().reverse()).each(function() {
								var id = $(this).data('data').id;
								var option = $select.find('option[value="' + id + '"]')[0];
								$select.prepend(option);
							});
						}
					});
				}
				$this.on('change.select2', function(e) {
					geodirSelect2OnChange($this, $select2);
				});
				if ($this.data('cmultiselect') || $this.data('cselect')) {
					$this.trigger('change.select2');
				}
            });
            $(':input.geodir-select-nostd').filter(':not(.enhanced)').each(function() {
                var $this = $(this);
				var select2_args = $.extend({
                    minimumResultsForSearch: ($this.data('tags') ? 0 : (parseInt($this.data('min-results')) > 0 ? parseInt($this.data('min-results')) : 10)),
                    allowClear: true,
                    containerCssClass: 'gd-select2-selection',
                    dropdownCssClass: 'gd-select2-dropdown',
                    placeholder: $(this).data('placeholder'),
					templateSelection: function(data) {
						return geodirSelect2TemplateSelection($this, data);
					},
                }, geodirSelect2FormatString());
                var $select2 = $(this).select2(select2_args);
                $select2.addClass('enhanced');
                $select2.data('select2').$container.addClass('gd-select2-container');
                $select2.data('select2').$dropdown.addClass('gd-select2-container');
				if ($(this).data('sortable')) {
					var $select = $(this);
					var $list = $(this).next('.select2-container').find('ul.select2-selection__rendered');
					$list.sortable({
						placeholder: 'ui-state-highlight select2-selection__choice',
						forcePlaceholderSize: true,
						items: 'li:not(.select2-search__field)',
						tolerance: 'pointer',
						stop: function() {
							$($list.find('.select2-selection__choice').get().reverse()).each(function() {
								var id = $(this).data('data').id;
								var option = $select.find('option[value="' + id + '"]')[0];
								$select.prepend(option);
							});
						}
					});
				}
				$this.on('change.select2', function(e) {
					geodirSelect2OnChange($this, $select2);
				});
				if ($this.data('cmultiselect') || $this.data('cselect')) {
					$this.trigger('change.select2');
				}
            });
            $(':input.geodir-select-tags').filter(':not(.enhanced)').each(function() {
                var select2_args = $.extend({
                    tags: true,
                    selectOnClose: true,
                    tokenSeparators: [','],
                    minimumResultsForSearch: 10,
                    allowClear: $(this).data('allow_clear') ? true : false,
                    containerCssClass: 'gd-select2-selection',
                    dropdownCssClass: 'gd-select2-dropdown',
                    placeholder: $(this).data('placeholder')
                }, geodirSelect2FormatString());
                var $select2 = $(this).select2(select2_args);
                $select2.addClass('enhanced');
                $select2.data('select2').$container.addClass('gd-select2-container');
                $select2.data('select2').$dropdown.addClass('gd-select2-container');
				if ($(this).data('sortable')) {
					var $select = $(this);
					var $list = $(this).next('.select2-container').find('ul.select2-selection__rendered');
					$list.sortable({
						placeholder: 'ui-state-highlight select2-selection__choice',
						forcePlaceholderSize: true,
						items: 'li:not(.select2-search__field)',
						tolerance: 'pointer',
						stop: function() {
							$($list.find('.select2-selection__choice').get().reverse()).each(function() {
								var id = $(this).data('data').id;
								var option = $select.find('option[value="' + id + '"]')[0];
								$select.prepend(option);
							});
						}
					});
				}
            });

        }).trigger('geodir-select-init');
        $('html').on('click', function(event) {
            if (this === event.target) {
                $('.geodir-select').filter('.select2-hidden-accessible').select2('close');
            }
        });
    } catch (err) {
        window.console.log(err);
    }
});

function geodirSelect2TemplateSelection($el, data) {
    if ($el.data('cmultiselect')) {
        var rEl;
        rEl = '<span class="select2-selection_gd_custom">';
          rEl += '<span class="select2-selection_gd_text">' + data.text + '</span>';
          rEl += '<span class="select2-selection_gd_field">';
            rEl += '<input type="radio" class="select2-selection_gd_v_' + (data.id != 'undefined' ? data.id : '') + '" onchange="jQuery(this).closest(\'form\').find(\'input[name=' + $el.data('cmultiselect') + ']\').val(jQuery(this).val());" value="' + (data.id != 'undefined' ? data.id : '') + '" name="' + $el.data('cmultiselect') + '_radio">';
          rEl += '</span>';
        rEl += '</span>';
        return jQuery(rEl);
    }
    return data.text;
}

function geodirSelect2OnChange($this, $select2) {
    var $cont, $field, value, $input;
    if ($this.data('cmultiselect')) {
        $cont = $select2.data('select2').$container;
        $field = $this.closest('form').find('input[name=' + $this.data('cmultiselect') + ']');
        value = $field.val() != 'undefined' ? $field.val() : '';
        if (jQuery('.select2-selection_gd_field', $cont).length > 0) {
            if (jQuery('.select2-selection_gd_v_' + value).length > 0) {
                $input = jQuery('.select2-selection_gd_v_' + value);
            } else {
                $input = jQuery('.select2-selection_gd_field:first', $cont).find('[type="radio"]');
            }
            $input.prop('checked', true).trigger('change');
        } else {
            $field.val('');
        }
    }
}