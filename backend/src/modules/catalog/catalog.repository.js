import Catalog from "./catalog.model.js";

export async function createCatalogItem(data) {
	return Catalog.create(data);
}

export async function findCatalogById(id) {
	return Catalog.findOne({
		_id: id,
		isDeleted: false,
	});
}

export async function findCatalogBySlug(businessId, slug) {
	return Catalog.findOne({
		business: businessId,
		slug,
		isDeleted: false,
	});
}

export async function updateCatalog(id, data) {
	return Catalog.findByIdAndUpdate(id, data, {
		new: true,
		runValidators: true,
	});
}

export async function softDeleteCatalog(id) {
	return Catalog.findByIdAndUpdate(
		id,
		{
			isDeleted: true,
			deletedAt: new Date(),
		},
		{ new: true }
	);
}

export async function listCatalog(filter = {}, options = {}) {
	const {
		page = 1,
		limit = 10,
		sort = { createdAt: -1 },
	} = options;

	const skip = (page - 1) * limit;

	const query = {
		...filter,
		isDeleted: false,
	};

	const [items, total] = await Promise.all([
		Catalog.find(query)
			.sort(sort)
			.skip(skip)
			.limit(limit),

		Catalog.countDocuments(query),
	]);

	return {
		items,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};
}

