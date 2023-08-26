import { 
    Record, 
    text, 
    nat, 
    float32, 
    StableBTreeMap, 
    Principal,
    Vec,
    $query,
    $update
} from "azle";

export type Prop = Record<{
    // id: nat,
    name: text,
    // rating: float32,
    img_url: text,
    voters: Map<Principal, float32>,
}>;

export type List = Record<{
    elems: Vec<Prop>,
    owner: Principal,
    name: text,
    tag: text
}>

type FrontProp = Record<{
    name: text,
    img_url: text 
}>;

export let props = new StableBTreeMap<text, List>(1, 200, 100_000_000);


$query;
export function readProps(): Vec<text> {
    return props.keys();
}

$update;
export function addList(name: text, tag: text, newProps: Vec<FrontProp>, principal: Principal) {
 
    let newList: List;
    let vec: Vec<Prop>;
    
    newProps.forEach((elem) => {
        vec.push({
            name: elem.name,
            img_url: elem.img_url,
            // rating: 0.5,
            voters: new Map(),
        });
    });

    props.insert(name, {
        name: name,
        tag: tag,
        owner: principal,
        elems: vec
    });

}