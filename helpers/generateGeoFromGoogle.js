const request = require('request')
const axios = require("axios");
const { response } = require('express');

const geoLocationGoogle = async (location, res = response) =>  {
        let resp = '';
        await axios({
            method: 'get',
            url: `${process.env.GOOGLEAPI}?address=${location}&key=${process.env.GOOGLEKEY}`,
        }).then((response)=>{
            resp = response.data.results;
        }).catch( (error)=>{
            resp = error;
        });     
        var { ...respuesta} = resp; 
        if(respuesta.length > 0){
            return respuesta[0]["geometry"]["location"];
           }else{
            return  'No se encontraron resultados en Google'; 
           }
        
}

module.exports ={
    geoLocationGoogle
}