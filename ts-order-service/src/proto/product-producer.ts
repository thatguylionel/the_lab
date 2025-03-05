/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 5.29.3
 * source: product-producer.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export namespace product {
    export class ProductRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            product_id?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("product_id" in data && data.product_id != undefined) {
                    this.product_id = data.product_id;
                }
            }
        }
        get product_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set product_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            product_id?: number;
        }): ProductRequest {
            const message = new ProductRequest({});
            if (data.product_id != null) {
                message.product_id = data.product_id;
            }
            return message;
        }
        toObject() {
            const data: {
                product_id?: number;
            } = {};
            if (this.product_id != null) {
                data.product_id = this.product_id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.product_id != 0)
                writer.writeInt32(1, this.product_id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProductRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProductRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.product_id = reader.readInt32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ProductRequest {
            return ProductRequest.deserialize(bytes);
        }
    }
    export class ProductResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            product_id?: number;
            name?: string;
            description?: string;
            price?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("product_id" in data && data.product_id != undefined) {
                    this.product_id = data.product_id;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("price" in data && data.price != undefined) {
                    this.price = data.price;
                }
            }
        }
        get product_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set product_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set name(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set description(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get price() {
            return pb_1.Message.getFieldWithDefault(this, 4, 0) as number;
        }
        set price(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            product_id?: number;
            name?: string;
            description?: string;
            price?: number;
        }): ProductResponse {
            const message = new ProductResponse({});
            if (data.product_id != null) {
                message.product_id = data.product_id;
            }
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.price != null) {
                message.price = data.price;
            }
            return message;
        }
        toObject() {
            const data: {
                product_id?: number;
                name?: string;
                description?: string;
                price?: number;
            } = {};
            if (this.product_id != null) {
                data.product_id = this.product_id;
            }
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.price != null) {
                data.price = this.price;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.product_id != 0)
                writer.writeInt32(1, this.product_id);
            if (this.name.length)
                writer.writeString(2, this.name);
            if (this.description.length)
                writer.writeString(3, this.description);
            if (this.price != 0)
                writer.writeDouble(4, this.price);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProductResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProductResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.product_id = reader.readInt32();
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    case 3:
                        message.description = reader.readString();
                        break;
                    case 4:
                        message.price = reader.readDouble();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ProductResponse {
            return ProductResponse.deserialize(bytes);
        }
    }
    export class ListProductsRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {}) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        static fromObject(data: {}): ListProductsRequest {
            const message = new ListProductsRequest({});
            return message;
        }
        toObject() {
            const data: {} = {};
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListProductsRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ListProductsRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ListProductsRequest {
            return ListProductsRequest.deserialize(bytes);
        }
    }
    export class ListProductsResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            products?: ProductResponse[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("products" in data && data.products != undefined) {
                    this.products = data.products;
                }
            }
        }
        get products() {
            return pb_1.Message.getRepeatedWrapperField(this, ProductResponse, 1) as ProductResponse[];
        }
        set products(value: ProductResponse[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data: {
            products?: ReturnType<typeof ProductResponse.prototype.toObject>[];
        }): ListProductsResponse {
            const message = new ListProductsResponse({});
            if (data.products != null) {
                message.products = data.products.map(item => ProductResponse.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data: {
                products?: ReturnType<typeof ProductResponse.prototype.toObject>[];
            } = {};
            if (this.products != null) {
                data.products = this.products.map((item: ProductResponse) => item.toObject());
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.products.length)
                writer.writeRepeatedMessage(1, this.products, (item: ProductResponse) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListProductsResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ListProductsResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.products, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ProductResponse.deserialize(reader), ProductResponse));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ListProductsResponse {
            return ListProductsResponse.deserialize(bytes);
        }
    }
    export class CreateProductRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            name?: string;
            description?: string;
            price?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("price" in data && data.price != undefined) {
                    this.price = data.price;
                }
            }
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set name(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set description(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get price() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0) as number;
        }
        set price(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data: {
            name?: string;
            description?: string;
            price?: number;
        }): CreateProductRequest {
            const message = new CreateProductRequest({});
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.price != null) {
                message.price = data.price;
            }
            return message;
        }
        toObject() {
            const data: {
                name?: string;
                description?: string;
                price?: number;
            } = {};
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.price != null) {
                data.price = this.price;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.name.length)
                writer.writeString(1, this.name);
            if (this.description.length)
                writer.writeString(2, this.description);
            if (this.price != 0)
                writer.writeDouble(3, this.price);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CreateProductRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CreateProductRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.name = reader.readString();
                        break;
                    case 2:
                        message.description = reader.readString();
                        break;
                    case 3:
                        message.price = reader.readDouble();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): CreateProductRequest {
            return CreateProductRequest.deserialize(bytes);
        }
    }
    interface GrpcUnaryServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    }
    interface GrpcStreamServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
        (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
    }
    interface GrpWritableServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    }
    interface GrpcChunkServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
        (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
    }
    interface GrpcPromiseServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): Promise<R>;
        (message: P, options?: grpc_1.CallOptions): Promise<R>;
    }
    export abstract class UnimplementedProductServiceService {
        static definition = {
            GetProduct: {
                path: "/product.ProductService/GetProduct",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: ProductRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => ProductRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: ProductResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => ProductResponse.deserialize(new Uint8Array(bytes))
            },
            ListProducts: {
                path: "/product.ProductService/ListProducts",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: ListProductsRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => ListProductsRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: ListProductsResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => ListProductsResponse.deserialize(new Uint8Array(bytes))
            },
            CreateProduct: {
                path: "/product.ProductService/CreateProduct",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: CreateProductRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => CreateProductRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: ProductResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => ProductResponse.deserialize(new Uint8Array(bytes))
            }
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract GetProduct(call: grpc_1.ServerUnaryCall<ProductRequest, ProductResponse>, callback: grpc_1.sendUnaryData<ProductResponse>): void;
        abstract ListProducts(call: grpc_1.ServerUnaryCall<ListProductsRequest, ListProductsResponse>, callback: grpc_1.sendUnaryData<ListProductsResponse>): void;
        abstract CreateProduct(call: grpc_1.ServerUnaryCall<CreateProductRequest, ProductResponse>, callback: grpc_1.sendUnaryData<ProductResponse>): void;
    }
    export class ProductServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedProductServiceService.definition, "ProductService", {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
            super(address, credentials, options);
        }
        GetProduct: GrpcUnaryServiceInterface<ProductRequest, ProductResponse> = (message: ProductRequest, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<ProductResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<ProductResponse>, callback?: grpc_1.requestCallback<ProductResponse>): grpc_1.ClientUnaryCall => {
            return super.GetProduct(message, metadata, options, callback);
        };
        ListProducts: GrpcUnaryServiceInterface<ListProductsRequest, ListProductsResponse> = (message: ListProductsRequest, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<ListProductsResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<ListProductsResponse>, callback?: grpc_1.requestCallback<ListProductsResponse>): grpc_1.ClientUnaryCall => {
            return super.ListProducts(message, metadata, options, callback);
        };
        CreateProduct: GrpcUnaryServiceInterface<CreateProductRequest, ProductResponse> = (message: CreateProductRequest, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<ProductResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<ProductResponse>, callback?: grpc_1.requestCallback<ProductResponse>): grpc_1.ClientUnaryCall => {
            return super.CreateProduct(message, metadata, options, callback);
        };
    }
}
