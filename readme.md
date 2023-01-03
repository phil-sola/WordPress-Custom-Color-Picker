# WordPress-Custom-Color-Picker
Custom gutenberg color picker component

![image](https://user-images.githubusercontent.com/40669220/210436977-f28774a5-2561-4c2e-b060-4f922e8cf32c.png) ![image](https://user-images.githubusercontent.com/40669220/210438608-f5877164-84c4-45ce-b455-7d0caf7226f7.png)

After raising an issue on the official gutenberg [repo](https://github.com/WordPress/gutenberg/issues/46824), about improving the core color pickers & tidying up the existing options, I decided to try building my own to satisfy my own custom block development wants.

**PLEASE NOTE**: This was developed as a personal project

a.) to push myself further with custom block/component development\
b.) With no prior experience of building anything like this before. It most likely can be improved significantly I imagine!

After sharing some screenshots on twitter, [Nick Diego](https://github.com/ndiego) kindly helped make this far more flexible by giving me a heads up regarding the importance of the slug in the global colors as this is the only sure way to retain that colour if changed centrally in the Site Editor - thanks Nick!

This isn't finished and at some point soon, I have a TODO list of additional features I'd like to add:

- GradientPicker built in alongside the swatch for the Background Color
- Toggle to change the text input from HEX to rgba or hsla instead if preferred (although not sure it adds much)

If **you** can think of anything missing as well, I'd love to get any feedback on this.

## Props

Given this isn't using the native supports like the core color picker, keeping the external API as clean as possible was one of the biggest challenges. I hope I have managed to achieve this and abstract as much as possible away from anyone using this.

The <ColorPicker> component has 3x Props currently

- palettes (Arr of Objects) Required*
- icon
- title

<pre>` {
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
  },`</pre>

**name**: The attribute name to update the specific attribute\
**value**: The color code string\
**label**: Text label for the individual picker


## Attributes

Having taken inspiration from CoBlocks, I have set up specific attributes in the component folder which can be added to the block attributes so you don't need to concern yourself with creating these for the picker to work. (Check out the example block index.js file to understand how that works).

### textColor (Obj)
### backgroundColor (obj)
### linkColor (obj)

Each of these objects have the same 2 properties:

1. val [string] (the color code string)
2. slug [string] (the possible color slug if global color selected)

It goes without saying that you can add/remove any of these attributes if you prefer for *your* block.


## Features

This color picker component has the following features out of the box:

- Color Picker with hue, alpha, saturation
- Copy to clipboard
- Eyedropper
- Global colours (theme & custom - I purposely left out the default palette, you can add it, very easily if you prefer)
- Color charts - Tint, shade, complementary

All in one window, without having to open up several dropdown popovers like the core picker.


## Contributing
If anyone knows of a better way to configure everything within webpack to make this even slicker, I would be very happy for pull requests and contributions to this.
