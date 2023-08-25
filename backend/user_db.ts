import {
    blob,
    ic,
    nat64,
    nat,
    Opt,
    Principal,
    $query,
    Record,
    Result,
    StableBTreeMap,
    $update,
    Variant,
    Vec,
    match
} from 'azle';

import { mint, getBalance } from './account2';

export type User = Record<{
    id: Principal;
    createdAt: nat64;
    recordingIds: Vec<Principal>;
    balance: nat;
    username: string;
}>;

let users = new StableBTreeMap<Principal, User>(0, 38, 100_000);


$update;
export function createUser(principal: Principal, username: string): User {
    //const id = generateId();
    const user: User = {
        id: principal,
        createdAt: ic.time(),
        recordingIds: [],
        username,
        balance: 100n
    };
    console.log("create user before mint");
    let mintRes = mint(100n, principal);
    getBalance(principal);
    console.log("create user after mint", mintRes);

    users.insert(user.id, user);

    return user;
}

$query;
export function readUsers(): Vec<User> {
    return users.values();
}

$query;
export function readUserById(id: Principal): Opt<User> {
    return users.get(id);
}

$update;
export function deleteUser(id: Principal): Result<
    User,
    Variant<{
        UserDoesNotExist: Principal;
    }>
> {
    const user = users.get(id);

    return match(user, {
        Some: (user) => {
            users.remove(user.id);

            return {
                Ok: user
            };
        },
        None: () => {
            return {
                Err: {
                    UserDoesNotExist: id
                }
            };
        }
    });
}