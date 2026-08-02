import http from 'http';

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

async function requestJson(path, method, token, payload) {
  const body = payload ? JSON.stringify(payload) : null;
  const headers = {
    'Content-Type': 'application/json',
  };
  if (body) headers['Content-Length'] = Buffer.byteLength(body);
  if (token) headers.Authorization = `Bearer ${token}`;

  return request(
    {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers,
    },
    body
  );
}

function parseJson(body) {
  try {
    return JSON.parse(body || '{}');
  } catch {
    return null;
  }
}

async function main() {
  const adminSignup = {
    phone: '9999991111',
    password: 'Test123!',
    fullName: 'Admin User',
    role: 'admin',
  };

  console.log('Admin signup...');
  const adminSignupRes = await requestJson('/api/v1/auth/signup', 'POST', null, adminSignup);
  console.log('ADMIN SIGNUP', adminSignupRes.statusCode, adminSignupRes.body);

  console.log('Admin login...');
  const adminLogin = {
    phone: adminSignup.phone,
    password: adminSignup.password,
  };
  const adminLoginRes = await requestJson('/api/v1/auth/login', 'POST', null, adminLogin);
  console.log('ADMIN LOGIN', adminLoginRes.statusCode, adminLoginRes.body);
  const adminLoginData = parseJson(adminLoginRes.body);
  const adminToken = adminLoginData?.data?.accessToken;
  if (!adminToken) {
    throw new Error('Admin login failed, no token');
  }

  const ownerSignup = {
    phone: '9999990002',
    password: 'Test123!',
    fullName: 'Shop Owner',
    role: 'shop_owner',
  };

  console.log('Shop owner signup...');
  const ownerSignupRes = await requestJson('/api/v1/auth/signup', 'POST', null, ownerSignup);
  console.log('OWNER SIGNUP', ownerSignupRes.statusCode, ownerSignupRes.body);

  console.log('Shop owner login...');
  const ownerLoginRes = await requestJson('/api/v1/auth/login', 'POST', null, {
    phone: ownerSignup.phone,
    password: ownerSignup.password,
  });
  console.log('OWNER LOGIN', ownerLoginRes.statusCode, ownerLoginRes.body);
  const ownerLoginData = parseJson(ownerLoginRes.body);
  const ownerToken = ownerLoginData?.data?.accessToken;
  if (!ownerToken) {
    throw new Error('Owner login failed, no token');
  }

  const shopPayload = {
    name: 'Shree Mess',
    description: 'Authentic vegetarian food and thali for students and office goers.',
    category: 'Restaurants',
    tagline: 'Homely meals made fresh daily',
    tags: ['veg', 'thali', 'budget'],
    phone: '+919876543210',
    email: 'shree.mess@example.com',
    website: 'https://shree-mess.example.com',
    socialLinks: {
      whatsapp: 'https://wa.me/919876543210',
      instagram: 'https://instagram.com/shree_mess',
    },
    address: {
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India',
      pincode: '416001',
      area: 'Shahupuri',
      addressLine: '123 Shree Mess Building',
    },
    location: {
      latitude: 16.7050,
      longitude: 74.2433,
    },
    businessHours: [
      { day: 'MONDAY', open: '08:00', close: '21:00', closed: false },
      { day: 'TUESDAY', open: '08:00', close: '21:00', closed: false },
      { day: 'WEDNESDAY', open: '08:00', close: '21:00', closed: false },
      { day: 'THURSDAY', open: '08:00', close: '21:00', closed: false },
      { day: 'FRIDAY', open: '08:00', close: '21:00', closed: false },
      { day: 'SATURDAY', open: '08:00', close: '21:00', closed: false },
      { day: 'SUNDAY', open: '08:00', close: '18:00', closed: false },
    ],
    deliveryAvailable: true,
    pickupAvailable: true,
  };

  console.log('Creating shop as owner...');
  const createShopRes = await requestJson('/api/v1/shops', 'POST', ownerToken, shopPayload);
  console.log('CREATE SHOP', createShopRes.statusCode, createShopRes.body);
  let createdShop = parseJson(createShopRes.body)?.data;

  if (!createdShop) {
    const listRes = await requestJson('/api/v1/admin/shops?status=PENDING', 'GET', adminToken);
    console.log('PENDING SHOPS', listRes.statusCode, listRes.body);
    const pending = parseJson(listRes.body)?.data || [];
    createdShop = pending.find((shop) => shop.name === shopPayload.name || shop.slug === 'shree-mess');
    if (!createdShop) {
      throw new Error('Could not find pending shop after creation failure');
    }
  }

  console.log('Approving shop:', createdShop._id || createdShop.id);
  const approveRes = await requestJson(`/api/v1/admin/shops/${createdShop._id || createdShop.id}/approve`, 'PATCH', adminToken, {});
  console.log('APPROVE SHOP', approveRes.statusCode, approveRes.body);

  const slug = createdShop.slug || 'shree-mess';
  console.log('Fetching public shop by slug:', slug);
  const fetchRes = await requestJson(`/api/v1/shops/${slug}`, 'GET', null, null);
  console.log('FETCH PUBLIC SHOP', fetchRes.statusCode, fetchRes.body);
}

main().catch((err) => {
  console.error('ERROR', err);
  process.exit(1);
});
