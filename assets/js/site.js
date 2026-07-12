(() => {
  const current = document.body.dataset.path || "/";
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const path = new URL(link.href).pathname;
    const active = path === "/" ? current === "/" : current.startsWith(path);
    if (active) link.setAttribute("aria-current", "page");
  });

  const studioDrawers = document.querySelector("#studio-drawers");
  const studioEasel = document.querySelector("#studio-easel");
  if (studioDrawers && studioEasel) {
    const drawers = [
      {id:"comics",title:"Comics",description:"Sequential art and illustrated stories.",collections:[
        {id:"kacey",title:"Knight Kacey",note:"Covers, character art, comic pages, and the long road from idea to reader.",items:[
          {title:"Knight Kacey · cover",caption:"The cover will live here when it is chosen.",tone:"kacey"},
          {title:"Knight Kacey · page one",caption:"Previous and next keep a sequence readable on any screen.",tone:"paper"},
          {title:"Knight Kacey · page two",caption:"The complete tray makes it easy to jump between panels.",tone:"forge"},
          {title:"Knight Kacey · notes",caption:"Concept art and working notes can sit beside finished pages.",tone:"ink"}
        ]},
        {id:"short-comics",title:"Short Comics",note:"Small sequences, recurring jokes, and one-off illustrated stories.",items:[{title:"A future short comic",caption:"This subdrawer is ready for the first chosen sequence.",tone:"night"}]}
      ]},
      {id:"costumes",title:"Costumes",description:"Roleplays, characters, themed days, and borrowed worlds.",collections:[
        {id:"apocalypse",title:"Apocalypse Roleplay",note:"A roomy example of the many-image collections we will eventually keep.",items:[
          {title:"The team",caption:"Collection placeholder one.",tone:"ember"},{title:"On the road",caption:"Collection placeholder two.",tone:"road"},{title:"Safe house",caption:"Collection placeholder three.",tone:"shelter"},{title:"After the rain",caption:"Collection placeholder four.",tone:"rain"},{title:"The orchard",caption:"Collection placeholder five.",tone:"orchard"}
        ]},
        {id:"witchcraft",title:"Witchcraft",note:"Costumes, covens, spellwork, and the days we chose a little magic.",items:[{title:"A witching hour",caption:"A future photograph and its story can live here.",tone:"ink"},{title:"The second spell",caption:"Collections may be small or sprawling.",tone:"night"}]},
        {id:"video-games",title:"Video Game Day",note:"Characters borrowed for an afternoon and the evidence left behind.",items:[{title:"Player one",caption:"A future costume set.",tone:"garden"},{title:"Player two",caption:"A future costume set.",tone:"summer"},{title:"Continue?",caption:"A future costume set.",tone:"home"}]}
      ]},
      {id:"portraits",title:"Portraits",description:"Faces, quiet moments, and days remembered together.",collections:[
        {id:"ordinary",title:"Ordinary Miracles",note:"Days out, quiet rooms, rain, coffee, and evidence that we were here.",items:[{title:"Rain at the windows",caption:"A future photograph and the story of that day can live together here.",tone:"rain"},{title:"Summer light",caption:"One picture or twelve: the collection works the same way.",tone:"summer"},{title:"The long way home",caption:"A caption can be as small as a date or as long as needed.",tone:"home"}]}
      ]},
      {id:"paintings",title:"Paintings",description:"Finished pieces, studies, and imagined landscapes.",collections:[
        {id:"garden",title:"Garden Studies",note:"Places, people, and glimpses from the world behind the glass.",items:[{title:"At the gate",caption:"The first image in a future Garden set.",tone:"garden"},{title:"Under the impossible sky",caption:"A second place is ready.",tone:"night"}]}
      ]},
      {id:"musings",title:"Musings",description:"Experiments and lovely things that refuse a label.",collections:[
        {id:"oddments",title:"Oddments & Experiments",note:"Visual jokes, tests, fragments, and surprises.",items:[{title:"An unreasonable idea",caption:"Not everything needs to become a project to deserve keeping.",tone:"forge"},{title:"A small beautiful error",caption:"Experiments can remain experiments here.",tone:"ink"},{title:"Something without a name",caption:"The uncategorizable things get to be deliberate.",tone:"summer"}]}
      ]}
    ];
    const state = {drawer:0,collection:0,index:0,all:false};
    const chosen = () => drawers[state.drawer].collections[state.collection];
    const reset = () => { state.index=0; state.all=false; };
    const renderDrawers = () => {
      studioDrawers.innerHTML = '<p class="eyebrow">The cabinet</p><h2>The Drawers</h2>' + drawers.map((drawer,di) => {
        const open=di===state.drawer;
        const subs=open?'<div class="subdrawers" id="subdrawers-'+drawer.id+'">'+drawer.collections.map((sub,ci)=>'<button type="button" data-collection="'+ci+'" class="'+(ci===state.collection?'active':'')+'"><span>'+sub.title+'</span><small>'+sub.items.length+' '+(sub.items.length===1?'piece':'pieces')+'</small></button>').join("")+'</div>':"";
        return '<div class="drawer-group '+(open?'active':'')+'"><button type="button" class="drawer-button" data-drawer="'+di+'" aria-expanded="'+open+'" aria-controls="subdrawers-'+drawer.id+'"><span>'+drawer.title+'<small>'+drawer.description+'</small></span><b aria-hidden="true">'+(open?'−':'+')+'</b></button>'+subs+'</div>';
      }).join("");
    };
    const image = (item,main=false) => '<span class="album-image '+(main?'main-image ':'')+'tone-'+item.tone+'" '+(main?'role="img" aria-label="Placeholder for '+item.title+'"':'aria-hidden="true"')+'><i>Image chosen later</i></span>';
    const renderEasel = () => {
      const drawer=drawers[state.drawer], collection=chosen(), currentItem=collection.items[state.index];
      const content=state.all
        ? '<div class="studio-all">'+collection.items.map((item,i)=>'<button type="button" data-image="'+i+'">'+image(item)+'<strong>'+item.title+'</strong></button>').join("")+'</div>'
        : '<div class="easel-viewer"><div class="easel">'+image(currentItem,true)+'<span class="easel-ledge"></span></div><div class="album-caption"><p class="eyebrow">'+(state.index+1)+' of '+collection.items.length+'</p><h3>'+currentItem.title+'</h3><p>'+currentItem.caption+'</p><div class="album-controls"><button type="button" data-move="-1" aria-label="Previous image">← Previous</button><button type="button" data-move="1" aria-label="Next image">Next →</button></div></div></div>';
      studioEasel.innerHTML='<div class="easel-heading"><div><p class="eyebrow">'+drawer.title+' · selected collection</p><h2 id="collection-title">'+collection.title+'</h2><p>'+collection.note+'</p></div><button type="button" class="text-button" data-all>'+ (state.all?'Return to easel':'See everything') +'</button></div>'+content+'<div class="thumbnail-tray" aria-label="Images in this collection">'+collection.items.map((item,i)=>'<button type="button" data-image="'+i+'" aria-label="Show '+item.title+'" aria-current="'+(i===state.index)+'" class="'+(i===state.index?'active':'')+'"><span class="tone-'+item.tone+'"></span><small>'+(i+1)+'</small></button>').join("")+'</div>';
    };
    studioDrawers.addEventListener("click",(event)=>{
      const drawerButton=event.target.closest("[data-drawer]");
      const collectionButton=event.target.closest("[data-collection]");
      if(drawerButton){state.drawer=Number(drawerButton.dataset.drawer);state.collection=0;reset();renderDrawers();renderEasel();}
      if(collectionButton){state.collection=Number(collectionButton.dataset.collection);reset();renderDrawers();renderEasel();}
    });
    studioEasel.addEventListener("click",(event)=>{
      const move=event.target.closest("[data-move]"), pick=event.target.closest("[data-image]"), all=event.target.closest("[data-all]");
      const collection=chosen();
      if(move){state.index=(state.index+Number(move.dataset.move)+collection.items.length)%collection.items.length;renderEasel();}
      if(pick){state.index=Number(pick.dataset.image);state.all=false;renderEasel();}
      if(all){state.all=!state.all;renderEasel();}
    });
    renderDrawers();renderEasel();
  }

  const mapRoot=document.querySelector("#constellation-room");
  if(mapRoot){
    const constellations=[
      {id:"camelot",name:"Camelot",sigil:"The Crown",x:26,y:30,stars:[[0,42],[18,12],[39,38],[61,8],[82,40],[48,72]],text:"A world inside a castle: towers, rooms, courts, hidden doors, and enough history to need a sky of its own."},
      {id:"garden",name:"The Garden",sigil:"The Lantern Path",x:65,y:23,stars:[[2,22],[24,48],[42,8],[63,36],[86,4],[72,70]],text:"The largest constellation. The gate, the tree, the bookshop, the cabin, and everything still unnamed gather here."},
      {id:"clocktown",name:"Clocktown",sigil:"The Bent Hour",x:55,y:64,stars:[[0,12],[23,42],[48,20],[68,56],[92,28]],text:"A bright, peculiar machinery of streets and hours. Its stories can open as smaller stars when we are ready."},
      {id:"neverheart",name:"Neverheart",sigil:"The Wayward Wing",x:18,y:70,stars:[[4,58],[26,18],[49,48],[68,8],[92,32]],text:"A far point in the night map, kept distinct so its people, places, and memories have room to breathe."}
    ];
    let selected=0;
    const renderMap=()=>{
      const chosen=constellations[selected];
      const sky='<div class="night-map" role="group" aria-label="Constellations of the Garden"><div class="star-dust" aria-hidden="true"></div>'+constellations.map((c,i)=>'<button type="button" data-star="'+i+'" class="constellation constellation-'+c.id+' '+(i===selected?'active':'')+'" style="left:'+c.x+'%;top:'+c.y+'%" aria-label="Open '+c.name+'"><span class="star-field" aria-hidden="true">'+c.stars.map(s=>'<i style="left:'+s[0]+'%;top:'+s[1]+'%"></i>').join("")+'<b></b></span><strong>'+c.name+'</strong></button>').join("")+'<div class="sky-compass" aria-hidden="true"><span class="compass small-compass"><i>N</i><b>✦</b><em>S</em></span></div><p class="sky-instruction">Select a constellation</p></div>';
      const drawer='<aside class="star-drawer" aria-live="polite"><p class="eyebrow">Constellation · '+chosen.sigil+'</p><h2>'+chosen.name+'</h2><p>'+chosen.text+'</p><div class="drawer-rule"></div><p class="small">Later, its brightest stars can open individual places, people, and memories.</p><nav aria-label="Choose another constellation">'+constellations.map((c,i)=>'<button type="button" data-star="'+i+'" class="'+(i===selected?'active':'')+'">✦ '+c.name+'</button>').join("")+'</nav></aside>';
      mapRoot.innerHTML=sky+drawer;
    };
    mapRoot.addEventListener("click",(event)=>{const button=event.target.closest("[data-star]");if(button){selected=Number(button.dataset.star);renderMap();}});
    renderMap();
  }
})();
