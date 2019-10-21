# abberation-inspector
Photoshop script to generate images similar to those created by Pixinsights' Abberation Inspector process

## How to run
You can choose to add the script to your File>Scripts menu by copying the abberation_inspector.js file to your Presets>Scripts directory (for me that exists at `C:\Program Files\Adobe\Adobe Photoshop CC 2019\Presets\Scripts`). Otherwise you can use the File>Scripts>Browse option and manually select the script to run it.

Once you have decided on the method of execution, make the image you'd like to inspect active in Photoshop (bring its tab to the front so that you can see the image) then invoke the script by selecting it from the File>Scripts menu (or utilize Browse). Enter the number of pixels you'd like to have included in each cell of the new image and click OK.

The script will pull 9 subsections from your original image including the center and the 4 corners and put them together in a new image to allow you to observe any abnormalities in the star shapes in your source image.
