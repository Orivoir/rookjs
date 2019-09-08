/**
 * <@author sam.gabor@hotmail.com>
 * @metaData methods of rookjs library

 * @use for docs, usage, tuto, sample, exemple, enjoy ...
 */

const methodsList = [ // pffff ....
    
    {
        obj: 'String' ,
        name: 'transformSelector' ,
        ui: false ,
        type: 'string' ,
        describe: 'transform an accronym DOM selector' ,
        extras: [
            {
                type: ['get' , 'set'],
                describe:'getter and setter is write on this attribute'
            }
        ]
    } , {
        obj: 'String' ,
        name: 'js' ,
        ui: true ,
        type: '() => self' ,
        args: [
            {
                type: 'string' ,
                name: 'accronymSelector' ,
                optional: false,
            }
        ] ,
        describe: 'DOM selector++' ,
        extras: [
            {
                type: ['alias'] ,
                describe: 'second access name with sel' ,
            } , {
                type: ['comportement'] ,
                describe: 'you can select tag name with more of 50 logic accronym <code>"btn".js()</code>'
            }
        ]
    } , {
        obj: 'HTMLFormElement' ,
        name: 'live' ,
        ui: true ,
        type: 'object' ,
        describe: 'manager live events of fields form' ,
        extras: [
            {
                type: ['get' , 'set'] ,
                describe: 'getter and setter is write on this attribute'
            }
        ]
    } , {
        obj: 'Node' ,
        name:'constraints' ,
        type: '() => self' ,
        args: [
            {
                type: '() => boolean' ,
                optional: false,
                nameUI: 'callbackConstraints' ,
                name: 'cb'
            }
        ] ,
        describe: 'auto attach all live events on all fields this form and auto check your constraints' ,
        extras: [
            {
                type: ['comportement' , 'event' ],
                describe: 'this method dispatch one or many event.s on the document'
            }
        ]
    } , {
        obj: 'Node' ,
        name: 'getInfosEvent' ,
        type: '() => array' ,
        args : [
            {
                type: 'string' ,
                optional: false,
                name: 'type' ,
            } ,
            {
                type: '() => void' ,
                nameUI: 'callback' ,
                optional: false,
                name: 'cb'
            } ,
            {
                type: 'boolean|object' ,
                optional: true,
                name: 'capture'
            } ,
            {
                name: 'transfer' ,
                optional: true,
                type: 'any'
            }
        ] ,
        describe: 'get event.s of this node with args filter precision' ,
        extras: [
            {
                type: ['warn'] ,
                describe: 'obsolete use events method' // after 3hours life lol
            }
        ]
    } , {
        obj: 'Node' ,
        name: 'events' , 
        type: '() => array' ,
        args: [
            {
                type: '( event ) => void' ,
                optional: true,
                nameUI: 'callbackFilterEvents' ,
                name: 'cb'
            }
        ] ,
        describe: 'execute an callback for filter synthetic events attach with rookjs of this node' ,
        extras: [
            {
                type: ['important'] ,
                describe: 'you can remove/attach event with boolean attribute active , event.active = false|true'
            }
        ]
    } , {
        obj: 'Node' ,
        name: 'on' ,
        type: '() => self' ,
        args: [
            {
                type: 'string' ,
                optional: false,
                name: 'type'
            } ,{
                type: '( event ) => void' ,
                name: 'cb' ,
                optional: false,
                nameUI: 'callback' 
            } , {
                type: 'boolean|object' ,
                name: 'capture' ,
                optional: true,
                nameUI: 'options'
            } , {
                name: 'transfer' ,
                nameUI: 'transferBinding' ,
                optional: true,
                type: 'any' ,
            } 
        ] ,
        describe: 'attach an event and auto build the event manager' ,
        extras: [
            {
                type: ['important' , 'event'] ,
                describe: 'inner the callback you can remove event with event.off()'
            } , {
                
                type: ['comportement' , 'event' ],
                describe: 'this method dispatch one or many event.s on this node'
            } , {
                type: ['important' , 'event' , 'synt' ] ,
                describe: 'you can access to your synthetic event with event.synt'
            }
        ]
    } , {
        obj: 'Node' ,
        name: 'open' ,
        type: '() => self' ,
        args: [] ,
        describe: 'disable link' ,
        extras: [{
            type: ['warn','depreciate'] ,
            describe: 'this method is depreciate becauze injected in Node.prototype but works only with instance of HTMLAnchorElement'
        }] ,
    } , {
        obj: 'Node' ,
        name: 'preventDefault' ,
        type: '() => self' ,
        args: [
            {
                type: 'string' ,
                name: 'type' ,
                optional: false,
                nameUI: 'eventName'
            }
        ] ,
        extras: [
            {
                type: ['warn'] ,
                describe: 'this method is depreciate becauze injected in Node.prototype but works only with instance of HTMLFormElement'
            }
        ] ,
    } , {
        obj: 'Node' ,
        name: 'text' ,
        type: 'string' ,
        describe: 'rename of native textContent' ,
        extras:[
            {
                type: ['get' , 'set' ],
                describe: 'getter and setter is write on this attribute'
            }
        ]
    } , {
        obj: 'Node' ,
        name: 'html' ,
        type: 'string' ,
        describe: 'rename of native innerHTML' ,
        extras:[
            {
                type: ['get' , 'set' ],
                describe: 'getter and setter is write on this attribute'
            }
        ]
    } , {
        obj: 'Node' ,
        name: 'close' ,
        type: '() => self' ,
        args: [] ,
        describe: 'activate link' ,
        extras: [
            {
                type: ['warn' , 'depreciate' ] ,
                describe: 'this method is depreciate becauze injected in Node.prototype but works only with instance of HTMLAnchorElement'
            }
        ] ,
    }  , {

       obj: 'Node' ,
       name: 'off' ,
       type: '() => self' , 
       args: [
        {
            type: 'string' ,
            optional: false,
            name: 'type' ,
        } ,
        {
            type: '() => void' ,
            nameUI: 'callback' ,
            optional: false,
            name: 'cb'
        } ,
        {
            type: 'boolean|object' ,
            optional: true,
            name: 'capture'
        } ,
        {
            name: 'transfer' ,
            optional: true,
            type: 'any'
        }
       ] ,
       describe: 'remove event.s with args filter precision',
       extras: [
           {
               type: ['important' , 'warn' , 'comportement' ] ,
               describe: "use only listen off event on document 'off-rook-event'"
           } , {
               type: ['important'] ,
               use : 'for remove events use :<code>node.events( ( event ) => event.name === "click" )[0].active = false<code>'   
           }
       ]
    } , {
        obj: 'Node' ,
        name: 'add' ,
        type: '() => self' ,
        args: [
            {
                type: 'Node' ,
                optional: false ,
                name: 'child' ,
                nameUI: 'childNode' 
            } , {
                type: 'Node|String' ,
                optional: true ,
                name: 'childRef' ,
                nameUI: 'childNodeReference'
            }
        ] ,
        describe: 'appendChild , insertBefore adaptive with second arg',
        extras: [
            {
                type: ['comportement'] ,
                describe: 'arg2 string value accept in top:  first or top , else: last , bottom'
            }
        ]
    } , {
        obj: 'String' ,
        name: 'node' ,
        type: '() => Node' ,
        args: [] ,
        describe: 'create an node with accronym syntax' ,
        sample: "const btn = 'button'.node();" ,
        extras: [
            {
                type: ['comportement'] ,
                describe: 'you can access to same accronym that js method DOM selector'
            }
        ]
    } , {
        obj: 'NodeList' ,
        name: 'on' ,
        type: '() => self' ,
        args: [
            {
                type: 'string' ,
                optional: false,
                name: 'type' ,
            } ,
            {
                type: '() => void' ,
                nameUI: 'callback' ,
                optional: false,
                name: 'cb'
            } ,
            {
                type: 'boolean|object' ,
                optional: true,
                name: 'capture'
            } ,
            {
                name: 'transfer' ,
                optional: true,
            }
        ] ,
        describe: 'same method that node.on but with NodeList' ,
        sample: `'button'.js().on('click' , event => { <br>

            <br>// event.synt , is access to your syntetic event<br>
                // event.synt.exec , is counter of exec callback event<br><br>

                'span'.js().text = 'you have click' + event.synt.exec ;<br>

                if( event.synt.exec >= 10 )<br>
                    event.synt.active = true; // remove event on this node

                <br><br>/*<br>
                * your callback is not natural function associate to event<br>
                * and real callback is binding you have dont node access by this<br>
                * but you have injection synthetic with e.this , e.synt.this<br>
                * e.this is real node attach event is not equal to e.target<br>
                */<br>

        } )` ,
        extras: [],
    } , {
        extras: [] ,
        obj: 'NodeList' ,
        name: 'off' ,
        type: '() => self' ,
        args: [
            {
                type: 'string' ,
                optional: false,
                name: 'type' ,
            } ,
            {
                type: '() => void' ,
                nameUI: 'callback' ,
                optional: false,
                name: 'cb'
            } ,
            {
                type: 'boolean|object' ,
                optional: true,
                name: 'capture'
            } ,
            {
                name: 'transfer' ,
            }    
        ] ,
        describe: 'same method of <code>node.off</code> but with an instance of <code>NodeList</code>'
    } , {
        extras: [] ,
        obj: 'NodeList' ,
        name: 'events' ,
        type: '() => array',
        args: [
            {
                type: '( event ) => void' ,
                optional: true,
                nameUI: 'callbackFilterEvents' ,
                name: 'cb'
            }
        ] ,
        describe: 'same method of <code>node.events</code> but with an instance of <code>NodeList</code>'
    } , {
        obj: 'window' ,
        name: '$$' ,
        type: '() => Promise',
        args: [] ,
        descirbe: 'auto call jQuery .min version 3.4.1 via CDN with <code>window.fetch</code>' ,
        extras: [
            {
                type: ['comportement' , 'event' ] ,
                describe: 'this method dispatch one or many event.s on document'
            }
        ]
    }
] ;
