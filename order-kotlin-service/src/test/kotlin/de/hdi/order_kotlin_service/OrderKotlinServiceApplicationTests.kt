package de.hdi.order_kotlin_service

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestPropertySource

@SpringBootTest
@TestPropertySource(properties = [
	"spring.main.allow-bean-definition-overriding=true"
])
class OrderKotlinServiceApplicationTests {

	@Test
	fun contextLoads() {
		// This test will pass if the Spring context loads successfully
	}
}
