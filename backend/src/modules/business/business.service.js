import slugify from "slugify";
import * as businessRepository from "./business.repository.js";

function generateSlug(name) {
  return slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });
}

async function generateUniqueSlug(name) {
  let baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;

  while (await businessRepository.findBusinessBySlug(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

export async function createBusiness(ownerId, data) {
  const slug = await generateUniqueSlug(data.name);

  const businessData = {
    ...data,
    owner: ownerId,
    slug,
  };

  return businessRepository.createBusiness(businessData);
}

export async function getBusinessById(id) {
  const business = await businessRepository.findBusinessById(id);

  if (!business) {
    throw new Error("Business not found");
  }

  return business;
}

export async function getBusinessesByOwner(ownerId) {
  return businessRepository.findBusinessByOwner(ownerId);
}

export async function updateBusiness(id, ownerId, data) {
  const business = await businessRepository.findBusinessById(id);

  if (!business) {
    throw new Error("Business not found");
  }

  if (business.owner.toString() !== ownerId.toString()) {
    throw new Error("Unauthorized to update this business");
  }

  if (data.name && data.name !== business.name) {
    data.slug = await generateUniqueSlug(data.name);
  }

  return businessRepository.updateBusiness(id, data);
}

export async function changeBusinessStatus(id, ownerId, status) {
  const business = await businessRepository.findBusinessById(id);

  if (!business) {
    throw new Error("Business not found");
  }

  if (business.owner.toString() !== ownerId.toString()) {
    throw new Error("Unauthorized to change business status");
  }

  return businessRepository.updateBusinessStatus(id, status);
}

export async function removeBusiness(id, ownerId) {
  const business = await businessRepository.findBusinessById(id);

  if (!business) {
    throw new Error("Business not found");
  }

  if (business.owner.toString() !== ownerId.toString()) {
    throw new Error("Unauthorized to delete this business");
  }

  return businessRepository.deleteBusiness(id);
}

export async function listBusinesses(filter, options) {
  return businessRepository.listBusinesses(filter, options);
}
