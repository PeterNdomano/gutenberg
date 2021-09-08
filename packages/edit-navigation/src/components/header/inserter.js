/**
 * WordPress dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { Button, ToolbarItem } from '@wordpress/components';
import { _x } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { plus } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { useNavigationEditorInsertionPoint } from '../../hooks';
import { store as editNavigationStore } from '../../store';

function Inserter() {
	const inserterButton = useRef();
	const { rootClientId } = useNavigationEditorInsertionPoint();

	const { isInserterOpened, hasInserterItems } = useSelect( ( select ) => {
		return {
			hasInserterItems: select( blockEditorStore ).hasInserterItems(
				rootClientId
			),
			isInserterOpened: select( editNavigationStore ).isInserterOpened(),
		};
	} );

	const { setIsInserterOpened } = useDispatch( editNavigationStore );

	return (
		<ToolbarItem
			ref={ inserterButton }
			as={ Button }
			className="edit-navigation-header-toolbar__inserter-toggle"
			variant="primary"
			isPressed={ isInserterOpened }
			onMouseDown={ ( event ) => {
				event.preventDefault();
			} }
			onClick={ () => {
				if ( isInserterOpened ) {
					// Focusing the inserter button closes the inserter popover
					// @ts-ignore
					inserterButton.current.focus();
				} else {
					setIsInserterOpened( true );
				}
			} }
			icon={ plus }
			/* translators: button label text should, if possible, be under 16
					characters. */
			label={ _x(
				'Toggle block inserter',
				'Generic label for block inserter button'
			) }
			disabled={ ! hasInserterItems }
		/>
	);
}

export default Inserter;