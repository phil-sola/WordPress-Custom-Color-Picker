import { useBlockProps, RichText } from '@wordpress/block-editor';


export default function save( { attributes: { content, id, textColor, backgroundColor, linkColor } } ) {

	const css = `
		#${id} a {
			color: ${linkColor?.val};
		}
	`;


	return (
		<>
			{ linkColor?.val && <style>{css}</style> }

			<RichText.Content
				{ ...useBlockProps.save( { id: id, style: { color: textColor?.val, backgroundColor: backgroundColor?.val } }) }
				tagName="h2"
				value={content}
			/>
		</>
	);
}
