//Import the below modules using "npm i -save request oauth-1.0a crypto"
const request = require('request')
const OAuth = require('oauth-1.0a')
CryptoJS = require('crypto-js')
const axios = require("axios");

// Token request function
const generateToken = ()=>  {
    
    // #1 Initialize OAuth with your HERE OAuth credentials from the credentials file that you downloaded above
    const oauth = OAuth({
        consumer: {
            key: process.env.HEREACCESSKEYID, //Access key
            secret: process.env.HEREACCESSKEYSCRET, //Secret key
        },
        signature_method: 'HMAC-SHA256',
        hash_function(base_string, key) {
            return  CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64);
        },
    });
    // #2 Building the request object.
    const request_data = {
        url: process.env.HERETOKENURL,
        method: 'POST',
        data: { grant_type: 'client_credentials' },
    };
    // #3 Sending the request to get the access token
  
    return new Promise ( (resolve, reject)=>{

        request(
            {
                url: request_data.url,
                method: request_data.method,
                form: request_data.data,
                headers: oauth.toHeader(oauth.authorize(request_data)),
            },(err, response )=>{
                if (response.statusCode == 200) {
                    result = JSON.parse(response.body);
                    resolve (result.access_token);
                }
                reject(err);
            }
        );
    });
}

const geoLocationHere = async (location) =>  {
    var url = `${process.env.HEREAPI}?q=${location}`;
    let tokenHere = await generateToken();
    let data = await axios({
        method: 'get',
        url: `${url}`,
        headers: {
          'Authorization': `Bearer ${tokenHere}`
        }
    });
    var { ...respuesta} = data.data["items"]; 
    
    if( Object.keys(respuesta).length !== 0 ){
     return respuesta[0]["position"];
    }else{
     return  'No se encontraron resultados en HERE'; 
    }
}

module.exports ={
    generateToken,
    geoLocationHere
}