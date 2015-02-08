#Angular-Blocks

There is framework for using Angular in terms of blocks  
What means block?

Block - is independent angular directive with isolated scope, replace: true, terminate: true
```html
<div block="blockName"></div>
```

##Building

`npm install`  
`gulp build`  

##CSS

In terms of BEM (http://bem.info)  
There are such subject as block, element, modificator and state

* block ( .block {} )
* element ( .block_element {} )
* modificator ( .block__flat {} )
* state ( .block.disable {})
