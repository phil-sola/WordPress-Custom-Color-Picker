import classnames from 'classnames';

// Third party imports
import { RgbaStringColorPicker, HexColorInput } from 'react-colorful';
import { colord } from 'colord'
import { Clipboard, ArrowCounterClockwise, Eyedropper, Palette } from "phosphor-react";


// WordPress imports
import { useMemo, useCallback, useRef, useState, useEffect } from '@wordpress/element'
import {
	getColorClassName,
	getColorObjectByColorValue,
	useSetting,
} from '@wordpress/block-editor'
import { Button, Flex, FlexItem, Popover, ColorPalette, __experimentalVStack as VStack,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components'


// importing color charts
import { ColorTints, ColorShades, ColorComplementary } from './color-charts'


// Helpers
import { useBlockParentAttributes } from '../../helpers/use-block-parent-attributes';
import useClickOutside from "../../helpers/useClickOutside";
import { MySnackbarNotice } from '../../helpers/functions'

// Styles
import  './styles.css'


export const SingleColorPicker = ( { name, value, label } ) => {

	// Get the global colours from the site editor
	let themeColors = useSetting( 'color.palette.theme' );
	let customColors = useSetting( 'color.palette.custom' );
	let globalColors = themeColors.concat( customColors );

	const [parentAttributes, setParentAttributes] = useBlockParentAttributes();

	const popover = useRef();

	// Control PopOver component & Advanced color section
	const [isOpen, toggle] = useState(false);
	const [openToggle, setOpenToggle] = useState( false );
	const [openInputToggle, setOpenInputToggle] = useState( false );
	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);


	function handleInputFieldChange() {
		setOpenInputToggle( ! openInputToggle )
	}


	function handleOnChange(color) {
		let colorSlug = '';

		// Check if this color, is one of the global site colours...
		const colorObj = getColorObjectByColorValue(globalColors, color);

		// ...if so, grab the slug as we will need it to retain the colour
		// if changed in the site editor.
		if ( colorObj ) {
			colorSlug = colorObj.slug
		}

		setParentAttributes({
			[name]: {
				val: color,
				slug: colorSlug
			}
		})
	}

	function handleResetValue() {
		setParentAttributes( {
			[name]: {
				val: '',
				slug: ''
			}
		})
	}


	const handleEyeDropper = () => {
		const eyeDropper = new EyeDropper();

		eyeDropper.open().then((result) => {
			setParentAttributes( {
				[name]: {
					...value,
					val: colord(result.sRGBHex).alpha(1).toRgbString(),
				}
			})
		}).catch((e) => {
			console.log(e)
		});
	}


	async function handleCopyHex() {
		const inputValue = document.getElementById( 'wps-hex-input' ).value;

		try {
			await navigator.clipboard.writeText(inputValue).then(
				() => {
					MySnackbarNotice("success", "Copied to clipboard")
				}
			);
		} catch (e) {
			console.error(e);
		}
	}

	function toggleColorGuide() {
		setOpenToggle( ! openToggle )
	}


	// useEffect to run a cleanup at the end and make sure the right classes
	useEffect(() => {

		// Double-check the color value, associated with the slug hasn't changed in the site editor.
		if ( value.slug ) {
			let getColorVal = globalColors.find( el => el?.slug === value.slug )

			if ( getColorVal?.color && getColorVal?.color !== value.val ) {
				setParentAttributes({
					[name]: {
						...value,
						val: getColorVal?.color,
					}
				})
			}
		}

	}, [value])


	// If the color prop is anything but a rgba string,
	// convert it to a rgb string using the Colord react library
	// This component will work with any color type now.
	const rgbValue = useMemo(() => {
		return value.val?.startsWith("rgba") ? value.val : colord(value.val).toRgbString();
	}, [value]);


	// Hex Color String for the input field
	const hexColor = colord( value.val ).toHex().toUpperCase();



	return (

		<div className="wps-color-picker-wrapper">

			{/* Initial Section in the settings sidebar */}
			<Flex className="color-swatch-wrapper" align="center">
				<div
					className="swatch"
					style={{ background: value.val }}
					onClick={() => toggle(true)}
				/>
				<Flex justify="end">
					<h3 className="wps-label-text" style={{ margin: 0 }}>
						{ label }
					</h3>
					<ArrowCounterClockwise className="reset-color pointer" size={10} weight="light" color="#050505" onClick={handleResetValue} />
				</Flex>
			</Flex>


			{/* Remaining code is handling the Popover
			when the swatch is clicked */}
			{isOpen && (
				<Popover offset={4}>
					<div className='wps-color-picker-component popover' ref={popover}>


						{/* Header section of Colour Picker Popover */}
						<Flex align="center" className="wps-color-picker-component__header">
							<h3 style={{ fontWeight: 'bold', fontSize: '14px', marginBlock: 0 }}>{label}</h3>
							<Flex align="center" justify="end">
								{window.EyeDropper && <Eyedropper className="wps-eyedropper pointer" size={20} weight="fill" onClick={handleEyeDropper} />}
							</Flex>
						</Flex>



						{/* Main Colour Picker Section using React-Colorful */}
						<RgbaStringColorPicker
							color={rgbValue}
							onChange={handleOnChange}
						/>


						{/* HEX Color Code & Clipboard API */}
						<Flex align="center" style={{ marginBlock: '10px', padding: '0 10px' }}>
							<Flex>
								<HexColorInput id="wps-hex-input" className="hex-input" color={hexColor} onChange={handleOnChange} prefixed alpha />
								<FlexItem style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexBasis: '50px' }}>
									<Clipboard className="copy-hex-input pointer" size={20} weight="light" onClick={handleCopyHex} />
									<Palette size={20} className="pointer" onClick={toggleColorGuide}/>
								</FlexItem>
							</Flex>

						</Flex>


						{/* Hidden advanced color guide available when
						 clicking on the Palette icon */}
						<VStack className={`wps-color-picker-component__color-guide ${ openToggle ? 'show-toggle' : 'hide-toggle' }`}>
							<ColorTints
								color={value.val}
								onChange={handleOnChange}
							/>

							<ColorShades
								color={value.val}
								onChange={handleOnChange}
							/>

							<ColorComplementary
								color={value.val}
								onChange={handleOnChange}
							/>
						</VStack>


						{/* Global color pickers section - theme & custom (not inc default) */}

						{ themeColors && themeColors.length > 0 &&
							<>
								<hr style={ { borderTop: '1px solid #efebeb', borderBottom: 'none', width: '100%'  } }/>
								<Flex align="center" justify="start" style={{ marginTop: '10px', padding: '0 10px' }}>
									<ColorPalette
										disableCustomColors={true}
										colors={ themeColors }
										value={ value.val }
										onChange={ handleOnChange }
										clearable={false}
									/>
								</Flex>
							</>
						}


						{ customColors && customColors.length > 0 &&
							<Flex align="center" justify="start" style={{ marginTop: '10px', padding: '0 10px' }}>
								<ColorPalette
									disableCustomColors={true}
									colors={ customColors }
									value={ value.val }
									onChange={ handleOnChange }
									clearable={false}
								/>
							</Flex>
						}


					</div>
				</Popover>
			)}
		</div>

	)
};

export default SingleColorPicker;
