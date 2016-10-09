var imgPath;
var destinationUrl = "http://localhost:8080/crossplatform_workspace/nixapi/uploadapi.php";

var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        document.getElementById("cameraTakePicture").addEventListener("click",cameraTakePicture);
        document.getElementById("button-cancle").addEventListener("click",cancleupload);
        document.getElementById("button-upload").addEventListener("click",uploadPhoto);
    },

};

//  Take Photo Camera
function cameraTakePicture() {
      navigator.camera.getPicture(onSuccess, onFail, {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            sourceType: Camera.PictureSourceType.CAMERA,
	allowEdit: false,
	encodingType: Camera.EncodingType.JPEG,
	popoverOptions: CameraPopoverOptions,
	correctOrientation:true
      });
}

function onSuccess(imageData)
{
	var image = document.getElementById('image-preview');
	// Hide Show logo
	document.getElementById("showlogo").style.display="none";
	image.src = imageData;
	document.getElementById("uploadbar").style.display="block";

	// กำหนด path ของรูป
	imgPath = imageData;
}

function onFail(message)
{
	alert('Failed because: ' + message);
}

// Cancel upload 
function cancleupload()
{
	var image = document.getElementById('image-preview');
	image.src = '';
	document.getElementById("uploadbar").style.display="none";
	document.getElementById("showlogo").style.display = "block";
}

// Upload photo function
function uploadPhoto()
{
	//set upload file options
	var options = new FileUploadOptions();
	options.fileKey = "photo";
	options.fileName = imgPath;
	options.mimeType = "image/jpeg";

	//set file transfer
        	var fileTransfer = new FileTransfer();

	//upload file
	fileTransfer.upload(imgPath,destinationUrl,function(response){
		//on success
		alert(response.response);
		// clear screen
		cancleupload();
	}, function(error){
		//on failed
            		alert("An error has occured: Code=" + error.code);	
	}, options);
}

app.initialize();