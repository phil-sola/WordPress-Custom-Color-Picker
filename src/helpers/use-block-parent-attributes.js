import { useSelect, select, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';


export function useBlockParentAttributes() {
	const currentBlockId = select( blockEditorStore ).getSelectedBlockClientId();

	const parentBlock = useSelect((select) =>
		select(blockEditorStore).getBlock(currentBlockId),
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const setParentAttributes = (attributes) => {
		updateBlockAttributes(currentBlockId, attributes);
	};

	return [parentBlock?.attributes ?? {}, setParentAttributes];
}
