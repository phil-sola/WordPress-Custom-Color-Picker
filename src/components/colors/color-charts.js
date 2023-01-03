import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import harmoniesPlugin from "colord/plugins/harmonies";
import { Flex, __experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components'



export function ColorTints({ color, onChange }) {
	extend([mixPlugin]);

	const currentColor = colord(color);

	let tints = currentColor.tints(6).map((c) => c.toHex());

	return(
			<Flex className="wps-color-tints-wrap" gap={0} style={{ width: '100%' }}>
				<ToggleGroupControl
						defaultChecked=""
						label="Tint"
						style={{ width: '100%' }}
						isBlock
						__nextHasNoMarginBottom
						isDeselectable={true}
						onChange={onChange}
				>
					{tints.map( tint => <ToggleGroupControlOption value={tint} style={{ backgroundColor: tint  }} /> )}
				</ToggleGroupControl>
			</Flex>
	)

}





export function ColorShades({ color, onChange }) {
	extend([mixPlugin]);

	const currentColor = colord(color);

	let shades = currentColor.shades(6).map((c) => c.toHex());

	return(
			<Flex className="wps-color-tints-wrap" gap={0} style={{ width: '100%' }}>
				<ToggleGroupControl
						label="Shade"
						style={{ width: '100%' }}
						isBlock
						__nextHasNoMarginBottom
						hideLabelfromVision={true}
						isDeselectable={true}
						onChange={onChange}
				>
					{shades.map( shade => <ToggleGroupControlOption value={shade} style={{ backgroundColor: shade  }} /> )}
				</ToggleGroupControl>
			</Flex>
	)

}




export function ColorComplementary({ color, onChange }) {

	extend([harmoniesPlugin]);

	const currentColor = colord(color);

	let complementary = currentColor.harmonies("double-split-complementary").map((c) => c.toHex());

	return(
			<Flex className="wps-color-tints-wrap" gap={0} style={{ width: '100%' }}>
				<ToggleGroupControl
						label="Complementary"
						style={{ width: '100%' }}
						isBlock
						__nextHasNoMarginBottom
						hideLabelfromVision={true}
						isDeselectable={true}
						onChange={onChange}
				>
					{complementary.map( c => <ToggleGroupControlOption value={c} style={{ backgroundColor: c  }} /> )}
				</ToggleGroupControl>
			</Flex>
	)

}
