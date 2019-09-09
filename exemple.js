// 'form'.js()
// .on('submit' , e => {

//     e.stop() ;

//     if( e.this.elements['todo'].isValid ) {

//         const li = 'li'.node() ;
//         li.text = e.fields[0] ;
        
//         'ul'.js().add( li , 'first' ) ;
//     }

// } )
// .constraints( field => ( // auto live events attach 2 field auto check constraints
//     field.name === 'todo' && field.value.trim().length > 2
// ) )
// .on( 'form'.js().liveEvent , e => {

//     if( e.field.isValid ) {

//         'btn'.js().disabled = false;
//         'sp'.js().text = 'valide' ;
        
//     } else {
        
//         'btn'.js().disabled = true;
//         'sp'.js().text = '3 caractéres min' ;
//     }

// } )
// ;
// 'form'.js().sync.x.left = false;

/**
usage:

node.sync('x').left = true;
node.sync('x').ref = nodeReference;

node.sync('y').top = true;
node.sync('y').ref = nodeReference;
 */

const d = 'd'.js() ;
const sct = 'sct'.js() ;

d.sync('x').left = true;
d.sync('x').ref = sct;

