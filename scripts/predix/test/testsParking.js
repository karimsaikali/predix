/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var factory = require("../factory");

var predix = new factory.Predix();
var parkingManager = predix.getParkingManager();
var boundary1 = "32.123:-117";
var boundary2 = "32.714983:-117.158012";


// first page , 2 result per page
var options = {
	"page":	0,
	"size": 2
}


// list all parking assets within the specified boundaries
var result =  parkingManager.listParkingInAssetsWithin(boundary1, boundary2, options);
var asset  =  result["assets"][0];

var startDate = new Date();
startDate.setMonth(startDate.getMonth() - 1);
var endDate = new Date();

var options = {
		 "size":2,
		 "page":1
}
//list vehicles that went into a parking zone or parking spot.
return asset.listVehiculesIn((endDate.getTime() - (24 * 60 * 60 * 1000)),endDate.getTime(),options);			
