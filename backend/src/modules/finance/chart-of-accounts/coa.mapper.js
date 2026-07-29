export function toAccountResponse(account) {

    if (!account) {

        return null;

    }

    return {

        id: account._id,

        code: account.code,

        name: account.name,

        type: account.type,

        parent: account.parent,

        isGroup: account.isGroup,

        active: account.active,

        createdAt: account.createdAt,

        updatedAt: account.updatedAt

    };

}
