import axios from "axios";

const userServiceUrl =
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:3000";
const paymentServiceUrl =
  process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || "http://localhost:3002";

const userApi = axios.create({ baseURL: `${userServiceUrl}/api/v1` });
const paymentApi = axios.create({ baseURL: `${paymentServiceUrl}/api/v1` });

export function setAuthToken(token: string | null) {
  if (token) {
    userApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    paymentApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete userApi.defaults.headers.common["Authorization"];
    delete paymentApi.defaults.headers.common["Authorization"];
  }
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  price: string;
  isActive: boolean;
  models?: Model[];
}

export interface Model {
  id: string;
  name: string;
  slug: string;
  category: string;
  hasNfcSupport: boolean;
}

export interface LoginResponse {
  accessToken: string;
  user: { id: string; fullName: string; email: string; role: string };
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await userApi.post("/auth/login", { email, password });
  const token =
    data?.data?.tokens?.accessToken || data?.accessToken || data?.token;
  const user = data?.data?.user || data?.user;
  if (!token) throw new Error("No token in response");
  setAuthToken(token);
  return { accessToken: token, user };
}

export async function fetchBrands(): Promise<Brand[]> {
  const { data } = await userApi.get("/brands");
  const brands = data?.data ?? data;
  if (!Array.isArray(brands)) throw new Error("Invalid brands response");
  return brands;
}

export async function fetchBrandModels(brandId: string): Promise<Model[]> {
  const { data } = await userApi.get(`/brands/${brandId}/models`);
  const models = data?.data ?? data;
  if (!Array.isArray(models)) throw new Error("Invalid models response");
  return models;
}

export interface PresignResponse {
  requestId: string;
  uploadUrls: Array<{ photoType: string; uploadUrl: string }>;
}

export async function requestPresignUrls(payload: {
  brand: string;
  model: string;
  photoTypes: string[];
  contentTypes: Record<string, string>;
  nfcData?: string;
}): Promise<PresignResponse> {
  const { data } = await userApi.post("/upload/presign", payload);
  if (!data?.success) throw new Error(data?.error?.message || "Presign failed");
  return data.data;
}

export async function uploadToPresignedUrl(
  url: string,
  file: File
): Promise<void> {
  await fetch(url, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type || "image/jpeg" },
  });
}

export async function confirmUpload(
  requestId: string
): Promise<{ status: string }> {
  const { data } = await userApi.post("/upload/confirm", { requestId });
  if (!data?.success) throw new Error(data?.error?.message || "Confirm failed");
  return data.data;
}

export interface CreateOrderResponse {
  orderId: string;
  status: string;
  approvalUrl?: string;
}

export async function createPayPalOrder(payload: {
  amount: string;
  currency?: string;
  referenceId: string;
}): Promise<CreateOrderResponse> {
  const { data } = await paymentApi.post(
    "/payments/paypal/create-order",
    payload
  );
  if (!data?.success)
    throw new Error(data?.error?.message || "Order creation failed");
  return data.data;
}

export async function capturePayPalOrder(payload: {
  OrderId: string;
  referenceId: string;
}): Promise<{ status: string; paypalStatus: string }> {
  const { data } = await paymentApi.post(
    "/payments/paypal/capture",
    payload
  );
  if (!data?.success) throw new Error(data?.error?.message || "Capture failed");
  return data.data;
}
