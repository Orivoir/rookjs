methodsList.map( method => {
    
    const sect = 'sec'.node() ;
    // sect.classList.add( 'method-' + method.name ) ; // method.name is not valid selector with $$ method
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
                        ) )
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
            li.text = sujest.name
            '#speel-check ul'.js().add( li );
        
        } ) ;

        if( e.field.type === 'blur' )
            '#speel-check'.js().classList.add('hidden') ;

        if( e.field.type === 'focus' )
            '#speel-check'.js().classList.remove('hidden') ;
    } )
;
