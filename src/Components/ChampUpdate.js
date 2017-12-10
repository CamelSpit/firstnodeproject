//if this.props.champion === "", don't do anything. once it's populated, can do a check on teh array to see if a put or post request should be done. 

axios.get("/api/champions").then(res=>{
    console.log(res);
    var champsarray = res.data;
})

function PP (tempvar){
    champsarray.map((champion, index)=> {
        if (champsarray.indexOf(champion.name)!==-1){
            let id = index;
            axios.put(`/api/champions/${name}/${id}`).then(res=>{
               return console.log(res);
            })
        }

    })

    axios.post(`/api/champion/${name}`).then(res=>{
        return console.log(res);
    })
}





putChampion: (req, res) => {
    let name = req.params.name;
    champions.map((champion, index)=> {
         if (champion.name===name) {
             return champions.push({name: name, wins: champions[index].wins+1 });
         }
    })
 return champions.push({name : name, wins : 1});
},