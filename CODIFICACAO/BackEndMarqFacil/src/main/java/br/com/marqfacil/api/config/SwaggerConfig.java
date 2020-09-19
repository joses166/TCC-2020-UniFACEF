package br.com.marqfacil.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("br.com.marqfacil.api")).paths(PathSelectors.any()).build()
				.apiInfo(apiInfo());
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("API para programa de Clínicas Estéticas").description(
				"Documentação de API referente aos endpoints disponíveis para acesso na API do programa para Clínicas Estéticas.")
				.version("Versão: 1.0.0").contact(new Contact("José Hamilton Martins Leite",
						"https://www.linkedin.com/in/josehamiltonmartinsleite/", "ton.ton.leite@hotmail.com/"))
				.build();
	}

}