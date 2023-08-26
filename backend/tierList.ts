import { 
    Record, 
    text, 
    nat, 
    float32, 
    StableBTreeMap, 
    Principal,
    Vec,
    $query
} from "azle";

export type Prop = Record<{
    id: nat,
    name: text,
    rating: float32,
    img_url: text,
    voters: Vec<Principal>
    owner: Principal
}>;

export let props = new StableBTreeMap<text, Vec<Prop>>(1, 200, 100_000_000);


$query;
export function readProps(): Vec<text> {
    return props.keys();
}