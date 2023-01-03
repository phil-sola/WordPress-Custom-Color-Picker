import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	InspectorControls, getColorClassName,
} from '@wordpress/block-editor'

import ColorPicker from '../../components/colors/color-picker'
import classnames from 'classnames'



export default function Edit( { attributes: { id, content, textColor, backgroundColor, linkColor, className }, setAttributes, clientId  } ) {


	let textClass;
	let backgroundClass;

	textClass = getColorClassName('color', textColor.slug)
	backgroundClass = getColorClassName('background-color', backgroundColor.slug)

	let classes = classnames( textClass, {
		[ backgroundClass ]: !! backgroundClass,
		'has-text-color': textColor.val,
		'has-background': backgroundColor.val,
		'has-link-color': linkColor.val
	} );

	setAttributes({
		id: `block-${clientId}`,
		className: classes,
	})


	const css = `
		#${id} a {
			color: ${linkColor?.val};
		}
	`;

	return (
		<>
			<InspectorControls>

				<ColorPicker
					palettes={[
						{
							name: 'textColor',
							value: textColor,
							label: 'Text',
						},
						{
							name: 'backgroundColor',
							value: backgroundColor,
							label: 'Background',
						},
						{
							name: 'linkColor',
							value: linkColor,
							label: 'Link',
						},
					]}
				/>

			</InspectorControls>,

			{ linkColor?.val &&
				<style>{css}</style>
			}

			<RichText
				{ ...useBlockProps({ id: id, style: { color: textColor.val, backgroundColor: backgroundColor.val } }) }
				tagName="h2"
				value={content}
				onChange={ val => setAttributes( { content: val } ) }
				placeholder={ __( 'Enter text here...' ) }
			/>

		</>
	);
}
