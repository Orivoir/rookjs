methodsList.map( method => {
    
    const sect = 'sec'.node() ;
    sect.classList.add( 'method-name' + method.name ) ; // method.name is not valid selector with $$ method
    sect.html = `
        <div>
            <h2>.${method.nameUI || method.name}${/\(\) \=\> .{1,18}$/.test(method.type) ? `(${method.args.map( arg => arg.type + ' ' + arg.name + ( arg.optional ? ' optional': '') + ' ' ) })` : ''}<h2>
            <h3>implement in <span>${method.obj}${!/window|Object/.test(method.obj) ? '.prototype': ''}</span></h3>
            <h4>type <span>${method.type}</span></h4>
        <div>

        <div class="hidden more-details-method">
            <aside>
                <p class="describe">${method.describe || ''}</p>

                <ul class="list-extra">
                    ${
                        method.extras.map( extra => (
                            `<li class="${extra.type.join(' ')}">${extra.describe}</li>`
                        ) ).join(' ')
                    }
                </ul>

                ${method.sample ? 
                    `<p class="sample"><code>${method.sample}</code></p>` : ''
                }
            </aside>
        </div>
    ` ;

    sect.on('click' , e => {
        const more = e.this.querySelector('.more-details-method') ;
        more.classList.toggle('hidden');
    } ) ;

    'article#contains-methods-list'.js().add( sect ) ;

} ) ;

'form'.js().
    constraints( field => ( // integrity field.s
        field.name === 'search-method' &&
        field.value.trim().length &&
        /^[a-z]{1,}$/i.test(field.value)
    ) )
    .on( 'form'.js() , e => { // live control field

        if(
            !e.field.isValid &&
            e.field.this.value.trim().length &&
            e.field.data
        )
            e.field.this.value = e.field.this.value.replace( e.field.data , '' );

        e.field.this.value = e.field.this.value.toLocaleLowerCase() ;

        [...'#speel-check ul'.js().childNodes].map( child => {
            '#speel-check ul'.js().removeChild( child );
        } ) ;

        methodsList.filter( method => {
            return method.name.toLocaleLowerCase().includes( e.field.this.value.toLocaleLowerCase() ) ; 
        } ).map( sujest => {

            const li = 'li'.node();
            li.html = `<span class="sujest-name">${sujest.name}</span> <span class="sujest-obj">${sujest.obj}</span>`;
            '#speel-check ul'.js().add( li );

            li
                .events( evt => /mouse(over|out)/.test(evt.type) )
                .map( evt => evt.active = false )
            ;

            const bubble = '#describe-mores-peel-check'.js() ;

            li.on('mouseover' , e => {

                const className = e.this.querySelector('.sujest-name').text.trim() ;

                let method = methodsList.filter( meth => {

                    return (meth.name||meth.nameUI) === className
                } ) ;

                if( method.length !== 1 ) {
 
                    method = method.filter( meth => {

                        return meth.obj === e.this.querySelector('.sujest-obj').text.trim()

                    } ) ;
                }

                
                bubble.classList.remove('hidden') ;
                bubble.classList.remove('o-hidden') ;
                bubble.text = method[0].describe.slice( 0 , 15 ) + ' ...' ;
                '#more-speel-check'.js().style.top = (e.this.offsetTop - ('#more-speel-check'.js().offsetHeight / 4) ) + 'px' ;
                
                
                
            } ).on('mouseout' , e => {
                
                
                // '#more-speel-check'.js().style.top = (e.this.offsetTop - ('#more-speel-check'.js().offsetHeight / 2) ) + 'px' ;
                // '#more-speel-check'.js().style.top = (e.this.offsetTop - ('#more-speel-check'.js().offsetHeight / 4) ) + 'px' ;
                bubble.text = 'click for hide' ;
            } ) ;
        
        } ) ;

        if( e.field.type === 'blur' ) {
            'article section'.js().map( section => 
                section.classList.remove('search')
            )
            '#speel-check'.js().classList.add('hidden') ;
        }
        
        if( e.field.type === 'focus' ) {
            'article section'.js().map( section => 
                section.classList.add('search')
            )
            '#speel-check'.js().classList.remove('hidden') ;
        }
    } )
;
