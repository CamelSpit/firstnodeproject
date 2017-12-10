var pending = ['...checking pulses...','Wading through the carnage...','Looting the body...','Oh the horror!','Medic!'];
var champions = [];

module.exports = {
   getPending: (req,res) => {
       console.log("getpending");
       var index = Math.floor(Math.random()*4)+1;
       res.send(pending[index])
   },

   putChampion: (req, res) => {
       console.log(req.params, "putChampion");
        let name = req.params.name;
        let index = req.params.id;
        // champions[index] = {name: name, wins : champions[index].wins+1};
        if (champions[index]) {
            champions[index].wins++;
        }
        res.send("alfredo");
   },

   getChamps: (req, res)=> {
       console.log("getChamps");
       res.send(champions);
   },

   postChamp: (req, res) => {
       console.log(req.params, "postChamp")
       let name = req.params.name;
       champions.push({name : name, wins : 1});
       res.send("Marinara");
   },

   deleteChamp: (req, res) => {
       let index = req.params.id;

       champions.splice(index,1);
       res.send('Bye Felicia! Bye!')

   }

};