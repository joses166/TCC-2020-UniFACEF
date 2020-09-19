package br.com.marqfacil.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import br.com.marqfacil.api.security.SecurityFilter;

@SpringBootApplication
@EnableScheduling
public class BackEndMarqFacilApplication {

	/**
	 * Configuração do pattern dos endpoints que serão interceptados
	 * pelo @SecurityFilter
	 */
	private static final String URL_PATTERN_AGENDAMENTOS = "/agendamentos/*";
	private static final String URL_PATTERN_AVALIACAO = "/avaliacoes/*";
	private static final String URL_PATTERN_CATEGORIA = "/categorias/operacao/*";
	private static final String URL_PATTERN_PROCEDIMENTO = "/procedimentos/operacao/*";
	private static final String URL_PATTERN_PRODUTO = "/produtos/operacao/*";

	public static void main(String[] args) {
		SpringApplication.run(BackEndMarqFacilApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<SecurityFilter> jwtFilter() {
		final FilterRegistrationBean<SecurityFilter> registrationBean = new FilterRegistrationBean<SecurityFilter>();
		registrationBean.setFilter(new SecurityFilter());
		registrationBean.addUrlPatterns(URL_PATTERN_AGENDAMENTOS, URL_PATTERN_AVALIACAO, URL_PATTERN_CATEGORIA,
				URL_PATTERN_PROCEDIMENTO, URL_PATTERN_PRODUTO);
		return registrationBean;
	}

}
