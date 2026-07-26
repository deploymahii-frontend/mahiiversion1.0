import ChartOfAccount from "./coa.model.js";

class COARepository {

    async create(data) {

        return ChartOfAccount.create(data);

    }

    async update(id, data) {

        return ChartOfAccount.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async delete(id) {

        return ChartOfAccount.findByIdAndDelete(id);

    }

    async findById(id) {

        return ChartOfAccount.findById(id)
            .populate("parent");

    }

    async findByCode(code) {

        return ChartOfAccount.findOne({
            code
        });

    }

    async getTree() {

        return ChartOfAccount.find()
            .sort({
                code: 1
            });

    }

}

export default new COARepository();
