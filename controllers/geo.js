const { response, request } = require('express');
const { geoLocationHere } = require('../helpers/generateGeoFromHere');
const { geoLocationGoogle } = require('../helpers/generateGeoFromGoogle');

const getLocations = async (req = request, res = response) => {
    
    const { location } = req.body;
    if( !location ){
        return res.status(400).json({
            msg:'se debe enviar una ubicacion valida'
        });
    }
    try {
        const dataHere =  await geoLocationHere(location);
        const dataGoogle = await geoLocationGoogle(location);
        
        let latlog ='';

        if(dataHere){
            latlog = dataHere;
        }else{
          if(dataGoogle){
            latlog = dataGoogle;
          }
        }     

        return res.status(200).json({
            latlog,
            dataHere,
            dataGoogle
        });

    } catch (error) {
        res.status(500).json({
            msg:'Ocurrio un error en el sistema',
            error
        })
    }
}

module.exports = {
    getLocations
}