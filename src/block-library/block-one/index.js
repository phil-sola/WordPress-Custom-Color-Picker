import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import edit from './edit';
import save from './save';
import metadata from './block.json';

import blockAttributes from './attributes'
import colorAttributes from '../../components/colors/attributes'

const attributes = {
	...blockAttributes,
	...colorAttributes
}

const { name } = metadata;

registerBlockType( {name, ...metadata}, {
	attributes: attributes,

	edit: edit,

	save: save,
} );
