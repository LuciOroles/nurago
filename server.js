var express = require('express');
var app = express();
var PORT = process.env.PORT || 8257;
var request = require('request-promise');
app.get('/api', function(req, res) {
 	
 	var theId =req.query.id;
 	//console.log( req.query.id + "# "  + 		req.query.person_id  + "#" +  		 			req.query.name + "#" + 			req.query.emailAddress+ "#" +  			req.query.tags + "#" );
 	var pathId= req.query.pathID || "13";

 	//console.log(pathId);
	//console.log(theId + " id pushed");
	//http://localhost:8257/api/pjtu9965336/22
	//http://localhost:8257/api?id=pjtu9965364&person_id=1&name=Georgel&emailAddress=mail@mail.com&tags=test&pathID=13
	//https://pure-taiga-37878.herokuapp.com/api?id=pjtu9965346&person_id=1&name=Gigel&emailAddress=mail@mail.com&tags=test&pathID=13
  //https://ldm.nurago.com/api/v1/dmi.tt/source-panels/13/members"
	var options = {
		uri : 'https://ldm.nurago.com/api/v1/dmi.tt/source-panels/'+ pathId +'/members?apikey=OTXMl4ANNqHtIxIwm7deqIcdAYQvB4QJXNp7OMX6aLzSwJbPtUjlE2GUDThrPr2KOeNWene5TPmpXKEaZ7AZtlHX4Kqu2cQXAk7I&apikey=OTXMl4ANNqHtIxIwm7deqIcdAYQvB4QJXNp7OMX6aLzSwJbPtUjlE2GUDThrPr2KOeNWene5TPmpXKEaZ7AZtlHX4Kqu2cQXAk7I',
		method: 'POST' ,
	 	json: true, 
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
    // delete response.source_panel;
     console.log( response.internal_id);
     res.json(response);
  })
  .catch(function (err) {
        res.status(404).json({
                     error : err
                 });
  });
});
app.listen(PORT, function() {
    console.log("express listening on port " + PORT + "!");
});
