<?php
/**
 * SiteEditor Control: sortable.
 *
 * @package     SiteEditor
 * @subpackage  Options
 * @since       1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'SiteEditorSortableControl' ) ) {

	/**
	 * Sortable control
	 */
	class SiteEditorSortableControl extends SiteEditorOptionsControl {

		/**
		 * The control type.
		 *
		 * @access public
		 * @var string
		 */
		public $type = 'sortable';

		/**
		 * Enqueue control related scripts/styles.
		 *
		 * @access public
		 */
		public function enqueue() {

		}

		/**
		 * Renders the control wrapper and calls $this->render_content() for the internals.
		 *
		 * @since 3.4.0
		 */
		protected function render_content() {

			$atts           = $this->input_attrs();

			$atts_string    = $atts["atts"];

			$classes        = "sed-module-element-control sed-element-control sed-bp-input sed-bp-sortable-input sed-control-{$this->type} {$atts['class']}";

			$pkey			= "{$this->option_group}_{$this->id}";

			$sed_field_id   = 'sed_pb_' . $pkey;

            $value          = $this->value();

			?>

			<label class=""><?php echo $this->label;?></label>
			<span class="field_desc flt-help fa f-sed icon-question fa-lg " title="<?php echo esc_attr( $this->description );?>"></span>
			<ul class="sed-bp-form-sortable">
		
				<?php
				$i = 1;
				foreach( $this->choices as $key_val => $choice ) {
					$checked = ( $key_val == $value ) ? 'checked="checked"' : '';
				?>

					<li class="sed-bp-form-sortable-item" class="<?php echo esc_attr( $classes ); ?> <?php echo $checked;?>" id="<?php echo esc_attr( $sed_field_id ) . $i ;?>"   <?php echo $atts_string;?>>
						<label><?php echo $choice;?></label>
		                <div class="sed-bp-form-sortable-actions">
		                    <span class="sortable-action sort"><span class="fa fa-arrows fa-lg"></span></span>
		                </div>
					</li>

				<?php 
				    $i++;
				  } 
				?>
			</ul>

			<?php
		}

		/**
		 * An Underscore (JS) template for this control's content (but not its container).
		 *
		 * Class variables for this control class are available in the `data` JS object;
		 *
		 * @see SiteEditorOptionsControl::print_template()
		 *
		 * @access protected
		 */
		protected function content_template() {

		}
	}
}

$this->register_control_type( 'sortable' , 'SiteEditorSortableControl' );