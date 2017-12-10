var pending = ['...checking pulses...','Wading through the carnage...','Looting the body...','Oh the horror!','Medic!'];
var champions = [];

module.exports = {
   getPending: (req,res) => {
       var index = Math.floor(Math.random()*4)+1;
       res.send(pending[index])
   },

   putChampion: (req, res) => {
        let name = req.params.name;
        let index = req.params.id;
        champions[index] = {name: name, wins : champions[index].wins+1};
   },

   getChamps: (req, res)=> {
       res.send(champions);
   },

   postChamp: (req, res) => {
       let name = req.params.name;
       champions.push({name : name, win : 1});
   }

};