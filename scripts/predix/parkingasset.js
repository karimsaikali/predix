/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var asset = require("./asset");
var mappings = require("./mappings");

/**
 * Class that represents parking assets entities.
 * @class ParkingAsset
 * @constructor ParkingAsset
 * @param {Object} dto The asset entity returned from predix within a json object.
 */

function ParkingAsset(dto,client){
  if(dto){
    var keys = Object.keys(dto);
   	for (var i=0; i< keys.length; i++) {
         this[keys[i]] = dto[keys[i]];
      }
      console.log("device-id - "  + this["device-id"]);
   }
   this.client = client;
}
ParkingAsset.prototype = new asset.Asset();

/**
* @method listVehiculesOut
* lists all the events of vehicules coming out of a parking zone or a parking spot.
* @param {Integer}[startTime] limits the results to all the events that took place after this time in epoch.
* @param {Integer}[endTime] limits the results too all the events that took place before this time in epoch.
* @param {Object} options
* @param {String} [options.size] (optional) determins how many events to retrieve per page.
* @param {String} [options.page] (optional) determins what page to retrieve. Defaults to 0.
* @return {Object} returns an object containing all the vehicule out events that got picked up by this asset, along with the 
* pagination metadata.
*
**/

ParkingAsset.prototype.listVehiculesOut= function(startTime,endTime,options){
	options["serviceType"] = "parking";
	options["eventType"] = mappings.eventTypes.PKOUT;
	options["startTime"] = startTime;
	options["endTime"] = endTime;
	return this.getEvents(options)
}


/**
* @method listVehiculesIn
* lists all the events of vehicules coming into a parking zone or a parking spot.
* @param {Integer}[startTime] limits the results to all the events that took place after this time in epoch.
* @param {Integer}[endTime] limits the results too all the events that took place before this time in epoch.
* @param {Object} options
* @param {String} [options.size] (optional) determins how many events to retrieve per page.
* @param {String} [options.page] (optional) determins what page to retrieve. Defaults to 0.
* @return {Object} returns an object containing all the vehicule in events that got picked up by this asset, along with the 
* pagination metadata.
*
**/

ParkingAsset.prototype.listVehiculesIn= function(startTime,endTime,options){
	options["serviceType"] = "parking";
	options["eventType"] = mappings.eventTypes.PKIN;
	options["startTime"] = startTime;
	options["endTime"] = endTime;
	return this.getEvents(options)
}			