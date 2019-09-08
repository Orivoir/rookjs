/**
 * rookjs DOM library events easy gestionnary
 *  
 * <@author sam.gabor@hotmail.com>
 * <@repository https://github.com/Orivoir/rookjs>
 * <@usage https://orivoir.github.io/rookjs>
 *  
 * @thanks <http://www.wf3.fr>
 * @thanks <http://openclassrooms.com> 
 * 
 * 
 * write by 🐱‍👤 with {JavaScript}
 */
 
const rook = {

    liveEventsName: ['change','input','select','blur','focus'] ,

    dev: true ,

    synthetic( e , node , transfer = null , evtCurrent ) {

        e.x = e.clienX || e.pageX || false ;
        e.y = e.clienY || e.pageY || false ;
        e.coo = {
            x: e.clienX || e.pageX || false ,
            y: e.clienY || e.pageY || false
        } ;
        e.transfer = transfer; // for tranfer after binding this exemple use;
        e.node = node;
        e.this = node;
        e.stop = e.preventDefault || ( () => ( rook.dev ? console.warn('warn your browser do not support : event.preventDefault') : null ) );

        if( e.type === 'submit' ) {
        
            e.fields = Object.keys( node.elements )
                .map( attr => 
                    node.elements[ attr ].value || node.elements[ attr ].checked || node.elements[ attr ].select || false
                ).filter( usual => usual )
            ;
        }

        e.synt = evtCurrent;
        // e = evtCurrent;
        
        e.off = () => { // off event on your event object

            if( evtCurrent ) {

                evtCurrent.active = false;

                return evtCurrent;
            }
            else if( this.dev ) {
                console.warn('your event on' , node  , ' do not exists in memory check your manual remove on events data' );
                return {};
            }
        }

    } ,

    "^0^": function() {

        console.log(
            `%crookjs is ready got learn usage : https://orivoir.github.io/rookjs/` ,
            `background: rgba(42,186,55);color: rgb(30,30,54);`
        );
        document.dispatchEvent( new Event('rook-ready') ) ;
    } ,
 
} ;

