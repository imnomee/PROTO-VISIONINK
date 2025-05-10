# PROTO-VISIONINK

npx create vite@latest

### CameraView.jsx

videoRef is reference we will attach to the video element so we can interact with it in our js code

useEffect will allow us to perform side effects in component, like accessing the camera. The empty dependency array [] ensures that we run this effect only once after the component is first rendered.
navigator.mediaDevices.getUserMedia({video:true}) requests access to the video input device(camera). The {video:true} part specifies that we ony need the video stream and not the audio. If we want audio as well, we would add {audio:true}
if the navigator promise resolves successfully, we will get aa MediaStream Object.
We check the videoRef.current is not null and the reference is avaailable.
The .catch() handles any errors that might occure
Finaly, we will calll the getVideo function within the useEffect hook.

## Canvas

We added another ref for Canvas

# Refs:

drawing: AA booleaan to track whether the useris currently draawing
lastX and lastY: To store the coordinates of the previous mouse position
lineColor: To store the current drawing color
lineWidth: To store the current line width

we get 2d context of the canvas using canvasRef.current.getContext('2d');

# Handlers

handleMouseDown: When the mouse button is pressed we will staart drawing and store the coordinates in lastX and lastY
handleMouseMove: If the drawing.current is true, we start a new path move context set strokes color and width
handleMouseUp: When the mouse button is released, we set the draawing to false and stop drawing

we attach these handlers to the canvas
then we remove the event listengers when component is unmounted

we return a div containing a video element.
