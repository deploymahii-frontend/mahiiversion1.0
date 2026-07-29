import coaRepository from "./coa.repository.js";

/*
|--------------------------------------------------------------------------
| Create Account
|--------------------------------------------------------------------------
*/

export async function createAccount(data) {

    const exists =
        await coaRepository.findByCode(
            data.code
        );

    if (exists) {

        throw new Error(
            "Account code already exists."
        );

    }

    return coaRepository.create(data);

}

/*
|--------------------------------------------------------------------------
| Update Account
|--------------------------------------------------------------------------
*/

export async function updateAccount(id, data) {

    return coaRepository.update(
        id,
        data
    );

}

/*
|--------------------------------------------------------------------------
| Delete Account
|--------------------------------------------------------------------------
*/

export async function deleteAccount(id) {

    return coaRepository.delete(id);

}

/*
|--------------------------------------------------------------------------
| Account Details
|--------------------------------------------------------------------------
*/

export async function getAccount(id) {

    return coaRepository.findById(id);

}

/*
|--------------------------------------------------------------------------
| Chart Tree
|--------------------------------------------------------------------------
*/

export async function getChart() {

    return coaRepository.getTree();

}