( (w,n,nl,a,s,o) => {

    const d = document;

    o.defineProperty( s , 'transformSelector' , {

        get: function() {

            // tag transform accronym
            const assoc= {
                'btn': 'button' ,
                'if': 'iframe' ,
                'ifr': 'iframe' ,
                'obj': 'object' ,
                'f': 'form' ,
                'sp': 'span' ,
                '': 'a', // lol
                'd': 'div',
                'acro': 'acronym' ,
                'acr': 'acronym' ,
                'sec': 'section' ,
                'sct': 'section' ,
                'bq': 'blockquote' ,
                'bd' : 'body' , 
                'cvs': 'canvas',
                'figc': 'figcaption',
                'fgt': 'figcaption' ,
                'fig': 'figcaption',
                'figt': 'figcaption',
                'colg': 'colgroup' ,
                'datal': 'datalist',
                'flist': 'fieldlist',
                'fig': 'figure',
                'fter': 'footer',
                'fset': 'frameset',
                'frset': 'frameset',
                'in': 'input' ,
                'lg': 'legend' ,
                'nof': 'noframes' ,
                'nos': 'noscript' ,
                'optg': 'optgroup' ,
                'out': 'output',
                'pic': 'picture',
                'pict': 'picture',
                'prg': 'progress' ,
                'pro': 'progress' , 
                'prog': 'progress' ,
                'rb': 'ruby' ,
                'sm': 'small' ,
                'str': 'strong' ,
                'sum': 'summary' ,
                'tbd': 'tbody' ,
                'temp': 'template',
                'tmpl': 'template',
                'tmp': 'template',
                'templ': 'template',
                'tpl': 'template',
                'th': 'thead',
                'w': 'wbr',
                'v': 'video',
                'vi': 'video',
                'vid': 'video',
                'addr': 'address',
                'add': 'address',
                'txta': 'textarea',
                'texta': 'textarea',
            } ;

            return assoc[this.valueOf()] || this.valueOf() ;
        } ,
        /**
         * Immuable/Not writable attribute
         * 
         * @param {X} val 
         */
        set: function( val ){ val=undefined;/* nope :-p */}

    } ) ;

    /**
     * @object String
     * @method js
     * @description DOM selector
     * @return {Array|Node|Boolean}
     */
    s.js = function( i = null ) {

        i = parseInt( isNaN( i ) ) ? null: parseInt( i );

        const Q = 'querySelector' ;

        const sel = this.valueOf().transformSelector ;

        try {
            // try read select
            d[ Q + 'All' ]( this.valueOf() )
        } catch( SyntaxError ) { // this.valueOf() is not a valid selector;

            if( rook.dev )
                console.warn(`${this.valueOf()} is not a valid selector`);
            return false;
        }

        const rslt = d[ Q + 'All' ]( sel );

        if( !rslt.length ) return false;

        if( !i && i !== 0 )
            return (rslt.length > 1 ? [...rslt] : rslt[0]) ;
        else 
            return ( rslt.length > 1 && [...rslt][ i ] ) ? [...rslt][ i ] : ( rslt.length > 1 ) ? [...rslt] : rslt[0] ; 
    }

    /**
     * second access name to DOM selector
     * 
     */
    s.sel = s.js ;

    o.defineProperty( HTMLFormElement.prototype , 'live' , {

        get: function() {

            return [...this.elements].map(field => (
                field.events( evt => rook.liveEventsName.includes( evt.type ) )
            ))  ;
        } ,

        set: function(val) { // on/off live events on form

            [...this.elements].map(field => (
                field.events( evt => evt.active = rook.liveEventsName.includes( evt.type ) ? val: evt.active )
            )) ;

        }

    } ) ;

    /**
     * only on form node
     * live event constraints mapper
     */
    n.constraints = function( cbConstraints ) {

        if( !(cbConstraints instanceof Function) || this.nodeName.toLocaleLowerCase() !== 'form' ) {

            if( rook.dev )
                console.warn( (
                        'warn : form.constraints' +
                        ( !( cbConstraints instanceof Function ) ?
                            ( ' arg1 bust be an callback but you give an ' , typeof cbConstraints ) :
                            ( ' use only on form node you use with an ' , this.nodeName , ' node' )
                        )
                    )
                ) ;
            return;
        }

        const fields = this.elements;
        this.liveEvent = 'constraints-field';

        o.keys(fields).map( attr => {
            if( fields[attr].nodeName.toLocaleLowerCase() !== 'button' )
                rook.liveEventsName
                .map( evtName => {
                
                    const caller = e => {
                        
                        const
                            value = e.this [ [ 'value' , 'checked' , 'select' ].filter(key => (
                                typeof e.this [ key ] === 'string'
                            ) ) [ 0 ] ] || '' ,
                            eCustom = new CustomEvent( 'constraints-field' )
                        ;
                        
                        eCustom.synt = e ;
                        eCustom.adj = e;
                        eCustom.field = e;
                        eCustom.synt.isValid = true;
                        eCustom.adj.isValid = true; // (adj)acent event of constraints-field event 
                        eCustom.field.off = true ;

                        const verity = cbConstraints({
                            value: value ,
                            node: fields[attr] ,
                            name: fields[attr].getAttribute( 'name' ) ,
                            id: fields[attr].getAttribute( 'id' ) ,
                            type: fields[attr].getAttribute( 'type' )
                        } ) ;
                        
                        e.this.isValid = true; // inject status validate on the field

                        if( !verity ) {
                            eCustom.synt.isValid = false;
                            eCustom.adj.isValid = false;
                            eCustom.field.isValid = false;
                            e.this.isValid = false; // inject status validate on the field
                        }

                        const off = () => (
                            rook.liveEventsName.map( evtName => (
                                e.this.events( evt => (
                                    evt.active = evt.type === evtName ? false: evt.active
                                ) )
                            ) )
                        ) ;

                        eCustom.synt.off = off ;
                        eCustom.adj.off = off ;
                        eCustom.field.off = off ;

                        if( e.this.nodeName.toLocaleLowerCase() !== 'button' ) /* filter button field on constraints live event ... 👻 bouh! */;
                            this.dispatchEvent( eCustom );
                    }

                fields[attr].on(evtName , caller , false ) ;
            } ) ;

        } ) ;

        return this;
    }

    /**
     * obsolete after 1hours life lol use : node.events( callbackFilter ) ;
     * this method dont implement on NodeList.prototype
     */
    n.getInfosEvent = function( type , cb , capture , transfer ) {
        
        return this.eventSaver.filter( current => {

            if( 
                current.type === type &&
                current.cb === cb &&
                current.capture === capture &&
                current.transfer === transfer &&
                current.node === this
            ) // found this or equal this
                return current;

        } )[0] || false;
    }

    n.events = function( cb ) {

        if( cb instanceof Function ) {

            return this.eventSaver.filter( event =>  cb( event ) ) ;

        }

        return this.eventSaver ;
    }

    n.on = function( type , cb , capture = false , transfer = null ) {

        type = (type instanceof Node) ? type.liveEvent : type; 

        const caller = e => {

            const evtCurrent = this.events( evt => (
                evt.type === type &&
                caller === evt.cb &&
                evt.capture === capture &&
                evt.transfer === transfer
            ) )[0] ; // get this or equal event of this

            if( evtCurrent && ( evtCurrent.exec || evtCurrent.exec === 0 ) ) // increment count exec cb
                evtCurrent.exec++;

            rook.synthetic( e , this , transfer , evtCurrent ) ;

            cb instanceof Function ? cb( e ) : (
                rook.dev ? (
                    console.warn(
                        'you have dont give an callback in arg2 to your "',type,'" event listener of the node ' , this
                    )
                ) : null
            ) ;

        } ;

        this.addEventListener( type , caller , capture ) ;

        if( !this.eventSaver )
            this.eventSaver = [] ;

        this.eventSaver.push({
            type: type,
            cb: caller,
            capture: capture,
            transfer: transfer,
            date: new Date(),
            _active: true,
            
            get active() {
                return this._active;
            } ,
            set active(val) { // on/off event with an dynamic attribute

                const last = this._active;

                this._active = ( typeof val === 'boolean' ) ? val: false;

                if( /constraint/.test(this.type)  )
                    // here distach all events live on this form ;
                    [...this.node.elements].map( field => (
                        field.events( evt => evt.active =  rook.liveEventsName.includes( evt.type ) ? false : evt.active )
                    ) )

                if( last === this._active ) return; // dont change value;

                if( val ) // re active event;

                    // this event already save
                    this.node.addEventListener( this.type , this.cb , this.capture ) ;

                else // off event;

                    this.node.removeEventListener( this.type , this.cb , this.capture );
            } ,

            node: this,
            exec: 0
        });

        return this;
    }

    /**
     * use on link node only
     */
    n.open = function() {

        if( this.link ) {

            this.link = true ;
        }

        return this;
    }

    n.preventDefault = function( type ) {

        this.on( type , e => ( e.stop() ) ) ;

        return this ;
    }

    /**
     * second access of node.textContent property by node.text
     */
    o.defineProperty( n , 'text' , {

        get: function() {

            return this.textContent;
        } ,

        set: function( val ) {

            this.textContent = val && val !== 0 ? val.valueOf().toString() : null ;
        }

    } ) ;

    /**
     * second access of node.innerHTML property by node.html
     */
    o.defineProperty( n , 'html' , {

        get: function() {

            return this.innerHTML;
        } ,

        set: function( val ) {

            this.innerHTML = val && val !== 0 ? val.valueOf().toString() : null ;
        }

    } ) ;

    /**
     * use on link node only
     */
    n.close = function() {

        if( this.nodeName.toLocaleLowerCase() === 'a' ) { // close link

            if( !this.link ) {
                
                o.defineProperty( n , 'link' , {

                    get: function() {
                        return this._link;
                    } ,

                    set: function( val ) {

                        this._link.status = ( typeof val === 'boolean' ) ? val : false ;
                    } 

                } ) ;

                this._link = {
                    
                    _status: true ,
                    src: this.href ,
                    title: this.getAttribute('title') ,
                    get status() { return this._status } ,
                    set status(val) {

                        const last = this._status ;
                        this._status = ( typeof val === 'boolean' ) ? val: false;
                        
                        if( last === this._status ) return; // dont change val;

                        this.node[ (this._status ? 'set':'remove') + 'Attribute' ]('href' , this._status ?  this.href: undefined ) ;
                        this.node.setAttribute('title' , !this._status ? 'link disabled' : this.title ) ;
                    } ,
                    node: this
                    
                } ;

            }
            
            this.link.status = false ;

            return;
        }

        return this;
    }

    /**
     * use only for remove group events you can listen off event on document dispatch , 'off-rook-event' get status event on : (event) => event.details
     * else use : node.events( callbackFilter )[0].active = false ;
     */
    n.off = function(type = null, cb = null, capture = null , transfer = null) {

        if(
            !type && !cb && !capture && !transfer
        ){
            if( rook.dev )
                console.warn('WARNING : you have remove all events of ' , this , ' node');

            this.eventSaver.map( event => {
                this.removeEventListener( event.type , event.cb , event.capture );
                event.active = false;

                const eCustom = new CustomEvent('off-rook-event');
                ['data','detail','eventRookjs','rookEvent','eventRook','details','transfer','event','rookjs','status','done']
                .map( eName => (
                    eCustom[ eName ] = event
                ));
                document.dispatchEvent( eCustom ); // listen off event get infos exec event
            } ) ;

            return this;
        }

        this.eventSaver.map( event => {

            if( !( [...arguments].filter( (arg,key) => (

                    arg &&
                    arg !== event[ 
                        ( !key ? 'type' : key === 1 ? 'cb' : key === 2 ? 'capture' : 'transfer' )
                    ]
                ) ).length
            ) )
                this.removeEventListener( event.type , event.cb , event.capture );
        } ) ;

        return this;
    }

    n.add = function( child , childRef = 'bottom' ) {

        if( !( child instanceof Node  ) )
            return rook.dev ? console.warn('node.add arg1 must be instance of Node but you give an ' , typeof child ) : undefined;

        let caller = ( childRef instanceof Node || ( 
                typeof childRef === 'string' && 
                /^(f(irst)?|b(ottom)?|t(op)?|l(ast)?)$/i.test( childRef ) 
            )
        ) ? 'insertBefore' : 'appendChild' ;

        const before = typeof childRef === 'string' ? /^(f(irst)?|t(op)?)$/i.test( childRef ) : false ;

        if( /ins/.test(caller) && typeof childRef === 'string' && before )
            childRef = [...this.childNodes]
                .filter( usual => (
                        usual instanceof Node && usual.nodeName.toLocaleLowerCase() !== '#text'
                    )
                ).slice( 0 , 1 ) || null
            ;

        caller = !childRef.length || !before ? 'appendChild' : caller ;

        // transform false in undefined becauze null|false , ... , value have an functional comportement
        this[ caller ]( 
            child ,
            ( childRef[0] instanceof Node ? childRef[0] : undefined )
        ) ;

        return this;
    }

    s.node = function() {

        const create = this.valueOf().transformSelector ;

        return document.createElement(create);
    }

    nl.on = function( type , cb , capture , transfer = null ) {

        [ ...this ].map( node => node.on( type , cb , capture , transfer ) ) ;

        return this;
    }

    nl.off = function(type = null, cb = null, capture = null , transfer = null) {

        [ ...this ].map( node => node.off( type , cb , capture , transfer ) ) ;

        return this;
    }

    nl.events = function(cb) {

        return [...this].map( node => node.events( cb ) ) ;
    }

    w.$$ = function() {
        
        return new Promise( (resolve,reject) => {

            fetch('https://code.jquery.com/jquery-3.4.1.min.js')
                .then( response => (
                    response.blob()
                ) )
                .then( blob => {

                    const reader = new FileReader() ;

                    reader.addEventListener( 'load' , () => {

                        const eCustom = new CustomEvent('$-ready') ;
                        
                        eCustom.brut = reader.result ;
                        eCustom.transform = eval ;
                        eCustom.exec = () => eval( reader.result ) ;

                        document.dispatchEvent( eCustom ) ;

                        resolve( {
                            brut: eCustom.brut,
                            transform: eCustom.transform ,
                            exec: eCustom.exec
                        } ) ;

                    } ) ;

                    reader.readAsText( blob ) ;
                })
                .catch( error => (
                    reject( error )
                ) )
            ;

        } );

    }

} )(
    window ,
    Node.prototype ,
    NodeList.prototype ,
    Array.prototype ,
    String.prototype ,
    Object
) ;

rook['^0^']();
