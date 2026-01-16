import "server-only";

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { GetBasketRequest, CustomerBasketResponse, UpdateBasketRequest } from "./basket.proto";
import { auth } from "@/auth";

interface BasketProtoPackage {
  BasketApi: {
    Basket: grpc.ServiceClientConstructor;
  };
}

interface BasketClient extends grpc.Client {
  GetBasket: (
    request: GetBasketRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: CustomerBasketResponse) => void
  ) => void;
  UpdateBasket: (
    request: UpdateBasketRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: CustomerBasketResponse) => void
  ) => void;
}

const PROTO_PATH = path.join(process.cwd(), "proto", "basket.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const basketProto = grpc.loadPackageDefinition(packageDefinition) as unknown as BasketProtoPackage;
const BasketService = basketProto.BasketApi.Basket;

let basketClient: BasketClient | null = null;

function getBasketClient(): BasketClient {
  if (!basketClient) {
    const credentials = grpc.credentials.createSsl(undefined, undefined, undefined, {
      checkServerIdentity: () => undefined,
    });

    basketClient = new BasketService(
      process.env.BASKET_GRPC_BASE_URL
        ? process.env.BASKET_GRPC_BASE_URL.replace(/^https?:\/\//, "").replace(/^\/+/, "")
        : "localhost:5021",
      credentials
    ) as unknown as BasketClient;
  }
  return basketClient;
}

function createMetadata(session: { accessToken?: string } | null): grpc.Metadata {
  const metadata = new grpc.Metadata();

  if (session?.accessToken) {
    metadata.add("authorization", `Bearer ${session.accessToken}`);
  }

  return metadata;
}
export async function getBasket(request: GetBasketRequest): Promise<CustomerBasketResponse> {
  const basketClient = getBasketClient();
  const session = await auth();
  const metadata = createMetadata(session);

  return new Promise((resolve, reject) => {
    basketClient.GetBasket(request, metadata, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
}

export async function updateBasket(request: UpdateBasketRequest): Promise<CustomerBasketResponse> {
  return new Promise(async (resolve, reject) => {
    const basketClient = getBasketClient();

    const session = await auth();
    const metadata = createMetadata(session);

    basketClient.UpdateBasket(
      request,
      metadata,
      (error: grpc.ServiceError | null, response: CustomerBasketResponse) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  });
}
