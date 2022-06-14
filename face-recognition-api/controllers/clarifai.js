

const handleClarifai = async (req, res, fetch) => {


	const MODEL_ID = process.env.MODEL_ID;
  	const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID;
  	const USER_ID = process.env.USER_ID;
  	const APP_ID = process.env.APP_ID;
  	const PAT = process.env.PAT
  	const IMAGE_URL = req.body.image_url;


	const raw = JSON.stringify({
	  "user_app_id": {
	    "user_id": USER_ID,
	    "app_id": APP_ID
	  },
	  "inputs": [
	    {
	      "data": {
	        "image": {
	            "url": IMAGE_URL
	          }
	      }
	    }
	  ]
	});



   const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };


	const data = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)

	const dataResponse = await data.json()

	res.send(dataResponse)

}


module.exports = {
	handleClarifai : handleClarifai

}



