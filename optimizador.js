// var vidres=[{u:10,h:100,w:200},{u:15,h:300,w:25},{u:45,h:50,w:75}];
//
// var res=optimiza(vidres,{h:255,w:321},9999)
// console.log("Optimizador:",res)



function optimiza(vidresIni,max,repeticions=100){

    function rnd(){  return Math.random()>0.5  }

    // Validem si vides tenen u - unitats i el repetim a la llista
    var vidresRep=[]
    vidresIni.forEach(vidre => {
        if(vidre.u){
            for (let i = 0; i < vidre.u; i++) {
                vidresRep.push({h:vidre.h,w:vidre.w})
            }
        } else {
            vidresRep.push(vidre)
        }
    });

    // Validem que els vidres no siguin més grans que la planxa
    var vidresGrans=[];
    var vidresOk=[];

    vidresRep.forEach(vidre => {
        if((vidre.h>max.h && vidre.w>max.w) || (vidre.h>max.w && vidre.w>max.h)){ 
            vidresGrans.push(vidre)
        } else {
            vidresOk.push(vidre)
        }
    });
    var vidres=vidresOk;



    var millor={numPlanxes:1000000, planxes:[]}

    for (let rep = 0; rep < repeticions; rep++) {

        var contaPlanxes=1
        var planxes = [];
        var maxCopy = { h: max.h, w: max.w };
        planxes.push(maxCopy);

        vidres.sort(() => Math.random() - 0.5);


        vidres.forEach((vidre) => {
            if( rnd ) { var aux=vidre.h; vidre.h=vidre.w; vidre.w=aux }
            
            var fet=false

            for (let i = 0; i < planxes.length; i++) {
                const planxa = planxes[i];
                if(vidre.h<=planxa.h && vidre.w<=planxa.w){
                    if( rnd ) {
                        planxes[i].h=planxa.h-vidre.h
                        planxes[i].w=planxa.w
                        planxes.push({h:vidre.h,w:planxa.w-vidre.w})
                    } else {
                        planxes[i].h=planxa.h
                        planxes[i].w=planxa.w-vidre.w
                        planxes.push({h:planxa.h-vidre.h,w:vidre.w})
                    }
                    fet=true
                    break;
                } 
            }

            if ( !fet ) {
                contaPlanxes++
                if(vidre.h>max.h || vidre.w>max.w){ 
                    var aux=vidre.h; vidre.h=vidre.w; vidre.w=aux;
                } 

                if( rnd ) {
                    planxes.push({h:max.h-vidre.h,w:max.w})
                    planxes.push({h:vidre.h,w:max.w-vidre.w})
                } else {
                    planxes.push({h:max.h-vidre.h,w:vidre.w})
                    planxes.push({h:max.h,w:max.w-vidre.w})
                }
            }

        });

        // Eliminem planxes de 0
        for (let i = 0; i < planxes.length; i++) {
            const planxa = planxes[i];
            if(planxa.h==0 || planxa.w==0){
                planxes.splice(i,1)
                i--
            }
        }

        if(contaPlanxes<millor.numPlanxes || contaPlanxes<=millor.numPlanxes && planxes.length<millor.planxes.length){
            millor.numPlanxes=contaPlanxes
            millor.planxes=planxes
        }
    }


    // suma els m2 de vidresTallats
    var vidresTallatsM2=0;
    vidres.forEach(vidre => {
        vidresTallatsM2+=vidre.h*vidre.w/10000
    });
    var planxesM2=millor.numPlanxes*(max.h*max.w)/10000

    return {
        numPlanxes: millor.numPlanxes, 
        vidresTallats: vidres , 
        retalls: millor.planxes, 
        vidresGrans: vidresGrans, 
        vidresTallatsM2: vidresTallatsM2,
        planxesM2: planxesM2,
        desperdici: (planxesM2-vidresTallatsM2)/planxesM2*100
    }
}



