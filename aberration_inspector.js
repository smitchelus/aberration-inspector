#target photoshop
// constants
BORDER = 10
CELL = parseInt(prompt("Please enter cell sizein pixels", "128"));

// Capture defaults
defaultUnits = app.preferences.rulerUnits
defaultBgColor = app.backgroundColor

app.preferences.rulerUnits = Units.PIXELS

origDoc = app.activeDocument

function makeBlack() {
  black = new SolidColor()
  black.rgb.blue = 0
  black.rgb.red = 0
  black.rgb.green = 0
  return black
}

function copyRegion(copyDoc, topLeft, topRight, bottomRight, bottomLeft) {
  app.activeDocument = copyDoc
  shapeRef = [ topLeft, topRight, bottomRight, bottomLeft ]
  copyDoc.selection.select(shapeRef)
  copyDoc.selection.copy(copyDoc.layers.length > 1 ? true : false )
}

function pasteRegion(topLeft, topRight, bottomRight, bottomLeft) {
  app.activeDocument = mydoc
  shapeRef = [ topLeft, topRight, bottomRight, bottomLeft ]
  mydoc.selection.select(shapeRef)
  mydoc.paste(true)
}

// Setup our new image
app.backgroundColor = makeBlack()
mydoc = app.documents.add((CELL * 3) + (BORDER * 2), (CELL * 3) + (BORDER * 2), app.activeDocument.resolution, "Abberation Inspector", NewDocumentMode.RGB, DocumentFill.BACKGROUNDCOLOR, 1.0, app.activeDocument.bitsPerChannel)

// Left, top region
copyRegion(origDoc, [0,0],  [0,CELL],  [CELL,CELL],  [CELL,0])
pasteRegion([0,0],  [0,CELL],  [CELL,CELL],  [CELL,0])

// Middle, top region
left = (origDoc.width / 2) - (CELL/2)
right = (origDoc.width / 2) + ((CELL/2) - 1)
copyRegion(origDoc, [left,0],  [right,0],  [right,CELL],  [left,CELL])
pasteRegion([CELL+BORDER,0],  [CELL+BORDER+CELL,0],  [CELL+BORDER+CELL,CELL],  [CELL+BORDER,CELL])

// Right, top region
left = origDoc.width - CELL
right = origDoc.width
copyRegion(origDoc, [left,0],  [right,0],  [right,CELL],  [left,CELL])
pasteRegion([(CELL+BORDER)*2,0],  [((CELL+BORDER)*2)+CELL,0],  [((CELL+BORDER)*2)+CELL,CELL],  [(CELL+BORDER)*2,CELL])

// Left, middle region
left = 0
right = CELL
top = (origDoc.height / 2) - (CELL/2)
bottom = (origDoc.height / 2) + ((CELL/2) - 1)
copyRegion(origDoc, [left,top],  [right,top],  [right,bottom],  [left,bottom])
pasteRegion([0,CELL+BORDER],  [CELL,CELL+BORDER],  [CELL,CELL+BORDER+CELL],  [0,CELL+BORDER+CELL])

// Middle, middle region
left = (origDoc.width / 2) - (CELL/2)
right = (origDoc.width / 2) + ((CELL/2) - 1)
top = (origDoc.height / 2) - (CELL/2)
bottom = (origDoc.height / 2) + ((CELL/2) - 1)
copyRegion(origDoc, [left,top],  [right,top],  [right,bottom],  [left,bottom])
upperLeft = [CELL+BORDER, CELL+BORDER]
pasteRegion(upperLeft,  [upperLeft[0]+CELL,upperLeft[1]],  [upperLeft[0]+CELL,upperLeft[1]+CELL],  [upperLeft[0],upperLeft[1]+CELL])

// Right, middle region
left = origDoc.width - CELL
right = origDoc.width
top = (origDoc.height / 2) - (CELL/2)
bottom = (origDoc.height / 2) + ((CELL/2) - 1)
copyRegion(origDoc, [left,top],  [right,top],  [right,bottom],  [left,bottom])
upperLeft = [(CELL+BORDER)*2, CELL+BORDER]
pasteRegion(upperLeft,  [upperLeft[0]+CELL,upperLeft[1]],  [upperLeft[0]+CELL,upperLeft[1]+CELL],  [upperLeft[0],upperLeft[1]+CELL])


// Left, bottom region
left = 0
right = CELL
top = origDoc.height - CELL
bottom = origDoc.height
copyRegion(origDoc, [left,top],  [right,top],  [right,bottom],  [left,bottom])
upperLeft = [0, (CELL+BORDER)*2]
pasteRegion(upperLeft,  [upperLeft[0]+CELL,upperLeft[1]],  [upperLeft[0]+CELL,upperLeft[1]+CELL],  [upperLeft[0],upperLeft[1]+CELL])

// Middle, bottom region
left = (origDoc.width / 2) - (CELL/2)
right = (origDoc.width / 2) + ((CELL/2) - 1)
top = origDoc.height - CELL
bottom = origDoc.height
copyRegion(origDoc, [left,top],  [right,top],  [right,bottom],  [left,bottom])
upperLeft = [CELL+BORDER, (CELL+BORDER)*2]
pasteRegion(upperLeft,  [upperLeft[0]+CELL,upperLeft[1]],  [upperLeft[0]+CELL,upperLeft[1]+CELL],  [upperLeft[0],upperLeft[1]+CELL])

// Right, bottom region
left = origDoc.width - CELL
right = origDoc.width
top = origDoc.height - CELL
bottom = origDoc.height
copyRegion(origDoc, [left,top],  [right,top],  [right,bottom],  [left,bottom])
upperLeft = [(CELL+BORDER)*2, (CELL+BORDER)*2]
pasteRegion(upperLeft,  [upperLeft[0]+CELL,upperLeft[1]],  [upperLeft[0]+CELL,upperLeft[1]+CELL],  [upperLeft[0],upperLeft[1]+CELL])

app.activeDocument = origDoc
origDoc.selection.deselect()
app.activeDocument = mydoc
mydoc.flatten()

// Restore defaults
app.preferences.rulerUnits = defaultUnits
app.backgroundColor = defaultBgColor
