package de.hdi.order_kotlin_service.web

import io.grpc.StatusRuntimeException
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest

data class ErrorResponse(
    val status: Int,
    val error: String,
    val message: String
)

@ControllerAdvice
class ErrorHandler {

    private val logger = LoggerFactory.getLogger(ErrorHandler::class.java)

    @ExceptionHandler(StatusRuntimeException::class)
    fun handleGrpcException(ex: StatusRuntimeException, request: WebRequest): ResponseEntity<ErrorResponse> {
        logger.error("gRPC service error: {}", ex.message, ex)

        val errorResponse = ErrorResponse(
            status = HttpStatus.SERVICE_UNAVAILABLE.value(),
            error = "Service Communication Error",
            message = "Failed to communicate with product service: ${ex.status}"
        )

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errorResponse)
    }

    @ExceptionHandler(Exception::class)
    fun handleGeneralException(ex: Exception, request: WebRequest): ResponseEntity<ErrorResponse> {
        logger.error("Unexpected error: {}", ex.message, ex)

        val errorResponse = ErrorResponse(
            status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
            error = "Internal Server Error",
            message = "An unexpected error occurred: ${ex.message}"
        )

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse)
    }
}