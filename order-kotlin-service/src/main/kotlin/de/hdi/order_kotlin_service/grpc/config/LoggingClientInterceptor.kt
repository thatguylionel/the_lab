package de.hdi.order_kotlin_service.grpc.config

import io.grpc.CallOptions
import io.grpc.Channel
import io.grpc.ClientCall
import io.grpc.ClientInterceptor
import io.grpc.MethodDescriptor
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

class LoggingClientInterceptor : ClientInterceptor {
    private val logger = LoggerFactory.getLogger(LoggingClientInterceptor::class.java)

    override fun <ReqT, RespT> interceptCall(
        method: MethodDescriptor<ReqT, RespT>,
        callOptions: CallOptions,
        next: Channel
    ): ClientCall<ReqT, RespT> {
        logger.debug("gRPC call: {}", method.fullMethodName)
        return next.newCall(method, callOptions)
    }
}

@Configuration
class InterceptorConfig {
    @Bean
    fun loggingClientInterceptor(): ClientInterceptor {
        return LoggingClientInterceptor()
    }
}