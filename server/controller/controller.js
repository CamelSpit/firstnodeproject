let pending = ['...checking pulses...','Wading through the carnage...','Looting the body...','Oh the horror!','Medic!'];

module.exports = {
   getPending: (req,res) => {
       var index = Math.floor(Math.random()*4);
       res.send(pending[index])
   }

}