// with rookjs tomorrow i want write:

/**
 * synchronyze position Node2Node
 */ 

// now i write
node.style.left = (nodeRef.offsetLeft - node.offsetWidth) + 'px';

// tomorrowjs
node.sync.x.left = true ;
node.sync.x = nodeRef ;

// now i write
node.style.left = (nodeRef.offsetLeft + nodeRef.offsetWidth) + 'px'; 

// tomorrowjs
node.sync.x.right = true ;
node.sync.x = nodeRef ;

// now
node.style.top = (nodeRef.offsetTop - node.offsetHeight) + 'px';

// tomorrowjs
node.sync.y.top = true;
node.sync.y = nodeRef ;

// now
node.style.top = (nodeRef.offsetTop + node.offsetHeight) + 'px';

// tomorrowjs
node.sync.y.bottom = true;
node.sync.y = nodeRef ;

// end node2node

/**
 * stabilize selector
 */

// now i write
'selector'.js().querySelector('adjacent-selector') ;

// tomorrowjs
'selector'.js().js('adjacent-selector') ;


//now i write
const copy = 'block'.js().cloneNode( true ) ;
copy.id = null ;

'block'.js().parentNode.add( copy , 'bottom' ) ;

// tomorrowjs
const numberDuplicate = 5 ;

'block'.js().duply( numberDuplicate , 'bottom' , ( duplycate , key ) => {

    duplycate.id = 'abc' + key ;
    
    // classList add to duplycate if: key+1 % 2 === 0 
    duplycate.even = 'prefix' || true; // "-even" or "even" if prefix is not string
} ) ;
// n.duply(
//     number , nbrDuply
//     string? , position
//     (duplycate,key,transferData) => void? , mapper
//     any? , transferData // for binding fx
// )

// now i write

form
.constraints( /* ... */ )
.on( form , e => { // events live

    if( 
        e.field.name === 'todo' &&
        e.field.type === 'focus'
    ) {

        if( e.field.isValid ) {

            /* ... */ 
        } else {

            /* ... */ 
        }
    
    } else if(
        e.field.name === 'todo' &&
        e.field.type === 'blur'
    ) {
        
        if( e.field.isValid ) {

            /* ... */ 
        } else {

            /* ... */ 
        }

    }


    

} ) ;

// tomorrowjs
form
.constraints( /* ... */ )
.on( form , e => { // events live

    e.todo.focus( isValid => {

        if( isValid ) {

            /* ... */
            
        } else {
            
            /* ... */
        }

    } ).blur( isValid => {

        
        if( isValid ) {

            /* ... */
            
        } else {
            
            /* ... */
        }

    } ) ;

} ) ;
