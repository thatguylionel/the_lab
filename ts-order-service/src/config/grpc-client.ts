import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Define typings for our gRPC client
interface ProductServiceClient {
  getProduct: Function;
  listProducts: Function;
  createProduct: Function;
}

// Interface for the service definition
interface ProductServiceDefinition {
  service: Record<string, any>;
  new(address: string, credentials: grpc.ChannelCredentials): ProductServiceClient;
}

const PROTO_PATH = path.resolve(__dirname, '../../proto/product-producer.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Fix the typing by being more explicit about the structure
const proto = grpc.loadPackageDefinition(packageDefinition) as any;
const productService = proto.product.ProductService as ProductServiceDefinition;

const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'localhost:9090';

// Create gRPC client for the Product Service
const productClient = new productService(
    productServiceUrl,
    grpc.credentials.createInsecure()
);

export default productClient as ProductServiceClient;