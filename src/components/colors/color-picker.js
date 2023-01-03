import { PanelBody, PanelRow } from '@wordpress/components'
import { Palette } from 'phosphor-react'

import SingleColorPicker from './single-color-picker'

// Props needed for each of the ColorPickers required for the block
// name (Attribute object name), value (attribute object), label (string)
// Array similar to the Multiple Origins Core Picker
// https://wordpress.github.io/gutenberg/?path=/docs/components-colorpalette--multiple-origins
function ColorPicker( props ) {

	const { palettes, icon, title = 'Colors'} = props;

	const PanelIcon = icon ? icon : <Palette size={18} weight="regular" />;

	return(

		<PanelBody title={title} icon={PanelIcon} initialOpen={ false }>
			{ palettes.map( palette => (
				<PanelRow>
					<SingleColorPicker
						name={palette.name}
						value={ palette.value }
						label={palette.label}
					/>
				</PanelRow>
			) )  }
		</PanelBody>

	)
}

export default ColorPicker;
