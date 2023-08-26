import { 
    Record, 
    text, 
    nat, 
    float32, 
    StableBTreeMap, 
    Principal,
    Vec,
    Opt,
    $query,
    $update
} from "azle";

export type Vote = Record<{
    owner: Principal,
    rating: float32
}>;

export type Prop = Record<{
    // id: nat,
    name: text,
    // rating: float32,
    img_url: text,
    voters: Vec<Vote>,
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

$query;
export function getList(listName: text): Opt<List> {

    return props.get(listName);
}

$update;
export function addList(name: text, tag: text, newProps: Vec<FrontProp>, principal: Principal): boolean {
 
    let newList: List;
    let vec: Vec<Prop> = new Array(0);
    
    newProps.forEach((elem) => {
        vec.push({
            name: elem.name,
            img_url: elem.img_url,
            // rating: 0.5,
            voters: new Array(),
        });
    });

    props.insert(name, {
        name: name,
        tag: tag,
        owner: principal,
        elems: vec
    });
    return false;
}