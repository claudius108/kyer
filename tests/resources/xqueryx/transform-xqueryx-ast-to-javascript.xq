xquery version "1.0";

import module namespace ua = "http://expath.org/ns/user-agent";

let $data-instance-1 := doc("../../data/xqueryx/hamlet.xml")

let $data-instance-2 :=
    <order num="00299432" date="2006-09-15" cust="0221A">
        <item dept="WMN" num="557" quantity="1" color="beige" />
        <item dept="ACC" num="563" quantity="1" />
        <item dept="ACC" num="443" quantity="2" />
        <item dept="MEN" num="784" quantity="1" color="blue/white" />
        <item dept="MEN" num="784" quantity="1" color="blue/red" />
        <item dept="WMN" num="557" quantity="1" color="sage" />
    </order>
    
let $model-1 := ua:model($data-instance-1, $data-instance-2)

let $ref-1 := ua:ref(ua:doc()//input[1], $data-instance-1//TITLE)


return ()