import Role from "./role.model.js";

class RoleRepository {
    async findById(id) {
        return Role.findById(id);
    }
}

export default new RoleRepository();
