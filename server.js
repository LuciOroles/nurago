var express = require('express');
var app = express();
var PORT = process.env.PORT || 8257;
var request = require('request-promise');



app.get('/api', function(req, res) {
 	
 	var theId =req.query.id;
 	console.log( req.query.id + "# "  + 		req.query.person_id  + "#" +
 		 			req.query.name + "#" +
 			req.query.emailAddress+ "#" +
 			req.query.tags + "#" );

	//console.log(theId + " id pushed");
	//	http://localhost:8257/api/pjtu9965336/22
	//http://localhost:8257/api?id=pjtu9965341&person_id=1&name=Gigel&emailAddress=mail@mail.com&tags=test
	var options = {
		uri : 'https://ldm.nurago.com/api/v1/dmi.tt/source-panels/13/members?apikey=OTXMl4ANNqHtIxIwm7deqIcdAYQvB4QJXNp7OMX6aLzSwJbPtUjlE2GUDThrPr2KOeNWene5TPmpXKEaZ7AZtlHX4Kqu2cQXAk7I',
		method: 'POST' ,
	 	json: true, //"pjtu9965332"
        body : {
                    "household_id": theId ,
                     "person_id": req.query.person_id,
                    "policy_accepted": true,
                    "name": req.query.name,
                    "attributes": {
                        "emailAddress": req.query.emailAddress
                    },
                    "tags": req.query.tags
                }
 
	};

 	request(options).then(function (response) {
    // Request was successful, use the response object at will
     //console.log(response);
     res.json(response);
  })
  .catch(function (err, response, body) {
    // Something bad happened, handle the error
	//    console.log(err);

		console.log(response);
      res.status(404).json({
                     error : err.statusCode
                 });
  });
});


app.listen(PORT, function() {
    console.log("express listening on port " + PORT + "!");
});
